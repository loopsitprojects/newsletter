import React from 'react';
import { Head, Link } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import {
    Users,
    CheckCircle2,
    Send,
    Eye,
    MousePointer,
    TrendingUp,
    FolderKanban,
    Plus,
    Clock,
    ArrowUpRight,
    Sparkles,
    UserCheck,
    MailCheck,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ metrics, recentCampaigns, recentSubscribers, recentLogs, subscriberGrowth, groupStats }) {
    return (
        <NewsletterLayout header="Campaign Center Overview">
            <Head title="Dashboard - Email Marketing Hub" />

            <div className="space-y-8">
                {/* Top Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
                                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                                <span>Newsletter & Campaign System</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Welcome back to Audience Engagement Hub
                            </h1>
                            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                                Manage subscribers, create rich HTML email campaigns, target custom groups, and monitor real-time open and click statistics.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href={route('campaigns.create')}
                                className="inline-flex items-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition duration-200"
                            >
                                <Plus className="h-4 w-4 mr-2" /> New Campaign
                            </Link>
                            <Link
                                href={route('subscribers.index')}
                                className="inline-flex items-center px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition duration-200"
                            >
                                <Users className="h-4 w-4 mr-2" /> Subscribers
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Total Subscribers */}
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Subscribers</span>
                            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <span className="text-3xl font-black text-white">{metrics.totalSubscribers.toLocaleString()}</span>
                            <span className="text-xs text-emerald-400 font-semibold flex items-center">
                                <TrendingUp className="h-3.5 w-3.5 mr-1" /> Active
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            {metrics.activeSubscribers} active, {metrics.pendingSubscribers} pending
                        </p>
                    </div>

                    {/* Campaigns Sent */}
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-purple-500/40 transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Campaigns Sent</span>
                            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                <Send className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <span className="text-3xl font-black text-white">{metrics.campaignsSent}</span>
                            <span className="text-xs text-slate-400">
                                {metrics.totalSentEmails.toLocaleString()} emails delivered
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Dispatched across all subscriber groups</p>
                    </div>

                    {/* Avg Open Rate */}
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Open Rate</span>
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <Eye className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <span className="text-3xl font-black text-emerald-400">{metrics.avgOpenRate}%</span>
                            <span className="text-xs text-emerald-400 font-semibold">High Engagement</span>
                        </div>
                        <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(metrics.avgOpenRate, 100)}%` }}></div>
                        </div>
                    </div>

                    {/* Avg Click Rate */}
                    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-amber-500/40 transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Click Rate</span>
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <MousePointer className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <span className="text-3xl font-black text-amber-400">{metrics.avgClickRate}%</span>
                            <span className="text-xs text-slate-400">Link Interactions</span>
                        </div>
                        <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(metrics.avgClickRate, 100)}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Charts & Group Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Subscriber Growth Chart */}
                    <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Subscriber Growth Trend</h3>
                                <p className="text-xs text-slate-400">Accumulated audience growth over time</p>
                            </div>
                            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                                Live Data
                            </span>
                        </div>

                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={subscriberGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="subscribers" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#growthGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Subscriber Groups Breakdown */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-white">Audience Segments</h3>
                                <Link href={route('groups.index')} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center">
                                    Manage <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
                                </Link>
                            </div>
                            <p className="text-xs text-slate-400 mb-6">Distribution across subscriber interest groups</p>

                            <div className="space-y-4">
                                {groupStats.map((group) => (
                                    <div key={group.id} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: group.color || '#6366f1' }}></div>
                                            <div>
                                                <div className="text-sm font-semibold text-white">{group.name}</div>
                                                <div className="text-[11px] text-slate-400">{group.description || 'Targeted segment'}</div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                                            {group.subscribers_count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            href={route('groups.index')}
                            className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs text-center border border-slate-700 transition"
                        >
                            + Add New Group
                        </Link>
                    </div>
                </div>

                {/* Recent Campaigns & Activity Table */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Campaigns */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Recent Email Campaigns</h3>
                            <Link href={route('campaigns.index')} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center">
                                View All <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
                            </Link>
                        </div>

                        <div className="space-y-3.5">
                            {recentCampaigns.length === 0 ? (
                                <p className="text-slate-500 text-sm py-4">No campaigns created yet.</p>
                            ) : (
                                recentCampaigns.map((c) => (
                                    <div key={c.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-bold text-white">{c.title}</span>
                                                <span
                                                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                                                        c.status === 'sent'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                            : c.status === 'scheduled'
                                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                            : 'bg-slate-700 text-slate-300'
                                                    }`}
                                                >
                                                    {c.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400">{c.subject}</p>
                                        </div>
                                        <Link
                                            href={route('campaigns.show', c.id)}
                                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                        >
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">System Activity Logs</h3>
                            <Link href={route('activity-logs.index')} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center">
                                View Logs <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
                            </Link>
                        </div>

                        <div className="space-y-3.5">
                            {recentLogs.map((log) => (
                                <div key={log.id} className="flex items-start space-x-3 text-xs p-3 rounded-xl bg-slate-800/30 border border-slate-800/80">
                                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                                        <Clock className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-200">{log.description}</p>
                                        <span className="text-[10px] text-slate-500">
                                            {new Date(log.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </NewsletterLayout>
    );
}
