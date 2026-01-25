import { useState } from "react";
import { generateEventAnalysis, AIAnalysisResponse } from "@/services/geminiService";
import { toast } from "sonner";

export const useGeminiAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyze = async (
        eventName: string,
        brand: string,
        type: string,
        description: string
    ): Promise<AIAnalysisResponse | null> => {
        if (!eventName || !description) {
            toast.error("Please provide an event name and description for analysis.");
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            // Add a timeout of 30 seconds as per requirements
            const analysisPromise = generateEventAnalysis(eventName, brand, type, description);
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("AI analysis timed out. Please try again.")), 30000)
            );

            const result = (await Promise.race([analysisPromise, timeoutPromise])) as AIAnalysisResponse;

            toast.success("AI analysis generated successfully!");
            return result;
        } catch (err: any) {
            const message = err.message || "Something went wrong with the AI analysis.";
            setError(message);
            toast.error(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { analyze, loading, error };
};
