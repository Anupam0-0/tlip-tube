const ytdl = require('ytdl-core');

const getVideoInfo = async (req, res) => {
    const { url } = req.body;

    if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' }); // Fixed error message
    }

    try {
        const videoInfo = await ytdl.getInfo(url);
        const formats = videoInfo.formats.filter(format => format.hasVideo || format.hasAudio);
        res.json({
            title: videoInfo.videoDetails.title,
            thumbnail: videoInfo.videoDetails.thumbnails.pop(),
            formats: formats.map(format => ({
                quality: format.qualityLabel || "Audio Only",
                type: format.container,
                url: format.url,
            })),
        });
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch video information' });
    }
};

// Download video

const downloadVideo = async (req, res) => {
    const { url, format } = req.query;

    if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    try {
        res.header("Content-Disposition", `attachment; filename="video.${format}"`);
        ytdl(url, { filter: format === "mp4" ? "video" : "audioonly" }).pipe(res);
    } catch (error) {
        res.status(500).json({ error: "Failed to download video" });
    }
};

module.exports = { getVideoInfo, downloadVideo };