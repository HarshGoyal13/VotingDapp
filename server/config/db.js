const mongoose = require("mongoose");
require("dotenv").config();


const mongoDbConnection  = async (req,res) => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully");
    }catch(error){
        console.log("Error in Database Connection", error);
    }

}
module.exports = mongoDbConnection;
