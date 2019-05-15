const UserController = require('../src/controllers/user_controller')
const AuthController = require('../src/controllers/auth_controller')

module.exports = (app) => {

      //register with 'email' and 'password'
      app.post('/api/DBUser/register', UserController.create)
      //login with 'email' and 'password'
      app.post('/api/DBUser/login', AuthController.login)

      //get a list of all users
      app.get('/api/DBUser', UserController.list)
      //get the data of a single user
      app.get('/api/DBUser/:id', UserController.single)

      //edit an existing user while logged in
      app.put('/api/DBUser/:id', UserController.edit)
      //delete an existing user while logged in
      app.delete('/api/DBUser/:id', AuthController.validateToken, UserController.delete)
}

// AuthController.validateToken,