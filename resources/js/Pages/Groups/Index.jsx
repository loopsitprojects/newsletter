import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import NewsletterLayout from '@/Layouts/NewsletterLayout';
import { FolderKanban, Plus, Users, Edit, Trash2, X, Tag } from 'lucide-react';

export default function GroupsIndex({ groups }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#64748b'];

    const createForm = useForm({
        name: '',
        description: '',
        color: '#3b82f6',
    });

    const editForm = useForm({
        name: '',
        description: '',
        color: '#3b82f6',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post(route('groups.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const openEditModal = (group) => {
        setSelectedGroup(group);
        editForm.setData({
            name: group.name,
            description: group.description || '',
            color: group.color || '#3b82f6',
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editForm.put(route('groups.update', selectedGroup.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setSelectedGroup(null);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this subscriber group?')) {
            router.delete(route('groups.destroy', id));
        }
    };

    return (
        <NewsletterLayout header="Subscriber Groups & Segments">
            <Head title="Subscriber Groups - Email Marketing Hub" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">Custom Subscriber Groups</h1>
                        <p className="text-xs text-slate-400">Organize and target specific audience segments with campaigns</p>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition"
                    >
                        <Plus className="h-4 w-4 mr-1.5" /> Create Group
                    </button>
                </div>

                {/* Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-slate-700 transition group"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="h-4 w-4 rounded-full shadow-md" style={{ backgroundColor: group.color || '#6366f1' }}></div>
                                        <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition">{group.name}</h3>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() => openEditModal(group)}
                                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(group.id)}
                                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-400 min-h-[36px] line-clamp-2">
                                    {group.description || 'No description provided.'}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                                <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-semibold">
                                    <Users className="h-4 w-4 text-slate-400" />
                                    <span>{group.subscribers_count} Subscribers</span>
                                </div>

                                <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                                    {group.slug}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Group Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Create Subscriber Group</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Group Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. VIP Customers"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                />
                                {createForm.errors.name && <p className="text-xs text-rose-400 mt-1">{createForm.errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    placeholder="Target audience segment description..."
                                    value={createForm.data.description}
                                    onChange={(e) => createForm.setData('description', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">Tag Color</label>
                                <div className="flex items-center space-x-3">
                                    {colors.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => createForm.setData('color', c)}
                                            className={`h-7 w-7 rounded-full transition transform hover:scale-110 ${
                                                createForm.data.color === c ? 'ring-2 ring-white scale-110' : ''
                                            }`}
                                            style={{ backgroundColor: c }}
                                        ></button>
                                    ))}
                                </div>
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
                                    disabled={createForm.processing}
                                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                                >
                                    Create Group
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Group Modal */}
            {isEditModalOpen && selectedGroup && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Edit Group</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Group Name</label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">Tag Color</label>
                                <div className="flex items-center space-x-3">
                                    {colors.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => editForm.setData('color', c)}
                                            className={`h-7 w-7 rounded-full transition transform hover:scale-110 ${
                                                editForm.data.color === c ? 'ring-2 ring-white scale-110' : ''
                                            }`}
                                            style={{ backgroundColor: c }}
                                        ></button>
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
                                    Update Group
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NewsletterLayout>
    );
}
