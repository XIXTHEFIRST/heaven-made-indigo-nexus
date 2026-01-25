import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const StatCardSkeleton = () => (
    <Card className="glass-dark border-white/5">
        <CardContent className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24 bg-white/10" />
                    <Skeleton className="h-10 w-32 bg-white/10" />
                    <Skeleton className="h-4 w-20 bg-white/10" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg bg-white/10" />
            </div>
        </CardContent>
    </Card>
);

export const ChartCardSkeleton = () => (
    <Card className="glass-dark border-white/5 p-6">
        <CardHeader className="p-0 mb-6">
            <Skeleton className="h-6 w-48 bg-white/10 mb-2" />
            <Skeleton className="h-4 w-64 bg-white/10" />
        </CardHeader>
        <div className="h-[200px] flex items-end gap-2">
            {[...Array(6)].map((_, i) => (
                <Skeleton
                    key={i}
                    className="flex-1 bg-white/5"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                />
            ))}
        </div>
    </Card>
);

export const ActionItemSkeleton = () => (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-3">
        <div className="flex justify-between">
            <Skeleton className="h-4 w-12 bg-white/10" />
            <Skeleton className="h-4 w-4 bg-white/10" />
        </div>
        <Skeleton className="h-4 w-full bg-white/10" />
        <Skeleton className="h-3 w-2/3 bg-white/10" />
        <div className="flex justify-between pt-2 border-t border-white/5">
            <Skeleton className="h-3 w-16 bg-white/10" />
            <Skeleton className="h-5 w-5 rounded-full bg-white/10" />
        </div>
    </div>
);
