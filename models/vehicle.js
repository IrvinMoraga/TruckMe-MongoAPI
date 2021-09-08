const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  vehicleName: {
    type: String,
    required: true
  },
  plateNumber: {
    type: String,
    required: true
  },
  description: {
    type: String
  }, 
  activeStatus: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);