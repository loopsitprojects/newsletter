<?php

namespace App\Console\Commands;

use App\Http\Controllers\CampaignController;
use App\Models\Campaign;
use App\Models\EmailTemplate;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('campaigns:normalize-urls')]
#[Description('Normalize localhost and 127.0.0.1 media URLs in campaigns and email templates')]
class NormalizeMediaUrlsCommand extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Normalizing media URLs in campaigns and templates...');

        $logoSnippet = '<div style="margin-bottom: 14px;"><img src="/favicon.png" alt="Logo" width="56" height="56" style="width: 56px; height: 56px; object-fit: contain; border-radius: 12px; display: inline-block; border: 0; vertical-align: middle; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);" /></div>';

        $campaignsUpdated = 0;
        foreach (Campaign::all() as $campaign) {
            $normalized = CampaignController::normalizeMediaUrls($campaign->content_html);
            if (str_contains($normalized, 'background-color: #0f172a') && ! str_contains($normalized, 'alt="Logo"')) {
                $normalized = preg_replace(
                    '/(<td[^>]*background-color:\s*#0f172a[^>]*>)\s*(<h1)/i',
                    '$1'."\n                            ".$logoSnippet."\n                            ".'$2',
                    $normalized
                );
            }

            // Upgrade older 650px newsletter layouts to 750px wide layout
            if (str_contains($normalized, 'max-width: 650px')) {
                $normalized = str_replace(
                    ['max-width: 650px', 'width="650"', 'width="586"', 'max-width: 586px'],
                    ['max-width: 750px', 'width="750"', 'width="686"', 'max-width: 686px'],
                    $normalized
                );
            }

            if ($normalized !== $campaign->content_html) {
                $campaign->update(['content_html' => $normalized]);
                $campaignsUpdated++;
            }
        }

        $templatesUpdated = 0;
        foreach (EmailTemplate::all() as $template) {
            $normalized = CampaignController::normalizeMediaUrls($template->content_html);
            if (str_contains($normalized, 'background-color: #0f172a') && ! str_contains($normalized, 'alt="Logo"')) {
                $normalized = preg_replace(
                    '/(<td[^>]*background-color:\s*#0f172a[^>]*>)\s*(<h1)/i',
                    '$1'."\n                            ".$logoSnippet."\n                            ".'$2',
                    $normalized
                );
            }

            // Upgrade older 650px newsletter layouts to 750px wide layout
            if (str_contains($normalized, 'max-width: 650px')) {
                $normalized = str_replace(
                    ['max-width: 650px', 'width="650"', 'width="586"', 'max-width: 586px'],
                    ['max-width: 750px', 'width="750"', 'width="686"', 'max-width: 686px'],
                    $normalized
                );
            }

            if ($normalized !== $template->content_html) {
                $template->update(['content_html' => $normalized]);
                $templatesUpdated++;
            }
        }

        $this->info("Completed! Normalized {$campaignsUpdated} campaign(s) and {$templatesUpdated} template(s).");

        return self::SUCCESS;
    }
}
