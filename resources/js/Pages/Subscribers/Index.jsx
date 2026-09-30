import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import {
    Users,
    Search,
    Filter,
    Plus,
    Upload,
    Download,
    Trash2,
    Edit,
    X,
    Check,
    Mail,
    FileSpreadsheet,
} from 'lucide-react';

export default function SubscribersIndex({ subscribers, groups, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [groupId, setGroupId] = useState(filters.group_id || 'all');

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState(null);

    // Form for Create
    const addForm = useForm({
        email: '',
        first_name: '',
        last_name: '',
        status: 'active',
        group_ids: [],
    });

    // Form for Edit
    const editForm = useForm({
        email: '',
        first_name: '',
        last_name: '',
        status: 'active',
        group_ids: [],
    });

    // Form for Import
    const importForm = useForm({
        csv_file: null,
        csv_text: '',
        group_id: '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('subscribers.index'), { search, status, group_id: groupId }, { preserveState: true });
    };

    const handleResetFilters = () => {
        setSearch('');
        setStatus('all');
        setGroupId('all');
        router.get(route('subscribers.index'));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addForm.post(route('subscribers.store'), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                addForm.reset();
            },
        });
    };

    const openEditModal = (sub) => {
        setSelectedSubscriber(sub);
        editForm.setData({
            email: sub.email,
            first_name: sub.first_name || '',
            last_name: sub.last_name || '',
            status: sub.status,
            group_ids: sub.groups ? sub.groups.map((g) => g.id) : [],
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.put(route('subscribers.update', selectedSubscriber.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setSelectedSubscriber(null);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this subscriber?')) {
            router.delete(route('subscribers.destroy', id));
        }
    };

    const handleImportSubmit = (e) => {
        e.preventDefault();
        importForm.post(route('subscribers.import'), {
            onSuccess: () => {
                setIsImportModalOpen(false);
                importForm.reset();
            },
        });
    };

    return (
        <NewsletterLayout header="Subscriber Management">
            <Head title="Subscribers - Email Marketing Hub" />

            <div className="space-y-6">
                {/* Top Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">Audience Subscribers</h1>
                        <p className="text-xs text-slate-400">Total {subscribers.total} registered contacts</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href={route('subscribers.export')}
                            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                        >
                            <Download className="h-4 w-4 mr-2 text-slate-400" /> Export CSV
                        </a>
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold border border-slate-700 transition"
                        >
                            <Upload className="h-4 w-4 mr-2" /> Import CSV
                        </button>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition"
                        >
                            <Plus className="h-4 w-4 mr-1.5" /> Add Subscriber
                        </button>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <form onSubmit={handleFilter} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by email, first name, last name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="unsubscribed">Unsubscribed</option>
                            <option value="bounced">Bounced</option>
                        </select>

                        <select
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="all">All Subscriber Groups</option>
                            {groups.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>

                        <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition">
                            Apply Filter
                        </button>
                        <button type="button" onClick={handleResetFilters} className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs hover:text-white transition">
                            Reset
                        </button>
                    </div>
                </form>

                {/* Subscribers Table */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-800/50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                                <tr>
                                    <th className="py-4 px-6">Subscriber</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6">Groups</th>
                                    <th className="py-4 px-6">Consent Source</th>
                                    <th className="py-4 px-6">Joined Date</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {subscribers.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-slate-500">
                                            No subscribers match the selected criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    subscribers.data.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-slate-800/30 transition">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-indigo-400">
                                                        {sub.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white">{sub.email}</div>
                                                        <div className="text-xs text-slate-400">
                                                            {sub.first_name || sub.last_name ? `${sub.first_name ?? ''} ${sub.last_name ?? ''}` : 'No name set'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                        sub.status === 'active'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                            : sub.status === 'pending'
                                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                            : sub.status === 'unsubscribed'
                                                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                            : 'bg-slate-700 text-slate-300'
                                                    }`}
                                                >
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-1">
                                                    {sub.groups && sub.groups.length > 0 ? (
                                                        sub.groups.map((g) => (
                                                            <span
                                                                key={g.id}
                                                                className="px-2 py-0.5 text-[10px] font-semibold rounded-md text-white"
                                                                style={{ backgroundColor: g.color || '#6366f1' }}
                                                            >
                                                                {g.name}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-slate-500 text-xs">Unassigned</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-xs text-slate-400">
                                                {sub.consent_source || 'Web Form'}
                                            </td>
                                            <td className="py-4 px-6 text-xs text-slate-400">
                                                {new Date(sub.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(sub)}
                                                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(sub.id)}
                                                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination links */}
                    {subscribers.links && subscribers.links.length > 3 && (
                        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                                Showing {subscribers.from} to {subscribers.to} of {subscribers.total}
                            </span>
                            <div className="flex space-x-1">
                                {subscribers.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-slate-800 text-slate-400 hover:text-white'
                                        } ${!link.url && 'opacity-50 pointer-events-none'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Subscriber Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Add New Subscriber</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    value={addForm.data.email}
                                    onChange={(e) => addForm.setData('email', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                />
                                {addForm.errors.email && <p className="text-xs text-rose-400 mt-1">{addForm.errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={addForm.data.first_name}
                                        onChange={(e) => addForm.setData('first_name', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={addForm.data.last_name}
                                        onChange={(e) => addForm.setData('last_name', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                                <select
                                    value={addForm.data.status}
                                    onChange={(e) => addForm.setData('status', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="unsubscribed">Unsubscribed</option>
                                    <option value="bounced">Bounced</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">Assign Groups</label>
                                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                                    {groups.map((g) => (
                                        <label key={g.id} className="flex items-center space-x-2 text-xs text-slate-300">
                                            <input
                                                type="checkbox"
                                                checked={addForm.data.group_ids.includes(g.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        addForm.setData('group_ids', [...addForm.data.group_ids, g.id]);
                                                    } else {
                                                        addForm.setData(
                                                            'group_ids',
                                                            addForm.data.group_ids.filter((id) => id !== g.id)
                                                        );
                                                    }
                                                }}
                                                className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
                                            />
                                            <span>{g.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={addForm.processing}
                                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                                >
                                    Save Subscriber
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Subscriber Modal */}
            {isEditModalOpen && selectedSubscriber && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Edit Subscriber</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={editForm.data.email}
                                    onChange={(e) => editForm.setData('email', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={editForm.data.first_name}
                                        onChange={(e) => editForm.setData('first_name', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={editForm.data.last_name}
                                        onChange={(e) => editForm.setData('last_name', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                                <select
                                    value={editForm.data.status}
                                    onChange={(e) => editForm.setData('status', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="unsubscribed">Unsubscribed</option>
                                    <option value="bounced">Bounced</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">Assign Groups</label>
                                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                                    {groups.map((g) => (
                                        <label key={g.id} className="flex items-center space-x-2 text-xs text-slate-300">
                                            <input
                                                type="checkbox"
                                                checked={editForm.data.group_ids.includes(g.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        editForm.setData('group_ids', [...editForm.data.group_ids, g.id]);
                                                    } else {
                                                        editForm.setData(
                                                            'group_ids',
                                                            editForm.data.group_ids.filter((id) => id !== g.id)
                                                        );
                                                    }
                                                }}
                                                className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
                                            />
                                            <span>{g.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                                >
                                    Update Subscriber
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Import CSV Modal */}
            {isImportModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center">
                                <FileSpreadsheet className="h-5 w-5 mr-2 text-emerald-400" /> Import Subscribers via CSV
                            </h3>
                            <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleImportSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Upload CSV File</label>
                                <input
                                    type="file"
                                    accept=".csv,.txt"
                                    onChange={(e) => importForm.setData('csv_file', e.target.files[0])}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white"
                                />
                            </div>

                            <div className="text-center text-xs text-slate-500 font-bold uppercase tracking-wider">— OR Paste CSV Text —</div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">CSV Text (email, first_name, last_name)</label>
                                <textarea
                                    rows="4"
                                    placeholder="john@example.com, John, Doe&#10;sarah@example.com, Sarah, Smith"
                                    value={importForm.data.csv_text}
                                    onChange={(e) => importForm.setData('csv_text', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Assign Imported Subscribers to Group</label>
                                <select
                                    value={importForm.data.group_id}
                                    onChange={(e) => importForm.setData('group_id', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="">None (General List)</option>
                                    {groups.map((g) => (
                                        <option key={g.id} value={g.id}>
                                            {g.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsImportModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={importForm.processing}
                                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-600/20"
                                >
                                    Start CSV Import
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NewsletterLayout>
    );
}
