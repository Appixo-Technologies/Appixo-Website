import { google } from "googleapis";
import { NextResponse } from "next/server";

// Basic email shape check - not exhaustive, just guards against obvious junk.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BACKEND_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://appixo-backend.onrender.com";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = (body?.fullName || body?.name || "").toString().trim();
  const email = (body?.email || "").toString().trim();
  const message = (body?.message || body?.projectContext || "").toString().trim();

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: "Full Name, email, and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  // 1. Submit to Appixo Backend API (/api/guest/register)
  let backendData = null;
  try {
    const apiRes = await fetch(`${BACKEND_BASE_URL}/api/guest/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        projectContext: message,
      }),
    });

    const resJson = await apiRes.json().catch(() => ({}));

    if (!apiRes.ok) {
      console.error("[contact] Backend API error:", resJson);
      return NextResponse.json(
        { error: resJson.error || resJson.message || "Failed to submit contact request." },
        { status: apiRes.status || 500 }
      );
    }
    backendData = resJson;
  } catch (err) {
    console.error("[contact] Backend API request failed:", err);
    return NextResponse.json(
      { error: "Unable to connect to backend server. Please try again later." },
      { status: 502 }
    );
  }

  // 2. Optional background sync: Append to Google Sheet if configured
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetRange = process.env.GOOGLE_SHEET_RANGE || "Contact!A:D";

  if (clientId && clientSecret && refreshToken && sheetId) {
    try {
      const auth = new google.auth.OAuth2(clientId, clientSecret);
      auth.setCredentials({ refresh_token: refreshToken });
      const sheets = google.sheets({ version: "v4", auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: sheetRange,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [[new Date().toISOString(), fullName, email, message]],
        },
      });
    } catch (sheetErr) {
      console.error("[contact] Optional Google Sheets sync failed:", sheetErr?.message);
    }
  }

  return NextResponse.json({ ok: true, data: backendData });
}

