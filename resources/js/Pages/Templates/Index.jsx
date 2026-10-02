import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import { LayoutTemplate, Plus, Eye, Edit, Trash2, X, Sparkles, Copy, BookmarkPlus, Layers } from 'lucide-react';

export default function TemplatesIndex({ templates }) {
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'base' | 'content'

    const baseTemplates = templates.filter((t) => t.template_type === 'base' || !t.template_type);
    const contentTemplates = templates.filter((t) => t.template_type === 'content');

    const filteredTemplates = activeTab === 'base'
        ? baseTemplates
        : activeTab === 'content'
        ? contentTemplates
        : templates;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this email template?')) {
            router.delete(route('templates.destroy', id));
        }
    };

    const handleDuplicate = (id) => {
        router.post(route('templates.duplicate', id));
    };

    return (
        <NewsletterLayout header="Reusable Email Templates">
            <Head title="Email Templates - Email Marketing Hub" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">Email Template Library</h1>
                        <p className="text-xs text-slate-400">Manage base layouts and saved newsletter editions with custom content</p>
                    </div>

                    <Link
                        href={route('templates.create')}
                        className="inline-flex items-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition"
                    >
                        <Plus className="h-4 w-4 mr-1.5" /> Create Template
                    </Link>
                </div>

                {/* Separate Tabs for Base Templates and Templates with Content */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                                activeTab === 'all'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            <Layers className="h-3.5 w-3.5" />
                            <span>All Templates</span>
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-900/60 font-semibold">{templates.length}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('base')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                                activeTab === 'base'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            <LayoutTemplate className="h-3.5 w-3.5 text-indigo-300" />
                            <span>Base Templates (Clean Layouts)</span>
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-900/60 font-semibold">{baseTemplates.length}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('content')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                                activeTab === 'content'
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            <BookmarkPlus className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Templates with Content (Editions)</span>
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-900/60 font-semibold">{contentTemplates.length}</span>
                        </button>
                    </div>

                    <p className="text-[11px] text-slate-400">
                        {activeTab === 'base' && 'Showing clean structural templates ready for any campaign content.'}
                        {activeTab === 'content' && 'Showing saved editions and populated templates ready for reuse.'}
                        {activeTab === 'all' && 'All available layout templates and custom content editions.'}
                    </p>
                </div>

                {/* Empty State */}
                {filteredTemplates.length === 0 ? (
                    <div className="p-12 text-center bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
                        {activeTab === 'content' ? (
                            <>
                                <BookmarkPlus className="h-10 w-10 text-emerald-500/50 mx-auto" />
                                <h3 className="text-base font-bold text-white">No Templates with Content Yet</h3>
                                <p className="text-xs text-slate-400 max-w-md mx-auto">
                                    When you customize any base template with your headlines, articles, and buttons in a campaign, click <strong>"Save as Template"</strong> to save it here for future campaigns.
                                </p>
                            </>
                        ) : (
                            <>
                                <LayoutTemplate className="h-10 w-10 text-slate-600 mx-auto" />
                                <h3 className="text-base font-bold text-white">No Templates Found</h3>
                                <p className="text-xs text-slate-400">Get started by creating your first email template.</p>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTemplates.map((tpl) => (
                            <div
                                key={tpl.id}
                                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1.5">
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                                {tpl.category}
                                            </span>

                                            {tpl.template_type === 'content' ? (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                                    <BookmarkPlus className="h-3 w-3" /> Content Edition
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                                                    Base Layout
                                                </span>
                                            )}
                                        </div>

                                        {tpl.is_default && (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                Default
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition">{tpl.name}</h3>
                                    <p className="text-xs text-slate-400 font-mono truncate">{tpl.subject_template || 'No default subject'}</p>
                                </div>

                            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setPreviewTemplate(tpl)}
                                        className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-white"
                                    >
                                        <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                                    </button>
                                    
                                    <Link
                                        href={route('campaigns.create', { template_id: tpl.id })}
                                        className="inline-flex items-center text-xs font-bold text-indigo-400 hover:text-indigo-300"
                                    >
                                        Use in Campaign →
                                    </Link>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={() => handleDuplicate(tpl.id)}
                                        title="Duplicate template"
                                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                    <Link
                                        href={route('templates.edit', tpl.id)}
                                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                                        title="Edit template"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(tpl.id)}
                                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

            {/* Template Live Preview Modal */}
            {previewTemplate && (
                <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full h-[80vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-white text-sm">Template Preview: {previewTemplate.name}</h3>
                            <button onClick={() => setPreviewTemplate(null)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto flex justify-center">
                            <div
                                className="bg-white text-slate-900 rounded-xl p-6 w-full max-w-xl shadow-xl"
                                dangerouslySetInnerHTML={{
                                    __html: previewTemplate.content_html
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
