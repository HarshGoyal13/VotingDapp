
const {ethers} = require("ethers");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticate = async(req,res)=>{
    try{

        const {accountAddress} = req.query;
        const {signature} = req.body;

        if(!signature || !accountAddress){
            res.status(300).send({
                message:"Authentication Failed",
            })
        }

        const message = "Welcome to Voting DApp. You accept our terms and conditions.";

        const recoverAddress = ethers.utils.verifyMessage(message, signature)

        if(recoverAddress.toLowerCase() == accountAddress.toLowerCase()){
            const token = jwt.sign({accountAddress}, process.env.JWT_SECRETKEY,{expiresIn:"7d"});
            res.status(200).send({
                message:"Authentication Successfull",
                token : token
            })
        }else{
            throw new Error("Recoverd Address not same as account address");
        }
        

    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Authentication Failed"
        })
    }
}
