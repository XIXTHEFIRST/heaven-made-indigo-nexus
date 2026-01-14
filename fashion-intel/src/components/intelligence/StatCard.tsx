import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    iconColor?: string;
}

export const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    className,
    iconColor = "text-intelligence-primary",
}: StatCardProps) => {
    return (
        <Card className={cn("hover:shadow-card-hover transition-all duration-300", className)}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
                        {trend && (
                            <div className="flex items-center gap-1 mt-2">
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        trend.isPositive ? "text-green-600" : "text-red-600"
                                    )}
                                >
                                    {trend.isPositive ? "+" : ""}
                                    {trend.value}%
                                </span>
                                <span className="text-xs text-muted-foreground">vs last period</span>
                            </div>
                        )}
                    </div>
                    <div
                        className={cn(
                            "p-3 rounded-lg bg-gradient-to-br from-intelligence-primary/10 to-intelligence-accent/5",
                            iconColor
                        )}
                    >
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
