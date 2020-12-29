var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({

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
