const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: 'Prediction Poll API',
        version: '1.0.0',
        description: 'API Documentation for Prediction Poll API',
      },
    },
    apis: ["./src/routes/*.js"], // Adjust this path to match your project structure
  };
  
  module.exports = swaggerOptions;