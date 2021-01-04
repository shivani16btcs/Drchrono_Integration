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
    let appointment = await new Appointment({
      Dchrono_appointment_id: req.body.object.id,
      Dchrono_doctor: req.body.object.doctor,
      Dchrono_duration: req.body.object.duration,
      Dchrono_office: req.body.object.office,
      Dchrono_patient: req.body.object.patient,
      Dchrono_scheduled_time: req.body.object.scheduled_time,
      Dchrono_exam_room: req.body.object.exam_room,
      Dchrono_created_at: req.body.object.created_at,
      startDate:Date.parse(req.body.object.scheduled_time),
      endDate:Date.parse(req.body.object.scheduled_time)+(req.body.object.duration*60*1000),
      // offSet:(req.body.object.scheduled_time.getTimezoneOffset()/60)+":"+(req.body.object.scheduled_time.getTimezoneOffset()%60),
      inVideoVisit:req.body.object.is_virtual_base,
      // availableDays:,
      repeatEveryWeek:req.body.object.recurring_appointment,
    });
    let p = await appointment.save();
    if (p) {
      console.log("Appointment save successfully");
      return res.status(200).json({
        success: true,
        appointment: appointment,
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
      Dchrono_duration:req.body.object.duration,
      Dchrono_scheduled_time:req.body.object.scheduled_time.valueOf()
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
    Appointment.findOneAndRemove({ Dchrono_appointment_id: req.body.object.id }, function(err){
        console.log("webhook delete"+err);
    });


  }
});

module.exports = router;
