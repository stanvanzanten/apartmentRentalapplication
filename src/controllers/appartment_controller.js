//imports
//here
const sql = require('mysql')
var postalCodes = require('postal-codes-js');
//Create connection
const db = sql.createConnection({
    host: 'coolsma.synology.me',
    user: '2019-I14',
    password: '2019-I14',
    database: '2019-i14-appartementen'
});

module.exports = {
    list(req, res) {
        let sql = 'SELECT * FROM apartment'
        db.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log('You got an error ' + err);
            }else {
                res.send(result)
                console.log('>>Apartments returned')
            }
        })
    },
    single(req, res) {
        let sql = 'SELECT * FROM apartment WHERE ApartmentId=' + req.params.id
        db.query(sql, (err, result) => {
            if (err){
                res.send(err)
                console.log('You got an error ' + err)
            } else {
                res.send(result)
                console.log('>>Apartment returned')
            }
        })
    },
    create(req, res) {
        var appartment = {
            ApartmentId: req.body.ApartmentId,
            Description: req.body.Description,
            StreetAddress: req.body.StreetAddress,
            Postalcode: req.body.Postalcode,
            City: req.body.City,
            UserId: req.body.UserId
        }
        if(postalCodes.validate('nl',req.body.Postalcode) == true){
        let sql = 'INSERT INTO apartment(ApartmentId, Description, StreetAddress, Postalcode, City, UserId) VALUES ( "' + appartment.ApartmentId + '", "' + appartment.Description + '", "' + appartment.StreetAddress + '", "' + appartment.Postalcode + '", "' + appartment.City + '", "' + appartment.UserId + '")'
        db.query(sql, (err, result) => {
            if (err) {
                if (err.errno === 1062) {
                    res.send('This appartment already exists', (401))
                    console.log('1062 error ' + err)
                }
                if (err) {
                    res.status(401).send('You got an error')
                    console.log('Error ' + err)
                }
            }
            else {
                res.send(result, 'Appartment created', (200))
                console.log('>>Appartment created')
            }
        })
    } else{
        res.send('Je postcode klopt niet helemaal vriend', (401))
        console.log('Je postcode klopt niet helemaal vriend')
    }
    },
    edit(req, res) {
        var appartment = {
            ApartmentId: req.body.ApartmentId,
            Description: req.body.Description,
            StreetAddress: req.body.StreetAddress,
            Postalcode: req.body.Postalcode,
            City: req.body.City,
            UserId: req.body.UserId
        }

        let sql = 'UPDATE apartment SET ApartmentId= "' + appartment.ApartmentId + '", Description = "' + appartment.Description + '", StreetAddress = "' + appartment.StreetAddress + '", Postalcode = "' + appartment.Postalcode + '", UserId = "' + appartment.UserId + '" WHERE ApartmentId = "' + appartment.ApartmentId + '"'
        db.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log('You got an error: ' + err)
            } else {
                res.send(result, 'Apartment edited', (200))
                console.log('>>Apartment edited')
            }
        })

    },

    delete(req, res) {
        var id = req.params.id
        let sql = 'DELETE FROM apartment WHERE ApartmentId= ' + id
        db.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log(err)
            } else {
                res.send(result, 'Apartment deleted', (200))
                console.log('>>Apartment deleted')
            }
        })
    }

}