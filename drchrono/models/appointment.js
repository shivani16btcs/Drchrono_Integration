var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    appointment_id:{
        type:String, 
    },
    patientName:{
        type:String,
    },
    doctor:{
        type:String,
        required:true,
    },

    duration:{
        type:String,
       required:true,
    },

    office:{
        type:String,
        required:true,
        
    },
  
    patient:{
        type:String,
       required:true,
    },

    scheduled_time: {
        type: String,
        required:true,
    },

    exam_room:{
        type: String,
        required:true,
    },
    created_at:{
        type: String,
    },
})
var Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;




// ///sample data
// // {
// //     "doctor": "285645",
// //     "duration": "120",
// //     "office":  "303442",
// //     "patient": "91327797",
// //     "scheduled_time":"2021-01-02T14:00:00",
// //     "exam_room":1
// // }
