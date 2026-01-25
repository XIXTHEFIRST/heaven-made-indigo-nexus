import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onReset: () => void;
    placeholder?: string;
    className?: string;
    children?: React.ReactNode;
}

export const FilterBar = ({
    searchQuery,
    onSearchChange,
    onReset,
    placeholder = "Search...",
    className,
    children,
}: FilterBarProps) => {
    return (
        <div className={cn("flex flex-col md:flex-row gap-4 items-start md:items-center", className)}>
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-10"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            {children}
            <Button
                variant="outline"
                onClick={onReset}
                className="whitespace-nowrap"
            >
                Reset Filters
            </Button>
        </div>
    );
};
