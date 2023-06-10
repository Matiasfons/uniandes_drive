const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const dbConnection = require("../../helpers/db/database");
var jwt = require('jsonwebtoken');

router.post('/', async function (req, res) {
    try {
        const {email, password } = req.body;
        const connection = await dbConnection();

        var response = await connection.query(
            `SELECT * FROM users WHERE Email = '${email}';`);

        if (response[0].length > 0) {
            let data = response[0];
            let passwordSave = data[0].Password;
            bcrypt.compare(password, passwordSave).then(function(result) {
                if (result == true) {
                    var token = jwt.sign({ id: data[0].Id }, '123456789');
                    res.statusCode = 200;
                    return res.json({
                        "code": 200,
                        "data": "Autorizado",
                        "token":token
                    });
                } else {
                    res.statusCode = 404;
                    return res.json({
                        "code": 404,
                        "data": "Credenciales Incorrectas",
        
                    });
                }

            });
           
        } else {

            res.statusCode = 404;
            return res.json({
                "code": 404,
                "data": "No Existe Usuario",

            });

        }

    } catch (error) {
        res.statusCode = 404;
        return res.json({
            "code": 404,
            "data": error
        })
    }
});
module.exports = router;

