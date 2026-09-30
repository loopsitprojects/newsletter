import React, { useState, useEffect, useRef } from 'react';
import ImageUploaderField from './ImageUploaderField';
import {
    Sparkles,
    Image as ImageIcon,
    Type,
    ListPlus,
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
} from 'lucide-react';

export default function VisualNewsletterEditor({ value, onChange, templates = [], onSelectTemplate }) {
    const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'code'
    const [previewDevice, setPreviewDevice] = useState('desktop');
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const lastCompiledRef = useRef('');

    // Visual Form State for Non-Tech Users
    const [fields, setFields] = useState({
        templateWidth: '750',
        preheader: "Short preview text shown in the recipient's inbox",
        logoUrl: '/images/loops-logo-white.png',
        headerTitle: 'Weekly Tech & Product Digest',
        headerSubtitle: 'Weekly Updates & Insights',
        headerImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=500&fit=crop&q=80',
        mainHeading: 'Welcome to Our Latest Edition',
        introText: 'Thank you for subscribing to our newsletter! Here is our latest roundup of news, feature updates, and exclusive tutorials.',
        section1Title: 'Key Announcements & Updates',
        section1Text: 'We are excited to share some major milestones and helpful guides designed to accelerate your workflow.',
        bulletPoints: [
            'Automated multi-agent campaign scheduling',
            'Enhanced SMTP delivery tracking & analytics',
            'Customizable subscriber preference centers',
        ],
        section1Image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=450&fit=crop&q=80',
        section1ImageUrl: '',
        showFeatured: true,
        featuredImage: '',
        featuredTitle: 'Special Announcement',
        featuredText: 'Get early access to our upcoming release with exclusive pro features.',
        ctaText: 'READ MORE NOW',
        ctaUrl: 'https://example.com',
        extraCards: [],
        section2Title: 'Community & Highlights',
        section2Text: 'Discover stories from our active community members and top contributors around the globe.',
        section2Image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=400&fit=crop&q=80',
        section2ImageUrl: '',
        websiteUrl: 'https://example.com',
        facebookUrl: 'https://facebook.com',
        instagramUrl: 'https://instagram.com',
        linkedinUrl: 'https://linkedin.com',
        companyName: 'Loops Marketing Inc.',
        companyAddress: '123 Enterprise Way, Tech District',
        companyPhone: '+1 (555) 019-2834',
        companyEmail: 'info@slmartech.com',
    });

    const extractFieldsFromHtml = (htmlStr) => {
        if (!htmlStr || typeof htmlStr !== 'string') return null;
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlStr, 'text/html');

            const preheaderDiv = doc.querySelector('div[style*="display: none"]');
            const preheader = preheaderDiv ? preheaderDiv.textContent.replace(/&zwnj;|\s+/g, ' ').trim() : '';

            const cleanExtract = (url) => url ? String(url).replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/') : '';

            const logoImg = doc.querySelector('img[alt="Logo"]') || doc.querySelector('td[style*="background-color: #0f172a"] img:not([alt="Banner"])');
            const logoUrl = cleanExtract(logoImg ? logoImg.getAttribute('src') || '' : '/images/loops-logo-white.png');

            const h1 = doc.querySelector('h1');
            const headerTitle = h1 ? h1.textContent.trim() : '';

            const headerSubtitleElem = doc.querySelector('h1 + p') || doc.querySelector('td[style*="background-color: #0f172a"] p');
            const headerSubtitle = headerSubtitleElem ? headerSubtitleElem.textContent.trim() : '';

            const bannerImg = doc.querySelector('img[alt="Banner"]') || doc.querySelector('table tr:nth-child(2) img') || doc.querySelector('img');
            const headerImage = cleanExtract(bannerImg ? bannerImg.getAttribute('src') || '' : '');

            const h2 = doc.querySelector('h2');
            const mainHeading = h2 ? h2.textContent.trim() : '';

            const introElem = doc.querySelector('h2 + p');
            const introText = introElem ? introElem.textContent.trim() : '';

            const h3s = Array.from(doc.querySelectorAll('h3'));
            const section1Title = h3s[0] ? h3s[0].textContent.trim() : '';
            const section1TextElem = h3s[0] ? h3s[0].nextElementSibling : null;
            const section1Text = (section1TextElem && section1TextElem.tagName === 'P') ? section1TextElem.textContent.trim() : '';

            const lis = Array.from(doc.querySelectorAll('ul li')).map((li) => li.textContent.trim());

            const sec1Img = doc.querySelector('img[alt="Section Image"]');
            const section1Image = cleanExtract(sec1Img ? sec1Img.getAttribute('src') || '' : '');
            const section1ImageUrl = (sec1Img && sec1Img.parentElement && sec1Img.parentElement.tagName === 'A')
                ? sec1Img.parentElement.getAttribute('href') || ''
                : '';

            const featuredImg = doc.querySelector('img[alt="Featured Image"]');
            const featuredImage = cleanExtract(featuredImg ? featuredImg.getAttribute('src') || '' : '');

            const h4 = doc.querySelector('h4');
            const featuredTitle = h4 ? h4.textContent.trim() : '';
            const featuredTextElem = h4 ? h4.nextElementSibling : null;
            const featuredText = (featuredTextElem && featuredTextElem.tagName === 'P') ? featuredTextElem.textContent.trim() : '';

            const ctaBtn = doc.querySelector('a[href]:not([href*="unsubscribe"]):not([href*="facebook"]):not([href*="instagram"]):not([href*="linkedin"])');
            const ctaText = ctaBtn ? ctaBtn.textContent.trim() : '';
            const ctaUrl = ctaBtn ? ctaBtn.getAttribute('href') || '' : '';

            const showFeatured = !!(featuredTitle || featuredText || ctaText || featuredImage);

            const section2Title = h3s[1] ? h3s[1].textContent.trim() : '';
            const section2TextElem = h3s[1] ? h3s[1].nextElementSibling : null;
            const section2Text = (section2TextElem && section2TextElem.tagName === 'P') ? section2TextElem.textContent.trim() : '';

            const sec2Img = doc.querySelector('img[alt="Secondary Image"]');
            const section2Image = cleanExtract(sec2Img ? sec2Img.getAttribute('src') || '' : '');
            const section2ImageUrl = (sec2Img && sec2Img.parentElement && sec2Img.parentElement.tagName === 'A')
                ? sec2Img.parentElement.getAttribute('href') || ''
                : '';

            const companyHeading = doc.querySelector('footer h3') || doc.querySelector('td[style*="0f172a"] h3');
            const companyName = companyHeading ? companyHeading.textContent.trim() : '';

            let templateWidth = '750';
            const mainTable = doc.querySelector('table[style*="max-width"]');
            if (mainTable) {
                const match = mainTable.getAttribute('style').match(/max-width:\s*(\d+)px/i);
                if (match && match[1]) {
                    templateWidth = match[1];
                }
            }

            return {
                templateWidth: templateWidth,
                preheader: preheader || "Short preview text shown in recipient's inbox",
                logoUrl: logoUrl,
                headerTitle: headerTitle || 'Newsletter Title',
                headerSubtitle: headerSubtitle || 'Weekly Updates & Insights',
                headerImage: headerImage || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=500&fit=crop&q=80',
                mainHeading: mainHeading || 'Welcome to Our Latest Edition',
                introText: introText || 'Thank you for subscribing to our newsletter!',
                section1Title: section1Title || 'Key Announcements & Updates',
                section1Text: section1Text || 'Here are the latest updates.',
                bulletPoints: lis.length > 0 ? lis : [
                    'Automated multi-agent campaign scheduling',
                    'Enhanced SMTP delivery tracking & analytics',
                    'Customizable subscriber preference centers',
                ],
                section1Image: section1Image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=450&fit=crop&q=80',
                section1ImageUrl: section1ImageUrl,
                showFeatured: showFeatured,
                featuredImage: featuredImage,
                featuredTitle: featuredTitle || 'Special Announcement',
                featuredText: featuredText || 'Get early access to our upcoming release.',
                ctaText: ctaText || 'READ MORE NOW',
                ctaUrl: ctaUrl || 'https://example.com',
                extraCards: [],
                section2Title: section2Title || 'Community & Highlights',
                section2Text: section2Text || 'Discover stories from our active community.',
                section2Image: section2Image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=400&fit=crop&q=80',
                section2ImageUrl: section2ImageUrl,
                websiteUrl: 'https://example.com',
                facebookUrl: 'https://facebook.com',
                instagramUrl: 'https://instagram.com',
                linkedinUrl: 'https://linkedin.com',
                companyName: companyName || 'Loops Marketing Inc.',
                companyAddress: '',
                companyPhone: '',
                companyEmail: 'aspect@loops.lk',
            };
        } catch (e) {
            return null;
        }
    };

    // Generate clean responsive HTML from form fields
    const compileHtml = (f) => {
        const maxWidth = parseInt(f.templateWidth) || 750;
        const innerImageWidth = maxWidth - 64;
        const cleanUrl = (url) => url ? String(url).replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/') : '';

        const bulletsHtml = f.bulletPoints && f.bulletPoints.length > 0
            ? f.bulletPoints.map(b => `<li style="margin-bottom: 6px;">${escapeHtml(b)}</li>`).join('')
            : '';

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155; line-height: 1.6;">

    <!-- Hidden Preheader -->
    <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        ${escapeHtml(f.preheader)} &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 24px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: ${maxWidth}px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                    
                    <!-- Header Bar -->
                    <tr>
                        <td align="center" style="background-color: #0f172a; padding: 28px 30px 24px 30px; text-align: center;">
                            ${f.logoUrl ? `
                            <div style="margin-bottom: 14px;">
                                <img src="${escapeHtml(cleanUrl(f.logoUrl))}" alt="Logo" width="190" style="width: 190px; max-width: 100%; height: auto; object-fit: contain; display: inline-block; border: 0; vertical-align: middle;" />
                            </div>` : ''}
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">${escapeHtml(f.headerTitle)}</h1>
                            ${f.headerSubtitle ? `<p style="color: #94a3b8; font-size: 12px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">${escapeHtml(f.headerSubtitle)}</p>` : ''}
                        </td>
                    </tr>

                    <!-- Header Banner Image -->
                    ${f.headerImage ? `
                    <tr>
                        <td style="padding: 0;">
                            <img src="${escapeHtml(cleanUrl(f.headerImage))}" alt="Banner" width="${maxWidth}" style="width: 100%; max-width: ${maxWidth}px; height: auto; display: block; border: 0;" />
                        </td>
                    </tr>` : ''}

                    <!-- Intro Section -->
                    <tr>
                        <td style="padding: 32px 32px 20px 32px;">
                            ${f.mainHeading ? `<h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 12px 0;">${escapeHtml(f.mainHeading)}</h2>` : ''}
                            ${f.introText ? `<p style="color: #475569; font-size: 15px; margin: 0; line-height: 1.6;">${escapeHtml(f.introText)}</p>` : ''}
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 32px;">
                            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 10px 0 20px 0;" />
                        </td>
                    </tr>

                    <!-- Section 1 -->
                    ${(f.section1Title || f.section1Text || bulletsHtml) ? `
                    <tr>
                        <td style="padding: 0 32px 24px 32px;">
                            ${f.section1Title ? `<h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 10px 0;">${escapeHtml(f.section1Title)}</h3>` : ''}
                            ${f.section1Text ? `<p style="color: #475569; font-size: 14px; margin: 0 0 14px 0;">${escapeHtml(f.section1Text)}</p>` : ''}
                            ${bulletsHtml ? `<ul style="color: #475569; font-size: 14px; margin: 0 0 16px 0; padding-left: 20px; line-height: 1.8;">${bulletsHtml}</ul>` : ''}
                        </td>
                    </tr>` : ''}

                    <!-- Section 1 Image -->
                    ${f.section1Image ? `
                    <tr>
                        <td style="padding: 0 32px 24px 32px;">
                            ${f.section1ImageUrl ? `<a href="${escapeHtml(f.section1ImageUrl)}" target="_blank" style="text-decoration: none; display: block;">` : ''}
                                <img src="${escapeHtml(cleanUrl(f.section1Image))}" alt="Section Image" width="${innerImageWidth}" style="width: 100%; max-width: ${innerImageWidth}px; height: auto; display: block; border-radius: 12px; border: 0;" />
                            ${f.section1ImageUrl ? `</a>` : ''}
                        </td>
                    </tr>` : ''}

                    <!-- Featured Highlight Box -->
                    ${(f.showFeatured !== false && (f.featuredTitle || f.featuredText || f.ctaText || f.featuredImage || (f.extraCards && f.extraCards.length > 0))) ? `
                    <tr>
                        <td style="padding: 0 32px 28px 32px;">
                            ${(f.featuredTitle || f.featuredText || f.ctaText || f.featuredImage) ? `
                            <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px; margin-bottom: ${(f.extraCards && f.extraCards.length > 0) ? '16px' : '0'};">
                                ${f.featuredImage ? `
                                <div style="margin-bottom: 14px;">
                                    ${f.ctaUrl ? `<a href="${escapeHtml(f.ctaUrl)}" target="_blank" style="text-decoration: none; display: block;">` : ''}
                                        <img src="${escapeHtml(cleanUrl(f.featuredImage))}" alt="Featured Image" width="${innerImageWidth - 40}" style="width: 100%; max-width: ${innerImageWidth - 40}px; height: auto; display: block; border-radius: 8px; border: 0;" />
                                    ${f.ctaUrl ? `</a>` : ''}
                                </div>` : ''}
                                ${f.featuredTitle ? `<h4 style="color: #1e3a8a; font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">${escapeHtml(f.featuredTitle)}</h4>` : ''}
                                ${f.featuredText ? `<p style="color: #334155; font-size: 14px; margin: 0 0 16px 0; line-height: 1.6;">${escapeHtml(f.featuredText)}</p>` : ''}
                                ${f.ctaText ? `
                                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 8px; background-color: #2563eb;">
                                            <a href="${escapeHtml(f.ctaUrl || '#')}" target="_blank" style="font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; border: 1px solid #2563eb; display: inline-block;">${escapeHtml(f.ctaText)}</a>
                                        </td>
                                    </tr>
                                </table>` : ''}
                            </div>` : ''}

                            ${(f.extraCards && f.extraCards.length > 0) ? f.extraCards.map((card) => `
                            <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 8px; padding: 20px; margin-top: 16px;">
                                ${card.image ? `
                                <div style="margin-bottom: 14px;">
                                    ${card.ctaUrl ? `<a href="${escapeHtml(card.ctaUrl)}" target="_blank" style="text-decoration: none; display: block;">` : ''}
                                        <img src="${escapeHtml(cleanUrl(card.image))}" alt="Featured Card Image" width="${innerImageWidth - 40}" style="width: 100%; max-width: ${innerImageWidth - 40}px; height: auto; display: block; border-radius: 8px; border: 0;" />
                                    ${card.ctaUrl ? `</a>` : ''}
                                </div>` : ''}
                                ${card.title ? `<h4 style="color: #312e81; font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">${escapeHtml(card.title)}</h4>` : ''}
                                ${card.text ? `<p style="color: #334155; font-size: 14px; margin: 0 0 16px 0; line-height: 1.6;">${escapeHtml(card.text)}</p>` : ''}
                                ${card.ctaText ? `
                                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 8px; background-color: #4f46e5;">
                                            <a href="${escapeHtml(card.ctaUrl || '#')}" target="_blank" style="font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; border: 1px solid #4f46e5; display: inline-block;">${escapeHtml(card.ctaText)}</a>
                                        </td>
                                    </tr>
                                </table>` : ''}
                            </div>
                            `).join('') : ''}
                        </td>
                    </tr>` : ''}

                    <!-- Section 2 -->
                    ${(f.section2Title || f.section2Text || f.section2Image) ? `
                    <tr>
                        <td style="padding: 0 32px 24px 32px;">
                            ${f.section2Title ? `<h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 10px 0;">${escapeHtml(f.section2Title)}</h3>` : ''}
                            ${f.section2Text ? `<p style="color: #475569; font-size: 14px; margin: 0 0 14px 0;">${escapeHtml(f.section2Text)}</p>` : ''}
                            ${f.section2Image ? `
                            ${f.section2ImageUrl ? `<a href="${escapeHtml(f.section2ImageUrl)}" target="_blank" style="text-decoration: none; display: block;">` : ''}
                                <img src="${escapeHtml(cleanUrl(f.section2Image))}" alt="Secondary Image" width="${innerImageWidth}" style="width: 100%; max-width: ${innerImageWidth}px; height: auto; display: block; border-radius: 12px; margin-bottom: 12px; border: 0;" />
                            ${f.section2ImageUrl ? `</a>` : ''}
                            ` : ''}
                        </td>
                    </tr>` : ''}

                    <!-- Social Links -->
                    <tr>
                        <td align="center" style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                            <h4 style="color: #0f172a; font-size: 13px; font-weight: 700; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Stay Connected</h4>
                            <p style="margin: 0; font-size: 13px;">
                                ${f.websiteUrl ? `<a href="${escapeHtml(f.websiteUrl)}" style="color: #2563eb; text-decoration: none; font-weight: 600; margin: 0 6px;">Website</a> |` : ''}
                                ${f.facebookUrl ? `<a href="${escapeHtml(f.facebookUrl)}" style="color: #2563eb; text-decoration: none; font-weight: 600; margin: 0 6px;">Facebook</a> |` : ''}
                                ${f.instagramUrl ? `<a href="${escapeHtml(f.instagramUrl)}" style="color: #2563eb; text-decoration: none; font-weight: 600; margin: 0 6px;">Instagram</a> |` : ''}
                                ${f.linkedinUrl ? `<a href="${escapeHtml(f.linkedinUrl)}" style="color: #2563eb; text-decoration: none; font-weight: 600; margin: 0 6px;">LinkedIn</a>` : ''}
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #0f172a; color: #94a3b8; padding: 24px 32px; text-align: center; font-size: 12px; line-height: 1.6;">
                            ${f.companyName ? `<h3 style="color: #ffffff; font-size: 16px; margin: 0 0 8px 0; font-weight: 700;">${escapeHtml(f.companyName)}</h3>` : ''}
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
</html>`;
    };

    const escapeHtml = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    // When fields change in visual mode, update parent HTML value
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

    const addBulletPoint = () => {
        const next = [...fields.bulletPoints, 'New bullet point item'];
        updateField('bulletPoints', next);
    };

    const updateBulletPoint = (idx, val) => {
        const copy = [...fields.bulletPoints];
        copy[idx] = val;
        updateField('bulletPoints', copy);
    };

    const removeBulletPoint = (idx) => {
        const next = fields.bulletPoints.filter((_, i) => i !== idx);
        updateField('bulletPoints', next);
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

    // Handle mode changes
    useEffect(() => {
        if (editorMode === 'visual') {
            const compiled = compileHtml(fields);
            if (lastCompiledRef.current !== compiled) {
                lastCompiledRef.current = compiled;
                onChange(compiled);
            }
        }
    }, [editorMode]);

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
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                        <span className="text-[10px] text-slate-400 font-bold px-1.5 uppercase tracking-wider">Width:</span>
                        {[
                            { label: '650px', val: '650' },
                            { label: '750px (Wide)', val: '750' },
                            { label: '800px (Max)', val: '800' },
                        ].map((w) => (
                            <button
                                key={w.val}
                                type="button"
                                onClick={() => updateField('templateWidth', w.val)}
                                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                                    (fields.templateWidth || '750') === w.val
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {w.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-slate-400 font-semibold mr-1">Preview:</span>
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

            {/* Main Workspace Grid: Controls on Left, Live Preview on Right */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                
                {/* Left Side: Form Controls / Code Editor */}
                <div className="xl:col-span-5 space-y-5 max-h-[850px] overflow-y-auto pr-1">
                    {editorMode === 'visual' ? (
                        <div className="space-y-4">
                            {/* Preheader Section */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <FileText className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> Inbox Preheader Snippet
                                </h4>
                                <input
                                    type="text"
                                    value={fields.preheader}
                                    onChange={(e) => updateField('preheader', e.target.value)}
                                    placeholder="Short snippet text previewed in email clients..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            {/* Header Banner */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <ImageIcon className="h-3.5 w-3.5 mr-1.5 text-sky-400" /> Newsletter Banner & Title
                                </h4>
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <ImageUploaderField
                                            label="Site / Brand Logo"
                                            value={fields.logoUrl}
                                            onChange={(url) => updateField('logoUrl', url)}
                                            placeholder="/images/loops-logo-white.png or https://..."
                                        />
                                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Brand Logos:</span>
                                            <button
                                                type="button"
                                                onClick={() => updateField('logoUrl', '/images/loops-logo-white.png')}
                                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center transition border ${
                                                    fields.logoUrl === '/images/loops-logo-white.png'
                                                        ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500 shadow-sm'
                                                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                                }`}
                                            >
                                                <span className="w-2.5 h-2.5 rounded-full bg-white mr-1.5 inline-block shadow-sm" />
                                                White Logo (for Dark BG)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => updateField('logoUrl', '/images/loops-logo-dark.png')}
                                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center transition border ${
                                                    fields.logoUrl === '/images/loops-logo-dark.png'
                                                        ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500 shadow-sm'
                                                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                                }`}
                                            >
                                                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-400 mr-1.5 inline-block shadow-sm" />
                                                Dark Logo (for Light BG)
                                            </button>
                                            {fields.logoUrl && (
                                                <button
                                                    type="button"
                                                    onClick={() => updateField('logoUrl', '')}
                                                    className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold ml-auto"
                                                >
                                                    Remove Logo
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Newsletter Title</label>
                                        <input
                                            type="text"
                                            value={fields.headerTitle}
                                            onChange={(e) => updateField('headerTitle', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Sub-heading / Tagline</label>
                                        <input
                                            type="text"
                                            value={fields.headerSubtitle}
                                            onChange={(e) => updateField('headerSubtitle', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                    <ImageUploaderField
                                        label="Banner Header Image (1200 x 500 px)"
                                        value={fields.headerImage}
                                        onChange={(url) => updateField('headerImage', url)}
                                    />
                                </div>
                            </div>

                            {/* Main Introduction */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <Type className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> Main Heading & Introduction
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Main Heading</label>
                                        <input
                                            type="text"
                                            value={fields.mainHeading}
                                            onChange={(e) => updateField('mainHeading', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Introduction Text</label>
                                        <textarea
                                            rows="3"
                                            value={fields.introText}
                                            onChange={(e) => updateField('introText', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 1 Content & Bullets */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <ListPlus className="h-3.5 w-3.5 mr-1.5 text-amber-400" /> Primary Content & Bullet Points
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Section Title</label>
                                        <input
                                            type="text"
                                            value={fields.section1Title}
                                            onChange={(e) => updateField('section1Title', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Paragraph Content</label>
                                        <textarea
                                            rows="3"
                                            value={fields.section1Text}
                                            onChange={(e) => updateField('section1Text', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    {/* Bullet points editor */}
                                    <div className="space-y-1.5 pt-1">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[11px] text-slate-300 font-semibold">Bullet Points</label>
                                            <button
                                                type="button"
                                                onClick={addBulletPoint}
                                                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center"
                                            >
                                                <Plus className="h-3 w-3 mr-1" /> Add Bullet
                                            </button>
                                        </div>
                                        {fields.bulletPoints.map((bp, idx) => (
                                            <div key={idx} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={bp}
                                                    onChange={(e) => updateBulletPoint(idx, e.target.value)}
                                                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeBulletPoint(idx)}
                                                    className="p-1.5 text-rose-400 hover:text-rose-300"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Section 1 Image Uploader */}
                                    <div className="pt-2 space-y-2">
                                        <ImageUploaderField
                                            label="Section 1 Image"
                                            value={fields.section1Image}
                                            onChange={(url) => updateField('section1Image', url)}
                                        />
                                        {fields.section1Image && (
                                            <div>
                                                <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Section 1 Image Link URL (Optional click destination)</label>
                                                <input
                                                    type="text"
                                                    value={fields.section1ImageUrl || ''}
                                                    onChange={(e) => updateField('section1ImageUrl', e.target.value)}
                                                    placeholder="https://example.com/learn-more"
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-indigo-300 font-mono focus:outline-none"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Featured Announcement Box & CTA */}
                            {fields.showFeatured !== false ? (
                                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                            <Megaphone className="h-3.5 w-3.5 mr-1.5 text-rose-400" /> Featured Highlight & Call-To-Action
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={() => updateField('showFeatured', false)}
                                            className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold flex items-center transition"
                                            title="Exclude this section from newsletter"
                                        >
                                            <Trash2 className="h-3 w-3 mr-1" /> Remove Section
                                        </button>
                                    </div>

                                    <ImageUploaderField
                                        label="Featured Highlight Image / Banner (Optional)"
                                        value={fields.featuredImage}
                                        onChange={(url) => updateField('featuredImage', url)}
                                        placeholder="https://... or upload banner"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Box Title</label>
                                            <input
                                                type="text"
                                                value={fields.featuredTitle}
                                                onChange={(e) => updateField('featuredTitle', e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Button Label</label>
                                            <input
                                                type="text"
                                                value={fields.ctaText}
                                                onChange={(e) => updateField('ctaText', e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Box Highlight Description</label>
                                        <textarea
                                            rows="2"
                                            value={fields.featuredText}
                                            onChange={(e) => updateField('featuredText', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Button & Image Target Link URL</label>
                                        <input
                                            type="text"
                                            value={fields.ctaUrl}
                                            onChange={(e) => updateField('ctaUrl', e.target.value)}
                                            placeholder="https://example.com"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-indigo-300 font-mono focus:outline-none"
                                        />
                                    </div>

                                    {/* Additional Custom Highlight Cards */}
                                    {fields.extraCards && fields.extraCards.length > 0 && (
                                        <div className="space-y-3 pt-2 border-t border-slate-800">
                                            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Additional Highlight Cards:</span>
                                            {fields.extraCards.map((card, idx) => (
                                                <div key={card.id || idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 relative">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-bold text-indigo-400">Card #{idx + 2}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const nextCards = fields.extraCards.filter((_, i) => i !== idx);
                                                                updateField('extraCards', nextCards);
                                                            }}
                                                            className="text-rose-400 hover:text-rose-300 text-[10px] font-semibold flex items-center"
                                                        >
                                                            <Trash2 className="h-3 w-3 mr-0.5" /> Delete
                                                        </button>
                                                    </div>
                                                    <ImageUploaderField
                                                        label="Card Image"
                                                        value={card.image || ''}
                                                        onChange={(url) => {
                                                            const cleanUrlVal = typeof url === 'string' ? url.replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/') : url;
                                                            const nextCards = [...fields.extraCards];
                                                            nextCards[idx] = { ...nextCards[idx], image: cleanUrlVal };
                                                            updateField('extraCards', nextCards);
                                                        }}
                                                    />
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Card Title</label>
                                                            <input
                                                                type="text"
                                                                value={card.title || ''}
                                                                onChange={(e) => {
                                                                    const nextCards = [...fields.extraCards];
                                                                    nextCards[idx] = { ...nextCards[idx], title: e.target.value };
                                                                    updateField('extraCards', nextCards);
                                                                }}
                                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Button Text</label>
                                                            <input
                                                                type="text"
                                                                value={card.ctaText || ''}
                                                                onChange={(e) => {
                                                                    const nextCards = [...fields.extraCards];
                                                                    nextCards[idx] = { ...nextCards[idx], ctaText: e.target.value };
                                                                    updateField('extraCards', nextCards);
                                                                }}
                                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Description</label>
                                                        <textarea
                                                            rows="2"
                                                            value={card.text || ''}
                                                            onChange={(e) => {
                                                                const nextCards = [...fields.extraCards];
                                                                nextCards[idx] = { ...nextCards[idx], text: e.target.value };
                                                                updateField('extraCards', nextCards);
                                                            }}
                                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Target Link URL</label>
                                                        <input
                                                            type="text"
                                                            value={card.ctaUrl || ''}
                                                            onChange={(e) => {
                                                                const nextCards = [...fields.extraCards];
                                                                nextCards[idx] = { ...nextCards[idx], ctaUrl: e.target.value };
                                                                updateField('extraCards', nextCards);
                                                            }}
                                                            placeholder="https://..."
                                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-indigo-300 font-mono"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="pt-1">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const nextCards = [...(fields.extraCards || []), {
                                                    id: Date.now(),
                                                    image: '',
                                                    title: 'Featured Promotion',
                                                    text: 'Discover our newest offering and take advantage of special pricing.',
                                                    ctaText: 'CHECK IT OUT',
                                                    ctaUrl: 'https://example.com',
                                                }];
                                                updateField('extraCards', nextCards);
                                            }}
                                            className="w-full py-2 border border-dashed border-indigo-500/40 rounded-xl text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 flex items-center justify-center transition"
                                        >
                                            <Plus className="h-3.5 w-3.5 mr-1" /> Add Another Highlight Card
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-900/60 border border-dashed border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex items-center justify-between transition">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400">
                                            <Megaphone className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-300">Featured Highlight & CTA Box</h4>
                                            <p className="text-[10px] text-slate-500">Currently excluded from this newsletter.</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            updateField('showFeatured', true);
                                            if (!fields.featuredTitle) updateField('featuredTitle', 'Special Announcement');
                                            if (!fields.ctaText) updateField('ctaText', 'READ MORE NOW');
                                            if (!fields.ctaUrl) updateField('ctaUrl', 'https://example.com');
                                        }}
                                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center shadow-lg shadow-indigo-600/20 transition"
                                    >
                                        <Plus className="h-3.5 w-3.5 mr-1" /> Add This Section
                                    </button>
                                </div>
                            )}

                            {/* Secondary Section */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <Type className="h-3.5 w-3.5 mr-1.5 text-purple-400" /> Secondary Content Section
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Second Section Title</label>
                                        <input
                                            type="text"
                                            value={fields.section2Title}
                                            onChange={(e) => updateField('section2Title', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Second Section Text</label>
                                        <textarea
                                            rows="2"
                                            value={fields.section2Text}
                                            onChange={(e) => updateField('section2Text', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"
                                        />
                                    </div>
                                    <ImageUploaderField
                                        label="Section 2 Image"
                                        value={fields.section2Image}
                                        onChange={(url) => updateField('section2Image', url)}
                                    />
                                    {fields.section2Image && (
                                        <div>
                                            <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Section 2 Image Link URL (Optional click destination)</label>
                                            <input
                                                type="text"
                                                value={fields.section2ImageUrl || ''}
                                                onChange={(e) => updateField('section2ImageUrl', e.target.value)}
                                                placeholder="https://example.com/event"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-indigo-300 font-mono focus:outline-none"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer & Social Links */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                    <Building2 className="h-3.5 w-3.5 mr-1.5 text-amber-400" /> Social Links & Company Footer
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Website URL</label>
                                        <input
                                            type="text"
                                            value={fields.websiteUrl}
                                            onChange={(e) => updateField('websiteUrl', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Facebook URL</label>
                                        <input
                                            type="text"
                                            value={fields.facebookUrl}
                                            onChange={(e) => updateField('facebookUrl', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Instagram URL</label>
                                        <input
                                            type="text"
                                            value={fields.instagramUrl}
                                            onChange={(e) => updateField('instagramUrl', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">LinkedIn URL</label>
                                        <input
                                            type="text"
                                            value={fields.linkedinUrl}
                                            onChange={(e) => updateField('linkedinUrl', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                        />
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Company / Brand Name</label>
                                    <input
                                        type="text"
                                        value={fields.companyName}
                                        onChange={(e) => updateField('companyName', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
                                <Code className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> HTML Code Editor
                            </h4>
                            <textarea
                                rows="28"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                            />
                        </div>
                    )}
                </div>

                {/* Right Side: Instant Live Mobile / Desktop Email Preview */}
                <div className="xl:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-start overflow-hidden min-h-[600px]">
                    <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                        <span className="text-xs font-extrabold text-white flex items-center">
                            <Eye className="h-4 w-4 mr-1.5 text-indigo-400" /> Real-Time Live Preview
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full font-semibold">
                            {previewDevice === 'mobile' ? 'Mobile View (375px)' : `Desktop View (${fields.templateWidth || '750'}px)`}
                        </span>
                    </div>

                    <div className="w-full flex-1 flex justify-center overflow-y-auto">
                        <div
                            className={`bg-white text-slate-900 rounded-xl shadow-2xl transition-all duration-300 overflow-hidden ${
                                previewDevice === 'mobile' ? 'w-[375px] min-h-[550px] my-2 border-4 border-slate-800' : 'w-full'
                            }`}
                            style={{
                                maxWidth: previewDevice === 'mobile' ? '375px' : `${fields.templateWidth || '750'}px`,
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: (value || compileHtml(fields))
                                        .replace(/\{\{first_name\}\}/g, 'Alex')
                                        .replace(/\{\{email\}\}/g, 'alex.dev@example.com')
                                        .replace(/\{\{company_name\}\}/g, fields.companyName || 'Loops Marketing')
                                        .replace(/\{\{unsubscribe_url\}\}/g, '#'),
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
        </div>
    );
}
