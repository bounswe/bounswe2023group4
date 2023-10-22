const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API Documentation for Your Project',
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          },
        },
      },
    apis: ["./src/routes/*.js"], // Adjust this path to match your project structure
  };
  
  module.exports = swaggerOptions;