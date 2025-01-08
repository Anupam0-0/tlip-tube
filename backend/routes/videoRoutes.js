const express = require('express');
const { getVideoInfo, downloadVideo } = require('../controllers/videoController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from video routes');
});
router.post('/info', getVideoInfo);
router.get('/download', downloadVideo);

module.exports = router;