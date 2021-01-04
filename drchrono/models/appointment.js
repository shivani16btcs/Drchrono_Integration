var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    Dchrono_appointment_id:{
        type:String, 
    },
    Dchrono_patientName:{
        type:String,
    },
    Dchrono_doctor:{
        type:String,
        required:true,
    },

    Dchrono_duration:{
        type:String,
       required:true,
    },

    Dchrono_office:{
        type:String,
        required:true,
        
    },
  
    Dchrono_patient:{
        type:String,
       required:true,
    },

    Dchrono_scheduled_time: {
        type: String,
        required:true,
    },

    Dchrono_exam_room:{
        type: String,
        required:true,
    },
    Dchrono_created_at:{
        type: String,
    },
    startDate:{
        type: String,
    },
    endDate:{
        type: String,
    },
    offSet:{
        type: String,
    },
    inVideoVisit:{
        type: Boolean,
    },
    availableDays:{
        type: Array,
    },
    repeatEveryWeek:{
        type: String,
    }

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
