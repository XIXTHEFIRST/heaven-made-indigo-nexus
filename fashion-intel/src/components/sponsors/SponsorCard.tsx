import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sponsor } from "@/types/intelligence";
import { Building2, TrendingUp, Calendar, Edit3 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SponsorCardProps {
    sponsor: Sponsor;
    onEdit?: (sponsor: Sponsor) => void;
}

export const SponsorCard = ({ sponsor, onEdit }: SponsorCardProps) => {
    return (
        <Card className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer relative overflow-hidden">
            {onEdit && (
                <div className="absolute top-4 left-4 z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onEdit(sponsor);
                        }}
                        className="p-2 bg-black-deep/40 backdrop-blur-md rounded-full text-white hover:bg-intelligence-primary transition-colors border border-white/10"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                </div>
            )}

            <Link to={`/sponsors/${sponsor.id}`}>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-5 h-5 text-intelligence-accent" />
                                <h3 className="text-xl font-semibold group-hover:text-intelligence-primary transition-colors">
                                    {sponsor.name}
                                </h3>
                            </div>
                            <Badge variant="secondary" className="mb-2">
                                {sponsor.industry}
                            </Badge>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {sponsor.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Total Investment</p>
                            <p className="text-lg font-bold text-intelligence-primary">
                                ₦{(sponsor.totalSponsorship / 1000000).toFixed(1)}M
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Avg. ROI</p>
                            <p className="text-lg font-bold text-data-green flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {sponsor.averageROI.toFixed(1)}x
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            {sponsor.eventsSponsored.length} events sponsored
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Since {format(new Date(sponsor.activeSince), "yyyy")}
                        </span>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};
