const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({

    accountAddress : {
        type:String,
        required: true,
    },
    imageName : {
        url: {
            type: String, // For Cloudinary image URL
            required: true, // Ensure this field is always present
          }, 
    }

})

const VoterModel = mongoose.model("voter", VoterSchema);
module.exports = VoterModel;