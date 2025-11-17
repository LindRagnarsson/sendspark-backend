import 'dotenv/config';
import Hapi from '@hapi/hapi';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
server.route(authRoutes);
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import pkg from './package.json' with { type: 'json' };

const swaggerOptions = {
  info: {
    title: 'Sendspark API',
    version: pkg.version
  }
};

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

const startServer = async () => {
  // Connects to MongoDB
  await connectDB();

  // Register swagger plugins
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  // Register routes
  server.route(userRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

startServer();