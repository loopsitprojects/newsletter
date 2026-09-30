<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\SubscriberGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SubscriberGroupController extends Controller
{
    public function index(): Response
    {
        $groups = SubscriberGroup::withCount('subscribers')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Groups/Index', [
            'groups' => $groups,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:subscriber_groups,name',
            'description' => 'nullable|string|max:500',
            'color' => 'required|string|max:30',
        ]);

        $group = SubscriberGroup::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'color' => $validated['color'],
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'group.created',
            'description' => "Created subscriber group '{$group->name}'",
            'properties' => ['group_id' => $group->id],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Group created successfully.');
    }

    public function update(Request $request, SubscriberGroup $group): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:subscriber_groups,name,' . $group->id,
            'description' => 'nullable|string|max:500',
            'color' => 'required|string|max:30',
        ]);

        $group->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'color' => $validated['color'],
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'group.updated',
            'description' => "Updated subscriber group '{$group->name}'",
            'properties' => ['group_id' => $group->id],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Group updated successfully.');
    }

    public function destroy(SubscriberGroup $group, Request $request): RedirectResponse
    {
        $name = $group->name;
        $group->delete();

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'group.deleted',
            'description' => "Deleted subscriber group '{$name}'",
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Group deleted successfully.');
    }
}
