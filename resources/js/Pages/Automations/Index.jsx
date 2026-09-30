import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import { Zap, Plus, Play, Pause, Trash2, Edit, X, CheckCircle2, Clock } from 'lucide-react';

export default function AutomationsIndex({ automations, templates }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const form = useForm({
        name: '',
        trigger_event: 'subscriber.registered',
        template_id: templates.length > 0 ? templates[0].id : '',
        delay_minutes: 0,
        is_active: true,
    });

    const handleToggle = (id) => {
        router.post(route('automations.toggle', id));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this automation rule?')) {
            router.delete(route('automations.destroy', id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('automations.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                form.reset();
            },
        });
    };

    return (
        <NewsletterLayout header="Automated Email Workflows">
            <Head title="Automations - Email Marketing Hub" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">Email Automation Triggers</h1>
                        <p className="text-xs text-slate-400">Configure welcome sequences, double opt-in confirmations, and automated drips</p>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition"
                    >
                        <Plus className="h-4 w-4 mr-1.5" /> Create Automation
                    </button>
                </div>

                {/* Automation Rules List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {automations.map((auto) => (
                        <div
                            key={auto.id}
                            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            <Zap className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-bold text-lg text-white">{auto.name}</h3>
                                    </div>

                                    <button
                                        onClick={() => handleToggle(auto.id)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center transition ${
                                            auto.is_active
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                : 'bg-slate-800 text-slate-500 border border-slate-700'
                                        }`}
                                    >
                                        {auto.is_active ? <Play className="h-3 w-3 mr-1 fill-emerald-400" /> : <Pause className="h-3 w-3 mr-1" />}
                                        {auto.is_active ? 'ACTIVE' : 'PAUSED'}
                                    </button>
                                </div>

                                <div className="space-y-1 text-xs text-slate-400">
                                    <div>
                                        Trigger Event: <span className="font-mono text-indigo-300 font-semibold">{auto.trigger_event}</span>
                                    </div>
                                    <div>
                                        Template: <span className="text-slate-200 font-medium">{auto.template?.name || 'Default System Mail'}</span>
                                    </div>
                                    <div>
                                        Delay: <span className="text-slate-200">{auto.delay_minutes === 0 ? 'Immediate' : `${auto.delay_minutes} minutes`}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-semibold">
                                    ⚡ {auto.execution_count.toLocaleString()} executions
                                </span>

                                <button
                                    onClick={() => handleDelete(auto.id)}
                                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">New Automation Trigger</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Workflow Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Welcome Series for Tech Digest"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Trigger Event</label>
                                <select
                                    value={form.data.trigger_event}
                                    onChange={(e) => form.setData('trigger_event', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="subscriber.registered">New Subscriber Registration</option>
                                    <option value="subscriber.confirmed">Subscriber Email Confirmed</option>
                                    <option value="campaign.opened">Campaign Email Opened</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Template</label>
                                <select
                                    value={form.data.template_id}
                                    onChange={(e) => form.setData('template_id', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                >
                                    {templates.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Delay (Minutes)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.data.delay_minutes}
                                    onChange={(e) => form.setData('delay_minutes', parseInt(e.target.value) || 0)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                                >
                                    Save Workflow
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NewsletterLayout>
    );
}
