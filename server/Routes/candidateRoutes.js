const express = require("express");

const router = express.Router();

const {uploadCandidate, candidateImage} = require("../Controllers/CandidateRoutes");
const { authenticate } = require("../Middleware/Authentication");

router.post("/uploadCandidate",authenticate, uploadCandidate);
router.post("/CandidateImages", authenticate, candidateImage);



module.exports = router;