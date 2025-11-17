import 'dotenv/config';
import Hapi from '@hapi/hapi';
import connectDB from './config/db.js';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import HapiAuthJwt2 from 'hapi-auth-jwt2';
import pkg from './package.json' with { type: 'json' };

const swaggerOptions = {
  info: {
    title: 'Sendspark API',
    version: pkg.version,
  },
};

const validate = async function (decoded, request, h) {
  // decoded contains the JWT payload
  // request is the incoming request object
  try {
    // Check if user exists in database using decoded id from token
    const user = await User.findById(decoded.id);
    if (!user) {
      return { isValid: false };
    }
    // User exists, valid token
    return { isValid: true };
  } catch (err) {
    // In case of error invalidate token
    return { isValid: false };
  }
};

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const startServer = async () => {
  await connectDB();

  // Register plugins
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    HapiAuthJwt2,
  ]);

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Cant set default auth to jwt because it breaks the login route
  // server.auth.default('jwt');

  // Register routes
  server.route(userRoutes);
  server.route(authRoutes);

  await server.start();
  console.log('Server running on ' + server.info.uri);
};

startServer();