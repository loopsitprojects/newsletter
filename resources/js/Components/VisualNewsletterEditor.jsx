import React, { useState, useEffect, useRef } from 'react';
import ImageUploaderField from './ImageUploaderField';
import {
    Sparkles,
    Image as ImageIcon,
    Type,
    Link2,
    Eye,
    Code,
    Smartphone,
    Monitor,
    Plus,
    Trash2,
    Building2,
    Share2,
    Megaphone,
    FileText,
    LayoutTemplate,
    Check,
    X,
    Layers,
    Sun,
    Moon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Palette,
    BookmarkPlus,
    Save,
    Columns,
    Rows,
} from 'lucide-react';

export const LOOPS_LOGO_PALETTE = [
    { name: 'Loops Electric Blue', hex: '#0057c5', bg: '#e6f0fd' },
    { name: 'Loops Purple', hex: '#8035d1', bg: '#f3eafd' },
    { name: 'Loops Magenta', hex: '#ff0878', bg: '#ffe6f0' },
    { name: 'Loops Teal', hex: '#2fd0ca', bg: '#e2faf8' },
];

const defaultFields = {
    templateWidth: '760',
    preheader: 'Discover our latest updates, products, news and special offers.',
    headerLayout: 'side-by-side',
    logoAlign: 'left',
    heroAlign: 'left',
    brandName: 'Loops Integrated',
    brandLogoUrl: '/images/loops-logo-white.png',
    brandLogoDarkUrl: '/images/loops-logo-white.png',
    logoHeight: '64',
    brandColor: '#0057c5',
    edition: 'October Edition',
    headerTitle: "What's New This Month?",
    headerSubtitle: 'Discover our latest updates, products, news and special offers.',
    headerButtonText: 'Explore More',
    headerButtonUrl: 'https://example.com',
    headerButtonColor: '#ff0878',
    headerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720&fit=crop&q=80',
    introGreeting: 'Hello {{first_name}},',
    introText: "Here are the latest updates, highlights and news from our team. It's been a busy month — we hope you enjoy what we've been working on.",
    showFeatured: true,
    featuredLayout: 'columns',
    featuredCardHeight: '560',
    featuredItems: [
        {
            badge: 'Featured',
            title: 'Discover What\'s New',
            text: 'Explore our latest products, services and updates — designed with feedback from customers like you.',
            linkText: 'Read More →',
            linkUrl: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=750&fit=crop&q=80',
        },
    ],
    featuredBadge: 'Featured',
    featuredTitle: 'Discover What\'s New',
    featuredText: 'Explore our latest products, services and updates — designed with feedback from customers like you.',
    featuredLinkText: 'Read More →',
    featuredLinkUrl: 'https://example.com',
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=750&fit=crop&q=80',
    showCta: true,
    ctaStyle: 'clean',
    ctaTitle: 'See Our Latest Work',
    ctaSubtitle: "From award-winning campaigns to new productions, take a look at what we've been creating recently.",
    ctaButtonText: 'VISIT OUR WEBSITE',
    ctaButtonUrl: 'https://example.com',
    ctaButtonColor: '#0b0f19',
    showCtaSecondaryButton: false,
    ctaSecondaryButtonText: '',
    ctaSecondaryButtonUrl: '',
    showCeoNote: false,
    companyName: 'Loops Integrated',
    companyAddress: '',
    companyContact: '',
    facebookUrl: 'https://facebook.com',
    linkedinUrl: 'https://linkedin.com',
    instagramUrl: 'https://instagram.com',
    tiktokUrl: 'https://tiktok.com',
    youtubeUrl: 'https://youtube.com',
};

const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};

