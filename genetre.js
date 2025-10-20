export default async function handler(req, res) {
  const { prompt } = req.body;

  // Example with Stability.ai (replace with your API key)
  const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt,
      output_format: "png"
    })
  });

  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  res.status(200).json({ url: `data:image/png;base64,${base64}` });
}
