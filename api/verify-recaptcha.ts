import type { VercelRequest, VercelResponse } from "@vercel/node";

const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, action } = req.body;

  if (!token) {
    return res.status(400).json({ error: "reCAPTCHA token is required" });
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: SECRET_KEY,
        response: token,
      }).toString(),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "reCAPTCHA verification request failed" });
    }

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({
        success: false,
        error: "reCAPTCHA verification failed",
        errorCodes: data["error-codes"],
      });
    }

    // Check if the action matches (prevents token reuse across different forms)
    if (action && data.action !== action) {
      return res.status(400).json({
        success: false,
        error: "reCAPTCHA action mismatch",
      });
    }

    // Score: 1.0 is very likely human, 0.0 is very likely bot
    if (data.score < 0.5) {
      return res.status(400).json({
        success: false,
        error: "reCAPTCHA score too low",
        score: data.score,
      });
    }

    return res.status(200).json({
      success: true,
      score: data.score,
      action: data.action,
    });
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return res.status(500).json({ error: "Internal server error during reCAPTCHA verification" });
  }
}
