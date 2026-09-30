<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\Automation;
use App\Models\Campaign;
use App\Models\CampaignLog;
use App\Models\EmailTemplate;
use App\Models\Subscriber;
use App\Models\SubscriberGroup;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class NewsletterSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ensure Admin User exists
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Create Subscriber Groups
        $techGroup = SubscriberGroup::create([
            'name' => 'Tech Digest',
            'slug' => 'tech-digest',
            'description' => 'Weekly tech news, developer updates and tutorials.',
            'color' => '#3b82f6',
            'is_default' => true,
        ]);

        $dealsGroup = SubscriberGroup::create([
            'name' => 'Weekly Deals & Offers',
            'slug' => 'weekly-deals',
            'description' => 'Exclusive promotions, discount codes and seasonal sales.',
            'color' => '#10b981',
            'is_default' => false,
        ]);

        $vipGroup = SubscriberGroup::create([
            'name' => 'VIP Insiders',
            'slug' => 'vip-insiders',
            'description' => 'Early access to new product releases and premium webinars.',
            'color' => '#8b5cf6',
            'is_default' => false,
        ]);

        $updatesGroup = SubscriberGroup::create([
            'name' => 'Product Updates',
            'slug' => 'product-updates',
            'description' => 'Changelogs, feature highlights and system status.',
            'color' => '#f59e0b',
            'is_default' => false,
        ]);

        // 3. Create Sample Email Templates
        $welcomeTemplate = EmailTemplate::create([
            'name' => 'Welcome Onboarding Series',
            'subject_template' => 'Welcome to {{company_name}}, {{first_name}}! 🚀',
            'category' => 'automation',
            'content_html' => '<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0;">
    <h1 style="color: #0f172a; font-size: 24px;">Welcome aboard, {{first_name}}!</h1>
    <p style="color: #475569; font-size: 16px; line-height: 1.6;">Thank you for subscribing to our newsletter. We are thrilled to have you join our growing community of tech enthusiasts and creators.</p>
    <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0;">
        <p style="margin: 0; color: #334155; font-weight: 600;">What to expect:</p>
        <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #475569;">
            <li>Curated weekly tech digests</li>
            <li>Exclusive early access to product releases</li>
            <li>Actionable tips and step-by-step guides</li>
        </ul>
    </div>
    <p style="text-align: center; margin-top: 30px;">
        <a href="https://example.com/dashboard" style="background: #3b82f6; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Explore Your Dashboard</a>
    </p>
</div>',
            'header_content' => '<p style="font-size: 12px; color: #94a3b8; text-align: center;">Welcome to our official newsletter community</p>',
            'footer_content' => '<p style="font-size: 12px; color: #94a3b8; text-align: center;">You received this because you signed up on our website. <a href="{{unsubscribe_url}}" style="color: #64748b;">Unsubscribe</a></p>',
            'is_default' => true,
        ]);

        $modernTemplate = EmailTemplate::create([
            'name' => 'Modern Tech Digest',
            'subject_template' => '⚡ Tech Pulse: {{subject}}',
            'category' => 'newsletter',
            'content_html' => '<div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 32px; border-radius: 12px;">
    <div style="text-align: center; margin-bottom: 24px;">
        <span style="background: #38bdf8; color: #0f172a; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px;">WEEKLY DIGEST</span>
        <h1 style="color: #ffffff; margin-top: 12px; font-size: 28px;">The Engineering Frontier</h1>
    </div>
    <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #38bdf8; margin-top: 0;">Main Story: AI Innovations in 2026</h2>
        <p style="color: #94a3b8; line-height: 1.6;">Discover how autonomous multi-agent workflows and modern web stacks are revolutionizing developer productivity across industries.</p>
        <a href="#" style="color: #38bdf8; text-decoration: none; font-weight: bold;">Read Full Story &rarr;</a>
    </div>
    <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px;">
        Sent to {{email}} | <a href="{{unsubscribe_url}}" style="color: #94a3b8;">Manage Preferences</a>
    </p>
</div>',
            'is_default' => false,
        ]);

        $promoTemplate = EmailTemplate::create([
            'name' => 'Flash Sale Promotional Blast',
            'subject_template' => '🔥 Exclusive Offer: {{subject}}',
            'category' => 'promotion',
            'content_html' => '<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #10b981; border-radius: 12px; padding: 24px;">
    <div style="background: #10b981; color: white; text-align: center; padding: 16px; border-radius: 8px 8px 0 0; font-size: 24px; font-weight: bold;">
        SPECIAL PROMOTION - 40% OFF
    </div>
    <div style="padding: 20px; text-align: center;">
        <h2 style="color: #065f46;">Upgrade Your Subscription Today</h2>
        <p style="color: #374151;">Use coupon code <strong>SUMMER2026</strong> at checkout to unlock full access to all features.</p>
        <p><a href="#" style="background: #10b981; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">Claim Discount Now</a></p>
    </div>
</div>',
            'is_default' => false,
        ]);

        // 4. Create Sample Subscribers
        $subscribersData = [
            ['email' => 'alex.dev@example.com', 'first_name' => 'Alex', 'last_name' => 'Rivera', 'status' => 'active', 'group_id' => $techGroup->id],
            ['email' => 'sarah.connor@example.com', 'first_name' => 'Sarah', 'last_name' => 'Connor', 'status' => 'active', 'group_id' => $vipGroup->id],
            ['email' => 'michael.scott@example.com', 'first_name' => 'Michael', 'last_name' => 'Scott', 'status' => 'active', 'group_id' => $dealsGroup->id],
            ['email' => 'emily.watson@example.com', 'first_name' => 'Emily', 'last_name' => 'Watson', 'status' => 'active', 'group_id' => $techGroup->id],
            ['email' => 'david.beck@example.com', 'first_name' => 'David', 'last_name' => 'Beck', 'status' => 'pending', 'group_id' => $updatesGroup->id],
            ['email' => 'lisa.simpson@example.com', 'first_name' => 'Lisa', 'last_name' => 'Simpson', 'status' => 'active', 'group_id' => $vipGroup->id],
            ['email' => 'john.doe@example.com', 'first_name' => 'John', 'last_name' => 'Doe', 'status' => 'unsubscribed', 'group_id' => $techGroup->id],
            ['email' => 'bruce.wayne@example.com', 'first_name' => 'Bruce', 'last_name' => 'Wayne', 'status' => 'active', 'group_id' => $vipGroup->id],
            ['email' => 'clark.kent@example.com', 'first_name' => 'Clark', 'last_name' => 'Kent', 'status' => 'active', 'group_id' => $updatesGroup->id],
            ['email' => 'diana.prince@example.com', 'first_name' => 'Diana', 'last_name' => 'Prince', 'status' => 'active', 'group_id' => $dealsGroup->id],
        ];

        $subscribers = [];
        foreach ($subscribersData as $item) {
            $sub = Subscriber::create([
                'email' => $item['email'],
                'first_name' => $item['first_name'],
                'last_name' => $item['last_name'],
                'status' => $item['status'],
                'verified_at' => $item['status'] === 'active' ? now()->subDays(rand(1, 30)) : null,
                'unsubscribed_at' => $item['status'] === 'unsubscribed' ? now()->subDays(2) : null,
                'consent_ip' => '127.0.0.1',
                'consent_source' => 'Website Footer Form',
                'consent_timestamp' => now()->subDays(rand(1, 40)),
            ]);

            $sub->groups()->attach($item['group_id']);
            $subscribers[] = $sub;
        }

        // 5. Create Sample Campaigns
        $c1 = Campaign::create([
            'title' => 'September Tech Digest #34',
            'subject' => 'The Future of AI Web Frameworks in 2026',
            'sender_name' => 'Tech Digest Team',
            'sender_email' => 'newsletter@example.com',
            'content_html' => $modernTemplate->content_html,
            'template_id' => $modernTemplate->id,
            'target_type' => 'group',
            'subscriber_group_id' => $techGroup->id,
            'status' => 'sent',
            'scheduled_at' => now()->subDays(5),
            'sent_at' => now()->subDays(5),
            'total_subscribers' => 1420,
            'sent_count' => 1410,
            'open_count' => 984,
            'click_count' => 412,
            'unsubscribe_count' => 8,
            'bounce_count' => 10,
        ]);

        $c2 = Campaign::create([
            'title' => 'Autumn Pro Access Sale',
            'subject' => 'Claim 40% Discount on All Annual Plans',
            'sender_name' => 'Marketing Team',
            'sender_email' => 'deals@example.com',
            'content_html' => $promoTemplate->content_html,
            'template_id' => $promoTemplate->id,
            'target_type' => 'all',
            'status' => 'sent',
            'scheduled_at' => now()->subDays(2),
            'sent_at' => now()->subDays(2),
            'total_subscribers' => 2850,
            'sent_count' => 2830,
            'open_count' => 1740,
            'click_count' => 690,
            'unsubscribe_count' => 15,
            'bounce_count' => 20,
        ]);

        $c3 = Campaign::create([
            'title' => 'Product v3.5 Major Update & API Enhancements',
            'subject' => 'Introducing Automated Workflows & Dynamic Tagging',
            'sender_name' => 'Product Team',
            'sender_email' => 'updates@example.com',
            'content_html' => $welcomeTemplate->content_html,
            'template_id' => $welcomeTemplate->id,
            'target_type' => 'group',
            'subscriber_group_id' => $updatesGroup->id,
            'status' => 'scheduled',
            'scheduled_at' => now()->addDays(2),
            'total_subscribers' => 1950,
        ]);

        $c4 = Campaign::create([
            'title' => 'October Newsletter Draft',
            'subject' => 'Upcoming Trends & Feature Previews',
            'sender_name' => 'Newsletter Editor',
            'sender_email' => 'editor@example.com',
            'content_html' => $modernTemplate->content_html,
            'template_id' => $modernTemplate->id,
            'target_type' => 'all',
            'status' => 'draft',
        ]);

        // 6. Create Campaign Logs
        foreach (array_slice($subscribers, 0, 6) as $sub) {
            CampaignLog::create([
                'campaign_id' => $c1->id,
                'subscriber_id' => $sub->id,
                'status' => 'sent',
                'sent_at' => now()->subDays(5),
                'opened_at' => now()->subDays(5)->addMinutes(12),
                'clicked_at' => now()->subDays(5)->addMinutes(15),
                'ip_address' => '192.168.1.' . rand(10, 200),
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            ]);
        }

        // 7. Create Automations
        Automation::create([
            'name' => 'New Subscriber Welcome Sequence',
            'trigger_event' => 'subscriber.registered',
            'template_id' => $welcomeTemplate->id,
            'delay_minutes' => 0,
            'is_active' => true,
            'execution_count' => 384,
        ]);

        Automation::create([
            'name' => 'Double Opt-In Confirmation Email',
            'trigger_event' => 'subscriber.created',
            'template_id' => $welcomeTemplate->id,
            'delay_minutes' => 0,
            'is_active' => true,
            'execution_count' => 1250,
        ]);

        // 8. Create Activity Logs
        ActivityLog::create([
            'user_id' => $admin->id,
            'action' => 'campaign.sent',
            'description' => 'Sent campaign "September Tech Digest #34" to 1,410 subscribers.',
            'properties' => ['campaign_id' => $c1->id, 'recipients' => 1410],
            'ip_address' => '127.0.0.1',
        ]);

        ActivityLog::create([
            'user_id' => $admin->id,
            'action' => 'subscriber.imported',
            'description' => 'Imported 10 new subscribers via CSV.',
            'properties' => ['imported_count' => 10],
            'ip_address' => '127.0.0.1',
        ]);

        ActivityLog::create([
            'user_id' => $admin->id,
            'action' => 'template.created',
            'description' => 'Created email template "Welcome Onboarding Series".',
            'properties' => ['template_id' => $welcomeTemplate->id],
            'ip_address' => '127.0.0.1',
        ]);
    }
}
