const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/auth_config');
const sql = require('mysql')
//Create connection
const db = sql.createConnection({
    host: 'coolsma.synology.me',
    user: '2019-I14',
    password: '2019-I14',
    database: '2019-i14-appartementen'
});

module.exports = {
    list(req, res) {
        let sql = 'SELECT * FROM user'
        db.query(sql, (err, result) => {
            if (err) throw (err)
            else {
                res.send(result, 'User has been returned', (200))
            }
        })
    },
    single(req, res) {
        var id = req.params.id
        let sql = 'SELECT * FROM user WHERE userid = ' + id
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result, "user has been returned", (200))
            }
        })

    },
    create(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.Password, 10);
        var user = {
            UserId: req.body.UserId,
            FirstName: req.body.FirstName,
            LastName: req.body.Lastname,
            StreetAddress: req.body.StreetAddress,
            PostalCode: req.body.PostalCode,
            City: req.body.City,
            DataOfBirth: req.body.DataOfBirth,
            PhoneNumber: req.body.PhoneNumber,
            EmailAddress: req.body.EmailAddress,
            Password: hashedPassword
        }
        let sql = 'INSERT INTO user(UserId, FirstName, LastName, StreetAddress, PostalCode, City, DataOfBirth, PhoneNumber, EmailAddress, Password) VALUES ("' + user.UserId + '", "' + user.FirstName + '", "' + user.Lastname + '", "' + user.StreetAddress + '", "' + user.PostalCode + '", "' + user.City + '", "' + user.DataOfBirth + '", "' + user.PhoneNumber + '", "' + user.EmailAddress + '", "' + user.Password + '")'
        db.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log('Error: ' + err)
            }
            else {
                res.send(result, 'User created', (200))
            }
        })
    },
    edit(req, res) {
        var id = req.params.id
        var user = {
            UserId: req.body.UserId,
            FirstName: req.body.FirstName,
            LastName: req.body.Lastname,
            StreetAddress: req.body.StreetAddress,
            PostalCode: req.body.PostalCode,
            City: req.body.City,
            DataOfBirth: req.body.DataOfBirth,
            PhoneNumber: req.body.PhoneNumber,
            EmailAddress: req.body.EmailAddress,
            Password: req.body.Password

        }
        let sql = 'UPDATE user SET UserId = "' + user.UserId + '", FirstName = "' + user.FirstName + '", Lastname = "' + user.LastName + '", StreetAddress = "' + user.StreetAddress + '", PostalCode = "' + user.PostalCode + '", City = "' + user.City + '", DataOfBirth = "' + user.DataOfBirth + '", PhoneNumber = "' + user.PhoneNumber + '", EmailAddress = "' + user.EmailAddress + '", Password = "' + user.Password + '" WHERE UserId=' + user.UserId
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result, 'User edited', (200))
            }
        })

    },
    delete() {

    }

}