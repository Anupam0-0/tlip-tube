const ytdl = require("@distube/ytdl-core");
const { aleaRNGFactory } = require("number-generator");
const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(cors());
const { uInt32 } = aleaRNGFactory(10);

app.get("/download", async (req, res) => {
  try {
    const url = req.query.url; // Use query params for cleaner API
    const num = uInt32();
    if (!url) {
      return res.status(400).send("No URL provided");
    }
    res.setHeader("Content-Disposition", `attachment; filename=video${num}.mp4`);
    ytdl(url).pipe(res); // Stream the video directly to the client
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading video");
  }
});

app.get("/", async (req, res) => {
    res.send("Hello from the server!");
})

app.listen(PORT, () => console.log("Server is running on port " + PORT));
