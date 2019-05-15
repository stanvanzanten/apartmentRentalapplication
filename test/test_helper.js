// const sql = require('mysql')
// const app = require('../index')
// //Create connection
// const db = sql.createConnection({
//     host: 'coolsma.synology.me',
//     user: '2019-I14',
//     password: '2019-I14',
//     database: '2019-i14-appartementen'
// });

// beforeEach((done) => {
//     let usersdelete = 'DELETE FROM user'
//     db.query(usersdelete, (err, result) => {
//         if (err) throw err
//         else {

//             let appartmentsdelete = 'DELETE FROM apartment'
//             db.query(appartmentsdelete, (err, result) => {
//                 if (err) throw err
//                 else {

//                     let reservationsdelete = 'DELETE FROM reservation'
//                     db.query(reservationsdelete, (err, result) => {
//                         if (err) throw err
//                         else {

//                             done()
//                         }
//                     })
//                 }
//             })

//         }
//     })
// })
