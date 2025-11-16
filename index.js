require('dotenv').config();
const Hapi = require('@hapi/hapi');
const connectDB = require('./config/db');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package.json');

await server.register([
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Sendspark API',
        version: Pack.version
      }
    }
  }
]);


// Connects to the database and starts the server
const init = async () => {
  await connectDB();
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // Load routes
  server.route(require('./routes/userRoutes'));

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();