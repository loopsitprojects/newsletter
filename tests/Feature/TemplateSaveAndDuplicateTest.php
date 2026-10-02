<?php

namespace Tests\Feature;

use App\Models\Campaign;
use App\Models\EmailTemplate;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TemplateSaveAndDuplicateTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_save_template_with_content_as_new_template_via_json(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->postJson(route('templates.save-as-new'), [
                'name' => 'October Tech Digest Edition',
                'subject_template' => '⚡ Big Product News',
                'category' => 'newsletter',
                'content_html' => '<div><h1>Customized Content Here</h1></div>',
            ]);

        $response->assertOk();
        $response->assertJson([
            'success' => true,
        ]);

        $this->assertDatabaseHas('email_templates', [
            'name' => 'October Tech Digest Edition',
            'subject_template' => '⚡ Big Product News',
            'category' => 'newsletter',
        ]);
    }

    public function test_user_can_duplicate_template(): void
    {
        $user = User::factory()->create();

        $originalTemplate = EmailTemplate::create([
            'name' => 'Base Editorial Layout',
            'subject_template' => 'Monthly News',
            'category' => 'newsletter',
            'content_html' => '<div>Base layout content</div>',
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('templates.duplicate', $originalTemplate->id));

        $response->assertRedirect(route('templates.index'));

        $this->assertDatabaseHas('email_templates', [
            'name' => 'Base Editorial Layout (Copy)',
            'content_html' => '<div>Base layout content</div>',
        ]);

        // Original remains untouched
        $this->assertDatabaseHas('email_templates', [
            'id' => $originalTemplate->id,
            'name' => 'Base Editorial Layout',
        ]);
    }

    public function test_user_can_duplicate_campaign(): void
    {
        $user = User::factory()->create();

        $originalCampaign = Campaign::create([
            'title' => 'Weekly Promotion #1',
            'subject' => 'Special 50% discount inside',
            'sender_name' => 'Marketing Team',
            'sender_email' => 'newsletter@loops.lk',
            'content_html' => '<div>Custom content with buttons & articles</div>',
            'target_type' => 'all',
            'status' => 'sent',
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('campaigns.duplicate', $originalCampaign->id));

        $newCampaign = Campaign::where('title', 'Weekly Promotion #1 (Copy)')->first();
        $this->assertNotNull($newCampaign);
        $this->assertEquals('draft', $newCampaign->status);
        $this->assertEquals('<div>Custom content with buttons & articles</div>', $newCampaign->content_html);

        $response->assertRedirect(route('campaigns.edit', $newCampaign->id));
    }

    public function test_user_can_save_campaign_as_template(): void
    {
        $user = User::factory()->create();

        $campaign = Campaign::create([
            'title' => 'Sri Lanka Launch Blast',
            'subject' => 'Exciting news from Sri Lanka',
            'sender_name' => 'Loops',
            'sender_email' => 'info@loops.lk',
            'content_html' => '<div>Full customized layout and articles</div>',
            'target_type' => 'all',
            'status' => 'sent',
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('campaigns.save-as-template', $campaign->id), [
                'name' => 'Sri Lanka Launch Reusable Template',
                'category' => 'newsletter',
            ]);

        $response->assertRedirect(route('templates.index'));

        $this->assertDatabaseHas('email_templates', [
            'name' => 'Sri Lanka Launch Reusable Template',
            'subject_template' => 'Exciting news from Sri Lanka',
            'content_html' => '<div>Full customized layout and articles</div>',
        ]);
    }
}
