const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

// Route files
const dentists = require("./routes/dentists");
const appointments = require("./routes/appointments");
const auth = require("./routes/auth");

const app = express();

//Body parser
app.use(express.json());
app.use("/api/v1/dentists", dentists);
app.use("/api/v1/appointments", appointments);
app.use("/api/v1/auth", auth);

//Cookie parser
app.use(cookieParser());

//Swagger API
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Dentist-Booking API",
      version: "1.0.0",
      description: "Dentist-Booking API documents",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log("Server running in ", process.env.NODE_ENV, " mode on port ", PORT)
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
