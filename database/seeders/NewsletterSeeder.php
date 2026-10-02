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

        // 2. Create Subscriber Groups (idempotent)
        $techGroup = SubscriberGroup::firstOrCreate(
            ['slug' => 'tech-digest'],
            [
                'name' => 'Tech Digest',
                'description' => 'Weekly tech news, developer updates and tutorials.',
                'color' => '#3b82f6',
                'is_default' => true,
            ]
        );

        $dealsGroup = SubscriberGroup::firstOrCreate(
            ['slug' => 'weekly-deals'],
            [
                'name' => 'Weekly Deals & Offers',
                'description' => 'Exclusive promotions, discount codes and seasonal sales.',
                'color' => '#10b981',
                'is_default' => false,
            ]
        );

        $vipGroup = SubscriberGroup::firstOrCreate(
            ['slug' => 'vip-insiders'],
            [
                'name' => 'VIP Insiders',
                'description' => 'Early access to new product releases and premium webinars.',
                'color' => '#8b5cf6',
                'is_default' => false,
            ]
        );

        $updatesGroup = SubscriberGroup::firstOrCreate(
            ['slug' => 'product-updates'],
            [
                'name' => 'Product Updates',
                'description' => 'Changelogs, feature highlights and system status.',
                'color' => '#f59e0b',
                'is_default' => false,
            ]
        );

        // 3. Seed Email Templates
        $this->call(EmailTemplateSeeder::class);

        $welcomeTemplate = EmailTemplate::where('name', 'Welcome Onboarding Series')->first();
        $modernTemplate = EmailTemplate::where('name', 'Modern Tech Digest')->first();
        $promoTemplate = EmailTemplate::where('name', 'Flash Sale Promotional Blast')->first();

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
            $sub = Subscriber::firstOrCreate(
                ['email' => $item['email']],
                [
                    'first_name' => $item['first_name'],
                    'last_name' => $item['last_name'],
                    'status' => $item['status'],
                    'verified_at' => $item['status'] === 'active' ? now()->subDays(rand(1, 30)) : null,
                    'unsubscribed_at' => $item['status'] === 'unsubscribed' ? now()->subDays(2) : null,
                    'consent_ip' => '127.0.0.1',
                    'consent_source' => 'Website Footer Form',
                    'consent_timestamp' => now()->subDays(rand(1, 40)),
                ]
            );

            $sub->groups()->syncWithoutDetaching([$item['group_id']]);
            $subscribers[] = $sub;
        }

        // 5. Create Sample Campaigns
        $c1 = Campaign::firstOrCreate(
            ['title' => 'September Tech Digest #34'],
            [
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
            ]
        );

        $c2 = Campaign::firstOrCreate(
            ['title' => 'Autumn Pro Access Sale'],
            [
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
            ]
        );

        $c3 = Campaign::firstOrCreate(
            ['title' => 'Product v3.5 Major Update & API Enhancements'],
            [
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
            ]
        );

        $c4 = Campaign::firstOrCreate(
            ['title' => 'October Newsletter Draft'],
            [
                'subject' => 'Upcoming Trends & Feature Previews',
                'sender_name' => 'Newsletter Editor',
                'sender_email' => 'editor@example.com',
                'content_html' => $modernTemplate->content_html,
                'template_id' => $modernTemplate->id,
                'target_type' => 'all',
                'status' => 'draft',
            ]
        );

        // 6. Create Campaign Logs
        foreach (array_slice($subscribers, 0, 6) as $sub) {
            CampaignLog::firstOrCreate(
                [
                    'campaign_id' => $c1->id,
                    'subscriber_id' => $sub->id,
                ],
                [
                    'status' => 'sent',
                    'sent_at' => now()->subDays(5),
                    'opened_at' => now()->subDays(5)->addMinutes(12),
                    'clicked_at' => now()->subDays(5)->addMinutes(15),
                    'ip_address' => '192.168.1.'.rand(10, 200),
                    'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                ]
            );
        }

        // 7. Create Automations
        Automation::firstOrCreate(
            ['name' => 'New Subscriber Welcome Sequence'],
            [
                'trigger_event' => 'subscriber.registered',
                'template_id' => $welcomeTemplate->id,
                'delay_minutes' => 0,
                'is_active' => true,
                'execution_count' => 384,
            ]
        );

        Automation::firstOrCreate(
            ['name' => 'Double Opt-In Confirmation Email'],
            [
                'trigger_event' => 'subscriber.created',
                'template_id' => $welcomeTemplate->id,
                'delay_minutes' => 0,
                'is_active' => true,
                'execution_count' => 1250,
            ]
        );

        // 8. Create Activity Logs
        ActivityLog::firstOrCreate(
            ['action' => 'campaign.sent', 'user_id' => $admin->id],
            [
                'description' => 'Sent campaign "September Tech Digest #34" to 1,410 subscribers.',
                'properties' => ['campaign_id' => $c1->id, 'recipients' => 1410],
                'ip_address' => '127.0.0.1',
            ]
        );

        ActivityLog::firstOrCreate(
            ['action' => 'subscriber.imported', 'user_id' => $admin->id],
            [
                'description' => 'Imported 10 new subscribers via CSV.',
                'properties' => ['imported_count' => 10],
                'ip_address' => '127.0.0.1',
            ]
        );

        ActivityLog::firstOrCreate(
            ['action' => 'template.created', 'user_id' => $admin->id],
            [
                'description' => 'Created email template "Welcome Onboarding Series".',
                'properties' => ['template_id' => $welcomeTemplate->id],
                'ip_address' => '127.0.0.1',
            ]
        );
    }
}
