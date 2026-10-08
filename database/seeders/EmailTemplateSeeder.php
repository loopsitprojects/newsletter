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
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light">
    <title>What's New This Month? | Loops Integrated</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <style type="text/css">
        body, table, td, h1, h2, h3, h4, p, a, span {
            font-family: Arial, sans-serif !important;
        }
    </style>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap');

        :root {
            color-scheme: light only;
            supported-color-schemes: light;
        }
        body, table, td, a, p, h1, h2, h3, h4, span {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }

        /* Featured 2-Column Clean Grid */
        .featured-grid-table { width: 100% !important; border-collapse: separate !important; }
        .featured-grid-row > .col-left,
        .featured-grid-row > .col-right {
            vertical-align: top !important;
        }
        .featured-card {
            width: 100% !important;
            background-color: #ffffff;
            border-collapse: separate !important;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        .featured-card-img-td {
            padding: 0 !important;
            line-height: 0 !important;
            font-size: 0 !important;
            background-color: #f1f3f7;
        }
        .featured-col-img {
            width: 100% !important;
            max-width: 100% !important;
            height: 240px !important;
            max-height: 240px !important;
            object-fit: cover !important;
            display: block !important;
            border: 0 !important;
        }
        .social-icon-btn {
            display: inline-block !important;
            width: 34px !important;
            height: 34px !important;
            line-height: 34px !important;
            text-align: center !important;
            vertical-align: middle !important;
            border-radius: 50% !important;
        }
        .social-icon-btn img {
            vertical-align: middle !important;
            display: inline-block !important;
            margin-top: -2px !important;
            border: 0 !important;
        }

        /* Header Fluid Layout & Alignment */
        .header-side-table {
            width: 100% !important;
            border-collapse: separate !important;
            border-spacing: 0 !important;
        }
        .header-col-left {
            width: 220px;
            max-width: 220px;
            vertical-align: top;
            text-align: left;
        }
        .header-col-right {
            vertical-align: top;
            text-align: right;
        }
        .header-edition-text {
            text-align: right !important;
            white-space: nowrap !important;
        }
        .header-title-white {
            text-align: right !important;
        }
        .header-subtitle-white {
            text-align: right !important;
        }

        /* Dark Mode & Inversion Protection (Apple Mail, Outlook, iOS Mail, Gmail) */
        u + .body .dark-header,
        u + .body .header-cell,
        u + .body .header-logo-bg {
            background-color: #0b0f19 !important;
            background-image: linear-gradient(#0b0f19, #0b0f19) !important;
        }
        u + .body .header-title-white {
            color: #ffffff !important;
        }
        u + .body .header-subtitle-white {
            color: #cbd5e1 !important;
        }
        @media (prefers-color-scheme: dark) {
            body, .outer-table {
                background-color: #060913 !important;
                background-image: linear-gradient(to bottom, #060913 0%, #060913 100%) !important;
            }
            .container-table {
                background-color: #0f172a !important;
                border-color: #1e293b !important;
                box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6) !important;
            }
            .header-cell, .dark-header, .header-logo-bg {
                background-color: #0b0f19 !important;
                background-image: linear-gradient(#0b0f19, #0b0f19) !important;
            }
            .header-title-white {
                color: #ffffff !important;
            }
            .header-subtitle-white {
                color: #cbd5e1 !important;
            }
            .dark-text-main {
                color: #f8fafc !important;
            }
            .dark-text-muted {
                color: #94a3b8 !important;
            }
            .dark-bg-featured {
                background-color: #090d16 !important;
            }
            .featured-card {
                background-color: #131c2e !important;
                border-color: #1e293b !important;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25) !important;
            }
            .featured-card-img-td {
                background-color: #0c1424 !important;
            }
            .clean-cta-box {
                background-color: #0f172a !important;
            }
            .clean-cta-title {
                color: #f8fafc !important;
            }
            .clean-cta-subtitle {
                color: #94a3b8 !important;
            }
            .clean-cta-btn {
                background-color: #0057c5 !important;
                background-image: linear-gradient(135deg, #0057c5 0%, #004bb0 100%) !important;
                color: #ffffff !important;
                border: 1.5px solid #38bdf8 !important;
                box-shadow: 0 4px 18px rgba(0, 87, 197, 0.45) !important;
            }
            .clean-cta-sec-btn {
                background-color: rgba(255, 255, 255, 0.08) !important;
                color: #f1f5f9 !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
            }
            .footer-cell {
                background-color: #090d16 !important;
                border-top-color: #1e293b !important;
            }
            .footer-company {
                color: #f8fafc !important;
            }
            .footer-text {
                color: #94a3b8 !important;
            }
            .social-icon-btn {
                background-color: #131c2e !important;
                border-color: #1e293b !important;
            }
            .footer-hr {
                border-top-color: #1e293b !important;
            }
        }

        /* Mobile Viewport Optimizations (max-width: 620px) */
        @media only screen and (max-width: 620px) {
            .outer-table {
                padding: 0 !important;
                width: 100% !important;
            }
            .outer-td {
                padding: 0 !important;
            }
            .container-table {
                width: 100% !important;
                max-width: 100% !important;
                border-radius: 0 !important;
                border-left: 0 !important;
                border-right: 0 !important;
            }
            .header-cell {
                border-radius: 0 !important;
                padding: 24px 20px !important;
            }
            .header-cell {
                border-radius: 0 !important;
                padding: 22px 20px !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            table.header-side-table,
            .header-side-table,
            .header-side-table tbody,
            .header-side-table tr,
            .header-side-row,
            td.header-col-left,
            td.header-col-right,
            .header-col-left,
            .header-col-right {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
                box-sizing: border-box !important;
                float: none !important;
                clear: both !important;
            }
            table.header-side-table,
            .header-side-table {
                border-collapse: separate !important;
                border-spacing: 0 !important;
            }
            td.header-col-left,
            .header-col-left {
                text-align: center !important;
                padding: 0 0 18px 0 !important;
                float: none !important;
                clear: both !important;
            }
            .header-col-left table {
                float: none !important;
                clear: both !important;
                margin: 0 auto !important;
                text-align: center !important;
            }
            .header-col-left td {
                text-align: center !important;
            }
            .header-col-left a {
                display: inline-block !important;
                margin: 0 auto !important;
                text-align: center !important;
            }
            .header-col-left img,
            .header-logo-img {
                height: 44px !important;
                max-height: 44px !important;
                width: auto !important;
                max-width: 160px !important;
                display: block !important;
                margin: 0 auto !important;
            }
            td.header-col-right,
            .header-col-right {
                text-align: center !important;
                padding: 0 !important;
                float: none !important;
                clear: both !important;
            }
            .header-edition-text {
                font-size: 10px !important;
                letter-spacing: 1.5px !important;
                text-align: center !important;
                display: block !important;
                margin: 0 auto 6px auto !important;
            }
            h1.header-title-white,
            .header-title-white {
                font-size: 23px !important;
                line-height: 1.25 !important;
                text-align: center !important;
                display: block !important;
                margin: 0 auto 8px auto !important;
            }
            .header-subtitle-white {
                font-size: 13.5px !important;
                line-height: 1.5 !important;
                text-align: center !important;
                display: block !important;
                margin: 0 auto 16px auto !important;
                max-width: 100% !important;
            }
            table.header-btn-table,
            .header-btn-table {
                margin: 16px auto 0 auto !important;
                width: auto !important;
                float: none !important;
                clear: both !important;
                text-align: center !important;
                display: table !important;
            }
            .header-btn-table td {
                text-align: center !important;
            }
            .header-btn-link {
                font-size: 13px !important;
                padding: 10px 24px !important;
                display: inline-block !important;
                text-align: center !important;
            }
            .mobile-img {
                width: 100% !important;
                height: auto !important;
                min-height: auto !important;
            }
            .mobile-headline {
                font-size: 28px !important;
                line-height: 1.25 !important;
            }
            .clean-cta-box {
                padding: 24px 20px 32px 20px !important;
            }
            .mobile-cta-table {
                width: 100% !important;
                margin: 20px auto 0 auto !important;
            }
            .mobile-cta-cell {
                display: block !important;
                width: 100% !important;
                text-align: center !important;
                padding: 0 !important;
                margin-bottom: 12px !important;
            }
            .mobile-cta-btn {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                padding: 14px 20px !important;
                text-align: center !important;
                font-size: 13.5px !important;
                box-sizing: border-box !important;
            }
            .card-spacer { display: none !important; }
            .card-item { margin-bottom: 16px !important; }
            .col-left, .col-right {
                padding-left: 0 !important;
                padding-right: 0 !important;
                padding-bottom: 20px !important;
                width: 100% !important;
                height: auto !important;
                display: block !important;
            }
            .featured-grid-table, .featured-grid-row { height: auto !important; }
            .featured-card { height: auto !important; min-height: 0 !important; }
            .featured-col-img { width: 100% !important; height: 240px !important; object-fit: cover !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #eef0f6; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #151a29; line-height: 1.6; -webkit-font-smoothing: antialiased;">

    <!-- Hidden Preheader Preview Text -->
    <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Discover our latest updates, products, news and special offers. &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <!-- Outer Wrapper -->
    <table role="presentation" class="outer-table" data-theme="dark" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #060913; padding: 36px 12px;">
        <tr>
            <td align="center" class="outer-td">
                <!-- Inner Container Card -->
                <table role="presentation" class="container-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 760px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px -15px rgba(43, 42, 142, 0.08); border: 1px solid #e2e4ea;">
                    
                    <!-- Header / Company Logo (Black Header Bar with Side-by-Side Logo & Heading) -->
                    <tr>
                        <td style="background: #0b0f19; background-color: #0b0f19; background-image: linear-gradient(#0b0f19, #0b0f19); padding: 28px 36px; border-radius: 15px 15px 0 0;" class="mobile-padding header-cell dark-header" data-header-layout="side-by-side">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="header-side-table" style="width: 100%; border-collapse: separate; border-spacing: 0;">
                                <tr class="header-side-row">
                                    <td class="header-col-left mobile-stack" width="220" valign="top" align="left" style="width: 220px; max-width: 220px; vertical-align: top; text-align: left; padding: 0 16px 0 0;">
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0;">
                                            <tr>
                                                <td align="left" valign="top">
                                                    <a href="{{app_url}}" target="_blank" style="text-decoration: none; display: inline-block;">
                                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0;">
                                                            <tr>
                                                                <td class="header-logo-bg" style="background: #0b0f19; background-color: #0b0f19; background-image: linear-gradient(#0b0f19, #0b0f19); border-radius: 10px; padding: 4px 6px;">
                                                                    <img class="header-logo-img" src="/images/loops-logo-white.png?v=3" alt="Loops Integrated" height="64" style="height: 64px; max-height: 64px; width: auto; max-width: 200px; display: block; margin: 0; border: 0;" />
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class="header-col-right mobile-stack mobile-stack-right" valign="top" align="right" style="vertical-align: top; text-align: right; padding: 0;">
                                        <p class="header-edition-text" style="margin: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #2fd0ca; text-transform: uppercase; letter-spacing: 2px; text-align: right; white-space: nowrap;">
                                            October Edition
                                        </p>
                                        <h1 class="header-title-white" style="margin: 6px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 26px; font-weight: 700; color: #ffffff !important; line-height: 1.25; letter-spacing: -0.3px; text-align: right;">
                                            What's New This Month?
                                        </h1>
                                        <p class="header-subtitle-white" style="margin: 8px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; color: #cbd5e1 !important; line-height: 1.5; text-align: right; max-width: 440px; margin-left: auto;">
                                            Discover our latest updates, products, news and special offers.
                                        </p>
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="right" class="header-btn-table" style="margin: 14px 0 0 auto;">
                                            <tr>
                                                <td align="center" style="border-radius: 9999px; background-color: #ff0878;">
                                                    <a class="header-btn-link" href="{{app_url}}" target="_blank" style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12.5px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 9px 22px; border-radius: 9999px; display: inline-block; border: 1px solid #ff0878; box-shadow: 0 4px 12px rgba(255, 8, 120, 0.25);">
                                                        Explore More
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Hero Banner Image -->
                    <tr>
                        <td style="padding: 24px 36px 12px 36px;" class="mobile-padding">
                            <img class="mobile-img" src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720&fit=crop&q=80" alt="Hero Banner" width="688" style="width: 100%; max-width: 688px; height: auto; display: block; border-radius: 14px; border: 0;" />
                        </td>
                    </tr>

                    <!-- Intro Section -->
                    <tr>
                        <td style="padding: 24px 36px 28px 36px;" class="mobile-padding">
                            <p class="dark-text-main" style="margin: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #151a29;">
                                Hello {{first_name}},
                            </p>
                            <p class="dark-text-muted" style="margin: 8px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #636978; line-height: 1.65;">
                                Here are the latest updates, highlights and news from our team. It's been a busy month &mdash; we hope you enjoy what we've been working on.
                            </p>
                        </td>
                    </tr>

                    <!-- Featured Section -->
                    <tr>
                        <td style="background-color: #f5f7fb; padding: 28px 32px;" class="mobile-padding dark-bg-featured" data-featured-layout="columns" data-featured-card-height="440" data-featured-img-height="240" data-featured-link-align="flow">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="featured-grid-table">
                                <tr>
                                    <td class="mobile-stack col-left" width="50%" valign="top" style="padding: 0 10px 0 0; vertical-align: top;">
                                        <table class="featured-card" data-featured-card="true" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e4ea; border-collapse: separate; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                                            <tbody>
                                                <tr class="featured-card-img-tr" height="240">
                                                    <td class="featured-card-img-td" height="240" style="padding: 0; margin: 0; line-height: 0; font-size: 0; background-color: #f1f3f7; height: 240px;" align="center">
                                                        <img class="mobile-img featured-col-img" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&amp;h=750&amp;fit=crop&amp;q=80" alt="Discover What's New" width="332" height="240" style="width: 100%; max-width: 100%; height: 240px; max-height: 240px; object-fit: cover; display: block; border: 0;" />
                                                    </td>
                                                </tr>
                                                <tr class="featured-card-body-tr">
                                                    <td valign="top" style="padding: 18px 18px 18px 18px; vertical-align: top;" class="mobile-padding featured-card-body-td">
                                                        <div class="featured-card-content">
                                                            <span style="display: inline-block; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0057c5; background-color: #e6f0fd; padding: 3px 10px; border-radius: 9999px;">
                                                                Featured
                                                            </span>
                                                            <h2 class="dark-text-main" style="margin: 8px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #151a29; line-height: 1.35;">
                                                                Discover What's New
                                                            </h2>
                                                            <p class="dark-text-muted" style="margin: 6px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; color: #636978; line-height: 1.55;">
                                                                Explore our latest products, services and updates &mdash; designed with feedback from customers like you.
                                                            </p>
                                                            <div style="margin-top: 10px; margin-bottom: 0;">
                                                                <a href="https://example.com" target="_blank" style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: #0057c5; text-decoration: none; display: inline-block;">
                                                                    Read More &rarr;
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td class="mobile-stack col-right" width="50%" valign="top" style="padding: 0 0 0 10px; vertical-align: top;">
                                        <table class="featured-card" data-featured-card="true" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e4ea; border-collapse: separate; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                                            <tbody>
                                                <tr class="featured-card-img-tr" height="240">
                                                    <td class="featured-card-img-td" height="240" style="padding: 0; margin: 0; line-height: 0; font-size: 0; background-color: #f1f3f7; height: 240px;" align="center">
                                                        <img class="mobile-img featured-col-img" src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&amp;h=750&amp;fit=crop&amp;q=80" alt="Creative Spotlight" width="332" height="240" style="width: 100%; max-width: 100%; height: 240px; max-height: 240px; object-fit: cover; display: block; border: 0;" />
                                                    </td>
                                                </tr>
                                                <tr class="featured-card-body-tr">
                                                    <td valign="top" style="padding: 18px 18px 18px 18px; vertical-align: top;" class="mobile-padding featured-card-body-td">
                                                        <div class="featured-card-content">
                                                            <span style="display: inline-block; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #ff0878; background-color: #ffe6f0; padding: 3px 10px; border-radius: 9999px;">
                                                                Spotlight
                                                            </span>
                                                            <h2 class="dark-text-main" style="margin: 8px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #151a29; line-height: 1.35;">
                                                                Creative Spotlight
                                                            </h2>
                                                            <p class="dark-text-muted" style="margin: 6px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; color: #636978; line-height: 1.55;">
                                                                Insights, workflow highlights, and behind-the-scenes stories from our creative productions.
                                                            </p>
                                                            <div style="margin-top: 10px; margin-bottom: 0;">
                                                                <a href="https://example.com" target="_blank" style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: #0057c5; text-decoration: none; display: inline-block;">
                                                                    Read More &rarr;
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Call To Action Section (Clean / Minimal) -->
                    <tr>
                        <td style="padding: 28px 36px 36px 36px;" class="mobile-padding clean-cta-box" data-cta-style="clean">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" style="text-align: left;" class="clean-cta-text-cell">
                                        <h3 class="clean-cta-title" style="margin: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 800; color: #151a29; letter-spacing: -0.4px; line-height: 1.3;">
                                            See Our Latest Work
                                        </h3>
                                        <p class="clean-cta-subtitle" style="margin: 10px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #636978; line-height: 1.6; max-width: 600px;">
                                            From award-winning campaigns to new productions, take a look at what we've been creating recently.
                                        </p>
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" class="clean-cta-btn-table mobile-cta-table" style="margin: 20px 0 0 0;">
                                            <tr>
                                                <td align="center" class="mobile-cta-cell" style="border-radius: 10px; background-color: #0b0f19; background-image: linear-gradient(to bottom, #0b0f19 0%, #0b0f19 100%);">
                                                    <a href="https://example.com" target="_blank" class="clean-cta-btn mobile-cta-btn" style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; color: #ffffff; text-decoration: none; padding: 13px 28px; border-radius: 10px; display: inline-block; background-color: #0b0f19; background-image: linear-gradient(to bottom, #0b0f19 0%, #0b0f19 100%); text-transform: uppercase; letter-spacing: 0.8px; line-height: 1.2; border: 1.5px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);">
                                                        VISIT OUR WEBSITE
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
                        <td style="background-color: #f5f7fb; border-top: 1px solid #e2e4ea; padding: 36px 32px 32px 32px; text-align: center;" class="mobile-padding footer-cell">
                            <!-- Footer Logo -->
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto 16px auto;">
                                <tr>
                                    <td align="center" valign="middle">
                                        <a href="{{app_url}}" target="_blank" style="text-decoration: none; display: inline-block;">
                                            <img class="footer-logo" src="/images/loops-logo-dark.png" alt="Loops Integrated" height="32" style="height: 32px; max-height: 32px; width: auto; max-width: 160px; display: block; margin: 0 auto; border: 0;" />
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p class="footer-company" style="margin: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; color: #151a29;">
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

                            <hr class="footer-hr" style="border: 0; border-top: 1px solid #e2e4ea; margin: 16px 0;" />

                            <p style="margin: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #8e95a5; line-height: 1.5;">
                                You're receiving this email because you subscribed to our newsletter.
                            </p>
                            <p style="margin: 6px 0 0 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px;">
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
