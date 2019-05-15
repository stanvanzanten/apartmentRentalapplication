const UserController = require('../src/controllers/user_controller')
const AuthController = require('../src/controllers/auth_controller')

module.exports = (app) => {

      //register with 'email' and 'password'
      app.post('/api/user/register', UserController.create)
      //login with 'email' and 'password'
      app.post('/api/user/login', AuthController.login)

      //get a list of all users
      app.get('/api/user', UserController.list)
      //get the data of a single user
      app.get('/api/user/:id', UserController.single)

      //edit an existing user while logged in
      app.put('/api/user/:id', UserController.edit)
      //delete an existing user while logged in
      app.delete('/api/user/:id', AuthController.validateToken, UserController.delete)
}

// AuthController.validateToken,