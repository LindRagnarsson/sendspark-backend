import createUserRoute from './createUser.js';
import listUsersRoute from './listUsers.js';
import updateUserRoute from './updateUser.js';
import deleteUserRoute from './deleteUser.js';
import updatePasswordRoute from './updatePassword.js';

const userRoutes = [
    createUserRoute,
    listUsersRoute,
    updateUserRoute,
    deleteUserRoute,
    updatePasswordRoute
];

export default userRoutes;
