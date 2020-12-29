var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    patientName:{
        type:String,
    },
    doctor:{
        type:String,
        required:true,
        minlength:5
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
    }
   
})
var Appointment = mongoose.model('Register', appointmentSchema);

module.exports = Appointment;




///sample data
// {
//     "doctor": "285645",
//     "duration": "120",
//     "office":  "303442",
//     "patient": "91327797",
//     "scheduled_time":"2021-01-02T14:00:00",
//     "exam_room":1
// }
