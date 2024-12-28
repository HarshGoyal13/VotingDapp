

const express = require("express");

const router = express.Router();

const {authenticate} = require("../Controllers/Auth")

router.post("/authentication", authenticate);


module.exports = router;