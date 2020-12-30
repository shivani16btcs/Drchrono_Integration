var mongoose = require('mongoose');
var tokenSchema = new mongoose.Schema({
    appointment:{
        patientName:{
            type:String,
        },
        doctor:{
            type:String,
           
            minlength:5
        },
    
        duration:{
            type:String,
        },
    
        office:{
            type:String,
            
        },
      
        patient:{
            type:String,
        },
    
        scheduled_time: {
            type: String,
        },
    
        exam_room:{
            type: String,
        }
    },

    accessToken:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        required:true,
    },

    expireTime:{
        type:String,
       required:true,
    },

    scope:{
        type:String,
    },

    tokenType:{
        type:String,
    }
})
var Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
