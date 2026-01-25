import React from 'react';
import { useIntelligenceStore } from '@/stores/intelligenceStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, RefreshCw, Trash2, Calendar, User, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const ActivityFeed = () => {
    const { activities, loading } = useIntelligenceStore();

    const getIcon = (type: string) => {
        switch (type) {
            case 'create': return <PlusCircle className="h-4 w-4 text-green-500" />;
            case 'update': return <RefreshCw className="h-4 w-4 text-blue-500" />;
            case 'delete': return <Trash2 className="h-4 w-4 text-red-500" />;
            default: return <Zap className="h-4 w-4 text-amber-500" />;
        }
    };

    return (
        <Card className="glass-dark border-white/10 h-full">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Zap className="h-5 w-5 text-indigo-400" />
                    Team Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <div key={i} className="relative pl-6 pb-6 border-l border-white/10 last:pb-0">
                                    <div className="absolute left-[-9px] top-0 p-1 bg-black border border-white/10 rounded-full">
                                        <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Skeleton className="h-4 w-full bg-white/10" />
                                        <Skeleton className="h-3 w-1/3 bg-white/10" />
                                    </div>
                                </div>
                            ))
                        ) : activities.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-zinc-500 text-sm">No recent activity</p>
                            </div>
                        ) : (
                            activities.map((activity) => (
                                <div key={activity.id} className="relative pl-6 pb-6 border-l border-white/10 last:pb-0">
                                    <div className="absolute left-[-9px] top-0 p-1 bg-black border border-white/10 rounded-full">
                                        {getIcon(activity.type)}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-white">
                                            <span className="font-semibold text-indigo-400">Team Member</span>{' '}
                                            {activity.type === 'create' ? 'added' : activity.type === 'update' ? 'updated' : 'deleted'}{' '}
                                            <span className="font-medium">{activity.entityName}</span>
                                        </p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                                                <Calendar className="h-3 w-3" />
                                                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                            </span>
                                            <span className="flex items-center gap-1 text-[11px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full capitalize">
                                                {activity.entityType}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default ActivityFeed;
