<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Automation;
use App\Models\EmailTemplate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AutomationController extends Controller
{
    public function index(): Response
    {
        $automations = Automation::with('template')
            ->orderBy('created_at', 'desc')
            ->get();
        $templates = EmailTemplate::all();

        return Inertia::render('Automations/Index', [
            'automations' => $automations,
            'templates' => $templates,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'trigger_event' => 'required|string|max:100',
            'template_id' => 'nullable|exists:email_templates,id',
            'delay_minutes' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $automation = Automation::create([
            'name' => $validated['name'],
            'trigger_event' => $validated['trigger_event'],
            'template_id' => $validated['template_id'] ?? null,
            'delay_minutes' => $validated['delay_minutes'],
            'is_active' => $validated['is_active'],
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'automation.created',
            'description' => "Created automation rule '{$automation->name}'",
            'properties' => ['automation_id' => $automation->id],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Automation created successfully.');
    }

    public function update(Request $request, Automation $automation): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'trigger_event' => 'required|string|max:100',
            'template_id' => 'nullable|exists:email_templates,id',
            'delay_minutes' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $automation->update([
            'name' => $validated['name'],
            'trigger_event' => $validated['trigger_event'],
            'template_id' => $validated['template_id'] ?? null,
            'delay_minutes' => $validated['delay_minutes'],
            'is_active' => $validated['is_active'],
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'automation.updated',
            'description' => "Updated automation rule '{$automation->name}'",
            'properties' => ['automation_id' => $automation->id],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Automation updated successfully.');
    }

    public function toggle(Automation $automation, Request $request): RedirectResponse
    {
        $automation->update(['is_active' => !$automation->is_active]);

        $status = $automation->is_active ? 'enabled' : 'disabled';
        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'automation.toggled',
            'description' => "{$status} automation '{$automation->name}'",
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', "Automation {$status} successfully.");
    }

    public function destroy(Automation $automation, Request $request): RedirectResponse
    {
        $name = $automation->name;
        $automation->delete();

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'automation.deleted',
            'description' => "Deleted automation '{$name}'",
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Automation deleted successfully.');
    }
}
