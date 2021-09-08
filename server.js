const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// ROUTE IMPORTS
const vehicleRoutes = require("./routes/vehicles");

// INITIALIZE EXPRESS APP AND MIDDLEWARE
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// MONGO DB CLOUD DATABASE CONNECTION
const mongoURI = "mongodb+srv://Admin:Authenticate123@truckme-mongodb.odsgi.mongodb.net/TruckMe-MongoAPI?retryWrites=true&w=majority"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Connected to MongoDB database. API routes functional.");
})
.catch((err) => {
  console.log(err);
});

// USING IMPORTED ROUTES
app.use("/api/vehicles", vehicleRoutes);

// INITIALIZE SERVER
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log("Server is listening on port " + port + ". Database initializing.");
}); 