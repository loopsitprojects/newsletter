import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import VisualNewsletterEditor from '@/Components/VisualNewsletterEditor';
import {
    Send,
    ArrowLeft,
    Eye,
    Calendar,
    Code,
    LayoutTemplate,
    UserCheck,
    X,
    Sparkles,
    Check,
    BookmarkPlus,
    Layers,
} from 'lucide-react';

export default function CampaignsEdit({ campaign, templates: initialTemplates = [], groups }) {
    const [templates, setTemplates] = useState(initialTemplates || []);
    const { data, setData, put, processing, errors } = useForm({
        title: campaign.title,
        subject: campaign.subject,
        sender_name: campaign.sender_name || 'Loops Marketing',
        sender_email: (campaign.sender_email && !campaign.sender_email.includes('example.com') && !campaign.sender_email.includes('loops.lk')) ? campaign.sender_email : 'info@slmartech.com',
        content_html: campaign.content_html,
        template_id: campaign.template_id || '',
        target_type: campaign.target_type,
        subscriber_group_id: campaign.subscriber_group_id || '',
        action: campaign.status === 'scheduled' ? 'schedule' : 'draft',
        scheduled_at: campaign.scheduled_at ? campaign.scheduled_at.substring(0, 16) : '',
    });

    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [templateTab, setTemplateTab] = useState('all');

    const baseTemplates = templates.filter((t) => t.template_type === 'base' || !t.template_type);
    const contentTemplates = templates.filter((t) => t.template_type === 'content');
    const displayedTemplates = templateTab === 'base'
        ? baseTemplates
        : templateTab === 'content'
        ? contentTemplates
        : templates;

    const handleTemplateSelect = (tId) => {
        setData('template_id', tId);
        const selected = templates.find((t) => t.id == tId);
        if (selected) {
            setData((prev) => ({
                ...prev,
                template_id: tId,
                content_html: selected.content_html,
                subject: selected.subject_template || prev.subject,
            }));
        }
    };

    const handleTemplateSaved = (newTemplate) => {
        setTemplates((prev) => [newTemplate, ...prev.filter((t) => t.id !== newTemplate.id)]);
        setData((prev) => ({
            ...prev,
            template_id: newTemplate.id,
            subject: prev.subject || newTemplate.subject_template || '',
        }));
    };

    const insertTag = (tag) => {
        setData('content_html', data.content_html + ' ' + tag);
    };

    const handleSubmit = (actionType) => {
        setData('action', actionType);
        put(route('campaigns.update', campaign.id));
    };

    return (
        <NewsletterLayout header="Edit Campaign Draft" fullWidth={true}>
            <Head title={`Edit ${campaign.title} - Email Marketing Hub`} />

            <div className="space-y-6">
                {/* Top Action Bar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link href={route('campaigns.index')} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-extrabold text-white tracking-tight">Edit Campaign</h1>
                            <p className="text-xs text-slate-400">Update draft content and targeting settings</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsPreviewModalOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center transition"
                    >
                        <Eye className="h-4 w-4 mr-2 text-indigo-400" /> Preview Email
                    </button>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(data.action);
                    }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    <div className="lg:col-span-2 space-y-6">
                        {/* Prominent Email Template Selector */}
                        <div className="bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-extrabold text-white flex items-center">
                                    <LayoutTemplate className="h-5 w-5 mr-2 text-indigo-400" /> Switch Email Template
                                </h3>
                                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2.5 py-1 rounded-full border border-indigo-500/30 uppercase tracking-wider">
                                    One-Click Load
                                </span>
                            </div>
                            <p className="text-xs text-slate-300">
                                Select a template below to load pre-designed layout blocks into the visual editor:
                            </p>

                            {/* Separate Tabs for Base vs Content Templates */}
                            <div className="flex items-center space-x-2 pt-1 border-b border-indigo-500/20 pb-2.5">
                                <button
                                    type="button"
                                    onClick={() => setTemplateTab('all')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                                        templateTab === 'all'
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'bg-slate-800/80 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <Layers className="h-3.5 w-3.5" />
                                    <span>All ({templates.length})</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTemplateTab('base')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                                        templateTab === 'base'
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'bg-slate-800/80 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <LayoutTemplate className="h-3.5 w-3.5 text-indigo-300" />
                                    <span>Base Templates ({baseTemplates.length})</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTemplateTab('content')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                                        templateTab === 'content'
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'bg-slate-800/80 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <BookmarkPlus className="h-3.5 w-3.5 text-emerald-400" />
                                    <span>Templates with Content ({contentTemplates.length})</span>
                                </button>
                            </div>

                            {displayedTemplates.length === 0 ? (
                                <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/60 text-center space-y-1.5">
                                    <p className="text-xs text-slate-300 font-semibold">No templates found in this tab.</p>
                                    <p className="text-[11px] text-slate-400">
                                        Customize any base template and click <strong>"Save as Template"</strong> in the builder below to store your customized content here.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    {displayedTemplates.map((t) => {
                                        const isSelected = data.template_id == t.id;
                                        return (
                                            <div
                                                key={t.id}
                                                onClick={() => handleTemplateSelect(t.id)}
                                                className={`p-4 rounded-xl border cursor-pointer transition flex items-start justify-between space-x-2 ${
                                                    isSelected
                                                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                                                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300 hover:border-slate-600'
                                                }`}
                                            >
                                                <div className="space-y-1.5 overflow-hidden">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-extrabold text-white truncate">{t.name}</span>
                                                        {t.is_default && (
                                                            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-semibold px-1.5 py-0.5 rounded border border-emerald-500/30 shrink-0">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-1.5">
                                                        {t.template_type === 'content' ? (
                                                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                                Content Edition
                                                            </span>
                                                        ) : (
                                                            <span className="text-[9px] bg-slate-700 text-slate-400 font-semibold px-1.5 py-0.5 rounded">
                                                                Base Layout
                                                            </span>
                                                        )}
                                                        <span className="text-[10px] text-slate-400 capitalize">
                                                            {t.category || 'Newsletter'}
                                                        </span>
                                                    </div>
                                                    <div className="text-[11px] text-indigo-300 font-mono truncate">
                                                        Subject: {t.subject_template || 'No default subject'}
                                                    </div>
                                                </div>
                                                {isSelected ? (
                                                    <span className="p-1.5 rounded-full bg-indigo-500 text-white shrink-0">
                                                        <Check className="h-4 w-4" />
                                                    </span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white transition shrink-0"
                                                    >
                                                        Select
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Campaign Details</h3>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Internal Campaign Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Subject Line *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Sender Name</label>
                                    <input
                                        type="text"
                                        value={data.sender_name}
                                        onChange={(e) => setData('sender_name', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Sender Email Address</label>
                                    <input
                                        type="email"
                                        value={data.sender_email}
                                        onChange={(e) => setData('sender_email', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                            <h3 className="text-base font-bold text-white flex items-center">
                                <Sparkles className="h-4 w-4 mr-2 text-indigo-400" /> Visual Email Content & Layout Builder
                            </h3>

                            <VisualNewsletterEditor
                                value={data.content_html}
                                onChange={(html) => setData('content_html', html)}
                                templates={templates}
                                onSelectTemplate={handleTemplateSelect}
                                onTemplateSaved={handleTemplateSaved}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                            <h3 className="text-base font-bold text-white flex items-center">
                                <UserCheck className="h-4 w-4 mr-2 text-indigo-400" /> Target Audience
                            </h3>

                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="target_type"
                                        value="all"
                                        checked={data.target_type === 'all'}
                                        onChange={() => setData('target_type', 'all')}
                                        className="text-indigo-600 focus:ring-0"
                                    />
                                    <div>
                                        <div className="text-xs font-bold text-white">All Active Subscribers</div>
                                    </div>
                                </label>

                                <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="target_type"
                                        value="group"
                                        checked={data.target_type === 'group'}
                                        onChange={() => setData('target_type', 'group')}
                                        className="text-indigo-600 focus:ring-0"
                                    />
                                    <div>
                                        <div className="text-xs font-bold text-white">Target Specific Group</div>
                                    </div>
                                </label>

                                {data.target_type === 'group' && (
                                    <div className="pt-2">
                                        <select
                                            value={data.subscriber_group_id}
                                            onChange={(e) => setData('subscriber_group_id', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                        >
                                            <option value="">Select a Group...</option>
                                            {groups.map((g) => (
                                                <option key={g.id} value={g.id}>
                                                    {g.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                            <h3 className="text-base font-bold text-white">Publishing Actions</h3>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Schedule Date & Time</label>
                                <input
                                    type="datetime-local"
                                    value={data.scheduled_at}
                                    onChange={(e) => setData('scheduled_at', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="space-y-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => handleSubmit('send_now')}
                                    disabled={processing}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center"
                                >
                                    <Send className="h-4 w-4 mr-2" /> Send Campaign Immediately
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleSubmit('draft')}
                                    disabled={processing}
                                    className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700"
                                >
                                    Update Draft
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Email Live Preview Modal */}
            {isPreviewModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-white text-sm">Email HTML Preview</h3>
                            <button onClick={() => setIsPreviewModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto flex justify-center">
                            <div
                                className="bg-white text-slate-900 rounded-xl p-6 w-full max-w-2xl shadow-xl"
                                dangerouslySetInnerHTML={{
                                    __html: data.content_html
                                        .replace(/\{\{first_name\}\}/g, 'Alex')
                                        .replace(/\{\{email\}\}/g, 'alex.dev@example.com')
                                        .replace(/\{\{company_name\}\}/g, 'Email Marketing Hub')
                                        .replace(/\{\{unsubscribe_url\}\}/g, '#'),
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </NewsletterLayout>
    );
}