const cleanUrl = (url) => (url ? String(url).replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/') : '');

const getFeaturedItems = (f) => {
    if (Array.isArray(f?.featuredItems) && f.featuredItems.length > 0) {
        return f.featuredItems;
    }
    if (f?.featuredTitle || f?.featuredText || f?.featuredImage) {
        return [
            {
                badge: f.featuredBadge || 'Featured',
                title: f.featuredTitle || "Discover What's New",
                text: f.featuredText || '',
                linkText: f.featuredLinkText || 'Read More →',
                linkUrl: f.featuredLinkUrl || 'https://example.com',
                image: f.featuredImage || '',
            },
        ];
    }
    return [
        {
            badge: 'Featured',
            title: "Discover What's New",
            text: 'Explore our latest products, services and updates — designed with feedback from customers like you.',
            linkText: 'Read More →',
            linkUrl: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=750&fit=crop&q=80',
        },
    ];
};

const compileHtml = (f) => {
    const maxWidth = parseInt(f.templateWidth) || 760;
    const brandColor = f.brandColor || '#0057c5';
    const align = f.logoAlign || 'left';
    const margin = align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0';
    const logoHeight = parseInt(f.logoHeight) || 64;
    const logoMaxWidth = Math.max(Math.round(logoHeight * 5), 280);

    const headerLayout = f.headerLayout || 'side-by-side';
    const isSideBySide = headerLayout === 'side-by-side';
    const heroAlign = f.heroAlign || 'left';
    const heroBtnMargin = heroAlign === 'center' ? '24px auto 0 auto' : heroAlign === 'right' ? '24px 0 0 auto' : '24px 0 0 0';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>${escapeHtml(f.headerTitle || "What's New This Month?")} | ${escapeHtml(f.brandName || 'Loops Integrated')}</title>
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

        /* Featured 2-Column Equal Fixed Size */
        .featured-grid-table { width: 100% !important; height: 100% !important; border-collapse: separate !important; }
        .featured-grid-row { height: 100% !important; }
        .featured-grid-row > .col-left,
        .featured-grid-row > .col-right {
            height: 100% !important;
            vertical-align: top !important;
        }
        .featured-card {
            width: 100% !important;
            height: 100% !important;
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
            height: 210px !important;
            max-height: 210px !important;
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

        @media only screen and (max-width: 620px) {
            .container-table { width: 100% !important; max-width: 100% !important; }
            .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
            .mobile-stack { display: block !important; width: 100% !important; max-width: 100% !important; }
            .mobile-stack-right { padding-top: 16px !important; padding-left: 0 !important; text-align: left !important; }
            .mobile-img { width: 100% !important; height: auto !important; min-height: auto !important; }
            .mobile-headline { font-size: 30px !important; line-height: 1.25 !important; }
            .mobile-cta-box { padding: 36px 16px !important; }
            .mobile-cta-cell { display: inline-block !important; padding: 4px !important; }
            .card-spacer { display: none !important; }
            .card-item { margin-bottom: 16px !important; }
            .col-left, .col-right { padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 20px !important; width: 100% !important; height: auto !important; display: block !important; }
            .featured-grid-table, .featured-grid-row { height: auto !important; }
            .featured-card { height: auto !important; min-height: 0 !important; }
            .featured-col-img { width: 100% !important; height: 210px !important; object-fit: cover !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #eef0f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #151a29; line-height: 1.6; -webkit-font-smoothing: antialiased;">

    <!-- Hidden Preheader Preview Text -->
    ${f.preheader ? `
    <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        ${escapeHtml(f.preheader)} &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>` : ''}

    <!-- Outer Wrapper -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #eef0f6; padding: 36px 12px;">
        <tr>
            <td align="center">
                <!-- Inner Container Card -->
                <table role="presentation" class="container-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: ${maxWidth}px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px -15px rgba(43, 42, 142, 0.08); border: 1px solid #e2e4ea;">
                    
                    <!-- Header / Company Logo (Black Header Bar) -->
                    <tr>
                        <td align="${isSideBySide ? 'left' : align}" style="background-color: #0b0f19; padding: 28px 36px; text-align: ${isSideBySide ? 'left' : align}; border-radius: 15px 15px 0 0;" class="mobile-padding" data-header-layout="${headerLayout}">
                            ${isSideBySide ? `
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <!-- Left: Logo -->
                                    <td class="mobile-stack" width="38%" valign="middle" align="left" style="vertical-align: middle; text-align: left; padding-right: 16px;">
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" style="margin: 0;">
                                            <tr>
                                                <td align="left" valign="middle">
                                                    <a href="{{app_url}}" target="_blank" style="text-decoration: none; display: inline-block;">
                                                        ${(f.brandLogoDarkUrl || f.brandLogoUrl) ? `
                                                        <img src="${escapeHtml(cleanUrl(f.brandLogoDarkUrl || f.brandLogoUrl))}" alt="${escapeHtml(f.brandName || 'Loops Integrated')}" height="${logoHeight}" style="height: ${logoHeight}px; max-height: ${logoHeight}px; width: auto; max-width: ${Math.min(logoMaxWidth, 240)}px; display: block; margin: 0; border: 0;" />
                                                        ` : `
                                                        <span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                                                            ${escapeHtml(f.brandName || 'Loops Integrated')}
                                                        </span>
                                                        `}
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <!-- Right: Edition & Heading & Subtitle -->
                                    <td class="mobile-stack mobile-stack-right" width="62%" valign="middle" align="right" style="vertical-align: middle; text-align: right; padding-left: 16px;">
                                        ${f.edition ? `
                                        <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #2fd0ca; text-transform: uppercase; letter-spacing: 2px;">
                                            ${escapeHtml(f.edition)}
                                        </p>` : ''}
                                        ${f.headerTitle ? `
                                        <h1 class="mobile-headline" style="margin: 6px 0 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 700; color: #ffffff; line-height: 1.25; letter-spacing: -0.3px;">
                                            ${escapeHtml(f.headerTitle)}
                                        </h1>` : ''}
                                        ${f.headerSubtitle ? `
                                        <p style="margin: 6px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; color: #cbd5e1; line-height: 1.5;">
                                            ${escapeHtml(f.headerSubtitle)}
                                        </p>` : ''}
                                        ${f.headerButtonText ? `
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="right" style="margin: 12px 0 0 auto;">
                                            <tr>
                                                <td align="center" style="border-radius: 9999px; background-color: ${escapeHtml(f.headerButtonColor || '#ff0878')};">
                                                    <a href="${escapeHtml(cleanUrl(f.headerButtonUrl || '#'))}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12.5px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 9px 22px; border-radius: 9999px; display: inline-block; border: 1px solid ${escapeHtml(f.headerButtonColor || '#ff0878')}; box-shadow: 0 4px 12px rgba(255, 8, 120, 0.25);">
                                                        ${escapeHtml(f.headerButtonText)}
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>` : ''}
                                    </td>
                                </tr>
                            </table>` : `
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="${align}" style="margin: ${margin};">
                                <tr>
                                    <td align="${align}" valign="middle">
                                        <a href="{{app_url}}" target="_blank" style="text-decoration: none; display: inline-block;">
                                            ${(f.brandLogoDarkUrl || f.brandLogoUrl) ? `
                                            <img src="${escapeHtml(cleanUrl(f.brandLogoDarkUrl || f.brandLogoUrl))}" alt="${escapeHtml(f.brandName || 'Loops Integrated')}" height="${logoHeight}" style="height: ${logoHeight}px; max-height: ${logoHeight}px; width: auto; max-width: ${logoMaxWidth}px; display: block; margin: ${margin}; border: 0;" />
                                            ` : `
                                            <span style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                                                ${escapeHtml(f.brandName || 'Loops Integrated')}
                                            </span>
                                            `}
                                        </a>
                                    </td>
                                </tr>
                            </table>`}
                        </td>
                    </tr>

                    <!-- Hero Section (banner image for side-by-side, or full hero when stacked) -->
                    ${isSideBySide ? (f.headerImage ? `
                    <tr>
                        <td style="padding: 24px 36px 12px 36px;" class="mobile-padding">
                            <img class="mobile-img" src="${escapeHtml(cleanUrl(f.headerImage))}" alt="Hero Banner" width="${maxWidth - 72}" style="width: 100%; max-width: ${maxWidth - 72}px; height: auto; display: block; border-radius: 14px; border: 0;" />
                        </td>
                    </tr>` : '') : `
                    <tr>
                        <td align="${heroAlign}" style="padding: 36px 36px 32px 36px; text-align: ${heroAlign};" class="mobile-padding">
                            ${f.edition ? `
                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: ${brandColor}; text-transform: uppercase; letter-spacing: 2.2px; text-align: ${heroAlign};">
                                ${escapeHtml(f.edition)}
                            </p>` : ''}
                            ${f.headerTitle ? `
                            <h1 class="mobile-headline" style="margin: 12px 0 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 40px; font-weight: 700; color: #151a29; line-height: 1.2; letter-spacing: -0.5px; text-align: ${heroAlign};">
                                ${escapeHtml(f.headerTitle)}
                            </h1>` : ''}
                            ${f.headerSubtitle ? `
                            <p style="margin: ${heroAlign === 'center' ? '14px auto 0 auto' : '14px 0 0 0'}; max-width: ${heroAlign === 'center' ? '480px' : '580px'}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; color: #636978; line-height: 1.6; text-align: ${heroAlign};">
                                ${escapeHtml(f.headerSubtitle)}
                            </p>` : ''}
                            
                            ${f.headerButtonText ? `
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="${heroAlign}" style="margin: ${heroBtnMargin};">
                                <tr>
                                    <td align="center" style="border-radius: 9999px; background-color: ${escapeHtml(f.headerButtonColor || '#ff0878')};">
                                        <a href="${escapeHtml(cleanUrl(f.headerButtonUrl || '#'))}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 13px 32px; border-radius: 9999px; display: inline-block; border: 1px solid ${escapeHtml(f.headerButtonColor || '#ff0878')}; box-shadow: 0 4px 12px rgba(255, 8, 120, 0.25);">
                                            ${escapeHtml(f.headerButtonText)}
                                        </a>
                                    </td>
                                </tr>
                            </table>` : ''}

                            ${f.headerImage ? `
                            <div style="margin-top: 32px;">
                                <img class="mobile-img" src="${escapeHtml(cleanUrl(f.headerImage))}" alt="Hero Banner" width="${maxWidth - 72}" style="width: 100%; max-width: ${maxWidth - 72}px; height: auto; display: block; border-radius: 16px; border: 0;" />
                            </div>` : ''}
                        </td>
                    </tr>`}

                    <!-- Intro Section -->
                    ${(f.introGreeting || f.introText) ? `
                    <tr>
                        <td style="padding: 24px 36px 28px 36px;" class="mobile-padding">
                            ${f.introGreeting ? `<p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #151a29;">${escapeHtml(f.introGreeting)}</p>` : ''}
                            ${f.introText ? `<p style="margin: 8px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; color: #636978; line-height: 1.65;">${escapeHtml(f.introText)}</p>` : ''}
                        </td>
                    </tr>` : ''}

                    <!-- Featured Section -->
                    ${(f.showFeatured !== false && getFeaturedItems(f).length > 0) ? `
                    <tr>
                        <td style="background-color: #f5f7fb; padding: 32px 36px;" class="mobile-padding" data-featured-layout="${(f.featuredLayout || 'columns') !== 'rows' ? 'columns' : 'rows'}" data-featured-card-height="${f.featuredCardHeight || '560'}">
                            ${(() => {
                                const items = getFeaturedItems(f);
                                const isColumns = (f.featuredLayout || 'columns') !== 'rows';

                                const renderBadge = (item, idx) => {
                                    if (!item.badge) return '';
                                    const badgeColors = [
                                        { color: brandColor, bg: '#e6f0fd' },
                                        { color: '#ff0878', bg: '#ffe6f0' },
                                        { color: '#8035d1', bg: '#f3eafd' },
                                        { color: '#09908a', bg: '#e2faf8' },
                                    ];
                                    const bStyle = badgeColors[idx % badgeColors.length];
                                    return `
                                    <span style="display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: ${bStyle.color}; background-color: ${bStyle.bg}; padding: 4px 12px; border-radius: 9999px;">
                                        ${escapeHtml(item.badge)}
                                    </span>`;
                                };

                                const renderColumnCard = (item, idx) => {
                                    const cardHeightValNum = (f.featuredCardHeight && f.featuredCardHeight !== 'auto')
                                        ? parseInt(f.featuredCardHeight, 10)
                                        : 560;
                                    const cardHeightStyle = `min-height: ${cardHeightValNum}px;`;

                                    return `
                            <table class="featured-card" data-featured-card="true" role="presentation" width="100%" height="${cardHeightValNum}" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e4ea; border-collapse: separate; height: 100%; ${cardHeightStyle} box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                                <tbody>
                                    ${item.image ? `
                                    <tr class="featured-card-img-tr" height="210">
                                        <td class="featured-card-img-td" height="210" style="padding: 0; margin: 0; line-height: 0; font-size: 0; background-color: #f1f3f7; height: 210px;" align="center">
                                            <img class="mobile-img featured-col-img" src="${escapeHtml(cleanUrl(item.image))}" alt="${escapeHtml(item.title || 'Featured Image')}" width="${Math.floor((maxWidth - 72 - 24) / 2)}" height="210" style="width: 100%; max-width: 100%; height: 210px; max-height: 210px; object-fit: cover; display: block; border: 0;" />
                                        </td>
                                    </tr>` : ''}
                                    <tr class="featured-card-body-tr">
                                        <td valign="top" style="padding: 24px 22px 14px 22px; vertical-align: top;" class="mobile-padding featured-card-body-td">
                                            <div class="featured-card-content">
                                                ${renderBadge(item, idx)}
                                                ${item.title ? `
                                                <h2 style="margin: 12px 0 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: 700; color: #151a29; line-height: 1.35;">
                                                    ${escapeHtml(item.title)}
                                                </h2>` : ''}
                                                ${item.text ? `
                                                <p style="margin: 10px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; color: #636978; line-height: 1.6;">
                                                    ${escapeHtml(item.text)}
                                                </p>` : ''}
                                            </div>
                                        </td>
                                    </tr>
                                    ${item.linkText ? `
                                    <tr class="featured-card-action-tr" height="42">
                                        <td valign="bottom" height="42" style="padding: 0 22px 26px 22px; vertical-align: bottom; height: 42px;" class="featured-card-action-td">
                                            <div class="featured-card-action">
                                                <a href="${escapeHtml(cleanUrl(item.linkUrl || '#'))}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: ${brandColor}; text-decoration: none; display: inline-block;">
                                                    ${escapeHtml(item.linkText)}
                                                </a>
                                            </div>
                                        </td>
                                    </tr>` : `
                                    <tr height="20">
                                        <td height="20" style="height: 20px; padding: 0;">&nbsp;</td>
                                    </tr>`}
                                </tbody>
                            </table>`;
                                };

                                const renderRowCard = (item, idx) => {
                                    return `
                            <table class="featured-card" data-featured-card="true" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e4ea; ${idx > 0 ? 'margin-top: 24px;' : ''}">
                                <tr>
                                    ${item.image ? `
                                    <td class="mobile-stack" width="50%" valign="top" style="padding: 0;">
                                        <img class="mobile-img" src="${escapeHtml(cleanUrl(item.image))}" alt="${escapeHtml(item.title || 'Featured Image')}" width="${Math.floor((maxWidth - 72) / 2)}" style="width: 100%; height: 100%; min-height: 250px; object-fit: cover; display: block; border: 0;" />
                                    </td>` : ''}
                                    <td class="mobile-stack" width="${item.image ? '50%' : '100%'}" valign="middle" style="padding: 30px 26px;" class="mobile-padding">
                                        ${renderBadge(item, idx)}
                                        ${item.title ? `
                                        <h2 style="margin: 12px 0 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 700; color: #151a29; line-height: 1.3;">
                                            ${escapeHtml(item.title)}
                                        </h2>` : ''}
                                        ${item.text ? `
                                        <p style="margin: 10px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; color: #636978; line-height: 1.6;">
                                            ${escapeHtml(item.text)}
                                        </p>` : ''}
                                        ${item.linkText ? `
                                        <div style="margin-top: 18px;">
                                            <a href="${escapeHtml(cleanUrl(item.linkUrl || '#'))}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: ${brandColor}; text-decoration: none;">
                                                ${escapeHtml(item.linkText)}
                                            </a>
                                        </div>` : ''}
                                    </td>
                                </tr>
                            </table>`;
                                };

                                if (!isColumns) {
                                    return items.map((item, idx) => renderRowCard(item, idx)).join('');
                                }

                                // 2-Column Grid Layout
                                const pairs = [];
                                for (let i = 0; i < items.length; i += 2) {
                                    pairs.push(items.slice(i, i + 2));
                                }

                                return pairs.map((pair, pIdx) => {
                                    if (pair.length === 2) {
                                        return `
                            <table class="featured-grid-table" role="presentation" width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style="${pIdx > 0 ? 'margin-top: 24px;' : ''} height: 100%;">
                                <tr class="featured-grid-row" style="height: 100%;">
                                    <td class="mobile-stack col-left" width="50%" height="100%" valign="top" style="width: 50%; height: 100%; padding-right: 12px; padding-bottom: 0; vertical-align: top;">
                                        ${renderColumnCard(pair[0], pIdx * 2)}
                                    </td>
                                    <td class="mobile-stack col-right" width="50%" height="100%" valign="top" style="width: 50%; height: 100%; padding-left: 12px; padding-bottom: 0; vertical-align: top;">
                                        ${renderColumnCard(pair[1], pIdx * 2 + 1)}
                                    </td>
                                </tr>
                            </table>`;
                                    } else {
                                        return `
                            <table class="featured-grid-table" role="presentation" width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style="${pIdx > 0 ? 'margin-top: 24px;' : ''} height: 100%;">
                                <tr class="featured-grid-row" style="height: 100%;">
                                    <td class="mobile-stack col-left" width="${items.length === 1 ? '100%' : '50%'}" height="100%" valign="top" style="${items.length === 1 ? 'width: 100%;' : 'width: 50%; padding-right: 12px;'} height: 100%; vertical-align: top;">
                                        ${renderColumnCard(pair[0], pIdx * 2)}
                                    </td>
                                    ${items.length > 1 ? `
                                    <td class="mobile-stack col-right" width="50%" height="100%" valign="top" style="width: 50%; height: 100%; padding-left: 12px; vertical-align: top;">
                                    </td>` : ''}
                                </tr>
                            </table>`;
                                    }
                                }).join('');
                            })()}
                        </td>
                    </tr>` : ''}

                    <!-- Call To Action Section -->
                    ${(f.showCta !== false && (f.ctaTitle || f.ctaSubtitle || f.ctaButtonText || (f.showCtaSecondaryButton && f.ctaSecondaryButtonText))) ? (
                        (f.ctaStyle === 'gradient') ? `
                    <tr>
                        <td style="padding: 20px 36px 32px 36px;" class="mobile-padding">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0057c5 0%, #8035d1 50%, #ff0878 100%); background-color: #0057c5; border-radius: 16px; text-align: center;">
                                <tr>
                                    <td style="padding: 48px 32px;" class="mobile-cta-box">
                                        ${f.ctaTitle ? `<h3 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">${escapeHtml(f.ctaTitle)}</h3>` : ''}
                                        ${f.ctaSubtitle ? `<p style="margin: 12px auto 0 auto; max-width: 380px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; color: #ffffff; opacity: 0.88; line-height: 1.5;">${escapeHtml(f.ctaSubtitle)}</p>` : ''}
                                        ${(f.ctaButtonText || (f.showCtaSecondaryButton && f.ctaSecondaryButtonText)) ? `
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 22px auto 0 auto;">
                                            <tr>
                                                ${f.ctaButtonText ? `
                                                <td class="mobile-cta-cell" align="center" style="padding: 4px 6px;">
                                                    <a href="${escapeHtml(cleanUrl(f.ctaButtonUrl || '#'))}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: #0057c5; text-decoration: none; padding: 11px 24px; border-radius: 9999px; display: inline-block; background-color: #ffffff; border: 1.5px solid #ffffff; white-space: nowrap; line-height: 1.2; box-shadow: 0 4px 12px rgba(0,0,0,0.12);">
                                                        ${escapeHtml(f.ctaButtonText)}
                                                    </a>
                                                </td>` : ''}
                                                ${(f.showCtaSecondaryButton && f.ctaSecondaryButtonText) ? `
                                                <td class="mobile-cta-cell" align="center" style="padding: 4px 6px;">
                                                    <a href="${escapeHtml(cleanUrl(f.ctaSecondaryButtonUrl || '#'))}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 11px 24px; border-radius: 9999px; display: inline-block; border: 1.5px solid rgba(255,255,255,0.85); background-color: rgba(255,255,255,0.15); white-space: nowrap; line-height: 1.2;">
                                                        ${escapeHtml(f.ctaSecondaryButtonText)}
                                                    </a>
                                                </td>` : ''}
                                            </tr>
                                        </table>` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>` : `
                    <tr>
                        <td style="padding: 28px 36px 36px 36px;" class="mobile-padding" data-cta-style="clean">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" style="text-align: left;">
                                        ${f.ctaTitle ? `<h3 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 800; color: #151a29; letter-spacing: -0.4px; line-height: 1.3;">${escapeHtml(f.ctaTitle)}</h3>` : ''}
                                        ${f.ctaSubtitle ? `<p style="margin: 10px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; color: #636978; line-height: 1.6; max-width: 600px;">${escapeHtml(f.ctaSubtitle)}</p>` : ''}
                                        ${(f.ctaButtonText || (f.showCtaSecondaryButton && f.ctaSecondaryButtonText)) ? `
                                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" style="margin: 20px 0 0 0;">
                                            <tr>
                                                ${f.ctaButtonText ? `
                                                <td align="center" style="border-radius: 8px; background-color: ${f.ctaButtonColor || '#0b0f19'};">
                                                    <a href="${escapeHtml(cleanUrl(f.ctaButtonUrl || '#'))}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 800; color: #ffffff; text-decoration: none; padding: 13px 26px; border-radius: 8px; display: inline-block; background-color: ${f.ctaButtonColor || '#0b0f19'}; text-transform: uppercase; letter-spacing: 0.8px; line-height: 1.2;">
                                                        ${escapeHtml(f.ctaButtonText)}
                                                    </a>
                                                </td>` : ''}
                                                ${(f.showCtaSecondaryButton && f.ctaSecondaryButtonText) ? `
                                                <td align="center" style="border-radius: 8px; padding-left: 12px;">
                                                    <a href="${escapeHtml(cleanUrl(f.ctaSecondaryButtonUrl || '#'))}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; color: #151a29; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; text-transform: uppercase; letter-spacing: 0.8px; line-height: 1.2;">
                                                        ${escapeHtml(f.ctaSecondaryButtonText)}
                                                    </a>
                                                </td>` : ''}
                                            </tr>
                                        </table>` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`
                    ) : ''}


                    <!-- Footer Section -->
                    <tr>
                        <td style="background-color: #f5f7fb; border-top: 1px solid #e2e4ea; padding: 36px 32px 32px 32px; text-align: center;" class="mobile-padding">
                            <!-- Footer Logo -->
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto 16px auto;">
                                <tr>
                                    <td align="center" valign="middle">
                                        <a href="{{app_url}}" target="_blank" style="text-decoration: none; display: inline-block;">
                                            <img src="/images/loops-logo-dark.png" alt="${escapeHtml(f.companyName || f.brandName || 'Loops Integrated')}" height="32" style="height: 32px; max-height: 32px; width: auto; max-width: 160px; display: block; margin: 0 auto; border: 0;" />
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; color: #151a29;">
                                ${escapeHtml(f.companyName || f.brandName || 'Loops Integrated')}
                            </p>
                            ${f.companyAddress ? `<p style="margin: 4px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #636978;">${escapeHtml(f.companyAddress)}</p>` : ''}
                            ${f.companyContact ? `<p style="margin: 4px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #636978;">${escapeHtml(f.companyContact)}</p>` : ''}

                            <!-- Social Links -->
                            <div style="margin: 18px 0 16px 0;">
                                ${f.facebookUrl ? `<a href="${escapeHtml(cleanUrl(f.facebookUrl))}" target="_blank" class="social-icon-btn" title="Facebook" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/facebook.png" width="16" height="16" alt="Facebook" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>` : ''}
                                ${f.linkedinUrl ? `<a href="${escapeHtml(cleanUrl(f.linkedinUrl))}" target="_blank" class="social-icon-btn" title="LinkedIn" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/linkedin.png" width="16" height="16" alt="LinkedIn" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>` : ''}
                                ${f.instagramUrl ? `<a href="${escapeHtml(cleanUrl(f.instagramUrl))}" target="_blank" class="social-icon-btn" title="Instagram" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/instagram.png" width="16" height="16" alt="Instagram" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>` : ''}
                                ${f.tiktokUrl ? `<a href="${escapeHtml(cleanUrl(f.tiktokUrl))}" target="_blank" class="social-icon-btn" title="TikTok" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/tiktok.png" width="16" height="16" alt="TikTok" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>` : ''}
                                ${f.youtubeUrl ? `<a href="${escapeHtml(cleanUrl(f.youtubeUrl))}" target="_blank" class="social-icon-btn" title="YouTube" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; vertical-align: middle; border-radius: 50%; background-color: #ffffff; border: 1px solid #e2e4ea; margin: 0 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/youtube.png" width="16" height="16" alt="YouTube" style="width: 16px; height: 16px; vertical-align: middle; display: inline-block; border: 0; margin-top: -2px;" /></a>` : ''}
                            </div>


                            <hr style="border: 0; border-top: 1px solid #e2e4ea; margin: 16px 0;" />

                            <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #8e95a5; line-height: 1.5;">
                                You're receiving this email because you subscribed to our newsletter.
                            </p>
                            <p style="margin: 6px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px;">
                                <a href="{{unsubscribe_url}}" style="color: ${brandColor}; text-decoration: underline; font-weight: 600;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;
};

const extractFieldsFromHtml = (htmlStr) => {
    if (!htmlStr || typeof htmlStr !== 'string') return null;
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlStr, 'text/html');

        const cleanExtract = (url) => (url ? String(url).replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/') : '');

        // Preheader
        const preheaderDiv = doc.querySelector('div[style*="display: none"]');
        const preheader = preheaderDiv ? preheaderDiv.textContent.replace(/&zwnj;|\s+/g, ' ').trim() : '';

        // Company Logo & Brand Name & Alignment
        let brandLogoUrl = '';
        let brandLogoDarkUrl = '';
        let brandName = '';
        let logoHeight = '64';
        const headerLogoImg = doc.querySelector('tr:first-child img, td[style*="background-color: #0b0f19"] img, td[style*="background-color:#0b0f19"] img, img.light-logo, img.dark-logo');
        if (headerLogoImg) {
            brandLogoUrl = cleanExtract(headerLogoImg.getAttribute('src') || '');
            brandLogoDarkUrl = brandLogoUrl;
            brandName = headerLogoImg.getAttribute('alt') || '';
            const hAttr = headerLogoImg.getAttribute('height');
            const hStyle = headerLogoImg.getAttribute('style')?.match(/(?:max-)?height:\s*(\d+)px/i);
            if (hAttr && parseInt(hAttr) >= 30) {
                logoHeight = hAttr;
            } else if (hStyle && parseInt(hStyle[1]) >= 30) {
                logoHeight = hStyle[1];
            }
        }
        if (!brandName) {
            const brandTd = doc.querySelector('table table td[style*="font-weight: 800"], table table td[style*="letter-spacing: -0.5px"], table table td[style*="letter-spacing: -0.4px"]');
            if (brandTd) {
                brandName = brandTd.textContent.trim();
            }
        }
        const headerLogoTd = doc.querySelector('tr:first-child td.mobile-padding');
        const logoAlign = headerLogoTd?.getAttribute('align') || (headerLogoTd?.style?.textAlign) || 'left';

        // Edition
        const editionP = doc.querySelector('p[style*="letter-spacing: 2"], p[style*="letter-spacing: 2.2px"], p[style*="uppercase"]');
        const edition = editionP ? editionP.textContent.trim() : '';

        // Hero Title (H1)
        const h1 = doc.querySelector('h1');
        const headerTitle = h1 ? h1.textContent.trim() : '';

        // Hero Subtitle
        let headerSubtitle = '';
        if (h1) {
            let next = h1.nextElementSibling;
            while (next && next.tagName !== 'P') next = next.nextElementSibling;
            if (next) headerSubtitle = next.textContent.trim();
        }

        const heroTd = h1?.closest('td');
        const heroAlign = heroTd?.getAttribute('align') || (heroTd?.style?.textAlign) || 'left';

        // Hero Button
        const heroBtn = doc.querySelector('table[style*="margin: 24px auto"] a, a[style*="Explore More"], td[align="center"] table a');
        const headerButtonText = heroBtn ? heroBtn.textContent.trim() : '';
        const headerButtonUrl = heroBtn ? heroBtn.getAttribute('href') || '' : '';
        let headerButtonColor = '#ff0878';
        if (heroBtn) {
            const btnColorMatch = heroBtn.parentElement?.getAttribute('style')?.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/i) ||
                                  heroBtn.getAttribute('style')?.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/i);
            if (btnColorMatch && btnColorMatch[1]) headerButtonColor = btnColorMatch[1];
        }

        // Hero Image
        const heroImg = doc.querySelector('img[alt*="workspace"], img[alt*="Banner"], img.mobile-img, table tr:nth-child(2) img');
        const headerImage = cleanExtract(heroImg ? heroImg.getAttribute('src') || '' : '');

        // Intro Greeting & Text
        const introGreetingP = doc.querySelector('p[style*="font-size: 18px"], p[style*="font-weight: 700"]');
        let introGreeting = '';
        let introText = '';
        if (introGreetingP && (introGreetingP.textContent.includes('Hello') || introGreetingP.textContent.includes('Welcome'))) {
            introGreeting = introGreetingP.textContent.trim();
            const introTextP = introGreetingP.nextElementSibling;
            if (introTextP && introTextP.tagName === 'P') {
                introText = introTextP.textContent.trim();
            }
        }

        // Featured Section
        let featuredTables = Array.from(doc.querySelectorAll('table.featured-card, table[data-featured-card="true"]'));
        if (featuredTables.length === 0) {
            featuredTables = Array.from(doc.querySelectorAll('td[style*="#f5f7fb"] table, td[style*="rgb(245, 247, 251)"] table'))
                .filter((tbl) => tbl.querySelector('h2') && !tbl.querySelector('table'));
        }
        if (featuredTables.length === 0) {
            featuredTables = Array.from(doc.querySelectorAll('table')).filter((tbl) => tbl.querySelector('h2') && !tbl.querySelector('table'));
        }

        const layoutAttr = doc.querySelector('[data-featured-layout]')?.getAttribute('data-featured-layout');
        const hasColClasses = doc.querySelector('td.col-left, td.col-right') !== null;
        let detectedFeaturedLayout = 'columns';
        if (layoutAttr === 'rows' || (layoutAttr !== 'columns' && !hasColClasses && featuredTables.length > 1 && !doc.querySelector('table.featured-card'))) {
            detectedFeaturedLayout = 'rows';
        }

        const heightAttr = doc.querySelector('[data-featured-card-height]')?.getAttribute('data-featured-card-height');
        let detectedFeaturedCardHeight = heightAttr || '560';
        if (!heightAttr) {
            const cardWithMinHeight = doc.querySelector('table.featured-card[style*="min-height"]');
            if (cardWithMinHeight) {
                const matchH = cardWithMinHeight.getAttribute('style')?.match(/min-height:\s*(\d+)px/i);
                if (matchH && matchH[1]) detectedFeaturedCardHeight = matchH[1];
            }
        }

        let featuredItems = [];
        if (featuredTables.length > 0) {
            featuredItems = featuredTables.map((tbl, i) => {
                const featBadgeSpan = tbl.querySelector('span[style*="letter-spacing"], span[style*="border-radius"]');
                const badge = featBadgeSpan ? featBadgeSpan.textContent.trim() : (i === 0 ? 'Featured' : 'Spotlight');

                const h2 = tbl.querySelector('h2');
                const title = h2 ? h2.textContent.trim() : '';

                let text = '';
                if (h2) {
                    let next = h2.nextElementSibling;
                    while (next && next.tagName !== 'P') next = next.nextElementSibling;
                    if (next) text = next.textContent.trim();
                }

                const featLink = tbl.querySelector('a');
                const linkText = featLink ? featLink.textContent.trim() : 'Read More →';
                const linkUrl = featLink ? cleanExtract(featLink.getAttribute('href') || '') : '';

                const featImg = tbl.querySelector('img');
                const image = cleanExtract(featImg ? featImg.getAttribute('src') || '' : '');

                return { badge, title, text, linkText, linkUrl, image };
            });
        } else {
            const featBadgeSpan = doc.querySelector('span[style*="letter-spacing: 1.5px"], span[style*="border-radius: 9999px"]');
            const featuredBadge = featBadgeSpan ? featBadgeSpan.textContent.trim() : 'Featured';

            const h2 = doc.querySelector('h2');
            const featuredTitle = h2 ? h2.textContent.trim() : '';

            let featuredText = '';
            if (h2) {
                let next = h2.nextElementSibling;
                while (next && next.tagName !== 'P') next = next.nextElementSibling;
                if (next) featuredText = next.textContent.trim();
            }

            const featLink = doc.querySelector('a[style*="color: #0057c5"], a[style*="color: #4252cd"], a[style*="Read More"], h2 ~ div a');
            const featuredLinkText = featLink ? featLink.textContent.trim() : '';
            const featuredLinkUrl = featLink ? featLink.getAttribute('href') || '' : '';

            const featImg = doc.querySelector('img[alt*="prototypes"], img[alt*="Featured"], td[width="50%"] img');
            const featuredImage = cleanExtract(featImg ? featImg.getAttribute('src') || '' : '');

            if (featuredTitle || featuredText || featuredImage) {
                featuredItems = [{
                    badge: featuredBadge,
                    title: featuredTitle,
                    text: featuredText,
                    linkText: featuredLinkText,
                    linkUrl: featuredLinkUrl,
                    image: featuredImage,
                }];
            }
        }

        const showFeatured = featuredItems.length > 0;

        // Highlight Cards
        const cardTds = Array.from(doc.querySelectorAll('td.card-item, td[style*="border-radius: 14px"], td[style*="border-radius: 12px"]'));
        let cards = [];
        if (cardTds.length > 0) {
            cards = cardTds.map((td) => {
                const iconDiv = td.querySelector('div[style*="font-size: 24px"], div[style*="font-size: 22px"], div');
                const catP = td.querySelector('p[style*="uppercase"]');
                const titleH4 = td.querySelector('h4');
                const textP = titleH4 ? titleH4.nextElementSibling : null;
                return {
                    icon: iconDiv ? iconDiv.textContent.trim() : '✨',
                    cat: catP ? catP.textContent.trim() : '',
                    title: titleH4 ? titleH4.textContent.trim() : '',
                    text: textP && textP.tagName === 'P' ? textP.textContent.trim() : '',
                };
            });
        }

        // CTA Section (Clean vs Gradient)
        const gradientCtaTable = doc.querySelector('table[style*="linear-gradient"], td.mobile-cta-box');
        let ctaStyle = 'clean';
        let h3 = null;
        let ctaBtns = [];

        if (gradientCtaTable) {
            ctaStyle = 'gradient';
            h3 = doc.querySelector('td.mobile-cta-box h3, table[style*="linear-gradient"] h3');
            ctaBtns = Array.from(doc.querySelectorAll('td.mobile-cta-box a, table[style*="linear-gradient"] a'));
        } else {
            const cleanCtaTd = doc.querySelector('[data-cta-style="clean"]') ||
                               Array.from(doc.querySelectorAll('td.mobile-padding')).find((td) => td.querySelector('h3') && !td.querySelector('table[style*="linear-gradient"]'));
            h3 = cleanCtaTd ? cleanCtaTd.querySelector('h3') : doc.querySelector('h3');
            if (cleanCtaTd) {
                ctaBtns = Array.from(cleanCtaTd.querySelectorAll('a'));
            } else if (h3) {
                const parentTd = h3.closest('td');
                ctaBtns = parentTd ? Array.from(parentTd.querySelectorAll('a')) : [];
            }
        }

        const ctaTitle = h3 ? h3.textContent.trim() : '';
        let ctaSubtitle = '';
        if (h3) {
            let next = h3.nextElementSibling;
            while (next && next.tagName !== 'P') next = next.nextElementSibling;
            if (next) ctaSubtitle = next.textContent.trim();
        }
        const ctaBtn1 = ctaBtns[0];
        const ctaBtn2 = ctaBtns[1];
        const ctaButtonText = ctaBtn1 ? ctaBtn1.textContent.trim() : '';
        const ctaButtonUrl = ctaBtn1 ? cleanExtract(ctaBtn1.getAttribute('href') || '') : '';
        const ctaSecondaryButtonText = ctaBtn2 ? ctaBtn2.textContent.trim() : '';
        const ctaSecondaryButtonUrl = ctaBtn2 ? cleanExtract(ctaBtn2.getAttribute('href') || '') : '';
        const showCtaSecondaryButton = !!ctaSecondaryButtonText;
        const showCta = !!(ctaTitle || ctaSubtitle || ctaButtonText || ctaSecondaryButtonText);

        let ctaButtonColor = '#0b0f19';
        if (ctaBtn1) {
            const btnBg = ctaBtn1.getAttribute('style')?.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/i) ||
                          ctaBtn1.parentElement?.getAttribute('style')?.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/i);
            if (btnBg && btnBg[1]) ctaButtonColor = btnBg[1];
        }

        // CEO Note
        const ceoAvatarDiv = doc.querySelector('div[style*="border-radius: 50%"]');
        const ceoAvatar = ceoAvatarDiv ? ceoAvatarDiv.textContent.trim() : 'EL';

        const ceoLabelP = doc.querySelector('p[style*="A note from our CEO"], p[style*="uppercase"]');
        const ceoLabel = ceoLabelP ? ceoLabelP.textContent.trim() : 'A note from our CEO';

        const ceoQuoteP = doc.querySelector('p[style*="font-style: italic"], p.italic');
        const ceoQuote = ceoQuoteP ? ceoQuoteP.textContent.replace(/^[“"\s]+|[”"\s]+$/g, '').trim() : '';

        let ceoName = '';
        if (ceoQuoteP) {
            let next = ceoQuoteP.nextElementSibling;
            while (next && next.tagName !== 'P') next = next.nextElementSibling;
            if (next) ceoName = next.textContent.trim();
        }
        const showCeoNote = !!(ceoQuote || ceoName);

        // Footer & Social
        const companyNameP = doc.querySelector('td.mobile-padding > p[style*="font-weight: 700"], footer p');
        const companyName = companyNameP ? companyNameP.textContent.trim() : '';

        const fbA = doc.querySelector('a[href*="facebook"]');
        const liA = doc.querySelector('a[href*="linkedin"]');
        const igA = doc.querySelector('a[href*="instagram"]');
        const ttA = doc.querySelector('a[href*="tiktok"]');
        const ytA = doc.querySelector('a[href*="youtube"]');

        let brandColor = defaultFields.brandColor;
        const heroBtnPill = doc.querySelector('td[style*="background-color: #"] a, p[style*="text-transform: uppercase"]');
        if (heroBtnPill) {
            const colorMatch = heroBtnPill.parentElement?.getAttribute('style')?.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/i) ||
                               heroBtnPill.getAttribute('style')?.match(/color:\s*(#[0-9a-fA-F]{3,6})/i);
            if (colorMatch && colorMatch[1]) brandColor = colorMatch[1];
        }

        let templateWidth = '760';
        const mainTable = doc.querySelector('table[style*="max-width"]');
        if (mainTable) {
            const match = mainTable.getAttribute('style').match(/max-width:\s*(\d+)px/i);
            if (match && match[1]) templateWidth = match[1];
        }

        const headerLayoutAttr = doc.querySelector('[data-header-layout]')?.getAttribute('data-header-layout');
        const hasSideBySideHeader = doc.querySelector('td.mobile-stack-right') !== null;
        let detectedHeaderLayout = headerLayoutAttr || (hasSideBySideHeader ? 'side-by-side' : 'side-by-side');

        return {
            templateWidth: templateWidth || defaultFields.templateWidth,
            preheader: preheader || defaultFields.preheader,
            headerLayout: detectedHeaderLayout || 'side-by-side',
            logoAlign: logoAlign || defaultFields.logoAlign || 'left',
            heroAlign: heroAlign || defaultFields.heroAlign || 'left',
            brandName: brandName || defaultFields.brandName,
            brandLogoUrl: brandLogoUrl || defaultFields.brandLogoUrl,
            brandLogoDarkUrl: brandLogoDarkUrl || defaultFields.brandLogoDarkUrl,
            logoHeight: logoHeight || defaultFields.logoHeight,
            brandColor: brandColor || '#0057c5',
            edition: edition || defaultFields.edition,
            headerTitle: headerTitle || defaultFields.headerTitle,
            headerSubtitle: headerSubtitle || defaultFields.headerSubtitle,
            headerButtonText: headerButtonText || defaultFields.headerButtonText,
            headerButtonUrl: headerButtonUrl || defaultFields.headerButtonUrl,
            headerButtonColor: headerButtonColor || '#ff0878',
            headerImage: headerImage || defaultFields.headerImage,
            introGreeting: introGreeting || defaultFields.introGreeting,
            introText: introText || defaultFields.introText,
            showFeatured: showFeatured,
            featuredLayout: detectedFeaturedLayout || 'columns',
            featuredCardHeight: detectedFeaturedCardHeight || defaultFields.featuredCardHeight || '560',
            featuredItems: featuredItems.length > 0 ? featuredItems : defaultFields.featuredItems,
            featuredBadge: featuredItems[0]?.badge || defaultFields.featuredBadge,
            featuredTitle: featuredItems[0]?.title || defaultFields.featuredTitle,
            featuredText: featuredItems[0]?.text || defaultFields.featuredText,
            featuredLinkText: featuredItems[0]?.linkText || defaultFields.featuredLinkText,
            featuredLinkUrl: featuredItems[0]?.linkUrl || defaultFields.featuredLinkUrl,
            featuredImage: featuredItems[0]?.image || defaultFields.featuredImage,
            cards: cards.length > 0 ? cards : [],
            showCta: showCta,
            ctaStyle: ctaStyle || 'clean',
            ctaTitle: ctaTitle || defaultFields.ctaTitle,
            ctaSubtitle: ctaSubtitle || defaultFields.ctaSubtitle,
            ctaButtonText: ctaButtonText || defaultFields.ctaButtonText,
            ctaButtonUrl: ctaButtonUrl || defaultFields.ctaButtonUrl,
            ctaButtonColor: ctaButtonColor || defaultFields.ctaButtonColor || '#0b0f19',
            showCtaSecondaryButton: showCtaSecondaryButton,
            ctaSecondaryButtonText: ctaSecondaryButtonText || defaultFields.ctaSecondaryButtonText,
            ctaSecondaryButtonUrl: ctaSecondaryButtonUrl || defaultFields.ctaSecondaryButtonUrl,
            showCeoNote: showCeoNote,
            ceoAvatar: ceoAvatar || defaultFields.ceoAvatar,
            ceoLabel: ceoLabel || defaultFields.ceoLabel,
            ceoQuote: ceoQuote || defaultFields.ceoQuote,
            ceoName: ceoName || defaultFields.ceoName,
            companyName: companyName || defaultFields.companyName,
            companyAddress: '',
            companyContact: '',
            facebookUrl: fbA ? fbA.getAttribute('href') : defaultFields.facebookUrl,
            linkedinUrl: liA ? liA.getAttribute('href') : defaultFields.linkedinUrl,
            instagramUrl: igA ? igA.getAttribute('href') : defaultFields.instagramUrl,
            tiktokUrl: ttA ? ttA.getAttribute('href') : defaultFields.tiktokUrl,
            youtubeUrl: ytA ? ytA.getAttribute('href') : defaultFields.youtubeUrl,
        };
    } catch (e) {
        return null;
    }
};

export default function VisualNewsletterEditor({ value, onChange, templates = [], onSelectTemplate, onTemplateSaved }) {
    const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'code'
    const [previewDevice, setPreviewDevice] = useState('desktop');
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [saveTemplateName, setSaveTemplateName] = useState('');
    const [saveTemplateSubject, setSaveTemplateSubject] = useState('');
    const [saveTemplateCategory, setSaveTemplateCategory] = useState('newsletter');
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);
    const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
    const [saveErrorMessage, setSaveErrorMessage] = useState('');
    const lastCompiledRef = useRef(value || '');

    // Initialize fields by parsing incoming value, or fallback to default
    const [fields, setFields] = useState(() => {
        if (value) {
            const parsed = extractFieldsFromHtml(value);
            if (parsed) return parsed;
        }
        return defaultFields;
    });

    const featuredItemsList = getFeaturedItems(fields);

    // Update field value and compile if in visual mode
    const updateField = (key, val) => {
        let cleanVal = val;
        if (typeof val === 'string' && (val.includes('/storage/') || val.includes('/images/'))) {
            cleanVal = val.replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/');
        }
        const next = { ...fields, [key]: cleanVal };
        setFields(next);
        if (editorMode === 'visual') {
            const compiled = compileHtml(next);
            lastCompiledRef.current = compiled;
            onChange(compiled);
        }
    };

    const updateFeaturedItem = (index, itemKey, val) => {
        let cleanVal = val;
        if (typeof val === 'string' && (val.includes('/storage/') || val.includes('/images/'))) {
            cleanVal = val.replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/');
        }
        const currentList = getFeaturedItems(fields);
        const nextList = currentList.map((item, idx) => {
            if (idx === index) {
                return { ...item, [itemKey]: cleanVal };
            }
            return item;
        });

        const next = {
            ...fields,
            featuredItems: nextList,
            featuredBadge: nextList[0]?.badge || '',
            featuredTitle: nextList[0]?.title || '',
            featuredText: nextList[0]?.text || '',
            featuredLinkText: nextList[0]?.linkText || '',
            featuredLinkUrl: nextList[0]?.linkUrl || '',
            featuredImage: nextList[0]?.image || '',
        };
        setFields(next);
        if (editorMode === 'visual') {
            const compiled = compileHtml(next);
            lastCompiledRef.current = compiled;
            onChange(compiled);
        }
    };

    const addFeaturedItem = () => {
        const currentList = getFeaturedItems(fields);
        const newItem = {
            badge: 'Spotlight',
            title: 'Exciting New Innovation',
            text: 'Explore our latest updates, breakthrough tools, and workflow improvements designed for your team.',
            linkText: 'Learn More →',
            linkUrl: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=750&fit=crop&q=80',
        };
        const nextList = [...currentList, newItem];
        const next = {
            ...fields,
            showFeatured: true,
            featuredItems: nextList,
            featuredBadge: nextList[0]?.badge || '',
            featuredTitle: nextList[0]?.title || '',
            featuredText: nextList[0]?.text || '',
            featuredLinkText: nextList[0]?.linkText || '',
            featuredLinkUrl: nextList[0]?.linkUrl || '',
            featuredImage: nextList[0]?.image || '',
        };
        setFields(next);
        if (editorMode === 'visual') {
            const compiled = compileHtml(next);
            lastCompiledRef.current = compiled;
            onChange(compiled);
        }
    };

    const removeFeaturedItem = (index) => {
        const currentList = getFeaturedItems(fields);
        if (currentList.length <= 1) return;
        const nextList = currentList.filter((_, idx) => idx !== index);
        const next = {
            ...fields,
            featuredItems: nextList,
            featuredBadge: nextList[0]?.badge || '',
            featuredTitle: nextList[0]?.title || '',
            featuredText: nextList[0]?.text || '',
            featuredLinkText: nextList[0]?.linkText || '',
            featuredLinkUrl: nextList[0]?.linkUrl || '',
            featuredImage: nextList[0]?.image || '',
        };
        setFields(next);
        if (editorMode === 'visual') {
            const compiled = compileHtml(next);
            lastCompiledRef.current = compiled;
            onChange(compiled);
        }
    };

    const handleOpenSaveModal = () => {
        const defaultName = fields.edition
            ? `${fields.brandName || 'Newsletter'} - ${fields.edition}`
            : (fields.headerTitle ? `${fields.headerTitle} (Template)` : 'Custom Newsletter with Content');
        setSaveTemplateName(defaultName);
        setSaveTemplateSubject(fields.headerTitle || fields.edition || '');
        setSaveTemplateCategory('newsletter');
        setSaveSuccessMessage('');
        setSaveErrorMessage('');
        setIsSaveModalOpen(true);
    };

    const handleSaveAsTemplate = async (e) => {
        e.preventDefault();
        if (!saveTemplateName.trim()) {
            setSaveErrorMessage('Please enter a template name.');
            return;
        }

        setIsSavingTemplate(true);
        setSaveErrorMessage('');
        setSaveSuccessMessage('');

        const currentHtml = editorMode === 'visual' ? compileHtml(fields) : (value || '');
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        try {
            const res = await fetch('/templates/save-as-new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({
                    name: saveTemplateName.trim(),
                    subject_template: saveTemplateSubject.trim(),
                    category: saveTemplateCategory,
                    content_html: currentHtml,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setSaveSuccessMessage(data.message || 'Template saved successfully!');
                if (onTemplateSaved && data.template) {
                    onTemplateSaved(data.template);
                }
                setTimeout(() => {
                    setIsSaveModalOpen(false);
                    setSaveSuccessMessage('');
                }, 1400);
            } else {
                setSaveErrorMessage(data.message || 'Failed to save template. Please check the name and try again.');
            }
        } catch (err) {
            setSaveErrorMessage('Network error while saving template.');
        } finally {
            setIsSavingTemplate(false);
        }
    };

    // Sync external value changes (e.g. when template is selected in parent component)
    useEffect(() => {
        if (value && value !== lastCompiledRef.current) {
            lastCompiledRef.current = value;
            const parsed = extractFieldsFromHtml(value);
            if (parsed) {
                setFields(parsed);
            }
        }
    }, [value]);

    return (
        <div className="space-y-4">
            {/* Top Toolbar: Switcher & Device Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setEditorMode('visual');
                            const compiled = compileHtml(fields);
                            lastCompiledRef.current = compiled;
                            onChange(compiled);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center ${
                            editorMode === 'visual'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-300" /> Easy Visual Editor (No Code)
                    </button>

                    <button
                        type="button"
                        onClick={() => setEditorMode('code')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center ${
                            editorMode === 'code'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Code className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> HTML Code
                    </button>

                    {templates && templates.length > 0 && onSelectTemplate && (
                        <button
                            type="button"
                            onClick={() => setIsTemplateModalOpen(true)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition flex items-center"
                        >
                            <LayoutTemplate className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> Select Template
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleOpenSaveModal}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition flex items-center shadow-sm"
                        title="Save your customized content as a reusable template preset in your library"
                    >
                        <BookmarkPlus className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> Save as Template
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                        <span className="text-[10px] text-slate-400 font-bold px-1.5 uppercase tracking-wider">Desktop Width:</span>
                        {[
                            { label: '680px', val: '680' },
                            { label: '760px (Standard)', val: '760' },
                            { label: '820px (Wide)', val: '820' },
                            { label: '900px (Extra Wide)', val: '900' },
                        ].map((w) => (
                            <button
                                key={w.val}
                                type="button"
                                onClick={() => updateField('templateWidth', w.val)}
                                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                                    (fields.templateWidth || '760') === w.val
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {w.label}
                            </button>
                        ))}
                        <div className="flex items-center pl-1.5 pr-1 border-l border-slate-800">
                            <input
                                type="number"
                                min="500"
                                max="1200"
                                step="10"
                                value={fields.templateWidth || '760'}
                                onChange={(e) => updateField('templateWidth', e.target.value)}
                                className="w-14 bg-slate-800 border border-slate-700 rounded-md px-1 py-0.5 text-xs text-white text-center font-mono font-bold"
                                title="Custom Desktop Width in pixels"
                            />
                            <span className="text-[10px] text-slate-400 font-semibold ml-1">px</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-slate-400 font-semibold mr-1">Device:</span>
                        <button
                            type="button"
                            onClick={() => setPreviewDevice('desktop')}
                            className={`p-1.5 rounded-lg transition ${
                                previewDevice === 'desktop' ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40' : 'text-slate-500 hover:text-white'
                            }`}
                            title="Desktop Preview"
                        >
                            <Monitor className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreviewDevice('mobile')}
                            className={`p-1.5 rounded-lg transition ${
                                previewDevice === 'mobile' ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40' : 'text-slate-500 hover:text-white'
                            }`}
                            title="Mobile Preview"
                        >
                            <Smartphone className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Workspace Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Side: Form Controls / Code Editor */}
                <div className="xl:col-span-5 2xl:col-span-4 space-y-4 max-h-[850px] overflow-y-auto pr-1">
                    {editorMode === 'visual' ? (
                        <div className="space-y-4">
                            {/* Preheader Section */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <FileText className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> Inbox Preheader Snippet
                                </h4>
                                <input
                                    type="text"
                                    value={fields.preheader || ''}
                                    onChange={(e) => updateField('preheader', e.target.value)}
                                    placeholder="Preview snippet shown in recipient inbox..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            {/* Company Logo & Branding */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3.5">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                        <Building2 className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> Header Logo & Branding
                                    </h4>
                                    <span className="text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full font-medium">
                                        Black Header Bar
                                    </span>
                                </div>

                                {/* Header Style Layout */}
                                <div>
                                    <label className="block text-[10px] text-slate-400 mb-1.5 font-semibold">Header Layout Style</label>
                                    <div className="grid grid-cols-2 gap-1 bg-slate-800 p-1 rounded-xl">
                                        {[
                                            { id: 'side-by-side', label: 'Side-by-Side (Logo + Title)' },
                                            { id: 'stacked', label: 'Stacked (Logo Above)' },
                                        ].map(({ id, label }) => (
                                            <button
                                                key={id}
                                                type="button"
                                                onClick={() => updateField('headerLayout', id)}
                                                className={`py-1 text-[11px] font-bold rounded-lg transition flex items-center justify-center ${
                                                    (fields.headerLayout || 'side-by-side') === id
                                                        ? 'bg-indigo-600 text-white shadow-sm'
                                                        : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Logo Alignment */}
                                <div>
                                    <label className="block text-[10px] text-slate-400 mb-1.5 font-semibold">Header Logo Alignment</label>
                                    <div className="grid grid-cols-3 gap-1 bg-slate-800 p-1 rounded-xl">
                                        {[
                                            { id: 'left', label: 'Left', icon: AlignLeft },
                                            { id: 'center', label: 'Center', icon: AlignCenter },
                                            { id: 'right', label: 'Right', icon: AlignRight },
                                        ].map(({ id, label, icon: Icon }) => (
                                            <button
                                                key={id}
                                                type="button"
                                                onClick={() => updateField('logoAlign', id)}
                                                className={`py-1 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1 ${
                                                    (fields.logoAlign || 'left') === id
                                                        ? 'bg-indigo-600 text-white shadow-sm'
                                                        : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                <Icon className="h-3 w-3" /> {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Header Logo */}
                                <ImageUploaderField
                                    label="Header Logo (White / Contrast logo on black background)"
                                    value={fields.brandLogoDarkUrl || fields.brandLogoUrl || ''}
                                    onChange={(url) => {
                                        updateField('brandLogoDarkUrl', url);
                                        updateField('brandLogoUrl', url);
                                    }}
                                    placeholder="/images/loops-logo-white.png"
                                />

                                {/* Header Logo Size Controls */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-[10px] text-slate-400 font-semibold flex items-center">
                                            Header Logo Size
                                        </label>
                                        <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                                            {fields.logoHeight || '64'}px height
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {[
                                            { label: 'Medium', val: '50' },
                                            { label: 'Large (Default)', val: '64' },
                                            { label: 'Extra Large', val: '78' },
                                            { label: 'Jumbo', val: '92' },
                                        ].map(({ label, val }) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => updateField('logoHeight', val)}
                                                className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition ${
                                                    (fields.logoHeight || '64') === val
                                                        ? 'bg-indigo-600 text-white shadow-sm'
                                                        : 'bg-slate-800 text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                        <div className="flex items-center pl-1 border-l border-slate-800">
                                            <input
                                                type="number"
                                                min="30"
                                                max="140"
                                                step="2"
                                                value={fields.logoHeight || '64'}
                                                onChange={(e) => updateField('logoHeight', e.target.value)}
                                                className="w-14 bg-slate-800 border border-slate-700 rounded-lg px-1.5 py-1 text-xs text-white text-center font-mono font-bold"
                                                title="Custom Logo Height (px)"
                                            />
                                            <span className="text-[10px] text-slate-400 ml-1 font-semibold">px</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Company / Brand Name</label>
                                        <input
                                            type="text"
                                            value={fields.brandName || ''}
                                            onChange={(e) => updateField('brandName', e.target.value)}
                                            placeholder="Loops Integrated"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Edition Tagline (Top Pill)</label>
                                        <input
                                            type="text"
                                            value={fields.edition || ''}
                                            onChange={(e) => updateField('edition', e.target.value)}
                                            placeholder="e.g. October Edition"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                        />
                                    </div>
                                </div>

                                {/* Loops Logo Color Palette Swatches */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-[10px] text-slate-400 font-semibold flex items-center">
                                            <Palette className="h-3 w-3 mr-1 text-indigo-400" /> Brand Theme Color (Loops Palette)
                                        </label>
                                        <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                                            {fields.brandColor || '#0057c5'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-xl border border-slate-700/60">
                                            {LOOPS_LOGO_PALETTE.map(({ name, hex }) => {
                                                const isSelected = (fields.brandColor || '#0057c5').toLowerCase() === hex.toLowerCase();
                                                return (
                                                    <button
                                                        key={hex}
                                                        type="button"
                                                        onClick={() => updateField('brandColor', hex)}
                                                        title={`${name} (${hex})`}
                                                        className={`w-6 h-6 rounded-lg transition-all flex items-center justify-center ${
                                                            isSelected ? 'ring-2 ring-white scale-110 shadow-lg' : 'hover:scale-105 opacity-85 hover:opacity-100'
                                                        }`}
                                                        style={{ backgroundColor: hex }}
                                                    >
                                                        {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="relative flex-1 flex items-center">
                                            <input
                                                type="color"
                                                value={fields.brandColor || '#0057c5'}
                                                onChange={(e) => updateField('brandColor', e.target.value)}
                                                className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                                                title="Custom Hex Color"
                                            />
                                            <input
                                                type="text"
                                                value={fields.brandColor || '#0057c5'}
                                                onChange={(e) => updateField('brandColor', e.target.value)}
                                                placeholder="#0057c5"
                                                className="w-full ml-1.5 bg-slate-800 border border-slate-700 rounded-xl px-2 py-1 text-xs text-white font-mono uppercase"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Story Section */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <ImageIcon className="h-3.5 w-3.5 mr-1.5 text-sky-400" /> Hero Headline & Banner
                                </h4>
                                <div className="space-y-2.5">
                                    {/* Headline & Description Alignment */}
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1.5 font-semibold">Headline & Description Alignment</label>
                                        <div className="grid grid-cols-3 gap-1 bg-slate-800 p-1 rounded-xl">
                                            {[
                                                { id: 'left', label: 'Left', icon: AlignLeft },
                                                { id: 'center', label: 'Center', icon: AlignCenter },
                                                { id: 'right', label: 'Right', icon: AlignRight },
                                            ].map(({ id, label, icon: Icon }) => (
                                                <button
                                                    key={id}
                                                    type="button"
                                                    onClick={() => updateField('heroAlign', id)}
                                                    className={`py-1 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1 ${
                                                        (fields.heroAlign || 'left') === id
                                                            ? 'bg-indigo-600 text-white shadow-sm'
                                                            : 'text-slate-400 hover:text-white'
                                                    }`}
                                                >
                                                    <Icon className="h-3 w-3" /> {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Main Headline (H1 Serif)</label>
                                        <input
                                            type="text"
                                            value={fields.headerTitle || ''}
                                            onChange={(e) => updateField('headerTitle', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold font-serif"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Sub-headline Description</label>
                                        <textarea
                                            rows={2}
                                            value={fields.headerSubtitle || ''}
                                            onChange={(e) => updateField('headerSubtitle', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Hero Button Label</label>
                                            <input
                                                type="text"
                                                value={fields.headerButtonText || ''}
                                                onChange={(e) => updateField('headerButtonText', e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Hero Button URL</label>
                                            <input
                                                type="text"
                                                value={fields.headerButtonUrl || ''}
                                                onChange={(e) => updateField('headerButtonUrl', e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="text-[10px] text-slate-400 font-semibold flex items-center">
                                                <Palette className="h-3 w-3 mr-1 text-pink-400" /> Hero Button Color
                                            </label>
                                            <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                                                {fields.headerButtonColor || '#ff0878'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-xl border border-slate-700/60">
                                                {LOOPS_LOGO_PALETTE.map(({ name, hex }) => {
                                                    const isSelected = (fields.headerButtonColor || '#ff0878').toLowerCase() === hex.toLowerCase();
                                                    return (
                                                        <button
                                                            key={hex}
                                                            type="button"
                                                            onClick={() => updateField('headerButtonColor', hex)}
                                                            title={`${name} (${hex})`}
                                                            className={`w-6 h-6 rounded-lg transition-all flex items-center justify-center ${
                                                                isSelected ? 'ring-2 ring-white scale-110 shadow-lg' : 'hover:scale-105 opacity-85 hover:opacity-100'
                                                            }`}
                                                            style={{ backgroundColor: hex }}
                                                        >
                                                            {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <div className="relative flex-1 flex items-center">
                                                <input
                                                    type="color"
                                                    value={fields.headerButtonColor || '#ff0878'}
                                                    onChange={(e) => updateField('headerButtonColor', e.target.value)}
                                                    className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                                                    title="Custom Button Color"
                                                />
                                                <input
                                                    type="text"
                                                    value={fields.headerButtonColor || '#ff0878'}
                                                    onChange={(e) => updateField('headerButtonColor', e.target.value)}
                                                    placeholder="#ff0878"
                                                    className="w-full ml-1.5 bg-slate-800 border border-slate-700 rounded-xl px-2 py-1 text-xs text-white font-mono uppercase"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <ImageUploaderField
                                        label="Hero Banner Image (1280 x 720 px)"
                                        value={fields.headerImage || ''}
                                        onChange={(url) => updateField('headerImage', url)}
                                    />
                                </div>
                            </div>

                            {/* Greeting & Intro */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <Type className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> Greeting & Intro Message
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Greeting Line</label>
                                        <input
                                            type="text"
                                            value={fields.introGreeting || ''}
                                            onChange={(e) => updateField('introGreeting', e.target.value)}
                                            placeholder="Hello {{first_name}},"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Message Text</label>
                                        <textarea
                                            rows={3}
                                            value={fields.introText || ''}
                                            onChange={(e) => updateField('introText', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Featured Highlight Card */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                        <Megaphone className="h-3.5 w-3.5 mr-1.5 text-amber-400" /> Featured Article Cards {featuredItemsList.length > 1 ? `(${featuredItemsList.length})` : ''}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => updateField('showFeatured', !fields.showFeatured)}
                                        className={`text-[10px] font-semibold px-2 py-0.5 rounded transition ${
                                            fields.showFeatured !== false ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                                        }`}
                                    >
                                        {fields.showFeatured !== false ? 'Active' : 'Disabled'}
                                    </button>
                                </div>

                                {fields.showFeatured !== false && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1.5 font-semibold">
                                                Card Grid Layout
                                            </label>
                                            <div className="grid grid-cols-2 gap-1.5 bg-slate-800 p-1 rounded-xl">
                                                <button
                                                    type="button"
                                                    onClick={() => updateField('featuredLayout', 'columns')}
                                                    className={`py-1.5 px-2 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5 ${
                                                        (fields.featuredLayout || 'columns') !== 'rows'
                                                            ? 'bg-indigo-600 text-white shadow-sm'
                                                            : 'text-slate-400 hover:text-white'
                                                    }`}
                                                >
                                                    <Columns className="h-3.5 w-3.5" />
                                                    <span>2 Columns (Side-by-Side)</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => updateField('featuredLayout', 'rows')}
                                                    className={`py-1.5 px-2 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5 ${
                                                        fields.featuredLayout === 'rows'
                                                            ? 'bg-indigo-600 text-white shadow-sm'
                                                            : 'text-slate-400 hover:text-white'
                                                    }`}
                                                >
                                                    <Rows className="h-3.5 w-3.5" />
                                                    <span>1 Column (Full Width Rows)</span>
                                                </button>
                                            </div>

                                            {/* Box / Card Fixed Height Controls */}
                                            {(fields.featuredLayout || 'columns') !== 'rows' && (
                                                <div className="mt-3 pt-3 border-t border-slate-800">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <label className="text-[10px] text-slate-400 font-semibold flex items-center">
                                                            Card Box Height (Fixed Size)
                                                        </label>
                                                        <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                                                            {fields.featuredCardHeight === 'auto' ? 'Auto Equal' : `${fields.featuredCardHeight || '560'}px fixed`}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        {[
                                                            { label: 'Auto Equal', val: 'auto' },
                                                            { label: 'Compact', val: '500' },
                                                            { label: 'Standard', val: '560' },
                                                            { label: 'Tall', val: '620' },
                                                        ].map(({ label, val }) => (
                                                            <button
                                                                key={val}
                                                                type="button"
                                                                onClick={() => updateField('featuredCardHeight', val)}
                                                                className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition ${
                                                                    (fields.featuredCardHeight || '560') === val
                                                                        ? 'bg-indigo-600 text-white shadow-sm'
                                                                        : 'bg-slate-800 text-slate-400 hover:text-white'
                                                                }`}
                                                            >
                                                                {label}
                                                            </button>
                                                        ))}
                                                        <div className="flex items-center pl-1 border-l border-slate-800">
                                                            <input
                                                                type="number"
                                                                min="380"
                                                                max="900"
                                                                step="10"
                                                                value={fields.featuredCardHeight === 'auto' ? '' : (fields.featuredCardHeight || '560')}
                                                                placeholder="px"
                                                                onChange={(e) => updateField('featuredCardHeight', e.target.value || 'auto')}
                                                                className="w-14 bg-slate-800 border border-slate-700 rounded-lg px-1.5 py-1 text-xs text-white text-center font-mono font-bold"
                                                                title="Custom Box Height (px)"
                                                            />
                                                            <span className="text-[10px] text-slate-400 ml-1 font-semibold">px</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 mt-1">
                                                        Locks both cards to identical equal height with action links aligned at the bottom.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {featuredItemsList.map((item, idx) => (
                                            <div key={idx} className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3 space-y-2.5">
                                                <div className="flex items-center justify-between border-b border-slate-700/50 pb-1.5">
                                                    <div className="flex items-center space-x-1.5">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">
                                                            Item #{idx + 1}
                                                        </span>
                                                        <span className="text-[11px] font-semibold text-slate-300 truncate max-w-[140px]">
                                                            {item.title || 'Untitled Article'}
                                                        </span>
                                                    </div>
                                                    {featuredItemsList.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFeaturedItem(idx)}
                                                            className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center space-x-1 hover:bg-rose-500/10 px-2 py-0.5 rounded transition"
                                                            title="Remove this featured item"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            <span>Remove</span>
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-3 gap-2">
                                                    <div>
                                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Pill Badge</label>
                                                        <input
                                                            type="text"
                                                            value={item.badge || ''}
                                                            onChange={(e) => updateFeaturedItem(idx, 'badge', e.target.value)}
                                                            placeholder="Featured"
                                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Article Title</label>
                                                        <input
                                                            type="text"
                                                            value={item.title || ''}
                                                            onChange={(e) => updateFeaturedItem(idx, 'title', e.target.value)}
                                                            placeholder="e.g. Discover What's New"
                                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-serif font-bold"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Description</label>
                                                    <textarea
                                                        rows={2}
                                                        value={item.text || ''}
                                                        onChange={(e) => updateFeaturedItem(idx, 'text', e.target.value)}
                                                        placeholder="Write a brief summary of this featured highlight..."
                                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Link Label</label>
                                                        <input
                                                            type="text"
                                                            value={item.linkText || ''}
                                                            onChange={(e) => updateFeaturedItem(idx, 'linkText', e.target.value)}
                                                            placeholder="Read More →"
                                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Link URL</label>
                                                        <input
                                                            type="text"
                                                            value={item.linkUrl || ''}
                                                            onChange={(e) => updateFeaturedItem(idx, 'linkUrl', e.target.value)}
                                                            placeholder="https://example.com"
                                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                                                        />
                                                    </div>
                                                </div>

                                                <ImageUploaderField
                                                    label={`Featured Photo #${idx + 1}`}
                                                    value={item.image || ''}
                                                    onChange={(url) => updateFeaturedItem(idx, 'image', url)}
                                                />
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addFeaturedItem}
                                            className="w-full py-2.5 px-3 border border-dashed border-amber-500/40 hover:border-amber-400 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>Add Another Feature Item</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Call To Action Banner */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> Call To Action (CTA)
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => updateField('showCta', !fields.showCta)}
                                        className={`text-[10px] font-semibold px-2 py-0.5 rounded transition ${
                                            fields.showCta !== false ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                                        }`}
                                    >
                                        {fields.showCta !== false ? 'Active' : 'Disabled'}
                                    </button>
                                </div>

                                {fields.showCta !== false && (
                                    <div className="space-y-2.5">
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">CTA Style</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => updateField('ctaStyle', 'clean')}
                                                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-1.5 transition ${
                                                        (fields.ctaStyle || 'clean') === 'clean'
                                                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                                                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                                    }`}
                                                >
                                                    <AlignLeft className="h-3.5 w-3.5" />
                                                    <span>Clean / Minimal</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => updateField('ctaStyle', 'gradient')}
                                                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-1.5 transition ${
                                                        fields.ctaStyle === 'gradient'
                                                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                                                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                                    }`}
                                                >
                                                    <Sparkles className="h-3.5 w-3.5" />
                                                    <span>Gradient Box</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">CTA Headline</label>
                                            <input
                                                type="text"
                                                value={fields.ctaTitle || ''}
                                                onChange={(e) => updateField('ctaTitle', e.target.value)}
                                                placeholder="See Our Latest Work"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">CTA Subtitle / Description</label>
                                            <textarea
                                                rows={2}
                                                value={fields.ctaSubtitle || ''}
                                                onChange={(e) => updateField('ctaSubtitle', e.target.value)}
                                                placeholder="From award-winning campaigns to new productions..."
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Button Label</label>
                                                <input
                                                    type="text"
                                                    value={fields.ctaButtonText || ''}
                                                    onChange={(e) => updateField('ctaButtonText', e.target.value)}
                                                    placeholder="VISIT OUR WEBSITE"
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Button Target URL</label>
                                                <input
                                                    type="text"
                                                    value={fields.ctaButtonUrl || ''}
                                                    onChange={(e) => updateField('ctaButtonUrl', e.target.value)}
                                                    placeholder="https://example.com"
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                                                />
                                            </div>
                                        </div>

                                        {(fields.ctaStyle || 'clean') === 'clean' && (
                                            <div>
                                                <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Button Background Color</label>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="color"
                                                        value={fields.ctaButtonColor || '#0b0f19'}
                                                        onChange={(e) => updateField('ctaButtonColor', e.target.value)}
                                                        className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer p-0.5"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={fields.ctaButtonColor || '#0b0f19'}
                                                        onChange={(e) => updateField('ctaButtonColor', e.target.value)}
                                                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => updateField('ctaButtonColor', '#0b0f19')}
                                                        className="text-[10px] text-slate-400 hover:text-white px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg"
                                                        title="Reset to dark navy"
                                                    >
                                                        Default
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Option to Add New Button Next to it */}
                                        <div className="pt-2.5 border-t border-slate-800/80">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-[10px] text-slate-300 font-semibold flex items-center">
                                                    Second Button (Optional)
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const nextState = !fields.showCtaSecondaryButton;
                                                        updateField('showCtaSecondaryButton', nextState);
                                                        if (nextState && !fields.ctaSecondaryButtonText) {
                                                            updateField('ctaSecondaryButtonText', 'Contact Us');
                                                        }
                                                        if (nextState && !fields.ctaSecondaryButtonUrl) {
                                                            updateField('ctaSecondaryButtonUrl', 'https://example.com/contact');
                                                        }
                                                    }}
                                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded transition ${
                                                        fields.showCtaSecondaryButton ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800 text-slate-400 hover:text-white'
                                                    }`}
                                                >
                                                    {fields.showCtaSecondaryButton ? 'Active' : '+ Add Button'}
                                                </button>
                                            </div>

                                            {fields.showCtaSecondaryButton && (
                                                <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                                                    <div>
                                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Second Button Label</label>
                                                        <input
                                                            type="text"
                                                            value={fields.ctaSecondaryButtonText || ''}
                                                            onChange={(e) => updateField('ctaSecondaryButtonText', e.target.value)}
                                                            placeholder="Contact Us"
                                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Second Button URL</label>
                                                        <input
                                                            type="text"
                                                            value={fields.ctaSecondaryButtonUrl || ''}
                                                            onChange={(e) => updateField('ctaSecondaryButtonUrl', e.target.value)}
                                                            placeholder="https://example.com/contact"
                                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* Footer & Company Details */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <Building2 className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> Footer Info & Social Links
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Company Name</label>
                                        <input
                                            type="text"
                                            value={fields.companyName || ''}
                                            onChange={(e) => updateField('companyName', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Facebook</label>
                                            <input
                                                type="text"
                                                value={fields.facebookUrl || ''}
                                                onChange={(e) => updateField('facebookUrl', e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">LinkedIn</label>
                                            <input
                                                type="text"
                                                value={fields.linkedinUrl || ''}
                                                onChange={(e) => updateField('linkedinUrl', e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">Instagram</label>
                                            <input
                                                type="text"
                                                value={fields.instagramUrl || ''}
                                                onChange={(e) => updateField('instagramUrl', e.target.value)}
                                                placeholder="https://instagram.com"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-slate-400 mb-1 font-semibold">TikTok</label>
                                            <input
                                                type="text"
                                                value={fields.tiktokUrl || ''}
                                                onChange={(e) => updateField('tiktokUrl', e.target.value)}
                                                placeholder="https://tiktok.com/@..."
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-slate-400 mb-1 font-semibold">YouTube</label>
                                        <input
                                            type="text"
                                            value={fields.youtubeUrl || ''}
                                            onChange={(e) => updateField('youtubeUrl', e.target.value)}
                                            placeholder="https://youtube.com"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                <Code className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> HTML Code Editor
                            </h4>
                            <textarea
                                rows={28}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                            />
                        </div>
                    )}
                </div>

                {/* Right Side: Instant Live Mobile / Desktop Email Preview */}
                <div className="xl:col-span-7 2xl:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-start overflow-hidden min-h-[600px]">
                    <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                        <span className="text-xs font-extrabold text-white flex items-center">
                            <Eye className="h-4 w-4 mr-1.5 text-indigo-400" /> Real-Time Live Preview
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full font-semibold">
                            {previewDevice === 'mobile' ? 'Mobile View (375px)' : `Desktop View (${fields.templateWidth || '760'}px)`}
                        </span>
                    </div>

                    <div className="w-full flex-1 flex justify-center overflow-x-auto overflow-y-auto p-2">
                        <div
                            className={`bg-white text-slate-900 rounded-xl shadow-2xl transition-all duration-300 overflow-hidden ${
                                previewDevice === 'mobile' ? 'w-[375px] min-h-[550px] my-2 border-4 border-slate-800 shrink-0' : 'w-full shrink-0'
                            }`}
                            style={{
                                maxWidth: previewDevice === 'mobile' ? '375px' : `${fields.templateWidth || '760'}px`,
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: (value || compileHtml(fields))
                                        .replace(/\{\{first_name\}\}/g, 'Sarah')
                                        .replace(/\{\{email\}\}/g, 'sarah.dev@example.com')
                                        .replace(/\{\{company_name\}\}/g, fields.companyName || 'Loops Integrated')
                                        .replace(/\{\{unsubscribe_url\}\}/g, '#')
                                        .replace(
                                            /<a([^>]*href="[^"]*instagram[^"]*"[^>]*)>ig<\/a>/gi,
                                            `<a$1><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block; margin-top: -2px;"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>`
                                        )
                                        .replace(
                                            /<a([^>]*href="[^"]*facebook[^"]*"[^>]*)>f<\/a>/gi,
                                            `<a$1><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block; margin-top: -2px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>`
                                        )
                                        .replace(
                                            /<a([^>]*href="[^"]*linkedin[^"]*"[^>]*)>in<\/a>/gi,
                                            `<a$1><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block; margin-top: -2px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>`
                                        )
                                        .replace(
                                            /<a([^>]*href="[^"]*tiktok[^"]*"[^>]*)>tt<\/a>/gi,
                                            `<a$1><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block; margin-top: -2px;"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></a>`
                                        )
                                        .replace(
                                            /<a([^>]*href="[^"]*youtube[^"]*"[^>]*)>(?:&#9654;|▶)<\/a>/gi,
                                            `<a$1><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block; margin-top: -2px;"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><polygon points="10 15 15 12 10 9" fill="currentColor"></polygon></svg></a>`
                                        ),
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Selection Modal */}
            {isTemplateModalOpen && templates && templates.length > 0 && (
                <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full flex flex-col overflow-hidden shadow-2xl space-y-4 p-6">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <h3 className="font-extrabold text-white text-base flex items-center">
                                <LayoutTemplate className="h-5 w-5 mr-2 text-indigo-400" /> Choose Pre-Designed Template
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsTemplateModalOpen(false)}
                                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="text-xs text-slate-300">
                            Select an email template to populate both the visual builder fields and email subject:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                            {templates.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => {
                                        if (onSelectTemplate) {
                                            onSelectTemplate(t.id);
                                        }
                                        setIsTemplateModalOpen(false);
                                    }}
                                    className="p-4 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 hover:border-indigo-500 cursor-pointer transition space-y-2 group"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-extrabold text-white group-hover:text-indigo-300 transition">
                                            {t.name}
                                        </span>
                                        {t.is_default && (
                                            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-semibold px-1.5 py-0.5 rounded border border-emerald-500/30">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-[11px] text-slate-400 font-mono truncate">
                                        Subject: {t.subject_template || 'No default subject'}
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-[10px] text-indigo-400 capitalize">
                                            Category: {t.category || 'Newsletter'}
                                        </span>
                                        <span className="text-[11px] font-bold text-indigo-400 group-hover:underline flex items-center">
                                            Apply <Check className="h-3.5 w-3.5 ml-1" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Save as Reusable Template Modal */}
            {isSaveModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center space-x-2.5">
                                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <BookmarkPlus className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-white text-base">Save as Reusable Template</h3>
                                    <p className="text-[11px] text-slate-400">Keep base template clean &amp; save this content separately</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsSaveModalOpen(false)}
                                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-300 leading-relaxed">
                            💡 <strong>Reusable Content Template:</strong> This saves your customized headlines, articles, banners, colors, and buttons into your Template Library. Your original base template remains unchanged.
                        </div>

                        {saveSuccessMessage && (
                            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs font-semibold text-emerald-300 flex items-center space-x-2">
                                <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                                <span>{saveSuccessMessage}</span>
                            </div>
                        )}

                        {saveErrorMessage && (
                            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs font-semibold text-rose-300 flex items-center space-x-2">
                                <X className="h-4 w-4 shrink-0 text-rose-400" />
                                <span>{saveErrorMessage}</span>
                            </div>
                        )}

                        <form onSubmit={handleSaveAsTemplate} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    New Template Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={saveTemplateName}
                                    onChange={(e) => setSaveTemplateName(e.target.value)}
                                    placeholder="e.g. October Edition - Tech Digest"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Default Subject Line (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={saveTemplateSubject}
                                    onChange={(e) => setSaveTemplateSubject(e.target.value)}
                                    placeholder="e.g. ⚡ What's New This Month"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Category
                                </label>
                                <select
                                    value={saveTemplateCategory}
                                    onChange={(e) => setSaveTemplateCategory(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="newsletter">Newsletter</option>
                                    <option value="promotion">Promotion / Special Offer</option>
                                    <option value="automation">Automation / Onboarding</option>
                                    <option value="transactional">Product Update / Announcement</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsSaveModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSavingTemplate}
                                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition flex items-center space-x-1.5"
                                >
                                    {isSavingTemplate ? (
                                        <span>Saving Template...</span>
                                    ) : (
                                        <>
                                            <BookmarkPlus className="h-4 w-4" />
                                            <span>Save Template with Content</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
