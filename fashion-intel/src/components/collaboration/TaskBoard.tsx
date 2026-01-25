import React, { useState, useEffect } from "react";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { ActionItemSkeleton } from "@/components/intelligence/SkeletonCards";
import { useAuth } from "@/contexts/AuthContext";
import { Task } from "@/types/intelligence";
import {
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    Plus,
    MoreVertical,
    Calendar,
    User as UserIcon,
    Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface TaskBoardProps {
    entityType?: 'event' | 'sponsor';
    entityId?: string;
    className?: string;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ entityType, entityId, className }) => {
    const { tasks, profiles, loading, addTask, updateTask, deleteTask, fetchProfiles } = useIntelligenceStore();
    const { profile: currentUser } = useAuth();
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    const filteredTasks = tasks.filter(t =>
        (!entityType || t.entityType === entityType) &&
        (!entityId || t.entityId === entityId)
    );

    const columns = [
        { id: 'todo', label: 'To Do', icon: Circle, color: 'text-muted-foreground' },
        { id: 'in-progress', label: 'In Progress', icon: Clock, color: 'text-intelligence-primary' },
        { id: 'review', label: 'Review', icon: AlertCircle, color: 'text-intelligence-accent' },
        { id: 'done', label: 'Completed', icon: CheckCircle2, color: 'text-green-500' }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500/20 text-red-500 border-red-500/50';
            case 'high': return 'bg-orange-500/20 text-orange-500 border-orange-500/50';
            case 'medium': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
        }
    };

    return (
        <div className={cn("space-y-6", className)}>
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xl font-serif font-bold">Action Items</h3>
                    <p className="text-sm text-muted-foreground">Strategic tasks for this {entityType || 'project'}</p>
                </div>
                <Button
                    size="sm"
                    className="bg-intelligence-primary hover:bg-intelligence-primary-dark gap-2"
                    onClick={() => setIsAdding(true)}
                >
                    <Plus className="w-4 h-4" />
                    New Task
                </Button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-dark p-6 rounded-2xl border border-intelligence-primary/30 mb-8"
                    >
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            addTask({
                                title: formData.get('title') as string,
                                description: formData.get('description') as string,
                                priority: formData.get('priority') as any,
                                category: formData.get('category') as any,
                                dueDate: formData.get('dueDate') ? new Date(formData.get('dueDate') as string) : undefined,
                                assignedTo: formData.get('assignedTo') as string || undefined,
                                entityType,
                                entityId,
                                createdBy: currentUser?.id || '',
                                createdAt: new Date()
                            });
                            setIsAdding(false);
                        }} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground px-1">Task Title</label>
                                    <input
                                        name="title"
                                        required
                                        placeholder="e.g., Draft Sponsorship Prospectus"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-intelligence-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground px-1">Assign To</label>
                                    <select
                                        name="assignedTo"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-intelligence-primary/50 outline-none transition-all appearance-none"
                                    >
                                        <option value="">Unassigned</option>
                                        {profiles.map(p => (
                                            <option key={p.id} value={p.id}>{p.full_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground px-1">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Provide context for this action item..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[100px] focus:border-intelligence-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground px-1">Priority</label>
                                    <select name="priority" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none">
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground px-1">Category</label>
                                    <select name="category" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none">
                                        <option value="research">Research</option>
                                        <option value="outreach">Outreach</option>
                                        <option value="logistics">Logistics</option>
                                        <option value="content">Content</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground px-1">Due Date</label>
                                    <input type="date" name="dueDate" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                                <Button type="submit" className="bg-intelligence-primary hover:bg-intelligence-primary-dark">Create Task</Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {columns.map(column => (
                    <div key={column.id} className="space-y-4">
                        <div className="flex items-center gap-2 px-2 py-1">
                            <column.icon className={cn("w-4 h-4", column.color)} />
                            <span className="text-xs font-bold uppercase tracking-widest">{column.label}</span>
                            <Badge variant="outline" className="ml-auto text-[10px] opacity-50 bg-white/5 border-white/10">
                                {filteredTasks.filter(t => t.status === column.id).length}
                            </Badge>
                        </div>

                        <div className="space-y-3 min-h-[200px] rounded-xl bg-black/20 p-2 border border-white/5">
                            {loading ? (
                                <div className="space-y-3">
                                    <ActionItemSkeleton />
                                    <ActionItemSkeleton />
                                </div>
                            ) : (
                                filteredTasks
                                    .filter(t => t.status === column.id)
                                    .map(task => (
                                        <motion.div
                                            key={task.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="group p-3 rounded-lg bg-white/5 border border-white/10 hover:border-intelligence-primary/50 transition-all cursor-pointer shadow-lg"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className={cn("text-[9px] font-bold px-1.5 py-0", getPriorityColor(task.priority))}>
                                                    {task.priority}
                                                </Badge>
                                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-white/10 rounded">
                                                    <MoreVertical className="w-3 h-3 text-muted-foreground" />
                                                </button>
                                            </div>

                                            <h4 className="text-sm font-medium mb-1 line-clamp-2">{task.title}</h4>
                                            {task.description && (
                                                <p className="text-xs text-muted-foreground line-clamp-1 mb-3">{task.description}</p>
                                            )}

                                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                    {task.dueDate && (
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {format(task.dueDate, 'MMM d')}
                                                        </div>
                                                    )}
                                                </div>

                                                <Avatar className="w-5 h-5 border border-white/10">
                                                    <AvatarImage src={task.assignee?.avatar_url} />
                                                    <AvatarFallback className="text-[8px] bg-intelligence-primary/20">
                                                        {task.assignee?.full_name?.charAt(0) || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                        </motion.div>
                                    ))
                            )}

                            {filteredTasks.filter(t => t.status === column.id).length === 0 && (
                                <div className="h-20 flex items-center justify-center border-2 border-dashed border-white/5 rounded-lg opacity-20">
                                    <span className="text-[10px] uppercase font-bold tracking-tighter">Empty</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
