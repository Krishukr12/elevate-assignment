import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateAISuggestionBooks = async (
  bookName: string,
  author: string
) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Suggest 3 books similar to "${bookName}" by ${author}. 
    Return only a JSON array like:
    [
      { "title": "Title 1", "author": "Author 1" },
      { "title": "Title 2", "author": "Author 2" },
      { "title": "Title 3", "author": "Author 3" }
    ]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const raw = response.text();

    try {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const suggestions = JSON.parse(cleaned);
      return suggestions;
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", e);
      return [];
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Error while getting suggestions.";
    console.error(errorMessage);
    return [];
  }
};
