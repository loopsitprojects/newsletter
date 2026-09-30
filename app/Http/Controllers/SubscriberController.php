<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Subscriber;
use App\Models\SubscriberGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubscriberController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Subscriber::with('groups');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('group_id') && $request->group_id !== 'all') {
            $query->whereHas('groups', function ($q) use ($request) {
                $q->where('subscriber_groups.id', $request->group_id);
            });
        }

        $subscribers = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();
        $groups = SubscriberGroup::all();

        return Inertia::render('Subscribers/Index', [
            'subscribers' => $subscribers,
            'groups' => $groups,
            'filters' => $request->only(['search', 'status', 'group_id']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:subscribers,email',
            'first_name' => 'nullable|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'status' => 'required|in:active,pending,unsubscribed,bounced',
            'group_ids' => 'nullable|array',
            'group_ids.*' => 'exists:subscriber_groups,id',
        ]);

        $subscriber = Subscriber::create([
            'email' => $validated['email'],
            'first_name' => $validated['first_name'] ?? null,
            'last_name' => $validated['last_name'] ?? null,
            'status' => $validated['status'],
            'verified_at' => $validated['status'] === 'active' ? now() : null,
            'consent_ip' => $request->ip(),
            'consent_source' => 'Admin Panel',
            'consent_timestamp' => now(),
        ]);

        if (! empty($validated['group_ids'])) {
            $subscriber->groups()->sync($validated['group_ids']);
        }

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'subscriber.created',
            'description' => "Added new subscriber {$subscriber->email}",
            'properties' => ['subscriber_id' => $subscriber->id],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Subscriber added successfully.');
    }

    public function update(Request $request, Subscriber $subscriber): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:subscribers,email,'.$subscriber->id,
            'first_name' => 'nullable|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'status' => 'required|in:active,pending,unsubscribed,bounced',
            'group_ids' => 'nullable|array',
            'group_ids.*' => 'exists:subscriber_groups,id',
        ]);

        if ($validated['status'] === 'active' && $subscriber->status !== 'active') {
            $subscriber->verified_at = now();
        } elseif ($validated['status'] === 'unsubscribed' && $subscriber->status !== 'unsubscribed') {
            $subscriber->unsubscribed_at = now();
        }

        $subscriber->update([
            'email' => $validated['email'],
            'first_name' => $validated['first_name'] ?? null,
            'last_name' => $validated['last_name'] ?? null,
            'status' => $validated['status'],
        ]);

        if (isset($validated['group_ids'])) {
            $subscriber->groups()->sync($validated['group_ids']);
        }

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'subscriber.updated',
            'description' => "Updated subscriber {$subscriber->email}",
            'properties' => ['subscriber_id' => $subscriber->id],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Subscriber updated successfully.');
    }

    public function destroy(Subscriber $subscriber, Request $request): RedirectResponse
    {
        $email = $subscriber->email;
        $subscriber->delete();

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'subscriber.deleted',
            'description' => "Deleted subscriber {$email}",
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Subscriber deleted successfully.');
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'csv_file' => 'nullable|file|mimes:csv,txt|max:5120',
            'csv_text' => 'nullable|string',
            'group_id' => 'nullable|exists:subscriber_groups,id',
        ]);

        $rawLines = [];

        if ($request->hasFile('csv_file')) {
            $content = file_get_contents($request->file('csv_file')->getRealPath());
            $rawLines = preg_split('/\r\n|\r|\n/', (string) $content);
        } elseif ($request->filled('csv_text')) {
            $rawLines = preg_split('/\r\n|\r|\n/', (string) $request->csv_text);
        }

        $importedCount = 0;

        foreach ($rawLines as $line) {
            $line = trim((string) $line);
            if (empty($line)) {
                continue;
            }

            // Fix unbalanced quotes per line so one stray quote never breaks subsequent rows
            if (substr_count($line, '"') % 2 !== 0) {
                $line = str_replace('"', '', $line);
            }

            // Detect delimiter (tab, semicolon, or comma)
            $delimiter = str_contains($line, "\t") ? "\t" : (str_contains($line, ';') ? ';' : ',');
            $cols = str_getcsv($line, $delimiter);

            if (empty($cols)) {
                continue;
            }

            // Dynamically detect which column contains the valid email address
            $email = null;
            $emailIdx = -1;
            foreach ($cols as $idx => $val) {
                $cleanVal = trim((string) $val, " \t\n\r\0\x0B\"'");
                if (filter_var($cleanVal, FILTER_VALIDATE_EMAIL)) {
                    $email = strtolower($cleanVal);
                    $emailIdx = $idx;
                    break;
                }
            }

            if (! $email) {
                // Header row or line without a valid email address
                continue;
            }

            // Extract remaining columns for names
            $otherCols = [];
            foreach ($cols as $idx => $val) {
                if ($idx !== $emailIdx) {
                    $cleaned = trim((string) $val, " \t\n\r\0\x0B\"'");
                    if ($cleaned !== '') {
                        $otherCols[] = $cleaned;
                    }
                }
            }

            $firstName = null;
            $lastName = null;

            if (count($otherCols) >= 2) {
                $firstName = $otherCols[0];
                $lastName = $otherCols[1];
            } elseif (count($otherCols) === 1) {
                $parts = preg_split('/\s+/', $otherCols[0], 2);
                $firstName = $parts[0] ?? null;
                $lastName = $parts[1] ?? null;
            }

            // Truncate cleanly to ensure it never exceeds database column limits
            $firstName = $firstName !== null ? mb_substr(strip_tags((string) $firstName), 0, 100) : null;
            $lastName = $lastName !== null ? mb_substr(strip_tags((string) $lastName), 0, 100) : null;

            $subscriber = Subscriber::firstOrCreate(
                ['email' => $email],
                [
                    'first_name' => $firstName ?: null,
                    'last_name' => $lastName ?: null,
                    'status' => 'active',
                    'verified_at' => now(),
                    'consent_ip' => $request->ip(),
                    'consent_source' => 'CSV Import',
                    'consent_timestamp' => now(),
                ]
            );

            if ($firstName && ! $subscriber->first_name) {
                $subscriber->update(['first_name' => $firstName]);
            }
            if ($lastName && ! $subscriber->last_name) {
                $subscriber->update(['last_name' => $lastName]);
            }

            if ($request->filled('group_id')) {
                $subscriber->groups()->syncWithoutDetaching([$request->group_id]);
            }

            $importedCount++;
        }

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'subscriber.imported',
            'description' => "Imported {$importedCount} subscribers via CSV",
            'properties' => ['count' => $importedCount],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', "Successfully imported {$importedCount} subscribers.");
    }

    public function export(Request $request)
    {
        $subscribers = Subscriber::with('groups')->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="subscribers_'.date('Y-m-d').'.csv"',
        ];

        $callback = function () use ($subscribers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Email', 'First Name', 'Last Name', 'Status', 'Groups', 'Joined Date']);

            foreach ($subscribers as $s) {
                $groupsList = $s->groups->pluck('name')->implode(', ');
                fputcsv($file, [
                    $s->id,
                    $s->email,
                    $s->first_name,
                    $s->last_name,
                    $s->status,
                    $groupsList,
                    $s->created_at->format('Y-m-d H:i:s'),
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
