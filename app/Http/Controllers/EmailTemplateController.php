<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\EmailTemplate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailTemplateController extends Controller
{
    public function index(): Response
    {
        $templates = EmailTemplate::orderBy('created_at', 'desc')->get()->map(function ($t) {
            $t->content_html = CampaignController::normalizeMediaUrls($t->content_html);

            return $t;
        });

        return Inertia::render('Templates/Index', [
            'templates' => $templates,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Templates/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:email_templates,name',
            'subject_template' => 'nullable|string|max:255',
            'category' => 'required|string|max:50',
            'content_html' => 'required|string',
            'header_content' => 'nullable|string',
            'footer_content' => 'nullable|string',
            'is_default' => 'nullable|boolean',
        ]);

        if (! empty($validated['is_default'])) {
            EmailTemplate::where('is_default', true)->update(['is_default' => false]);
        }

        $template = EmailTemplate::create([
            'name' => $validated['name'],
            'subject_template' => $validated['subject_template'] ?? null,
            'category' => $validated['category'],
            'content_html' => CampaignController::normalizeMediaUrls($validated['content_html']),
            'header_content' => $validated['header_content'] ?? null,
            'footer_content' => $validated['footer_content'] ?? null,
            'is_default' => $validated['is_default'] ?? false,
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'template.created',
            'description' => "Created email template '{$template->name}'",
            'properties' => ['template_id' => $template->id],
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('templates.index')->with('success', 'Template created successfully.');
    }

    public function edit(EmailTemplate $template): Response
    {
        $template->content_html = CampaignController::normalizeMediaUrls($template->content_html);

        return Inertia::render('Templates/Edit', [
            'template' => $template,
        ]);
    }

    public function update(Request $request, EmailTemplate $template): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:email_templates,name,'.$template->id,
            'subject_template' => 'nullable|string|max:255',
            'category' => 'required|string|max:50',
            'content_html' => 'required|string',
            'header_content' => 'nullable|string',
            'footer_content' => 'nullable|string',
            'is_default' => 'nullable|boolean',
        ]);

        if (! empty($validated['is_default']) && ! $template->is_default) {
            EmailTemplate::where('is_default', true)->update(['is_default' => false]);
        }

        $template->update([
            'name' => $validated['name'],
            'subject_template' => $validated['subject_template'] ?? null,
            'category' => $validated['category'],
            'content_html' => CampaignController::normalizeMediaUrls($validated['content_html']),
            'header_content' => $validated['header_content'] ?? null,
            'footer_content' => $validated['footer_content'] ?? null,
            'is_default' => $validated['is_default'] ?? false,
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'template.updated',
            'description' => "Updated email template '{$template->name}'",
            'properties' => ['template_id' => $template->id],
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('templates.index')->with('success', 'Template updated successfully.');
    }

    public function destroy(EmailTemplate $template, Request $request): RedirectResponse
    {
        $name = $template->name;
        $template->delete();

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'template.deleted',
            'description' => "Deleted email template '{$name}'",
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Template deleted successfully.');
    }

    public function saveAsNew(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject_template' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:50',
            'content_html' => 'required|string',
            'header_content' => 'nullable|string',
            'footer_content' => 'nullable|string',
        ]);

        $baseName = trim($validated['name']);
        $name = $baseName;
        $counter = 1;
        while (EmailTemplate::where('name', $name)->exists()) {
            $counter++;
            $name = "{$baseName} ({$counter})";
        }

        $template = EmailTemplate::create([
            'name' => $name,
            'subject_template' => $validated['subject_template'] ?? null,
            'category' => $validated['category'] ?? 'newsletter',
            'content_html' => CampaignController::normalizeMediaUrls($validated['content_html']),
            'header_content' => $validated['header_content'] ?? null,
            'footer_content' => $validated['footer_content'] ?? null,
            'is_default' => false,
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'template.created',
            'description' => "Saved template with content '{$template->name}'",
            'properties' => ['template_id' => $template->id],
            'ip_address' => $request->ip(),
        ]);

        if ($request->wantsJson() || $request->ajax() || $request->header('X-Inertia') === null && $request->acceptsJson()) {
            return response()->json([
                'success' => true,
                'message' => "Template '{$template->name}' saved successfully!",
                'template' => $template,
            ]);
        }

        return redirect()->route('templates.index')->with('success', "Template '{$template->name}' saved successfully.");
    }

    public function duplicate(EmailTemplate $template, Request $request): RedirectResponse
    {
        $baseName = $template->name.' (Copy)';
        $name = $baseName;
        $counter = 1;
        while (EmailTemplate::where('name', $name)->exists()) {
            $counter++;
            $name = "{$template->name} (Copy {$counter})";
        }

        $newTemplate = EmailTemplate::create([
            'name' => $name,
            'subject_template' => $template->subject_template,
            'category' => $template->category,
            'content_html' => $template->content_html,
            'header_content' => $template->header_content,
            'footer_content' => $template->footer_content,
            'is_default' => false,
        ]);

        ActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'template.created',
            'description' => "Duplicated email template '{$template->name}' as '{$newTemplate->name}'",
            'properties' => ['template_id' => $newTemplate->id, 'source_template_id' => $template->id],
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('templates.index')->with('success', "Template duplicated as '{$newTemplate->name}'.");
    }
}
