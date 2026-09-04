export const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://appixo-backend.onrender.com";

/**
 * Registers a guest enquiry or contact request with the Appixo backend server.
 * Endpoint: POST /api/guest/register
 * 
 * @param {Object} payload
 * @param {string} payload.fullName
 * @param {string} payload.email
 * @param {string} [payload.phone]
 * @param {string} [payload.company]
 * @param {string} [payload.location]
 * @param {string} [payload.inquiryType]
 * @param {string} [payload.projectContext]
 */
export async function registerGuestApi(payload) {
  const url = `${API_BASE_URL}/api/guest/register`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data.error || data.message || `Backend API error (${response.status})`;
    const error = new Error(errorMessage);
    error.status = response.status || 500;
    error.data = data;
    throw error;
  }

  return data;
}
