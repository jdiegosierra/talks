"use strict"

// Dependencies
const express = require('express');
const router = express.Router();
const config = require('../../config/environments.js').config();
const MongoClient = require('mongodb').MongoClient;
const BigchainDB = require('bigchaindb-driver');
const bip39 = require('bip39');

// Constants
const collection = "keys";

router.post('/v1/keys', function(req, res) {
    MongoClient.connect("mongodb://" + config.MONGODB.HOST + ":" + config.MONGODB.PORT + "/",{ useNewUrlParser: true }, function(err, db) {
        if (err) {
           res.status(400).send(err); 
        }
        else {
            let keypair = new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed(process.env.SECRET_WORD+new Date()).slice(0, 32));
            db.db(config.MONGODB.DB_NAME).collection(collection).insertOne({username: res.locals.username, _id: keypair.publicKey, privateKey: keypair.privateKey, data: req.body.data}, function(err, resp) {
                db.close();
                if (err) {
                    res.status(400).send(err); 
                }
                else {
                    res.status(200).send(resp);
                }
            }); 
        }
    });
});

router.get('/v1/keys', function(req, res) {
    MongoClient.connect("mongodb://" + config.MONGODB.HOST + ":" + config.MONGODB.PORT + "/",{ useNewUrlParser: true }, function(err, db) {
        if (err) {
            res.status(400).send(err); 
        }
        else {
            db.db(config.MONGODB.DB_NAME).collection(collection).find({username: { $eq: res.locals.username }}).toArray(function(err, resp)  {
                db.close();
                if (err) {
                    res.status(400).send(err); 
                }
                else {
                    res.status(200).send(resp);
                }
            }); 
        }
    });
});

router.delete('/v1/keys', function (req, res) {
    MongoClient.connect("mongodb://" + config.MONGODB.HOST + ":" + config.MONGODB.PORT + "/",{ useNewUrlParser: true }, function(err, db) {
        if (err) {
            res.status(400).send(err); 
        }
        db.db(config.MONGODB.DB_NAME).collection(collection).deleteOne({ $and: [{username: { $eq: res.locals.username }}, {privateKey: { $eq: req.body.privateKey }}] }, function(err, resp) {
            db.close();
            if (err) {
                res.status(400).send(err); 
             }
            else {
                res.status(200).send(resp);
            }
        }); 
    });
});

module.exports = router;