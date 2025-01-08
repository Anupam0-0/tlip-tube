const ytdl = require("@distube/ytdl-core");
const { aleaRNGFactory } = require("number-generator");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(express.json());
app.use(cors());
const { uInt32 } = aleaRNGFactory(10);

app.get("/download", async (req, res) => {
  try {
    const url = req.body.url;
    const num = uInt32();
    ytdl(url).pipe(require("fs").createWriteStream(`video${num}.mp4`));
    res.status(200).send("Downloaded");
    // try ends here
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => console.log("Server is running on port " + PORT));
