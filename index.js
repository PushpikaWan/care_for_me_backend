const express = require("express"),
    bodyParser = require("body-parser"),
    swaggerUi = require("swagger-ui-express"),
    YAML = require('yamljs'),
    swaggerDocument = YAML.load('./swagger.yaml');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(bodyParser.json());

app.use('/books', require('./routes/books'));
app.use('/api-docs', swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {explorer: true}));

app.listen(PORT);
console.debug('Server listening on port: ' + PORT);
