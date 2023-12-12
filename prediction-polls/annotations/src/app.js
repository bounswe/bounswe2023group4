const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

require('dotenv').config();

const annotationRouter = require('./routes/AnnotationRouter.js');

const app = express();
const port = 4999;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../config/swaggerOptions.js');

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/annotations', annotationRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
