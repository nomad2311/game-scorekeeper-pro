import { GoogleGenAI, Type } from "@google/genai";

// Vercel Serverless Function version of the /api/voice-command endpoint
// from server.ts. The Express server can't run on Vercel, so this
// function serves the same route. Without GEMINI_API_KEY it returns
// success:false + fallback:true and the app uses its local rule engine.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { transcript, gameType, gameState } = req.body || {};
    if (!transcript || typeof transcript !== "string") {
      return res.status(400).json({ error: "Transcript is required" });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: false,
        fallback: true,
        message: "Gemini API key not configured, using local rule fallback.",
      });
    }
    const ai = new GoogleGenAI({
      apiKey: <redacted>
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });
    const systemPrompt = `You are a specialized voice command assistant for board game scoring apps (Farkle and Yahtzee).
Your task is to analyze the user's spoken voice transcript during a game and output a structured JSON intent.

Current Game: ${gameType}
Active Player: ${gameState?.activePlayerName || "Active Player"}
Available Categories (for Yahtzee): aces, twos, threes, fours, fives, sixes, threeOfAKind, fourOfAKind, fullHouse, smallStraight, largeStraight, yahtzee, chance

For Farkle:
Possible actionTypes:
- "bank": User wants to bank points. Extract points (number). If they say "bank" or "bank turn" without a number, return points: null (use accrued turn score).
- "farkle": User farkled or busted or scored zero.
- "add_turn_points": User wants to add custom points to turn. Extract points (number).
- "query_score": User is asking who is winning, what the score is, or whose turn it is.
- "undo": User wants to undo last turn or score.

For Yahtzee:
Possible actionTypes:
- "score_category": User wants to enter score for a category. Extract category (exact string from available list) and points (number, default 0 if scratch/zero).
- "yahtzee_bonus": User wants to add or toggle Yahtzee bonus (+100).
- "query_score": User asks who is winning or what the score is.
- "undo": User wants to undo.

Return JSON in this format:
{
  "actionType": "bank" | "farkle" | "add_turn_points" | "score_category" | "yahtzee_bonus" | "query_score" | "undo" | "unknown",
  "points": number | null,
  "category": string | null,
  "spokenFeedback": "Short 1-sentence vocal response to speak aloud to players, e.g. 'Banked 500 points for Sarah!' or 'Recorded 25 points for Full House!'"
}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `User voice transcript: "${transcript}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            actionType: { type: Type.STRING },
            points: { type: Type.NUMBER },
            category: { type: Type.STRING },
            spokenFeedback: { type: Type.STRING },
          },
          required: ["actionType", "spokenFeedback"],
        },
      },
    });
    const parsedJson = JSON.parse(response.text || "{}");
    return res.json({ success: true, intent: parsedJson });
  } catch (err: any) {
    console.error("Error in /api/voice-command:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process voice command",
    });
  }
}
