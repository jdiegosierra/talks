const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/docs', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../docs', 'index.html'));
});

module.exports = router;