const ytdl = require("@distube/ytdl-core");
const { aleaRNGFactory } = require("number-generator");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
const { uInt32 } = aleaRNGFactory(10);

app.get("/download", async (req, res) => {
  const { url, format = "mp4" } = req.query;

  // Validate input
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid or missing YouTube URL." });
  }

  try {
    const videoInfo = await ytdl.getInfo(url);
    const title = sanitizeFilename(videoInfo.videoDetails.title); // make sure this removes all unsafe characters
    const filename = `${title}-${Date.now()}.${format}`;

    // Set headers — properly quoted filename
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader(
      "Content-Type",
      format === "mp4" ? "video/mp4" : "audio/mpeg"
    );

    // Choose format
    const streamOptions =
      format === "mp3" || format === "audio"
        ? { filter: "audioonly" }
        : { quality: "highest" };

    // Stream to response
    ytdl(url, streamOptions).pipe(res);
  } catch (err) {
    console.error("Error downloading video:", err.message);
    return res
      .status(500)
      .json({ error: "Failed to download video. Try again later." });
  }
});

// Utility: Remove illegal characters from filenames
function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").slice(0, 50);
}

app.get("/", async (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => console.log("Server is running on port " + PORT));
