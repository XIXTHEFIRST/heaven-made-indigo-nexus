import { Calendar, MapPin, Users, DollarSign, Edit3, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/intelligence";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { VerificationBadge } from "@/components/intelligence/VerificationBadge";

interface EventCardProps {
    event: Event;
    isSelected?: boolean;
    onToggleSelect?: (id: string) => void;
    onEdit?: (event: Event) => void;
}

export const EventCard = ({ event, isSelected, onToggleSelect, onEdit }: EventCardProps) => {
    const hasAutopsy = !!event.autopsyReport;

    return (
        <Card
            className={cn(
                "group hover:shadow-card-hover transition-all duration-500 cursor-pointer relative overflow-hidden glass-dark border-white/5",
                isSelected && "ring-2 ring-intelligence-primary shadow-2xl shadow-intelligence-primary/20",
                hasAutopsy && "border-intelligence-primary/30"
            )}
        >
            {onToggleSelect && (
                <div className="absolute top-4 right-4 z-10">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                            e.stopPropagation();
                            onToggleSelect(event.id);
                        }}
                        className="w-5 h-5 rounded border-2 border-intelligence-primary checked:bg-intelligence-primary cursor-pointer accent-intelligence-primary"
                    />
                </div>
            )}

            {onEdit && (
                <div className="absolute top-4 left-4 z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onEdit(event);
                        }}
                        className="p-2 bg-black-deep/60 backdrop-blur-md rounded-full text-white hover:bg-intelligence-primary transition-all duration-300 border border-white/10 hover:scale-110"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                </div>
            )}

            <Link to={`/events/${event.id}`}>
                {/* Visual Flair for Autopsy events */}
                {hasAutopsy && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-intelligence-primary to-intelligence-accent" />
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-intelligence-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-8">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-[10px] uppercase font-bold tracking-wider">
                                    {event.type}
                                </Badge>
                                <VerificationBadge verification={event.verification} size="sm" />
                                {hasAutopsy && (
                                    <Badge className="bg-intelligence-primary/20 text-intelligence-primary border-intelligence-primary/50 text-[10px] font-bold animate-pulse">
                                        <Zap className="w-3 h-3 mr-1" /> INTEL READY
                                    </Badge>
                                )}
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-1 group-hover:text-intelligence-primary transition-colors leading-tight">
                                {event.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <Calendar className="w-3.5 h-3.5 text-intelligence-accent" />
                            <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <MapPin className="w-3.5 h-3.5 text-intelligence-accent" />
                            <span className="truncate">{event.venue || event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <Users className="w-3.5 h-3.5 text-intelligence-accent" />
                            <span>{event.estimatedAttendance.toLocaleString()} scholars</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <DollarSign className="w-3.5 h-3.5 text-intelligence-accent" />
                            <span className="text-white font-bold">₦{(event.budget.max / 1000000).toFixed(1)}M</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex gap-1 overflow-hidden">
                            {(event.tags || []).slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-[9px] border-white/10 px-1.5 py-0 whitespace-nowrap">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex flex-col items-end">
                            <span className="text-intelligence-primary">{event.intelSponsors?.length || event.sponsors.length} SPONSORS</span>
                            <span className="opacity-50">Verified Intel</span>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};
