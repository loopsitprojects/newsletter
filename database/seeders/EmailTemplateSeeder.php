<?php

namespace Database\Seeders;

use App\Models\EmailTemplate;
use Illuminate\Database\Seeder;

class EmailTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $meridianHtml = <<<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>What's New This Month? | Loops Integrated</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
        }
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        @media only screen and (max-width: 620px) {
            .container-table { width: 100% !important; max-width: 100% !important; }
            .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
            .mobile-stack { display: block !important; width: 100% !important; max-width: 100% !important; }
            .mobile-img { width: 100% !important; height: auto !important; min-height: auto !important; }
            .mobile-headline { font-size: 30px !important; line-height: 1.25 !important; }
            .mobile-cta-box { padding: 36px 16px !important; }
            .mobile-cta-cell { display: inline-block !important; padding: 4px !important; }
            .card-spacer { display: none !important; }
            .card-item { margin-bottom: 16px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #eef0f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #151a29; line-height: 1.6; -webkit-font-smoothing: antialiased;">

    <!-- Hidden Preheader Preview Text -->
    <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Discover our latest updates, products, news and special offers. &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <!-- Outer Wrapper -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #eef0f6; padding: 36px 12px;">
        <tr>
            <td align="center">
                <!-- Inner Container Card -->
                <table role="presentation" class="container-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 760px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px -15px rgba(43, 42, 142, 0.08); border: 1px solid #e2e4ea;">
                    
                    <!-- Header / Company Logo (Black Header Bar) -->
                    <tr>
                        <td align="center" style="background-color: #0b0f19; padding: 26px 36px; text-align: center; border-radius: 15px 15px 0 0;" class="mobile-padding">
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto;">
                                <tr>
                                    <td align="center" valign="middle">
                                        <a href="{{app_url}}" target="_blank" style="text-decoration: none; display: inline-block;">
                                            <img src="/images/loops-logo-white.png" alt="Loops Integrated" height="64" style="height: 64px; max-height: 64px; width: auto; max-width: 320px; display: block; margin: 0 auto; border: 0;" />
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Hero Section -->
                    <tr>
                        <td align="center" style="padding: 36px 36px 32px 36px; text-align: center;" class="mobile-padding">
                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #0057c5; text-transform: uppercase; letter-spacing: 2.2px;">
                                October Edition
                            </p>
                            <h1 class="mobile-headline" style="margin: 12px 0 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 40px; font-weight: 700; color: #151a29; line-height: 1.2; letter-spacing: -0.5px;">
                                What's New This Month?
                            </h1>
                            <p style="margin: 14px auto 0 auto; max-width: 520px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; color: #636978; line-height: 1.6;">
                                Discover our latest updates, products, news and special offers.
                            </p>
                            
                            <!-- Hero CTA Button -->
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 24px auto 0 auto;">
                                <tr>
                                    <td align="center" style="border-radius: 9999px; background-color: #ff0878;">
                                        <a href="https://example.com" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 13px 32px; border-radius: 9999px; display: inline-block; border: 1px solid #ff0878; box-shadow: 0 4px 12px rgba(255, 8, 120, 0.25);">
                                            Explore More
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Hero Banner Image -->
                            <div style="margin-top: 32px;">
                                <img class="mobile-img" src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720&fit=crop&q=80" alt="Bright modern office workspace" width="688" style="width: 100%; max-width: 688px; height: auto; display: block; border-radius: 16px; border: 0;" />
                            </div>
                        </td>
                    </tr>

                    <!-- Intro Section -->
                    <tr>
                        <td style="padding: 24px 36px 28px 36px;" class="mobile-padding">
                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #151a29;">
                                Hello {{first_name}},
                            </p>
                            <p style="margin: 8px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; color: #636978; line-height: 1.65;">
                                Here are the latest updates, highlights and news from our team. It's been a busy month &mdash; we hope you enjoy what we've been working on.
                            </p>
                        </td>
                    </tr>

                    <!-- Featured Section -->
                    <tr>
                        <td style="background-color: #f5f7fb; padding: 32px 36px;" class="mobile-padding">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e4ea;">
                                <tr>
                                    <!-- Featured Image -->
                                    <td class="mobile-stack" width="50%" valign="top" style="padding: 0;">
                                        <img class="mobile-img" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=750&fit=crop&q=80" alt="Team reviewing product prototypes" width="344" style="width: 100%; height: 100%; min-height: 250px; object-fit: cover; display: block; border: 0;" />
                                    </td>
                                    <!-- Featured Text Content -->
                                    <td class="mobile-stack" width="50%" valign="middle" style="padding: 30px 26px;" class="mobile-padding">
                                        <span style="display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0057c5; background-color: #e6f0fd; padding: 4px 12px; border-radius: 9999px;">
                                            Featured
                                        </span>
                                        <h2 style="margin: 12px 0 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 700; color: #151a29; line-height: 1.3;">
                                            Discover What's New
                                        </h2>
                                        <p style="margin: 10px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; color: #636978; line-height: 1.6;">
                                            Explore our latest products, services and updates &mdash; designed with feedback from customers like you.
                                        </p>
                                        <div style="margin-top: 18px;">
                                            <a href="https://example.com" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: #0057c5; text-decoration: none;">
                                                Read More &rarr;
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Call To Action (Gradient Banner) -->
                    <tr>
                        <td style="padding: 20px 36px 32px 36px;" class="mobile-padding">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0057c5 0%, #8035d1 50%, #ff0878 100%); background-color: #0057c5; border-radius: 16px; text-align: center;">
                                <tr>
                                    <td style="padding: 48px 32px;" class="mobile-cta-box">
                                        <h3 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                                            Ready to Discover More?
                                        </h3>
                                        <p style="margin: 12px auto 0 auto; max-width: 380px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; color: #ffffff; opacity: 0.88; line-height: 1.5;">
                                            Explore our latest updates and find something you'll love.
                                        </p>
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 22px auto 0 auto;">
                                            <tr>
                                                <td class="mobile-cta-cell" align="center" style="padding: 4px 6px;">
                                                    <a href="https://example.com" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: #0057c5; text-decoration: none; padding: 11px 24px; border-radius: 9999px; display: inline-block; background-color: #ffffff; border: 1.5px solid #ffffff; white-space: nowrap; line-height: 1.2; box-shadow: 0 4px 12px rgba(0,0,0,0.12);">
                                                        Explore Now
                                                    </a>
                                                </td>
                                                <td class="mobile-cta-cell" align="center" style="padding: 4px 6px;">
                                                    <a href="https://example.com/contact" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 11px 24px; border-radius: 9999px; display: inline-block; border: 1.5px solid rgba(255,255,255,0.85); background-color: rgba(255,255,255,0.15); white-space: nowrap; line-height: 1.2;">
                                                        Contact Us
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer Section -->
                    <tr>
                        <td style="background-color: #f5f7fb; border-top: 1px solid #e2e4ea; padding: 36px 32px 32px 32px; text-align: center;" class="mobile-padding">
                            <!-- Footer Logo -->
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto 16px auto;">
                                <tr>
                                    <td align="center" valign="middle">
                                        <a href="{{app_url}}" target="_blank" style="text-decoration: none; display: inline-block;">
                                            <img src="/images/loops-logo-dark.png" alt="Loops Integrated" height="32" style="height: 32px; max-height: 32px; width: auto; max-width: 160px; display: block; margin: 0 auto; border: 0;" />
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; color: #151a29;">
                                Loops Integrated
                            </p>

                            <!-- Social Links -->
                            <div style="margin: 18px 0 16px 0;">
                                <a href="https://facebook.com" target="_blank" class="social-icon-btn" title="Facebook" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/facebook.png" width="16" height="16" alt="Facebook" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>
                                <a href="https://linkedin.com" target="_blank" class="social-icon-btn" title="LinkedIn" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/linkedin.png" width="16" height="16" alt="LinkedIn" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>
                                <a href="https://instagram.com" target="_blank" class="social-icon-btn" title="Instagram" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/instagram.png" width="16" height="16" alt="Instagram" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>
                                <a href="https://tiktok.com" target="_blank" class="social-icon-btn" title="TikTok" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/tiktok.png" width="16" height="16" alt="TikTok" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>
                                <a href="https://youtube.com" target="_blank" class="social-icon-btn" title="YouTube" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/youtube.png" width="16" height="16" alt="YouTube" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>
                            </div>

                            <hr style="border: 0; border-top: 1px solid #e2e4ea; margin: 16px 0;" />

                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #8e95a5; line-height: 1.5;">
                                You're receiving this email because you subscribed to our newsletter.
                            </p>
                            <p style="margin: 6px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px;">
                                <a href="{{unsubscribe_url}}" style="color: #0057c5; text-decoration: underline; font-weight: 600;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
HTML;

        EmailTemplate::updateOrCreate(
            ['name' => 'Welcome Onboarding Series'],
            [
                'subject_template' => 'Welcome to {{company_name}}, {{first_name}}! 🚀',
                'category' => 'automation',
                'template_type' => 'base',
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
                'is_default' => false,
            ]
        );

        EmailTemplate::updateOrCreate(
            ['name' => 'Modern Tech Digest'],
            [
                'subject_template' => '⚡ Tech Pulse: {{subject}}',
                'category' => 'newsletter',
                'template_type' => 'base',
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
                'header_content' => null,
                'footer_content' => null,
                'is_default' => false,
            ]
        );

        EmailTemplate::updateOrCreate(
            ['name' => 'Flash Sale Promotional Blast'],
            [
                'subject_template' => '🔥 Exclusive Offer: {{subject}}',
                'category' => 'promotion',
                'template_type' => 'base',
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
                'header_content' => null,
                'footer_content' => null,
                'is_default' => false,
            ]
        );

        EmailTemplate::updateOrCreate(
            ['name' => 'Standard Master Newsletter Template'],
            [
                'subject_template' => "What's New This Month? | Meridian",
                'category' => 'newsletter',
                'template_type' => 'base',
                'content_html' => $meridianHtml,
                'header_content' => null,
                'footer_content' => null,
                'is_default' => false,
            ]
        );

        EmailTemplate::updateOrCreate(
            ['name' => 'Meridian Modern Editorial Newsletter'],
            [
                'subject_template' => "What's New This Month? | Meridian",
                'category' => 'newsletter',
                'template_type' => 'base',
                'content_html' => $meridianHtml,
                'header_content' => null,
                'footer_content' => null,
                'is_default' => true,
            ]
        );
    }
}
