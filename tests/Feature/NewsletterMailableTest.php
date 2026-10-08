<?php

namespace Tests\Feature;

use App\Mail\NewsletterMailable;
use App\Models\Campaign;
use App\Models\EmailTemplate;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsletterMailableTest extends TestCase
{
    use RefreshDatabase;

    public function test_mailable_enforces_light_only_color_scheme_to_prevent_gmail_ios_inversion(): void
    {
        $user = User::factory()->create();

        $htmlWithLightDark = '<!DOCTYPE html><html><head><meta name="color-scheme" content="light dark"><style>:root { color-scheme: light dark; }</style></head><body><table class="header-cell dark-header" style="background-color: #0b0f19; background-image: linear-gradient(to bottom, #0b0f19 0%, #0b0f19 100%);"><tr><td><img src="/images/loops-logo-white.png?v=3" alt="Logo" /><h1 class="mobile-headline" style="color: #ffffff;">What\'s New This Month?</h1></td></tr></table></body></html>';

        $campaign = Campaign::create([
            'title' => 'Test Campaign',
            'subject' => 'Monthly Digest',
            'sender_name' => 'Loops Marketing',
            'sender_email' => 'marketing@loops.lk',
            'content_html' => $htmlWithLightDark,
            'status' => 'draft',
            'target_type' => 'all',
        ]);

        $subscriber = Subscriber::create([
            'email' => 'client@loops.lk',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'status' => 'active',
            'unsubscribe_token' => 'token-test-123',
        ]);

        $mailable = new NewsletterMailable($campaign, $subscriber, 'track-token-123');
        $rendered = $mailable->renderedHtml;

        $this->assertStringContainsString('content="light only"', $rendered);
        $this->assertStringNotContainsString('content="light dark"', $rendered);
        $this->assertStringContainsString('linear-gradient(#0b0f19, #0b0f19)', $rendered);
        $this->assertStringContainsString('header-logo-bg', $rendered);
        $this->assertStringContainsString('header-title-white', $rendered);
        $this->assertStringContainsString('color: #ffffff !important', $rendered);
    }

    public function test_mailable_falls_back_to_template_when_campaign_content_html_is_empty(): void
    {
        $template = EmailTemplate::create([
            'name' => 'Editorial Template',
            'subject_template' => 'Subject',
            'category' => 'newsletter',
            'template_type' => 'base',
            'content_html' => '<html><head></head><body><div class="header-cell" style="background-color: #0b0f19;"><img src="/images/loops-logo-white.png" /><h1>Editorial</h1></div></body></html>',
            'is_default' => true,
        ]);

        $campaign = Campaign::create([
            'title' => 'Empty HTML Campaign',
            'subject' => 'Hello',
            'sender_name' => 'Loops',
            'sender_email' => 'hello@loops.lk',
            'template_id' => $template->id,
            'content_html' => '',
            'status' => 'draft',
            'target_type' => 'all',
        ]);

        $subscriber = Subscriber::create([
            'email' => 'member@loops.lk',
            'first_name' => 'Jane',
            'status' => 'active',
            'unsubscribe_token' => 'token-test-456',
        ]);

        $mailable = new NewsletterMailable($campaign, $subscriber, 'track-token-456');
        $rendered = $mailable->renderedHtml;

        $this->assertStringContainsString('Editorial', $rendered);
        $this->assertStringContainsString('content="light only"', $rendered);
        $this->assertStringContainsString('header-logo-bg', $rendered);
    }
}
