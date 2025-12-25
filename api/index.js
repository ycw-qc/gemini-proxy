export default async function handler(req, res) {
  // 1. Allow the browser to talk to us (CORS)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle the "preflight" check
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Prepare the Google URL
  const apiKey = process.env.GEMINI_API_KEY;
  // We hardcode the model here to make your life easier
  const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  try {
    // 3. Forward the request to Google (USA -> Google)
    const response = await fetch(googleUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
