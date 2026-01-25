import React, { useState } from 'react';
import { useIntelligenceStore } from '@/stores/intelligenceStore';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Trash2, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TeamNotesProps {
    entityType: 'event' | 'sponsor';
    entityId: string;
}

const TeamNotes: React.FC<TeamNotesProps> = ({ entityType, entityId }) => {
    const { notes, addNote, deleteNote } = useIntelligenceStore();
    const { profile } = useAuth();
    const [newNote, setNewNote] = useState('');
    const [replyTo, setReplyTo] = useState<string | null>(null);

    const entityNotes = notes.filter(n => n.entity_type === entityType && n.entity_id === entityId);
    const parentNotes = entityNotes.filter(n => !n.parent_id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        await addNote({
            entityType,
            entityId,
            content: newNote,
            parentId: replyTo || undefined
        });

        setNewNote('');
        setReplyTo(null);
    };

    const NoteItem = ({ note, isReply = false }: { note: any, isReply?: boolean }) => (
        <div className={`group flex gap-3 ${isReply ? 'ml-8 mt-4 pt-4 border-t border-white/5' : 'py-4 border-b border-white/5 last:border-0'}`}>
            <Avatar className="h-8 w-8 border border-white/10">
                <AvatarImage src={note.profiles?.avatar_url} />
                <AvatarFallback className="bg-indigo-600 text-[10px] text-white">
                    {note.profiles?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{note.profiles?.full_name || 'Team Member'}</span>
                        <span className="text-[10px] text-zinc-500">{formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!isReply && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-zinc-500 hover:text-white"
                                onClick={() => setReplyTo(note.id)}
                            >
                                <Reply className="h-3 w-3" />
                            </Button>
                        )}
                        {profile?.id === note.author_id && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-zinc-500 hover:text-red-400"
                                onClick={() => deleteNote(note.id)}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{note.content}</p>

                {!isReply && entityNotes.filter(r => r.parent_id === note.id).map(reply => (
                    <NoteItem key={reply.id} note={reply} isReply />
                ))}
            </div>
        </div>
    );

    return (
        <Card className="glass-dark border-white/10">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-400" />
                    Team Discussion
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-1">
                    {parentNotes.length === 0 ? (
                        <div className="text-center py-6 border border-dashed border-white/10 rounded-lg">
                            <p className="text-xs text-zinc-500">No notes yet. Start the conversation!</p>
                        </div>
                    ) : (
                        parentNotes.map(note => <NoteItem key={note.id} note={note} />)
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {replyTo && (
                        <div className="flex items-center justify-between bg-indigo-500/10 px-3 py-1.5 rounded-md border border-indigo-500/20">
                            <span className="text-[10px] text-indigo-300">Replying to note...</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 text-indigo-300 hover:text-white"
                                onClick={() => setReplyTo(null)}
                            >
                                <Trash2 className="h-2 w-2" />
                            </Button>
                        </div>
                    )}
                    <div className="relative">
                        <Textarea
                            placeholder="Add a note or mention someone with @..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="min-h-[100px] bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus:ring-indigo-500/50 pr-12"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!newNote.trim()}
                            className="absolute bottom-3 right-3 bg-indigo-600 hover:bg-indigo-500 text-white h-8 w-8"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default TeamNotes;
