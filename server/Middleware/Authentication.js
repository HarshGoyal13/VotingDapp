
const jwt = require("jsonwebtoken")

exports.authenticate = async(req,res, next)=>{
    const token = req.headers["x-access-token"];
    if(!token){
        res.status(500).send({
            message:"You dont have tokens"
        })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRETKEY)
    console.log(decode);
    req.accountAddress = decode.accountAddress

    next();
}

