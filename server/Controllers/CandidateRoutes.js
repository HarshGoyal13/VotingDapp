const CandidateModel = require("../Models/CandidateSchema");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  // Add this in your .env file
  api_key: process.env.CLOUDINARY_API_KEY,  // Add this in your .env file
  api_secret: process.env.CLOUDINARY_SECRET_KEY,  // Add this in your .env file
});

exports.uploadCandidate = async (req, res) => {
  try {
    const accountAddress = req.accountAddress;  // Retrieved from middleware
    console.log("Account Address:", accountAddress);

    // Check if file is available
    const file = req.files && req.files.file;
    console.log("Uploaded File:", file);

    if (!file) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
    }

    // Validate file size (limit set to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).send({
        success: false,
        message: "File size should be less than 10MB",
      });
    }

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "candidates",  // Save images in a specific folder
    });

    console.log("Cloudinary Upload Result:", uploadResult);

    // Save the candidate information in the database, including the Cloudinary URL
    const candidate = new CandidateModel({
      accountAddress: accountAddress,
      imageName: {
        url: uploadResult.secure_url,  // URL of the uploaded image
      },
    });

    // Save the candidate to the database
    await candidate.save();

    res.status(200).send({
      success: true,
      message: "Candidate uploaded successfully",
      candidate,
    });
  } catch (error) {
    console.error("Error in uploadCandidate:", error.stack);  // Log the full error stack
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


exports.candidateImage = async (req, res) => {
  try {
    const { accountAddress } = req.body;  // Get accountAddress from the body

    // Find the candidate image in the database by account address
    const candidate = await CandidateModel.findOne({ accountAddress });

    if (!candidate) {
      return res.status(404).send("Image not found for this candidate");
    }

    // Send the image URL
    res.status(200).send({ imageUrl: candidate.imageName.url });  // Return the URL of the image
  } catch (error) {
    console.error("Error fetching candidate image:", error.message);
    res.status(500).send("Server Error");
  }
};


