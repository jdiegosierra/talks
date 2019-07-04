"use strict"

const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/v1/blockchain/start',function(req, res) {
    exec("( cd ./software/bigchaindb/ && sudo make start )", {shell: '/bin/bash'},
    (err, stdout, stderr) => {
        if (err !== null) { 
            res.status(500).send(err);
        }
        else {
            res.sendStatus(201);
        }            
    });
});

router.post('/v1/blockchain/stop',function(req, res) {
    exec("( cd ./software/bigchaindb/ && sudo make stop )", {shell: '/bin/bash'},
    (err, stdout, stderr) => {
        if (err !== null) { 
            res.status(500).send(err);
        }
        else {
            res.sendStatus(201);
        }            
    });
});

router.post('/v1/blockchain/reset',function(req, res) {
    exec("( cd ./software/bigchaindb/ && sudo make reset )", {shell: '/bin/bash'},
    (err, stdout, stderr) => {
        if (err !== null) { 
            res.status(500).send(err);
        }
        else {
            res.sendStatus(201);
        }            
    });
});

module.exports = router;