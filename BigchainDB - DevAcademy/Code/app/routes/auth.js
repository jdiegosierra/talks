"use strict"

const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @api {post} /api/v1/login Request Token
 * @apiName PostLogin
 * @apiGroup Authentication
 *
 * @apiParam {String} username Username unique ID.
 * @apiParam {String} password Password associated with the username account.
 *
 * @apiSuccess {JSON} token Token access.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpZWdvIiwiaWF0IjoxNTYwMzQzMDk5fQ.9xHv04cJFLcOKRaDCwRP6FLKQj2rHfXKQskAMJx-NjA"
 *}
 *
 * @apiError NotAuthorized Invalid password.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Authorized
 *     {
 *       "error": "Invalid password"
 *     }
 */
router.get('', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    if (password !== process.env.SECRET_WORD) {
        res.status(401).send({error: 'Invalid password'})
        return;
    }

    const token = jwt.sign({"username": username}, process.env.SECRET_WORD);

    res.status(200).json({token});
});

router.verifyToken = function(req, res, next) {
    var token = req.headers['authorization'];
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        });
        return;
    }
    token = token.replace('Bearer ', '');

    jwt.verify(token, process.env.SECRET_WORD, function(err, decoded) {
        if(err) {
            res.status(401).send({error: 'Token inválido'})
        }
        else {
            res.locals.username = decoded.username;
            next();
        }
    });
}

module.exports = router;