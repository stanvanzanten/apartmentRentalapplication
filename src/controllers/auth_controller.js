const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/auth_config');
const sql = require('mysql')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const moment = require('moment')
//Create connection
const db = sql.createConnection({
    host: 'coolsma.synology.me',
    user: '2019-I14',
    password: '2019-I14',
    database: '2019-i14-appartementen'
});
module.exports = {
    login(req, res) {
        let user = {
            EmailAddress: req.body.EmailAddress,
            Password: req.body.Password
        }
        let sql = 'SELECT * FROM user WHERE EmailAddress = "' + user.EmailAddress + '"'
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                var passwordisValid = bcrypt.compareSync(req.body.Password, result[0].Password)
                console.log('body pass: ' + req.body.Password + ' || user pass: ' + result[0].Password)
                if (passwordisValid) {

                    var token = jwt.sign({user}, config.secretkey, {
                        expiresIn: 86400
                    })
                    res.send('Logged in', { auth: true, token: token }, (200))
                    console.log('User logged in')
                    console.log(token)
                }
                if (!passwordisValid) {
                    res.send('Password does not match', (401))
                    console.log(user)
                    console.log(result)
                    console.log(passwordisValid)
                }

            }
        })
    },

    validateToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send({ Error: 'No token provided.' })

        }
        let token = req.headers.authorization.split(' ')[1]
        if (token === 'null') {
            return res.status(401).send({ Error: 'No token provided.' })
        }
        jwt.verify(token, config.secretkey, function (err, decoded) {
            console.log(decoded)
            if (err) return res.status(401).send({ Error: 'Token is invalid.' })
            if (decoded) next();
        });
    }
}

