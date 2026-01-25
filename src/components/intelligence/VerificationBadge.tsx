import { CheckCircle, Users, TrendingUp, AlertCircle } from "lucide-react";
import { VerificationInfo, VerificationStatus } from "@/types/intelligence";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
    verification: VerificationInfo;
    showTooltip?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "minimal";
}

export const VerificationBadge = ({
    verification,
    showTooltip = true,
    size = "md",
    variant = "default",
}: VerificationBadgeProps) => {
    const getBadgeConfig = () => {
        switch (verification.status) {
            case VerificationStatus.VERIFIED:
                return {
                    icon: CheckCircle,
                    color: "text-green-600",
                    bg: "bg-green-100 dark:bg-green-900/20",
                    border: "border-green-300 dark:border-green-700",
                    label: "Verified",
                    tooltip: `Verified by ${verification.verifiedBy || "organizer"}${verification.verifiedAt
                            ? ` on ${new Date(verification.verifiedAt).toLocaleDateString()}`
                            : ""
                        }`,
                };
            case VerificationStatus.COMMUNITY_VERIFIED:
                return {
                    icon: Users,
                    color: "text-blue-600",
                    bg: "bg-blue-100 dark:bg-blue-900/20",
                    border: "border-blue-300 dark:border-blue-700",
                    label: "Community Verified",
                    tooltip: "Verified by multiple community members",
                };
            case VerificationStatus.ESTIMATED:
                return {
                    icon: TrendingUp,
                    color: "text-yellow-600",
                    bg: "bg-yellow-100 dark:bg-yellow-900/20",
                    border: "border-yellow-300 dark:border-yellow-700",
                    label: "Estimated",
                    tooltip: verification.source || "Estimated from industry sources",
                };
            case VerificationStatus.UNVERIFIED:
                return {
                    icon: AlertCircle,
                    color: "text-gray-500",
                    bg: "bg-gray-100 dark:bg-gray-900/20",
                    border: "border-gray-300 dark:border-gray-700",
                    label: "Unverified",
                    tooltip: "This information has not been verified",
                };
            default:
                return null;
        }
    };

    const config = getBadgeConfig();
    if (!config) return null;

    const Icon = config.icon;

    const iconSizes = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    const paddingSizes = {
        sm: "px-2 py-0.5",
        md: "px-2.5 py-1",
        lg: "px-3 py-1.5",
    };

    if (variant === "minimal") {
        const content = (
            <div className={cn("inline-flex items-center gap-1", config.color)}>
                <Icon className={iconSizes[size]} />
                {verification.confidence && (
                    <span className={cn("font-medium", textSizes[size])}>
                        {verification.confidence}%
                    </span>
                )}
            </div>
        );

        if (!showTooltip) return content;

        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>{content}</TooltipTrigger>
                    <TooltipContent>
                        <p>{config.tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    const content = (
        <Badge
            variant="outline"
            className={cn(
                "inline-flex items-center gap-1.5 border",
                config.bg,
                config.border,
                config.color,
                paddingSizes[size]
            )}
        >
            <Icon className={iconSizes[size]} />
            <span className={cn("font-medium", textSizes[size])}>{config.label}</span>
            {verification.confidence && (
                <span className={cn("opacity-75", textSizes[size])}>
                    ({verification.confidence}%)
                </span>
            )}
        </Badge>
    );

    if (!showTooltip) return content;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{content}</TooltipTrigger>
                <TooltipContent>
                    <p>{config.tooltip}</p>
                    {verification.source && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Source: {verification.source}
                        </p>
                    )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
