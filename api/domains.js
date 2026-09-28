// GET /api/domains
// Available domains list karo

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const r = await fetch("https://api.mail.tm/domains", {
      headers: { "Accept": "application/json" }
    });

    if (!r.ok) {
      return res.status(r.status).json({
        status: false,
        error: `mail.tm HTTP ${r.status}`
      });
    }

    const data = await r.json();
    const domains = (data["hydra:member"] || []).map(d => d.domain);

    return res.status(200).json({
      status: true,
      count: domains.length,
      domains,
      developer: "Genius Hacker Aditya"
    });
  } catch (e) {
    return res.status(500).json({ status: false, error: e.message });
  }
}
