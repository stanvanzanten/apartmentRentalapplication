const AppartmentController = require('../src/controllers/appartment_controller')
const AuthController = require('../src/controllers/auth_controller')

module.exports = (app) => {

    //get a list of appartments that are for rent
    app.get('/api/apartment', AppartmentController.list)
    //get data of a single appartment
    app.get('/api/apartment/:id', AppartmentController.single)
    //post an appartment while logged in
    app.post('/api/apartment', AppartmentController.create) // AuthController.validateToken
    //edit and appartment while logged in
    app.put('/api/apartment/:id', AppartmentController.edit) //AuthController.validateToken
    //delete an existing appartment
    app.delete('/api/apartment/:id', AppartmentController.delete) //AuthController.validateToken,
}