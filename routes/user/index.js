import createUserRoute from './createUser.Routes.js';
import listUsersRoute from './listUsers.Routes.js';
import updateUserRoute from './updateUser.Routes.js';
import deleteUserRoute from './deleteUser.Routes.js';
import updatePasswordRoute from './updatePassword.Routes.js';

const userRoutes = [
    createUserRoute,
    listUsersRoute,
    updateUserRoute,
    deleteUserRoute,
    updatePasswordRoute
];

export default userRoutes;
