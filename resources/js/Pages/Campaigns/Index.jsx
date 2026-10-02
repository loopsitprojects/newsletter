import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import {
    Send,
    Plus,
    Search,
    Eye,
    MousePointer,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    FileEdit,
    Trash2,
    ArrowRight,
    Play,
    StopCircle,
    Copy,
    BookmarkPlus,
    X,
    Check,
} from 'lucide-react';

export default function CampaignsIndex({ campaigns, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [templateName, setTemplateName] = useState('');
    const [templateCategory, setTemplateCategory] = useState('newsletter');
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('campaigns.index'), { search, status }, { preserveState: true });
    };

    const handleDuplicate = (id) => {
        if (confirm('Create an editable duplicate of this campaign?')) {
            router.post(route('campaigns.duplicate', id));
        }
    };

    const openSaveAsTemplateModal = (campaign) => {
        setSelectedCampaign(campaign);
        setTemplateName(`${campaign.title} Template`);
        setTemplateCategory('newsletter');
        setIsSaveModalOpen(true);
    };

    const handleSaveCampaignAsTemplate = (e) => {
        e.preventDefault();
        if (!selectedCampaign || !templateName.trim()) return;

        setIsSavingTemplate(true);
        router.post(
            route('campaigns.save-as-template', selectedCampaign.id),
            {
                name: templateName.trim(),
                category: templateCategory,
            },
            {
                onFinish: () => {
                    setIsSavingTemplate(false);
                    setIsSaveModalOpen(false);
                },
            }
        );
    };

    const handleSendNow = (id) => {
        if (confirm('Are you ready to send this campaign immediately to target subscribers?')) {
            router.post(route('campaigns.send-now', id));
        }
    };

    const handleCancelSchedule = (id) => {
        if (confirm('Cancel this scheduled campaign dispatch?')) {
            router.post(route('campaigns.cancel', id));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this email campaign?')) {
            router.delete(route('campaigns.destroy', id));
        }
    };

    return (
        <NewsletterLayout header="Email Campaigns Hub">
            <Head title="Campaigns - Email Marketing Hub" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">Email Newsletter Campaigns</h1>
                        <p className="text-xs text-slate-400">Design, schedule, and track performance of outgoing email broadcasts</p>
                    </div>

                    <Link
                        href={route('campaigns.create')}
                        className="inline-flex items-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition"
                    >
                        <Plus className="h-4 w-4 mr-1.5" /> Create New Campaign
                    </Link>
                </div>

                {/* Filter Bar */}
                <form onSubmit={handleFilter} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search campaign title or subject line..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="all">All Campaign Statuses</option>
                            <option value="draft">Drafts</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="sent">Sent Broadcasts</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition">
                            Filter
                        </button>
                    </div>
                </form>

                {/* Campaigns List */}
                <div className="space-y-4">
                    {campaigns.data.length === 0 ? (
                        <div className="p-12 text-center bg-slate-900/80 border border-slate-800 rounded-2xl">
                            <Send className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-white">No campaigns found</h3>
                            <p className="text-xs text-slate-400 mt-1 mb-4">Get started by creating your first newsletter campaign.</p>
                            <Link
                                href={route('campaigns.create')}
                                className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                            >
                                + Create Campaign
                            </Link>
                        </div>
                    ) : (
                        campaigns.data.map((campaign) => {
                            const openRate = campaign.sent_count > 0 ? roundPct((campaign.open_count / campaign.sent_count) * 100) : 0;
                            const clickRate = campaign.sent_count > 0 ? roundPct((campaign.click_count / campaign.sent_count) * 100) : 0;

                            return (
                                <div
                                    key={campaign.id}
                                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition"
                                >
                                    <div className="space-y-2 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full tracking-wider ${
                                                    campaign.status === 'sent'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : campaign.status === 'scheduled'
                                                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                        : campaign.status === 'draft'
                                                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                }`}
                                            >
                                                {campaign.status}
                                            </span>

                                            <span className="text-xs text-slate-400">
                                                Target: <strong className="text-slate-200">{campaign.target_type === 'all' ? 'All Active Subscribers' : campaign.group?.name || 'Group'}</strong>
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white hover:text-indigo-300 transition">
                                            <Link href={route('campaigns.show', campaign.id)}>{campaign.title}</Link>
                                        </h3>
                                        <p className="text-xs text-slate-400">Subject: {campaign.subject}</p>

                                        {campaign.status === 'scheduled' && campaign.scheduled_at && (
                                            <div className="flex items-center text-xs text-amber-400 mt-2">
                                                <Calendar className="h-3.5 w-3.5 mr-1.5" /> Scheduled for {new Date(campaign.scheduled_at).toLocaleString()}
                                            </div>
                                        )}
                                        {campaign.status === 'sent' && campaign.sent_at && (
                                            <div className="flex items-center text-xs text-slate-500 mt-2">
                                                <Clock className="h-3.5 w-3.5 mr-1.5" /> Sent on {new Date(campaign.sent_at).toLocaleString()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Metrics pill */}
                                    {campaign.status === 'sent' && (
                                        <div className="flex items-center space-x-6 px-4 py-3 bg-slate-800/50 rounded-xl border border-slate-800">
                                            <div>
                                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Sent</div>
                                                <div className="text-base font-bold text-white">{campaign.sent_count}</div>
                                            </div>
                                            <div className="border-l border-slate-700/80 pl-6">
                                                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center">
                                                    <Eye className="h-3 w-3 mr-1 text-emerald-400" /> Open Rate
                                                </div>
                                                <div className="text-base font-bold text-emerald-400">{openRate}%</div>
                                            </div>
                                            <div className="border-l border-slate-700/80 pl-6">
                                                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center">
                                                    <MousePointer className="h-3 w-3 mr-1 text-amber-400" /> Click Rate
                                                </div>
                                                <div className="text-base font-bold text-amber-400">{clickRate}%</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2 shrink-0">
                                        {campaign.status === 'draft' && (
                                            <>
                                                <button
                                                    onClick={() => handleSendNow(campaign.id)}
                                                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center transition"
                                                >
                                                    <Play className="h-3.5 w-3.5 mr-1" /> Send Now
                                                </button>
                                                <Link
                                                    href={route('campaigns.edit', campaign.id)}
                                                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                                                >
                                                    <FileEdit className="h-4 w-4" />
                                                </Link>
                                            </>
                                        )}

                                        {campaign.status === 'scheduled' && (
                                            <button
                                                onClick={() => handleCancelSchedule(campaign.id)}
                                                className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 text-xs font-semibold flex items-center"
                                            >
                                                <StopCircle className="h-3.5 w-3.5 mr-1" /> Cancel Schedule
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDuplicate(campaign.id)}
                                            title="Duplicate this campaign (create new editable copy)"
                                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </button>

                                        <button
                                            onClick={() => openSaveAsTemplateModal(campaign)}
                                            title="Save this campaign's customized content as a reusable template"
                                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 transition"
                                        >
                                            <BookmarkPlus className="h-4 w-4" />
                                        </button>

                                        <Link
                                            href={route('campaigns.show', campaign.id)}
                                            className="px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold flex items-center border border-indigo-500/30"
                                        >
                                            Report <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(campaign.id)}
                                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Save Campaign as Template Modal */}
            {isSaveModalOpen && selectedCampaign && (
                <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center space-x-2.5">
                                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <BookmarkPlus className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-white text-base">Save Campaign as Template</h3>
                                    <p className="text-[11px] text-slate-400">Add to your Template Library to reuse across future campaigns</p>
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
                            💡 This takes the content, articles, and layout from <strong>"{selectedCampaign.title}"</strong> and saves it directly to your <strong>Templates with Content</strong> tab, keeping your base layout templates clean and untouched.
                        </div>

                        <form onSubmit={handleSaveCampaignAsTemplate} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Template Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={templateName}
                                    onChange={(e) => setTemplateName(e.target.value)}
                                    placeholder="e.g. October Newsletter Template"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Category
                                </label>
                                <select
                                    value={templateCategory}
                                    onChange={(e) => setTemplateCategory(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="newsletter">Newsletter</option>
                                    <option value="promotion">Promotion / Sale</option>
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
                                    {isSavingTemplate ? 'Saving...' : 'Save as Reusable Template'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NewsletterLayout>
    );
}

function roundPct(val) {
    return Math.round(val * 10) / 10;
}
