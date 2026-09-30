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

        if (!empty($validated['group_ids'])) {
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
            'email' => 'required|email|unique:subscribers,email,' . $subscriber->id,
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
            'csv_file' => 'nullable|file|mimes:csv,txt|max:2048',
            'csv_text' => 'nullable|string',
            'group_id' => 'nullable|exists:subscriber_groups,id',
        ]);

        $rows = [];

        if ($request->hasFile('csv_file')) {
            $file = $request->file('csv_file');
            $handle = fopen($file->getRealPath(), 'r');
            $header = fgetcsv($handle);
            while (($data = fgetcsv($handle)) !== false) {
                if (count($data) >= 1) {
                    $rows[] = $data;
                }
            }
            fclose($handle);
        } elseif ($request->filled('csv_text')) {
            $lines = explode("\n", trim($request->csv_text));
            foreach ($lines as $line) {
                $cols = str_getcsv($line);
                if (count($cols) >= 1 && !empty(trim($cols[0]))) {
                    $rows[] = $cols;
                }
            }
        }

        $importedCount = 0;
        foreach ($rows as $row) {
            $email = trim($row[0] ?? '');
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                continue;
            }

            $firstName = trim($row[1] ?? '');
            $lastName = trim($row[2] ?? '');

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
            'Content-Disposition' => 'attachment; filename="subscribers_' . date('Y-m-d') . '.csv"',
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
