//Initiallising node modules
var express = require("express")
var bodyParser = require("body-parser")
var sql = require("mysql")
//import route files
const appartmentRoutes = require('./routes/appartment_routes')
const reservationRoutes = require('./routes/reservation_routes')
const userRoutes = require('./routes/user_routes')
const PORT = 3000;
const port = process.env.PORT || 8000;

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
let server = require('http').Server(app);

//Body parser middleware
app.use(bodyParser.json()); 

app.get('/', function(req, res, next){
    res.sendStatus(200);
});

appartmentRoutes(app)
reservationRoutes(app)
userRoutes(app)

server.listen(port, () => {
    console.log("App is running on port " + port);
});

module.exports = app