const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  accountAddress: {
    type: String,
    required: true,
  },
  imageName: {
    url: {
      type: String, // For Cloudinary image URL
      required: true, // Ensure this field is always present
    },
  },
});

const CandidateModel = mongoose.model("candidate", CandidateSchema);
module.exports = CandidateModel;
