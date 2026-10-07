<?php

namespace App\Http\Controllers;

use App\Mail\VerificationMailable;
use App\Mail\WelcomeMailable;
use App\Models\ActivityLog;
use App\Models\Subscriber;
use App\Models\SubscriberGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class PublicSubscriptionController extends Controller
{
    public function showSignupForm(): Response
    {
        $groups = SubscriberGroup::where('is_default', true)->orWhere('slug', 'tech-digest')->get();

        return Inertia::render('Public/Signup', [
            'groups' => $groups,
        ]);
    }

    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'first_name' => 'nullable|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'group_ids' => 'nullable|array',
            'group_ids.*' => 'exists:subscriber_groups,id',
        ]);

        $subscriber = Subscriber::where('email', $validated['email'])->first();

        if ($subscriber) {
            if ($subscriber->status === 'unsubscribed') {
                $subscriber->update([
                    'status' => 'pending',
                    'first_name' => $validated['first_name'] ?? $subscriber->first_name,
                    'last_name' => $validated['last_name'] ?? $subscriber->last_name,
                    'unsubscribed_at' => null,
                ]);
            }
        } else {
            $subscriber = Subscriber::create([
                'email' => $validated['email'],
                'first_name' => $validated['first_name'] ?? null,
                'last_name' => $validated['last_name'] ?? null,
                'status' => 'pending',
                'consent_ip' => $request->ip(),
                'consent_source' => 'Website Public Form',
                'consent_timestamp' => now(),
            ]);

            // Assign default groups or selected groups
            if (! empty($validated['group_ids'])) {
                $subscriber->groups()->sync($validated['group_ids']);
            } else {
                $defaultGroup = SubscriberGroup::where('is_default', true)->first();
                if ($defaultGroup) {
                    $subscriber->groups()->attach($defaultGroup->id);
                }
            }
        }

        // Send double opt-in verification email
        try {
            Mail::to($subscriber->email)->send(new VerificationMailable($subscriber));
        } catch (\Exception $e) {
            // Mail transport error fallback
        }

        ActivityLog::create([
            'action' => 'public.subscribed',
            'description' => "Public subscription request from {$subscriber->email}",
            'ip_address' => $request->ip(),
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Subscription successful! Please check your email to verify your address.',
            ]);
        }

        return back()->with('success', 'Thank you! Please check your inbox to confirm your subscription.');
    }

    public function confirmVerification(string $token): Response
    {
        $subscriber = Subscriber::where('verification_token', $token)->first();

        if (! $subscriber) {
            return Inertia::render('Public/VerificationResult', [
                'status' => 'error',
                'message' => 'Invalid or expired verification link.',
            ]);
        }

        $subscriber->update([
            'status' => 'active',
            'verified_at' => now(),
        ]);

        // Trigger Welcome Email
        try {
            Mail::to($subscriber->email)->send(new WelcomeMailable($subscriber));
        } catch (\Exception $e) {
            // Log fallback
        }

        ActivityLog::create([
            'action' => 'public.verified',
            'description' => "Subscriber {$subscriber->email} verified email.",
        ]);

        return Inertia::render('Public/VerificationResult', [
            'status' => 'success',
            'message' => 'Your subscription has been verified successfully! Welcome aboard.',
            'subscriber' => $subscriber,
        ]);
    }

    public function showUnsubscribe(string $token): Response
    {
        $subscriber = Subscriber::where('unsubscribe_token', $token)->first();

        return Inertia::render('Public/Unsubscribe', [
            'subscriber' => $subscriber,
            'token' => $token,
        ]);
    }

    public function processUnsubscribe(Request $request, string $token)
    {
        $subscriber = Subscriber::where('unsubscribe_token', $token)->firstOrFail();

        $subscriber->update([
            'status' => 'unsubscribed',
            'unsubscribed_at' => now(),
        ]);

        ActivityLog::create([
            'action' => 'public.unsubscribed',
            'description' => "Subscriber {$subscriber->email} unsubscribed.",
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'You have been unsubscribed successfully.');
    }

    public function managePreferences(string $token): Response
    {
        $subscriber = Subscriber::with('groups')->where('unsubscribe_token', $token)->firstOrFail();
        $allGroups = SubscriberGroup::all();

        return Inertia::render('Public/Preferences', [
            'subscriber' => $subscriber,
            'allGroups' => $allGroups,
            'token' => $token,
        ]);
    }

    public function updatePreferences(Request $request, string $token)
    {
        $subscriber = Subscriber::where('unsubscribe_token', $token)->firstOrFail();

        $validated = $request->validate([
            'first_name' => 'nullable|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'group_ids' => 'nullable|array',
            'group_ids.*' => 'exists:subscriber_groups,id',
        ]);

        $subscriber->update([
            'first_name' => $validated['first_name'] ?? null,
            'last_name' => $validated['last_name'] ?? null,
        ]);

        if (isset($validated['group_ids'])) {
            $subscriber->groups()->sync($validated['group_ids']);
        }

        return back()->with('success', 'Subscription preferences updated.');
    }
}
