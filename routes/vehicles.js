const express = require("express");

const Vehicle = require("../models/vehicle");

const router = express.Router();

// ADD A SINGLE VEHICLE
router.post("", async(req, res, next) => {
  const id = Math.random().toString(36).substr(2, 9);
  const vehicleName = req.body.vehicleName;
  const plateNumber = req.body.plateNumber.toUpperCase();
  const description = req.body.description;
  const activeStatus = "unavailable";

  const vehicle = new Vehicle({
    id: id,
    vehicleName: vehicleName,
    plateNumber: plateNumber,
    description: description,
    activeStatus: activeStatus
  });

  vehicle.save()
  .then(result => {
    res.status(200).json({
      message: "Vehicle added.",
      result: result,
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

// GET ALL VEHICLES
router.get("", async(req, res, next) => {
  let fetchedVehicles;
  const vehiclesQuery = Vehicle.find();

  vehiclesQuery
  .then(documents => {
    fetchedVehicles = documents
  })
  .then(() => {
    res.status(200).json({
      message: "Vehicles fetched successfully.",
      vehicles: fetchedVehicles
    });
  });
});

// GET A SPECIFIC VEHICLE
router.get("/:id", async(req, res, next) => {
  const id = req.params.id;

  Vehicle.findOne(
    { id: id },
    (req, foundVehicle) => {
      if (foundVehicle) {
        res.send(foundVehicle);
      } else {
        res.send("No matching vehicle found.");
      }
    }
  );
});

// UPDATE THE INFO FOR A SPECIFIC VEHICLE
router.put("/:id", async(req, res, next) => {
  const id = req.params.id;
  const vehicleName = req.body.vehicleName;
  const plateNumber = req.body.plateNumber.toUpperCase();
  const description = req.body.description;

  Vehicle.exists(
    { id: id },
    (err) => {
      if (err) {
        res.send(err);
      } else {
        Vehicle.updateOne(
          { id: id }, 
          {
            vehicleName: vehicleName,
            plateNumber: plateNumber,
            description: description
          },
          (err) => {
            if (!err) {
              res.send("Successfully updated vehicle info.");
            } else {
              res.send(err);
            }
          }
        );
      }
    }
  );
});

// UPDATE ACTIVE STATUS FOR A VEHICLE ("active / inactive / unavailable")
router.put("/changeActiveStatus/:id", async(req, res, next) => {
  const id = req.params.id;
  const activeStatus = req.body.activeStatus;

  Vehicle.exists(
    { id: id },
    (err) => {
      if (err) {
        res.send(err);
      } else {
        Vehicle.updateOne(
          { id: id }, 
          {
            activeStatus: activeStatus
          },
          (err) => {
            if (!err) {
              res.send("Successfully updated vehicle status.");
            } else {
              res.send(err);
            }
          }
        );
      }
    }
  );
});

// DELETE A VEHICLE
router.delete("/:id", async(req, res, next) => {
  const id = req.params.id;

  Vehicle.exists(
    { id: id }, 
    (err) => {
      if (err) {
        res.send(err);
      } else {
        Vehicle.deleteOne(
          { id: id },
          (err) => {
            if (!err) {
              res.send("Successfully deleted vehicle");
            } else {
              res.send(err);
            }
          }
        );
      }
  });
});

module.exports = router;