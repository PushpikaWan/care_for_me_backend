const express = require("express"),
    bodyParser = require("body-parser"),
    swaggerUi = require("swagger-ui-express"),
    YAML = require('yamljs'),
    swaggerDocument = YAML.load('./swagger.yaml'),
    OpenApiValidator = require('express-openapi-validator');

//firebase init
require('./authorization/firebase-admin');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '20mb'
    })
);
app.use(bodyParser.json());

//use requested additional routes before validator
app.use('/api-docs', swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {explorer: true}));
app.use(
    OpenApiValidator.middleware({
      apiSpec: './swagger.yaml',
      validateRequests: true, // (default)
      validateResponses: false, // false by default
    }),
);

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(PORT);
console.debug('Server listening on port: ' + PORT);

/*
 * Routes
 */
app.use('/user', require('./routes/user'));
app.use('/posts', require('./routes/posts'));
app.use('/metadata', require('./routes/metadata'));