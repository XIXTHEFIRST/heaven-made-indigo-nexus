import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Event } from "@/types/intelligence";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, DollarSign, TrendingUp, Share2 } from "lucide-react";
import { format } from "date-fns";

interface ComparisonModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: Event[];
}

export const ComparisonModal = ({ isOpen, onClose, events }: ComparisonModalProps) => {
    if (events.length === 0) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif">Event Comparison</DialogTitle>
                    <DialogDescription>
                        Compare {events.length} selected events side-by-side.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Metric</TableHead>
                                {events.map((event) => (
                                    <TableHead key={event.id} className="min-w-[200px] text-center">
                                        <div className="flex flex-col items-center">
                                            <Badge variant="secondary" className="mb-2">
                                                {event.type}
                                            </Badge>
                                            <span className="font-bold text-intelligence-primary">
                                                {event.name}
                                            </span>
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    Date
                                </TableCell>
                                {events.map((event) => (
                                    <TableCell key={event.id} className="text-center">
                                        {format(new Date(event.date), "MMM dd, yyyy")}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    Location
                                </TableCell>
                                {events.map((event) => (
                                    <TableCell key={event.id} className="text-center">
                                        {event.location}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                    Est. Attendance
                                </TableCell>
                                {events.map((event) => (
                                    <TableCell key={event.id} className="text-center">
                                        {event.estimatedAttendance.toLocaleString()}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                                    Budget Range
                                </TableCell>
                                {events.map((event) => (
                                    <TableCell key={event.id} className="text-center">
                                        ₦{(event.budget.min / 1000000).toFixed(0)}M - ₦{(event.budget.max / 1000000).toFixed(0)}M
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                    Social Reach
                                </TableCell>
                                {events.map((event) => (
                                    <TableCell key={event.id} className="text-center font-semibold text-data-blue">
                                        {(event.mediaMetrics.socialReach / 1000000).toFixed(1)}M
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <Share2 className="w-4 h-4 text-muted-foreground" />
                                    Engagement
                                </TableCell>
                                {events.map((event) => (
                                    <TableCell key={event.id} className="text-center font-semibold text-data-teal">
                                        {(event.mediaMetrics.engagement / 1000).toFixed(0)}K
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Sponsor Count</TableCell>
                                {events.map((event) => (
                                    <TableCell key={event.id} className="text-center">
                                        {event.sponsors.length}
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Verification</TableCell>
                                {events.map((event) => (
                                    <TableCell key={event.id} className="text-center">
                                        <Badge variant={event.verification.status === "verified" ? "default" : "outline"}>
                                            {event.verification.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
};
