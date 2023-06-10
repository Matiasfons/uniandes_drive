const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const dbConnection = require("../../helpers/db/database");

router.post('/create', async function (req, res) {
    try {
        const { name, email, password } = req.body;
        let alredyEmail = false;
        const connection = await dbConnection();

        var response = await connection.query(
            `SELECT * FROM users WHERE Email = '${email}';`);

        if (response[0].length > 0) {
            alredyEmail = true;

        } else {

            alredyEmail = false;

        }
        if (alredyEmail == false) {
            const hash = await bcrypt.hash(password, 10);
            var responsePost = await connection.query(
                `INSERT INTO users (Name, Email, Password) VALUES ('${name.toString()}', '${email.toString()}', '${hash}');`);
            res.statusCode = 200;
            return res.json({
                "code": 200,
                "data": "Creado Correctamente",

            });
        } else {
            res.statusCode = 404;
            return res.json({
                "code": 404,
                "data": "Email Registrado",

            });
        }

    } catch (error) {
        console.log(error);
        res.statusCode = 404;
        return res.json({
            "code": 404,
            "data": error
        })
    }
});
module.exports = router;

