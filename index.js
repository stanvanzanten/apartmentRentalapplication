//Initiallising node modules
var express = require("express")
var bodyParser = require("body-parser")
var sql = require("mysql")
//import route files
const appartmentRoutes = require('./routes/appartment_routes')
const reservationRoutes = require('./routes/reservation_routes')
const userRoutes = require('./routes/user_routes')
const PORT = 8080;
//Create connection
const db = sql.createConnection({
    host: 'coolsma.synology.me',
    user: '2019-I14',
    password: '2019-I14',
    database: '2019-i14-appartementen'
});

//Connect to the db
db.connect((err) => {
    if(err) {
        console.log(err)
    }
    else {
        console.log('MySql Connected')
    }
})

//Set app variable
var app = express();

//Body parser middleware
app.use(bodyParser.json()); 

appartmentRoutes(app)
reservationRoutes(app)
userRoutes(app)

app.listen(PORT, () => {
    console.log('Server running on localhost: ' + PORT)
})

module.exports = app