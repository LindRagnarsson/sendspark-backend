require('dotenv').config();
const Hapi = require('@hapi/hapi');
const connectDB = require('./config/db');

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