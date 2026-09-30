import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import {
    Send,
    Eye,
    MousePointer,
    UserX,
    ArrowLeft,
    Clock,
    Play,
    CheckCircle2,
    Layers,
} from 'lucide-react';

export default function CampaignsShow({ campaign, logs }) {
    const openRate = campaign.sent_count > 0 ? Math.round((campaign.open_count / campaign.sent_count) * 1000) / 10 : 0;
    const clickRate = campaign.sent_count > 0 ? Math.round((campaign.click_count / campaign.sent_count) * 1000) / 10 : 0;
    const queuedCount = campaign.queued_count || 0;

    const handleProcessBatch = () => {
        if (confirm('Process the next batch of 50 emails now?')) {
            router.post(route('campaigns.process-batch', campaign.id));
        }
    };

    return (
        <NewsletterLayout header="Campaign Performance Report">
            <Head title={`${campaign.title} Report - Email Marketing Hub`} />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <Link href={route('campaigns.index')} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <div className="flex items-center space-x-2">
                                <h1 className="text-2xl font-extrabold text-white tracking-tight">{campaign.title}</h1>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${
                                    campaign.status === 'sent'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : campaign.status === 'sending'
                                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}>
                                    {campaign.status}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">Subject: {campaign.subject}</p>
                        </div>
                    </div>

                    {/* Batch Processing Action Button */}
                    {queuedCount > 0 && (
                        <button
                            onClick={handleProcessBatch}
                            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/20"
                        >
                            <Play className="h-4 w-4 fill-white" />
                            <span>Process Next Batch (50 Emails)</span>
                        </button>
                    )}
                </div>

                {/* Queue Banner */}
                {queuedCount > 0 && (
                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                                <Layers className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-indigo-200">
                                    {queuedCount} {queuedCount === 1 ? 'email is' : 'emails are'} waiting in queue
                                </h4>
                                <p className="text-xs text-indigo-300/80">
                                    Emails are dispatched in <strong>batches of 50</strong>. The next 50 will process automatically or via queue worker.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleProcessBatch}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                        >
                            Process 50 Now
                        </button>
                    </div>
                )}

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400">Sent</span>
                            <Send className="h-4 w-4 text-indigo-400" />
                        </div>
                        <div className="mt-3 text-2xl font-black text-white">{campaign.sent_count.toLocaleString()}</div>
                        <span className="text-[10px] text-slate-500">Recipients reached</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400">In Queue</span>
                            <Clock className="h-4 w-4 text-sky-400" />
                        </div>
                        <div className="mt-3 text-2xl font-black text-sky-400">{queuedCount.toLocaleString()}</div>
                        <span className="text-[10px] text-slate-500">Waiting for delivery</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400">Open Rate</span>
                            <Eye className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div className="mt-3 text-2xl font-black text-emerald-400">{openRate}%</div>
                        <span className="text-[10px] text-slate-500">{campaign.open_count} total opens</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400">Click Rate</span>
                            <MousePointer className="h-4 w-4 text-amber-400" />
                        </div>
                        <div className="mt-3 text-2xl font-black text-amber-400">{clickRate}%</div>
                        <span className="text-[10px] text-slate-500">{campaign.click_count} link clicks</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400">Unsubscribes</span>
                            <UserX className="h-4 w-4 text-rose-400" />
                        </div>
                        <div className="mt-3 text-2xl font-black text-rose-400">{campaign.unsubscribe_count}</div>
                        <span className="text-[10px] text-slate-500">Opted out after campaign</span>
                    </div>
                </div>

                {/* Recipient Tracking Table */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <h3 className="text-base font-bold text-white">Subscriber Delivery & Activity Logs</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-800/50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                                <tr>
                                    <th className="py-3 px-4">Recipient</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Sent At</th>
                                    <th className="py-3 px-4">Opened At</th>
                                    <th className="py-3 px-4">Clicked At</th>
                                    <th className="py-3 px-4">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {logs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-6 text-center text-slate-500">
                                            No delivery logs recorded yet.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.data.map((log) => (
                                        <tr key={log.id} className="hover:bg-slate-800/30">
                                            <td className="py-3 px-4 font-medium text-white">{log.subscriber?.email}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                    log.status === 'sent'
                                                        ? 'bg-emerald-500/10 text-emerald-400'
                                                        : log.status === 'queued'
                                                        ? 'bg-sky-500/10 text-sky-400'
                                                        : 'bg-rose-500/10 text-rose-400'
                                                }`}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-xs text-slate-400">{log.sent_at ? new Date(log.sent_at).toLocaleString() : '-'}</td>
                                            <td className="py-3 px-4 text-xs">
                                                {log.opened_at ? (
                                                    <span className="text-emerald-400 font-semibold">{new Date(log.opened_at).toLocaleTimeString()}</span>
                                                ) : (
                                                    <span className="text-slate-600">Unopened</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-xs">
                                                {log.clicked_at ? (
                                                    <span className="text-amber-400 font-semibold">{new Date(log.clicked_at).toLocaleTimeString()}</span>
                                                ) : (
                                                    <span className="text-slate-600">No clicks</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-xs font-mono text-slate-500">{log.ip_address || '127.0.0.1'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </NewsletterLayout>
    );
}
