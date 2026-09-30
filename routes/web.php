<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AutomationController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailTemplateController;
use App\Http\Controllers\MediaUploadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicSubscriptionController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\SubscriberGroupController;
use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Route;

// Public Subscription & Preference Routes
Route::get('/subscribe', [PublicSubscriptionController::class, 'showSignupForm'])->name('public.signup');
Route::post('/subscribe', [PublicSubscriptionController::class, 'subscribe'])->name('public.subscribe');
Route::get('/verify/{token}', [PublicSubscriptionController::class, 'confirmVerification'])->name('public.verify');
Route::get('/unsubscribe/{token}', [PublicSubscriptionController::class, 'showUnsubscribe'])->name('public.unsubscribe');
Route::post('/unsubscribe/{token}', [PublicSubscriptionController::class, 'processUnsubscribe'])->name('public.unsubscribe.process');
Route::get('/preferences/{token}', [PublicSubscriptionController::class, 'managePreferences'])->name('public.preferences');
Route::post('/preferences/{token}', [PublicSubscriptionController::class, 'updatePreferences'])->name('public.preferences.update');

// Tracking Endpoints
Route::get('/t/open/{token}', [TrackingController::class, 'trackOpen'])->name('tracking.open');
Route::get('/t/click/{token}', [TrackingController::class, 'trackClick'])->name('tracking.click');

// Root Route - Redirects to Dashboard or Login based on auth
Route::get('/', function () {
    return auth()->check() ? redirect()->route('dashboard') : redirect()->route('login');
});

// Authenticated Admin Dashboard & Management Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Subscriber Management
    Route::get('/subscribers', [SubscriberController::class, 'index'])->name('subscribers.index');
    Route::post('/subscribers', [SubscriberController::class, 'store'])->name('subscribers.store');
    Route::put('/subscribers/{subscriber}', [SubscriberController::class, 'update'])->name('subscribers.update');
    Route::delete('/subscribers/{subscriber}', [SubscriberController::class, 'destroy'])->name('subscribers.destroy');
    Route::post('/subscribers/import', [SubscriberController::class, 'import'])->name('subscribers.import');
    Route::get('/subscribers/export', [SubscriberController::class, 'export'])->name('subscribers.export');

    // Groups Management
    Route::get('/groups', [SubscriberGroupController::class, 'index'])->name('groups.index');
    Route::post('/groups', [SubscriberGroupController::class, 'store'])->name('groups.store');
    Route::put('/groups/{group}', [SubscriberGroupController::class, 'update'])->name('groups.update');
    Route::delete('/groups/{group}', [SubscriberGroupController::class, 'destroy'])->name('groups.destroy');

    // Campaign Management
    Route::get('/campaigns', [CampaignController::class, 'index'])->name('campaigns.index');
    Route::get('/campaigns/create', [CampaignController::class, 'create'])->name('campaigns.create');
    Route::post('/campaigns', [CampaignController::class, 'store'])->name('campaigns.store');
    Route::get('/campaigns/{campaign}', [CampaignController::class, 'show'])->name('campaigns.show');
    Route::get('/campaigns/{campaign}/edit', [CampaignController::class, 'edit'])->name('campaigns.edit');
    Route::put('/campaigns/{campaign}', [CampaignController::class, 'update'])->name('campaigns.update');
    Route::delete('/campaigns/{campaign}', [CampaignController::class, 'destroy'])->name('campaigns.destroy');
    Route::post('/campaigns/{campaign}/send-now', [CampaignController::class, 'sendNow'])->name('campaigns.send-now');
    Route::post('/campaigns/{campaign}/process-batch', [CampaignController::class, 'processQueueBatch'])->name('campaigns.process-batch');
    Route::post('/campaigns/{campaign}/cancel', [CampaignController::class, 'cancelSchedule'])->name('campaigns.cancel');

    // Template Management
    Route::get('/templates', [EmailTemplateController::class, 'index'])->name('templates.index');
    Route::get('/templates/create', [EmailTemplateController::class, 'create'])->name('templates.create');
    Route::post('/templates', [EmailTemplateController::class, 'store'])->name('templates.store');
    Route::get('/templates/{template}/edit', [EmailTemplateController::class, 'edit'])->name('templates.edit');
    Route::put('/templates/{template}', [EmailTemplateController::class, 'update'])->name('templates.update');
    Route::delete('/templates/{template}', [EmailTemplateController::class, 'destroy'])->name('templates.destroy');

    // Automations
    Route::get('/automations', [AutomationController::class, 'index'])->name('automations.index');
    Route::post('/automations', [AutomationController::class, 'store'])->name('automations.store');
    Route::put('/automations/{automation}', [AutomationController::class, 'update'])->name('automations.update');
    Route::post('/automations/{automation}/toggle', [AutomationController::class, 'toggle'])->name('automations.toggle');
    Route::delete('/automations/{automation}', [AutomationController::class, 'destroy'])->name('automations.destroy');

    // Activity Logs
    Route::get('/activity-logs', [ActivityLogController::class, 'index'])->name('activity-logs.index');

    // Media Upload Endpoint
    Route::post('/upload-image', [MediaUploadController::class, 'upload'])->name('media.upload');

    // Profile Settings
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
