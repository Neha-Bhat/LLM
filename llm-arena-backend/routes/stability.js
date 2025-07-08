const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("mode", "text-to-image");
    form.append("output_format", "png");
    form.append("aspect_ratio", "1:1");

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*"
        },
        responseType: "arraybuffer"
      }
    );

    const base64Image = Buffer.from(response.data).toString("base64");
    return res.json({ image: `data:image/png;base64,${base64Image}` });

  } catch (err) {
    try {
      const errorBuffer = err?.response?.data;
      const decoded = Buffer.from(errorBuffer).toString("utf-8");
      console.error("Image Gen Error (decoded):", decoded);
      res.status(500).json({ error: JSON.parse(decoded)?.message || "Image generation failed" });
    } catch (decodeErr) {
      console.error("Raw error:", err.message);
      res.status(500).json({ error: "Image generation failed" });
    }
  }
});

module.exports = router;
