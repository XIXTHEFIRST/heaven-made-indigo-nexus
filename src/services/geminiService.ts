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

export const generateRealtimeInsights = async (
    events: any[],
    sponsors: any[]
): Promise<any[]> => {
    if (!API_KEY) {
        throw new Error("Gemini API Key is not configured.");
    }

    const prompt = `
    Role: Senior Market Research Analyst (Lagos Fashion Ecosystem)
    Context: You are providing a "Neural Intelligence Feed" for investors and stakeholders.
    
    Current Database Snapshot:
    - Events Count: ${events.length}
    - Key Events: ${events.slice(0, 5).map(e => e.name).join(", ")}
    - Active Sponsors: ${sponsors.slice(0, 5).map(s => s.name).join(", ")}
    
    Task: Generate 3 high-impact "Market Intelligence Insights".
    Important: The response MUST be in RAW JSON format with exactly the following structure:
    [
      {
        "id": "unique-id-1",
        "title": "Short strategic title",
        "content": "Deep analytical content (2-3 sentences)",
        "type": "strategy" | "insight" | "alert",
        "impact": "high" | "medium" | "low",
        "timestamp": "Present"
      }
    ]
    
    Tone: Analytical, predictive, and sharp. 
    Guidelines: Focus on capital liquidity, consumer demographic shifts in Lagos (Island vs Mainland), and sponsor appetite (Banking, FinTech, Alcobev).
    Constraint: No markdown formatting.
  `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const start = text.indexOf('[');
        const end = text.lastIndexOf(']');
        if (start === -1 || end === -1) throw new Error("Invalid insights format");

        const jsonStr = text.substring(start, end + 1);
        return JSON.parse(jsonStr);
    } catch (error: any) {
        console.error("Realtime Insights Error:", error);
        return [
            {
                id: "fallback-1",
                title: "Intelligence Feed Initializing",
                content: "Cross-analyzing current market data. Real-time insights will populate as database depth increases.",
                type: "insight",
                impact: "medium",
                timestamp: "Active"
            }
        ];
    }
};

export const chatWithCoach = async (
    history: Array<{ role: 'user' | 'assistant'; content: string }>,
    userMessage: string,
    context: string
): Promise<string> => {
    if (!API_KEY) {
        throw new Error("Gemini API Key is not configured.");
    }

    const systemPrompt = `
    Role: Senior Sponsorship Intelligence Coach (Lagos Market Specialist)
    DNA: You are a hybrid of a McKinsey consultant and a Lagos street-smart fashion fixer.
    
    Lagos Intelligence Database (Internal Context):
    - Market Gaps: Oversupply in "Generic Runway", Zero depth in "B2B Fashion Logistic Tech", Massive gap in "Hyper-Local Luxury Retail in Lekki Phase 1".
    - Tier 1 Sponsors: Access Bank (Lifestyle), GTBank (Events/Art), MTN (Mass Market), Heineken (Global Luxury), Moët & Chandon (VIP Activation).
    - Current Dynamics: Shift towards "Sustainable Heritage" and "Streetwear Liquidity". Investors are looking for ROI beyond "Logo on a wall".
    
    Guidelines:
    1. Intelligence over Fluff: Never say "This is a great idea". Say "This aligns with the current capital flow in X sector".
    2. Deep Geography: Use Island vs Mainland dynamics (Lekki, VI, Ikoyi vs Surulere, Ikeja).
    3. ROI Focus: Every strategy must move towards a deal. Mention "Activation Architecture" and "Lead Generation".
    4. Sharp Personality: You are here to help them win. Use terms like "Exploitable Gaps", "Market Dominance", and "Capital Velocity".
    5. Formatting: Use bold text for key strategic terms. Use bullet points for checklists.
    `;

    try {
        const chat = model.startChat({
            history: history.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(`${systemPrompt}\n\nUser Question: ${userMessage}`);
        return result.response.text();
    } catch (error: any) {
        console.error("Coach Chat Error:", error);
        throw new Error("Failed to consult the intelligence coach.");
    }
};
