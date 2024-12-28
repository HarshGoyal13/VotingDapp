const express = require("express");

const router = express.Router();

const {uploadVoter, voterImage} = require("../Controllers/VoterController");
const { authenticate } = require("../Middleware/Authentication");

router.post("/uploadVoter",authenticate, uploadVoter);
router.post("/getVoterImage",authenticate,voterImage);


module.exports = router;