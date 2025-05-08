import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Nutrição",
      version: "1.0.0",
      description: "Documentação da API para gestão de nutricionistas e pacientes.",
    },
    servers: [
      {
        url: "http://localhost:3333", // ou sua URL de produção
      },
    ],
  },
  apis: ["./src/routes.js", "./src/docs/*.yaml"], // ponto importante
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };