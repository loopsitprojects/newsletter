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

        $campaignsUpdated = 0;
        foreach (Campaign::all() as $campaign) {
            $normalized = CampaignController::normalizeMediaUrls($campaign->content_html);
            if ($normalized !== $campaign->content_html) {
                $campaign->update(['content_html' => $normalized]);
                $campaignsUpdated++;
            }
        }

        $templatesUpdated = 0;
        foreach (EmailTemplate::all() as $template) {
            $normalized = CampaignController::normalizeMediaUrls($template->content_html);
            if ($normalized !== $template->content_html) {
                $template->update(['content_html' => $normalized]);
                $templatesUpdated++;
            }
        }

        $this->info("Completed! Normalized {$campaignsUpdated} campaign(s) and {$templatesUpdated} template(s).");

        return self::SUCCESS;
    }
}
