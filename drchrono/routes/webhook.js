const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Appointment = require("../models/appointment");

router.get("/webhook", async (req, res) => {
  console.log(req.query.msg + "     @@@   ");
  secret_key = req.query.msg;

  const token = crypto
    .createHmac("sha256", "testweb")
    .update(secret_key)
    .digest("hex");
  console.log(token);
  return res.json({
    secret_token: token,
  });
});

router.post("/webhook", async (req, res) => {
   console.log("webhook");
   if (
    req &&
    req.headers &&
    req.headers["x-drchrono-event"] === "PING"
  ){
    console.log(" PING")
  }

  if (
    req &&
    req.headers &&
    req.headers["x-drchrono-event"] === "APPOINTMENT_CREATE"
  ) {
    console.log(req.body.object.doctor);
    let appointment = await new Appointment({
      appointment_id: req.body.object.id,
      doctor: req.body.object.doctor,
      duration: req.body.object.duration,
      office: req.body.object.office,
      patient: req.body.object.patient,
      scheduled_time: req.body.object.scheduled_time,
      exam_room: req.body.object.exam_room,
      created_at: req.body.object.created_at,
    });
    let p = await appointment.save();
    if (p) {
      console.log("Appointment save successfully");
      return res.status(200).json({
        success: true,
        appointment: p,
      });
    } else {
      return res.status(409).json({
        error: "Appointment overlaps",
      });
    }
  } else if (
    req &&
    req.headers &&
    req.headers["x-drchrono-event"] === "APPOINTMENT_MODIFY"
  ) {
    let myquery = {appointment_id: req.body.object.id };
    var newvalues = { $set: { 
        duration:req.body.object.duration,
          scheduled_time:req.body.object.scheduled_time 
        } };
    Appointment.updateOne(myquery, newvalues) 
    .then(result => {
        // res.status(200).json({ message: "appointment updated" })
        console.log("webhook update");
        })
        .catch(error => {

            console.log("webhook update error");
        // return res.status(400).json({ isError:true,errCode:'UPDATION_FAILED',message:'Post NOT UPDATED' })
        })
  
  } 
  else if (
    req &&
    req.headers &&
    req.headers["x-drchrono-event"] ==="APPOINTMENT_DELETE"
  ) {
    Appointment.findOneAndRemove({ appointment_id: req.body.object.id }, function(err){
        console.log("webhook delete"+err);
    });


  }
});

module.exports = router;
