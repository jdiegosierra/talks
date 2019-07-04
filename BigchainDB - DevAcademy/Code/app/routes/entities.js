"use strict"

// Dependencies
const express = require('express');
const router = express.Router();
const config = require('../../config/environments.js').config();
const API_PATH = 'http://' + config.BIGCHAINDB.HOST + ':' + config.BIGCHAINDB.PORT + '/api/v1/';
const { BigchainDB, conn } = require('../helpers/connectBigchainDB');
const Orm = require('bigchaindb-orm').default;

class DID extends Orm {
    constructor(entity) {
        super(API_PATH);
        this.entity = entity;
    }
}

router.post('/v1/entities', async function (req, res) {
    // Creamos un objeto DID ya que da menos problemas que con la libreria nativa
    const assetOrm = new DID(req.body.publicKey); // Identificador descentralizado del elemento
    assetOrm.define(req.body.modelEntity, req.body.entityInfo); // Tipo de elemento que vamos a registrar (ejemplo "dispositivo" y la información inmutable)
    const asset = await assetOrm.models[req.body.modelEntity].create(
        {
            keypair: req.body.ownerKeyPair,
            data: req.body.data
        });
    res.status(201).send(asset);
});

router.post('/v1/entities/transfer', async function (req, res) {
        //const asset = await conn.searchAssets(req.body.assetId);
        // let did = new DID(req.body.publicKey);
        // did.define(req.body.modelEntity);
        //const asset = await did.models[req.body.modelEntity].retrieve(req.body.assetId); // Si se utiliza este modo hay que pasarle el ID del modelo id:global:perro:1dc688e7-6eb6-48e7-aeaf-1f8d1c69344c
        const transactionHistory = await conn.listTransactions(req.body.assetId); // Si se utiliza el ID nativo
        console.log(transactionHistory)
        const txId = transactionHistory[transactionHistory.length - 1].id; // ID de la última transacción
        const txCreated = await conn.getTransaction(txId);
        const createTranfer = BigchainDB.Transaction.makeTransferTransaction(
            [{ tx: txCreated, output_index: 0 }],
            [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction.makeEd25519Condition(req.body.outputPublicKey))], // Ver como poner varios outputs
            req.body.metadata
        )
        const signedTransfer = BigchainDB.Transaction.signTransaction(createTranfer, req.body.privateKey); // Si queremos que varias personas posean la entidad hay que usar las cryptoconditions
        const response = await conn.postTransactionCommit(signedTransfer);
        res.status(200).send(response);
});


module.exports = router;