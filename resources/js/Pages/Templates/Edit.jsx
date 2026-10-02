import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import VisualNewsletterEditor from '@/Components/VisualNewsletterEditor';
import { ArrowLeft, Code, Eye, X, Sparkles, BookmarkPlus, Check, LayoutTemplate } from 'lucide-react';

export default function TemplatesEdit({ template }) {
    const { data, setData, put, processing, errors } = useForm({
        name: template.name,
        subject_template: template.subject_template || '',
        category: template.category || 'newsletter',
        template_type: template.template_type || 'base',
        content_html: template.content_html,
        header_content: template.header_content || '',
        footer_content: template.footer_content || '',
        is_default: !!template.is_default,
    });

    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isSaveCopyModalOpen, setIsSaveCopyModalOpen] = useState(false);
    const [copyName, setCopyName] = useState(`${template.name} - with Content`);
    const [copyCategory, setCopyCategory] = useState(template.category || 'newsletter');
    const [isSavingCopy, setIsSavingCopy] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('templates.update', template.id));
    };

    const handleSaveAsCopy = (e) => {
        e.preventDefault();
        if (!copyName.trim()) return;

        setIsSavingCopy(true);
        router.post(
            route('templates.save-as-new'),
            {
                name: copyName.trim(),
                subject_template: data.subject_template,
                category: copyCategory,
                content_html: data.content_html,
            },
            {
                onFinish: () => setIsSavingCopy(false),
            }
        );
    };

    return (
        <NewsletterLayout header="Edit Email Template" fullWidth={true}>
            <Head title={`Edit ${template.name} - Email Marketing Hub`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link href={route('templates.index')} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-extrabold text-white tracking-tight">Edit Email Template</h1>
                            <p className="text-xs text-slate-400">Update layout code and settings</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsPreviewModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold flex items-center border border-slate-700"
                    >
                        <Eye className="h-4 w-4 mr-2 text-indigo-400" /> Preview HTML
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Top Row: Template Details & Options */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Template Info</h3>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Template Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Template Type *</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <label
                                        onClick={() => setData('template_type', 'base')}
                                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center space-x-2.5 ${
                                            data.template_type === 'base'
                                                ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500'
                                                : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="template_type"
                                            value="base"
                                            checked={data.template_type === 'base'}
                                            onChange={() => setData('template_type', 'base')}
                                            className="text-indigo-600 focus:ring-0"
                                        />
                                        <div>
                                            <div className="text-xs font-bold text-white flex items-center">
                                                <LayoutTemplate className="h-3.5 w-3.5 mr-1.5 text-indigo-400" /> Base Template
                                            </div>
                                            <div className="text-[10px] text-slate-400">Clean layout structure (no filled content)</div>
                                        </div>
                                    </label>
                                    <label
                                        onClick={() => setData('template_type', 'content')}
                                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center space-x-2.5 ${
                                            data.template_type === 'content'
                                                ? 'bg-emerald-600/20 border-emerald-500 text-white ring-1 ring-emerald-500'
                                                : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="template_type"
                                            value="content"
                                            checked={data.template_type === 'content'}
                                            onChange={() => setData('template_type', 'content')}
                                            className="text-emerald-600 focus:ring-0"
                                        />
                                        <div>
                                            <div className="text-xs font-bold text-white flex items-center">
                                                <BookmarkPlus className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> Template with Content
                                            </div>
                                            <div className="text-[10px] text-slate-400">Pre-filled edition with copy & imagery</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Default Subject Line Template</label>
                                    <input
                                        type="text"
                                        value={data.subject_template}
                                        onChange={(e) => setData('subject_template', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="newsletter">Newsletter</option>
                                        <option value="promotion">Promotion / Sale</option>
                                        <option value="automation">Automation / Onboarding</option>
                                        <option value="transactional">Transactional</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
                            <div>
                                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 mb-4">Template Options</h3>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_default}
                                        onChange={(e) => setData('is_default', e.target.checked)}
                                        className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
                                    />
                                    <span className="text-xs text-slate-300 font-semibold">Set as System Default Template</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition"
                            >
                                {processing ? 'Saving...' : 'Update Template'}
                            </button>

                            <div className="pt-3 border-t border-slate-800 space-y-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCopyName(`${template.name} - with Content`);
                                        setIsSaveCopyModalOpen(true);
                                    }}
                                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 hover:text-emerald-300 font-bold text-xs border border-emerald-500/30 hover:border-emerald-500/60 transition flex items-center justify-center space-x-1.5"
                                >
                                    <BookmarkPlus className="h-4 w-4" />
                                    <span>Save as New Template (Keep Base)</span>
                                </button>
                                <p className="text-[10px] text-slate-400 text-center">
                                    Saves this customized content as a separate template without changing the original base template.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Full-Width Visual Template Builder */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-white flex items-center">
                                <Sparkles className="h-4 w-4 mr-2 text-indigo-400" /> Visual Email Template Builder
                            </h3>
                        </div>

                        <VisualNewsletterEditor
                            value={data.content_html}
                            onChange={(html) => setData('content_html', html)}
                        />
                    </div>
                </form>
            </div>

            {/* Save as New Template Copy Modal */}
            {isSaveCopyModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center space-x-2.5">
                                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <BookmarkPlus className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-white text-base">Save as New Template Copy</h3>
                                    <p className="text-[11px] text-slate-400">Creates an independent copy; keeps the original base clean</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsSaveCopyModalOpen(false)}
                                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-300 leading-relaxed">
                            💡 <strong>Separated Templates:</strong> Your original template <strong>"{template.name}"</strong> will stay completely untouched. This new template will contain all the customized content and articles you added.
                        </div>

                        <form onSubmit={handleSaveAsCopy} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    New Template Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={copyName}
                                    onChange={(e) => setCopyName(e.target.value)}
                                    placeholder="e.g. October Newsletter Edition"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Category
                                </label>
                                <select
                                    value={copyCategory}
                                    onChange={(e) => setCopyCategory(e.target.value)}
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
                                    onClick={() => setIsSaveCopyModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSavingCopy}
                                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition flex items-center space-x-1.5"
                                >
                                    {isSavingCopy ? 'Saving...' : 'Save New Template Copy'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isPreviewModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full h-[80vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-white text-sm">HTML Preview</h3>
                            <button onClick={() => setIsPreviewModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto flex justify-center">
                            <div
                                className="bg-white text-slate-900 rounded-xl p-6 w-full max-w-xl shadow-xl"
                                dangerouslySetInnerHTML={{ __html: data.content_html }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </NewsletterLayout>
    );
}
