const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");


const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true,
  }));



const connectDb = require("./config/db")

const candidateRoutes = require("./Routes/candidateRoutes");
const voterRoutes = require("./Routes/VoterRoutes");
const authRoutes = require("./Routes/Auth");



app.use("/api/v1", candidateRoutes);
app.use("/api/v1", voterRoutes);
app.use("/api/v1", authRoutes);


app.get("/",(req,res)=>{
    res.send("<h1>Voting Dapp</h1>");
})

app.listen(process.env.PORT,()=> {
    connectDb();
    console.log(`Server Connected At PORT ${process.env.PORT}`);
})


