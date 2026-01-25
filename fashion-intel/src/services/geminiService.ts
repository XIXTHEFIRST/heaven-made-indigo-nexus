import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key is missing. AI analysis will be disabled.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export interface AIAnalysisResponse {
    whatWorked: string;
    whatFlopped: string;
    marketGaps: string;
    recommendations: string;
    competitiveInsights: string;
}

export interface AISponsorshipStrategyResponse {
    marketGaps: Array<{
        title: string;
        description: string;
        potentialSponsors: string[];
    }>;
    sponsorMatches: Array<{
        sponsorId: string;
        probability: number;
        pitchAngle: string;
        strategy: string;
        fitScore?: number;
        reason?: string;
    }>;
}

export const generateEventAnalysis = async (
    eventName: string,
    brand: string,
    type: string,
    description: string
): Promise<AIAnalysisResponse> => {
    if (!API_KEY) {
        throw new Error("Gemini API Key is not configured.");
    }

    const prompt = `
    Role: Senior Fashion Industry Strategist (Lagos Market Specialist)
    Context: Analyze the following fashion event in the Lagos market.
    
    Event Details:
    - Name: ${eventName}
    - Brand/Organizer: ${brand}
    - Category: ${type}
    - Description: ${description}
    
    Task: Generate a high-level strategic intelligence report. 
    Important: The response MUST be in RAW JSON format with exactly the following keys:
    {
      "whatWorked": "string (bullet points of strategic success factors)",
      "whatFlopped": "string (bullet points of vulnerabilities or weaknesses)",
      "marketGaps": "string (one major untapped gap identified for competitors)",
      "recommendations": "string (3 actionable next steps for the brand)",
      "competitiveInsights": "string (how this event positions the brand against rivals)"
    }
    
    Tone: Professional, high-level, data-driven, and sharp.
    Constraint: Do not include any markdown formatting or explanations outside the JSON block.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Attempt to parse JSON from response
        try {
            // Find the first '{' and last '}' to handle potential extra text
            const start = text.indexOf('{');
            const end = text.lastIndexOf('}');
            if (start === -1 || end === -1) throw new Error("Invalid AI response format");

            const jsonStr = text.substring(start, end + 1);
            return JSON.parse(jsonStr) as AIAnalysisResponse;
        } catch (parseError) {
            console.error("Failed to parse AI response:", text);
            throw new Error("The AI provided an invalid response format. Please try again.");
        }
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        if (error.message?.includes("429")) {
            throw new Error("AI Rate limit reached. Please wait a moment and try again.");
        }
        throw new Error(error.message || "Failed to generate AI analysis.");
    }
};

export const generateDetailedStrategy = async (
    name: string,
    type: string,
    audience: string,
    angle: string
): Promise<AISponsorshipStrategyResponse> => {
    if (!API_KEY) {
        throw new Error("Gemini API Key is not configured.");
    }

    const prompt = `
    Role: Senior Fashion Sponsorship Architect (West Africa Market Specialist)
    Context: You are designing a sponsorship and market entry strategy for a NEW fashion project in Lagos.
    
    Project Vision:
    - Name: ${name}
    - Format: ${type}
    - Deep Audience Insight: ${audience}
    - The "Edge" (Unique Angle): ${angle}
    
    Task: Generate a precise, high-stakes market intelligence report.
    Important: The response MUST be in RAW JSON format with EXACTLY the following structure:
    {
      "marketGaps": [
        {
          "title": "Short descriptive title (e.g., 'Eco-Retail Deserts in Lekki')",
          "description": "2-sentence analysis of WHY this gap exists and how this event fills it.",
          "potentialSponsors": ["List of 2-3 sector-specific brands active in Nigeria (e.g., Access Bank, Martini, MTN)"]
        }
      ],
      "sponsorMatches": [
        {
          "sponsorId": "Specific brand name or Sector (e.g., 'Heineken' or 'FinTech Sector')",
          "probability": 1-100,
          "pitchAngle": "The specific psychological or business 'hook' for this brand.",
          "strategy": "How to integrate this brand into the event architecture (e.g., 'Immersive AR Catwalk')",
          "fitScore": 1-100,
          "reason": "Data-driven reason for this match."
        }
      ]
    }
    
    Constraint: Provide 3-4 market gaps and 3-4 sponsor matches. Ensure brand names used are relevant to Nigeria/Africa. No markdown formatting.
  `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start === -1 || end === -1) throw new Error("Invalid AI strategy format");

        const jsonStr = text.substring(start, end + 1);
        return JSON.parse(jsonStr) as AISponsorshipStrategyResponse;
    } catch (error: any) {
        console.error("Detailed Strategy Generation Error:", error);
        throw new Error(error.message || "Failed to generate detailed strategy.");
    }
};
