const express = require("express");
const router = express.Router();
const mysql = require('mysql2');

router.post('/create/:idUser', function (req, res) {
    try {
        const { idUser: id } = req.params;
        const body = req.body;
        //RESPONSE
        res.json({
            "code": 200,
            "data": body,

        })
    } catch (error) {
        res.json({
            "code": 404,
            "data": error
        })
    }
});
module.exports = router;

