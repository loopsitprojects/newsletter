import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    FolderKanban,
    Send,
    LayoutTemplate,
    Zap,
    History,
    ExternalLink,
    LogOut,
    Menu,
    X,
    Mail,
    Bell,
    User,
    ChevronDown,
} from 'lucide-react';

export default function NewsletterLayout({ children, header }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, current: route().current('dashboard') },
        { name: 'Subscribers', href: route('subscribers.index'), icon: Users, current: route().current('subscribers.*') },
        { name: 'Groups', href: route('groups.index'), icon: FolderKanban, current: route().current('groups.*') },
        { name: 'Email Campaigns', href: route('campaigns.index'), icon: Send, current: route().current('campaigns.*') },
        { name: 'Email Templates', href: route('templates.index'), icon: LayoutTemplate, current: route().current('templates.*') },
        { name: 'Automations', href: route('automations.index'), icon: Zap, current: route().current('automations.*') },
        { name: 'Activity Logs', href: route('activity-logs.index'), icon: History, current: route().current('activity-logs.*') },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row antialiased selection:bg-indigo-500 selection:text-white">
            {/* Mobile Header */}
            <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-white tracking-wide">Marketing Hub</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                >
                    {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 border-r border-slate-800/80 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:w-64 flex flex-col justify-between ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div>
                    {/* Brand */}
                    <div className="h-16 px-6 flex items-center space-x-3 border-b border-slate-800/80">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <Mail className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-base text-white tracking-tight">Campaign Center</h1>
                            <p className="text-xs text-indigo-400 font-medium">Newsletter Engine</p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="p-4 space-y-1.5">
                        <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-2">Main Navigation</p>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                                        item.current
                                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                    }`}
                                >
                                    <Icon
                                        className={`h-4 w-4 mr-3 transition-colors ${
                                            item.current ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                                        }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="p-4 border-t border-slate-800/80 space-y-3">
                    <a
                        href={route('public.signup')}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
                    >
                        <span className="flex items-center">
                            <ExternalLink className="h-3.5 w-3.5 mr-2" /> Live Public Signup Form
                        </span>
                    </a>

                    <div className="relative">
                        <button
                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            className="flex items-center justify-between w-full p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition"
                        >
                            <div className="flex items-center space-x-2.5 truncate">
                                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                                    {auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <div className="text-left truncate">
                                    <div className="text-xs font-semibold text-white truncate">{auth.user?.name || 'Admin'}</div>
                                    <div className="text-[10px] text-slate-400 truncate">{auth.user?.email || 'admin@example.com'}</div>
                                </div>
                            </div>
                            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                        </button>

                        {userDropdownOpen && (
                            <div className="absolute bottom-full left-0 mb-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 z-50">
                                <Link
                                    href={route('profile.edit')}
                                    className="flex items-center px-4 py-2 text-xs text-slate-300 hover:bg-slate-700"
                                >
                                    <User className="h-3.5 w-3.5 mr-2 text-slate-400" /> Account Profile
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="flex items-center w-full px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 text-left"
                                >
                                    <LogOut className="h-3.5 w-3.5 mr-2 text-red-400" /> Sign Out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Workspace */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Header Bar */}
                <header className="hidden md:flex h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-8 items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-lg font-bold text-white tracking-tight">{header}</h2>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mx-6 mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center justify-between shadow-lg shadow-emerald-500/5 animate-fade-in">
                        <span>✨ {flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-6 mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-medium flex items-center justify-between shadow-lg shadow-rose-500/5 animate-fade-in">
                        <span>⚠️ {flash.error}</span>
                    </div>
                )}

                {/* Page Content */}
                <main className="p-4 sm:p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
