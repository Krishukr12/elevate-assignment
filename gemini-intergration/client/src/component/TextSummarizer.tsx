import { useState } from "react";
import { axiosInstances } from "../config/axios";

export const TextSummarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetSummary = async () => {
    setLoading(true);
    setError("");
    setSummary([]);
    try {
      const res = await axiosInstances.post("/summarize", { text });
      setSummary(res.data.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "error in summarizing";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setText("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Text Summarizer
        </h2>
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4 resize-none"
          rows={6}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleGetSummary}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition mb-4 disabled:opacity-50"
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Summarizing...
            </span>
          ) : (
            "Summarize"
          )}
        </button>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {summary.length > 0 && (
          <ul className="mt-4 list-disc ml-5 space-y-2">
            {summary.map((point, i) => (
              <li key={i} className="text-gray-700">
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
