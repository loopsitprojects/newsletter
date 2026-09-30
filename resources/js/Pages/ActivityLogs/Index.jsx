import React from 'react';
import { Head } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import { History, Clock, User, ShieldCheck } from 'lucide-react';

export default function ActivityLogsIndex({ logs }) {
    return (
        <NewsletterLayout header="System Audit Activity Logs">
            <Head title="Activity Logs - Email Marketing Hub" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">Activity & Audit Trail</h1>
                    <p className="text-xs text-slate-400">Complete historical log of administrative actions, campaigns, and subscriber changes</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-800/50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                                <tr>
                                    <th className="py-4 px-6">Timestamp</th>
                                    <th className="py-4 px-6">Action</th>
                                    <th className="py-4 px-6">Description</th>
                                    <th className="py-4 px-6">Performed By</th>
                                    <th className="py-4 px-6">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {logs.data.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-800/30">
                                        <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                                            {new Date(log.created_at).toLocaleString()}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-200 text-xs font-medium">{log.description}</td>
                                        <td className="py-4 px-6 text-xs text-slate-400">
                                            {log.user?.name || 'System / Public'}
                                        </td>
                                        <td className="py-4 px-6 text-xs font-mono text-slate-500">{log.ip_address || '127.0.0.1'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </NewsletterLayout>
    );
}
