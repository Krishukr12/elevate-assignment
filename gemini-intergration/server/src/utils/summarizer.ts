import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const summarizeText = async (inputText: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Summarize the following text into 3–5 concise bullet points.
    Return **only** a valid JSON array of strings, with no explanation or additional text.
    
    TEXT: ${inputText}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const raw = response.text();

    const match = raw.match(/\[\s*("[^"]*"(?:\s*,\s*"[^"]*")*)\s*\]/);
    if (match) {
      const jsonArray = match[0];
      try {
        return JSON.parse(jsonArray);
      } catch (e) {
        console.log(e);
      }
    }

    return { error: "Could not extract JSON array", raw };
  } catch (err) {
    return {
      error: "Could not parse JSON or generate content",
      details: err instanceof Error ? err.message : String(err),
    };
  }
};
