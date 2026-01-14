import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
    action?: ReactNode;
}

export const ChartCard = ({
    title,
    description,
    children,
    className,
    action,
}: ChartCardProps) => {
    return (
        <Card className={cn("hover:shadow-subtle transition-shadow duration-300", className)}>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                        {description && (
                            <CardDescription className="mt-1">{description}</CardDescription>
                        )}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};
