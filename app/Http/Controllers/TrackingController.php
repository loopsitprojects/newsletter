<?php

namespace App\Http\Controllers;

use App\Models\CampaignLog;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function trackOpen(string $token)
    {
        $log = CampaignLog::where('tracking_token', $token)->first();

        if ($log) {
            if (! $log->opened_at) {
                $log->update([
                    'opened_at' => now(),
                    'ip_address' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                ]);

                $log->campaign()->increment('open_count');
            }
        }

        // Return a 1x1 transparent PNG image
        $transparentPixel = base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');

        return response($transparentPixel, 200, [
            'Content-Type' => 'image/gif',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ]);
    }

    public function trackClick(string $token, Request $request)
    {
        $log = CampaignLog::where('tracking_token', $token)->first();
        $targetUrl = $request->query('url', config('app.url'));

        if ($log) {
            if (! $log->clicked_at) {
                $log->update([
                    'clicked_at' => now(),
                    'ip_address' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                ]);

                $log->campaign()->increment('click_count');
            }
        }

        return redirect()->away($targetUrl);
    }
}
