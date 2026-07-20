import { google } from "googleapis";
import { NextResponse } from "next/server";

// Basic email shape check - not exhaustive, just guards against obvious junk.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body?.name || "").toString().trim();
  const email = (body?.email || "").toString().trim();
  const phone = (body?.phone || "").toString().trim();
  const company = (body?.company || "").toString().trim();
  const location = (body?.location || "").toString().trim();
  const inquiryType = (body?.inquiryType || "").toString().trim();
  const mode = body?.mode === "consultation" ? "Schedule Consultation" : "Request Quote";
  const message = (body?.message || "").toString().trim();

  if (!name || !email || !location || !inquiryType || !message) {
    return NextResponse.json({ error: "Name, email, location, type of inquiry, and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetRange = process.env.GOOGLE_ENQUIRY_SHEET_RANGE || "Enquiry!A:I";

  if (!clientId || !clientSecret || !refreshToken || !sheetId) {
    console.error(
      "[enquiry] Missing Google Sheets env vars. Required: GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN, GOOGLE_SHEET_ID."
    );
    return NextResponse.json(
      { error: "The enquiry form isn't configured yet. Please email us directly instead." },
      { status: 500 }
    );
  }

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
        values: [[new Date().toISOString(), name, email, phone, company, location, inquiryType, mode, message]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] Failed to append row to Google Sheet:", err);
    return NextResponse.json({ error: "Something went wrong sending your enquiry. Please try again." }, { status: 502 });
  }
}
