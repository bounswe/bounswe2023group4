const express = require('express');
const authRouter = require('./routes/AuthorizationRouter.js'); 
const pollRouter = require('./routes/PollRouter.js');
const profileRouter = require('./routes/ProfileRouter.js');
const moderatorRouter = require('./routes/ModeratorRouter.js');
const tagRoutine = require('./routines/tagRoutine.js');
const modAppointRoutine = require('./routines/modAppointRoutine.js');
const pollCloseRoutine = require('./routines/pollCloseRoutine.js');

const cors = require("cors");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../config/swaggerOptions.js');


const app = express();
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/polls',pollRouter);
app.use('/auth', authRouter);
app.use('/profiles', profileRouter);
app.use('/moderators', moderatorRouter);

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app

