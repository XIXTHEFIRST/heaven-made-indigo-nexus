import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { MyEvent } from "@/types/intelligence";
import { format } from "date-fns";

export const generateStrategyPDF = async (event: MyEvent) => {
    const doc = new jsPDF();
    const emerald = "#059669";
    const darkEmerald = "#064e3b";
    const gray = "#6b7280";

    // --- Header Section ---
    // Background accent
    doc.setFillColor(emerald);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor("#FFFFFF");
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Fashion Intelligence Report", 20, 25);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on ${format(new Date(), "PPpp")}`, 20, 32);

    // --- Project Vision ---
    doc.setTextColor(darkEmerald);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("1. Project Vision", 20, 55);

    doc.setDrawColor(emerald);
    doc.setLineWidth(0.5);
    doc.line(20, 58, 65, 58);

    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text(`Name: ${event.name}`, 20, 68);
    doc.text(`Format: ${event.type}`, 20, 75);
    doc.text(`Target Audience: ${Array.isArray(event.targetAudience) ? event.targetAudience.join(", ") : event.targetAudience}`, 20, 82);

    doc.setFont("helvetica", "italic");
    doc.setTextColor(gray);
    doc.text("Unique Strategic Angle:", 20, 92);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#000000");
    const angleText = doc.splitTextToSize(event.uniqueAngle, 170);
    doc.text(angleText, 20, 98);

    // --- Market Gap Analysis ---
    let yPos = 115 + (angleText.length * 5);
    doc.setTextColor(darkEmerald);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("2. Market Gap Analysis", 20, yPos);
    doc.line(20, yPos + 3, 85, yPos + 3);

    yPos += 12;
    if (event.aiRecommendations?.marketGaps) {
        event.aiRecommendations.marketGaps.forEach((gap, index) => {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            doc.setFont("helvetica", "bold");
            doc.setTextColor(emerald);
            doc.text(`${index + 1}. ${gap.title}`, 20, yPos);

            yPos += 6;
            doc.setFont("helvetica", "normal");
            doc.setTextColor("#000000");
            const descText = doc.splitTextToSize(gap.description, 170);
            doc.text(descText, 20, yPos);

            yPos += (descText.length * 6) + 4;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(`Strategic Sponsors to Target: ${gap.potentialSponsors.join(", ")}`, 20, yPos);
            yPos += 12;
            doc.setFontSize(12);
        });
    }

    // --- Sponsor Target Matrix ---
    if (yPos > 220) {
        doc.addPage();
        yPos = 20;
    } else {
        yPos += 10;
    }

    doc.setTextColor(darkEmerald);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("3. Sponsor Target Matrix", 20, yPos);
    doc.line(20, yPos + 3, 90, yPos + 3);

    yPos += 15;
    if (event.aiRecommendations?.sponsorMatches) {
        const tableData = event.aiRecommendations.sponsorMatches.map(m => [
            m.sponsorId,
            `${m.fitScore || m.probability}%`,
            m.pitchAngle
        ]);

        (doc as any).autoTable({
            startY: yPos,
            head: [['Sponsor / Sector', 'Match Probability', 'Recommended Pitch Angle']],
            body: tableData,
            headStyles: { fillColor: emerald },
            styles: { fontSize: 10, cellPadding: 5 },
            columnStyles: { 0: { fontStyle: 'bold' } }
        });
    }

    // --- Footer ---
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(gray);
        doc.text(`Fashion Intelligence System - Lagos Strategic Architecture - Page ${i} of ${pageCount}`, 105, 285, { align: "center" });
    }

    // Save PDF
    doc.save(`${event.name.replace(/\s+/g, '_')}_Strategy_Report.pdf`);
};

export const shareStrategy = async (event: MyEvent) => {
    const shareData = {
        title: `Fashion Intelligence: ${event.name}`,
        text: `Check out the strategic architecture for ${event.name}. Angle: ${event.uniqueAngle}`,
        url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.error("Share failed:", err);
        }
    } else {
        // Fallback: Copy summary to clipboard
        const summary = `Project: ${event.name}\nStrategy: ${event.uniqueAngle}\nAnalysis via Fashion Intelligence System.`;
        await navigator.clipboard.writeText(summary);
        return "copied";
    }
};
