const userController = require('../controllers/userController');
const { userSchema } = require('../middlewares/validators');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    options: {
      validate: {
        payload: userSchema
      }
    },
    handler: userController.createUser
  }
];