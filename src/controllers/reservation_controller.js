//imports
//here
const sql = require('mysql');
//Create connection
const db = sql.createConnection({
    host: 'coolsma.synology.me',
    user: '2019-I14',
    password: '2019-I14',
    database: '2019-i14-appartementen'
});

module.exports = {
    list(req, res) {
        let sql = 'SELECT * FROM reservation'
        db.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log('You got an error ' + err);
            }else {
                res.send(result)
                console.log('>>Reservations returned')
            }
        })
    },
    single(req, res) {
        let sql = 'SELECT * FROM reservation WHERE ReservationId=' + req.params.id
        db.query(sql, (err, result) => {
            if (err){
                res.send(err)
                console.log('You got an error ' + err)
            } else {
                res.send(result)
                console.log('>>Reservation returned')
            }
        })
    },
    create(req, res) {
        var reservation = {
            ReservationId: req.body.ReservationId,
            ApartmentId: req.body.ApartmentId,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Status: req.body.Status,
            UserId: req.body.UserId
        }
        let sql = 'INSERT INTO reservation(ReservationId, ApartmentId, StartDate, EndDate, Status, UserId) VALUES ( "' + reservation.ReservationId + '", "' + reservation.ApartmentId + '", "' + reservation.StartDate + '", "' + reservation.EndDate + '", "' + reservation.Status + '", "' + reservation.UserId + '")'
        db.query(sql, (err, result) => {
            if (err) {
                if (err.errno === 1062) {
                    res.send('This reservation already exists', (401))
                    console.log('1062 error ' + err)
                }
                if (err) {
                    res.status(401).send('You got an error')
                    console.log('Error ' + err)
                }
            }
            else {
                res.send(result, 'Reservation created', (200))
                console.log('>>Reservation created')
            }
        })
    },
    edit(req, res) {
        var reservation = {
            ReservationId: req.body.ReservationId,
            ApartmentId: req.body.ApartmentId,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Status: req.body.Status,
            UserId: req.body.UserId
        }

        let sql = 'UPDATE reservation SET ReservationId= "' + reservation.ReservationId + '", ApartmentId = "' + reservation.ApartmentId + '", StartDate = "' + reservation.StartDate + '", EndDate = "' + reservation.EndDate + '", UserId = "' + reservation.UserId + '" WHERE ReservationId = "' + reservation.ReservationId + '"'
        db.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log('You got an error: ' + err)
            } else {
                res.send(result, 'Reservation edited', (200))
                console.log('>>Reservation edited')
            }
        })

    },

    delete(req, res) {
        var id = req.params.id
        let sql = 'DELETE FROM reservation WHERE ReservationId= ' + id
        db.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log(err)
            } else {
                res.send(result, 'Reservation deleted', (200))
                console.log('>>Reservation deleted')
            }
        })
    }

}