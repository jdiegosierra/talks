"use strict"

// Dependencies
const express = require('express');
const router = express.Router();

router.post('/v1/test', async function (req, res) {
    res.status.send("Hey!");

});

module.exports = router;