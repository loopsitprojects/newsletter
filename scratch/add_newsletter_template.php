<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\EmailTemplate;

$htmlContent = <<<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Newsletter Subject]</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155; line-height: 1.6;">

    <!-- Hidden Preheader Text -->
    <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        [Short preview text shown in the recipient's inbox] &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <!-- Main Container -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 650px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                    
                    <!-- Header Bar / Newsletter Title -->
                    <tr>
                        <td align="center" style="background-color: #0f172a; padding: 24px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">[Newsletter Title]</h1>
                            <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Weekly Updates & Insights</p>
                        </td>
                    </tr>

                    <!-- Header Image (Recommended size: 1200 x 500 px) -->
                    <tr>
                        <td style="padding: 0;">
                            <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=500&fit=crop&q=80" alt="Header Banner" width="650" style="width: 100%; max-width: 650px; height: auto; display: block; border: 0;" />
                        </td>
                    </tr>

                    <!-- Main Intro Section -->
                    <tr>
                        <td style="padding: 32px 32px 20px 32px;">
                            <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 12px 0;">[Main Heading]</h2>
                            <p style="color: #475569; font-size: 15px; margin: 0; line-height: 1.6;">
                                [Write your newsletter introduction here. Keep this section short and engaging. Hello {{first_name}}, welcome to our latest newsletter edition!]
                            </p>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 32px;">
                            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 10px 0 20px 0;" />
                        </td>
                    </tr>

                    <!-- Content Section 1 -->
                    <tr>
                        <td style="padding: 0 32px 24px 32px;">
                            <h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 10px 0;">[Content Section Title]</h3>
                            <p style="color: #475569; font-size: 14px; margin: 0 0 14px 0;">
                                [Add your newsletter content here. You can use paragraphs, bullet points, links, and formatting.]
                            </p>
                            <ul style="color: #475569; font-size: 14px; margin: 0 0 16px 0; padding-left: 20px; line-height: 1.8;">
                                <li>Key takeaway or highlight item number one</li>
                                <li>Important announcement or feature update</li>
                                <li>Actionable tip for your workflow</li>
                            </ul>
                        </td>
                    </tr>

                    <!-- Middle Image -->
                    <tr>
                        <td style="padding: 0 32px 24px 32px;">
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=450&fit=crop&q=80" alt="Section Visual" width="586" style="width: 100%; max-width: 586px; height: auto; display: block; border-radius: 12px; border: 0;" />
                            <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 6px 0 0 0;">Image can be inserted between content sections.</p>
                        </td>
                    </tr>

                    <!-- Featured Content Highlight Box -->
                    <tr>
                        <td style="padding: 0 32px 28px 32px;">
                            <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px;">
                                <h4 style="color: #1e3a8a; font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">[Featured Content]</h4>
                                <p style="color: #334155; font-size: 14px; margin: 0 0 16px 0;">
                                    [Add additional information, announcement, news, promotion, or update here to grab attention.]
                                </p>

                                <!-- Call to Action Button -->
                                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 8px; background-color: #2563eb;">
                                            <a href="https://example.com" target="_blank" style="font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; border: 1px solid #2563eb; display: inline-block;">READ MORE / LEARN MORE / SHOP NOW</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>

                    <!-- Second Section -->
                    <tr>
                        <td style="padding: 0 32px 24px 32px;">
                            <h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 10px 0;">[Second Section]</h3>
                            <p style="color: #475569; font-size: 14px; margin: 0 0 14px 0;">
                                [Add another content section if required. Expand on secondary news or upcoming events.]
                            </p>
                            
                            <!-- Additional Image in Section 2 -->
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=400&fit=crop&q=80" alt="Second Section Banner" width="586" style="width: 100%; max-width: 586px; height: auto; display: block; border-radius: 12px; margin-bottom: 12px; border: 0;" />
                            
                            <p style="color: #475569; font-size: 14px; margin: 0;">
                                [Additional text/content. Summarize concluding thoughts or contact links here.]
                            </p>
                        </td>
                    </tr>

                    <!-- Stay Connected & Social Links -->
                    <tr>
                        <td align="center" style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                            <h4 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">Stay Connected</h4>
                            <p style="margin: 0; font-size: 13px;">
                                <a href="https://example.com" style="color: #2563eb; text-decoration: none; font-weight: 600; margin: 0 8px;">[Website]</a> |
                                <a href="https://facebook.com" style="color: #2563eb; text-decoration: none; font-weight: 600; margin: 0 8px;">[Facebook]</a> |
                                <a href="https://instagram.com" style="color: #2563eb; text-decoration: none; font-weight: 600; margin: 0 8px;">[Instagram]</a> |
                                <a href="https://linkedin.com" style="color: #2563eb; text-decoration: none; font-weight: 600; margin: 0 8px;">[LinkedIn]</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer Section -->
                    <tr>
                        <td align="center" style="background-color: #0f172a; color: #94a3b8; padding: 24px 32px; text-align: center; font-size: 12px; line-height: 1.6;">
                            <h3 style="color: #ffffff; font-size: 16px; margin: 0 0 8px 0; font-weight: 700;">Loops Marketing</h3>
                            <p style="margin: 0;">
                                <a href="{{unsubscribe_url}}" style="color: #38bdf8; text-decoration: underline;">Unsubscribe</a> &nbsp;|&nbsp; 
                                <a href="{{unsubscribe_url}}" style="color: #38bdf8; text-decoration: underline;">Manage Preferences</a>
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

$template = EmailTemplate::updateOrCreate(
    ['name' => 'Standard Master Newsletter Template'],
    [
        'subject_template' => '[Newsletter Subject]',
        'content_html' => $htmlContent,
        'category' => 'newsletter',
        'is_default' => true,
    ]
);

echo "SUCCESS: Newsletter template created/updated with ID: {$template->id}!\n";
