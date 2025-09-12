const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const generateContent = async (prompt) => {
  const response = await fetch(`${API_BASE}/api/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.reply;
};
