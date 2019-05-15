const AppartmentController = require('../src/controllers/appartment_controller')
const AuthController = require('../src/controllers/auth_controller')
const ReservationController = require('../src/controllers/reservation_controller')

module.exports = (app) => {

    //get a list of reservations per appartment
    app.get('/api/apartment/:ApartmentId/reservations', ReservationController.list)
    //get the data of a single reservation
    app.get('/api/apartment/:id/reservations/:id', ReservationController.single)
    //create a reservation while logged in
    app.post('/api/apartment/:ApartmentId/reservations', AuthController.validateToken, ReservationController.create)
    //edit an existing reservation while logged in
    app.put('/api/apartment/:ApartmentId/reservations/:id', AuthController.validateToken, ReservationController.edit) 
    //delete an existing reservation while logged in
    app.delete('/api/apartment/:ApartmentId/reservations/:id', AuthController.validateToken, ReservationController.delete) 
}