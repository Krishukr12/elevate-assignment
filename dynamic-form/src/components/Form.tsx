import { useState } from "react";

type Field = {
  type: "text" | "email" | "number" | "select" | "checkbox";
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
};

function validateFields(fields: unknown): fields is Field[] {
  if (!Array.isArray(fields)) return false;
  for (const field of fields) {
    if (
      !field ||
      typeof field !== "object" ||
      !["text", "email", "number", "select", "checkbox"].includes(field.type) ||
      typeof field.name !== "string" ||
      typeof field.label !== "string"
    ) {
      return false;
    }
    if (field.type === "select" && !Array.isArray(field.options)) {
      return false;
    }
  }
  return true;
}

export const Form = () => {
  const [input, setInput] = useState("");
  const [fields, setFields] = useState<Field[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    unknown
  > | null>(null);

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(input);
      if (!validateFields(parsed)) {
        throw new Error("Invalid schema: Please check your field definitions.");
      }
      setFields(parsed);
      setError(null);
      setSubmittedData(null);
      setFormData({});
    } catch (e: unknown) {
      setFields(null);
      setError(
        e instanceof Error
          ? e.message
          : "Invalid JSON! Please enter valid JSON data."
      );
    }
  };

  const handleChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-2 flex-row">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div className="p-6 rounded-xl shadow-lg bg-white">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            JSON Form Generator
          </h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full p-3 rounded-lg border border-gray-300 text-base font-mono mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Paste your JSON schema here..."
          />
          <button
            onClick={handleGenerate}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition mb-2"
          >
            Generate
          </button>
          {error && (
            <div className="text-red-600 mt-3 font-medium">{error}</div>
          )}
        </div>

        {fields && (
          <div className="p-6 rounded-xl shadow-lg bg-white">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label className="font-medium text-gray-700">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  {field.type === "text" || field.type === "email" ? (
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      minLength={field.minLength}
                      maxLength={field.maxLength}
                      className="border border-gray-300 rounded-lg p-2"
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  ) : field.type === "number" ? (
                    <input
                      type="number"
                      name={field.name}
                      required={field.required}
                      min={field.min}
                      max={field.max}
                      className="border border-gray-300 rounded-lg p-2"
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      required={field.required}
                      className="border border-gray-300 rounded-lg p-2"
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      name={field.name}
                      required={field.required}
                      className="w-5 h-5"
                      onChange={(e) =>
                        handleChange(field.name, e.target.checked)
                      }
                    />
                  ) : null}
                </div>
              ))}
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold text-base hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {submittedData && (
          <div className="p-6 rounded-xl shadow-lg bg-white">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Submitted Data
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-200 max-w-full">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
