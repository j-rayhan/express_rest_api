const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const dotenv = require('dotenv');
dotenv.config();
//
const AppError = require('./utils/appError')
const handleGlobalError = require('./middleware/handleGlobalError')
const routes = require('./routes')
// get MongoDB driver connection
const db = require('./config/db');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use("/api/v1", routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API DOC',
      version: '1.0.0',
      description: 'A simple express CURD API'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          in: 'header',
          type: 'http',
          name: 'authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT Bearer token',
        },
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`
      }
    ]
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const openApiSpecification = swaggerJsDoc(options);

app.use("/api/v1/api-doc", swaggerUI.serve, swaggerUI.setup(openApiSpecification))

// Handle route error 
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Handle global error
app.use(handleGlobalError);

// perform a database connection when the server starts
db.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.db = db.getDb();
  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
