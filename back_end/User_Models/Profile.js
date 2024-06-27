const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    type:{
        type: String,
    },
    description:{
        type: String,
    },    
    face_information:{
        type: String,
        require:true
    },    
    sound_information:{
        type: String,
        required: true
    },    
    date:{
        type: Date,
        default:Date.now
    }

})

module.exports = Profile = mongoose.model("profile", ProfileSchema);