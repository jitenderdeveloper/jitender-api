const jwt = require('jsonwebtoken')

module.exports= (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token,'MY_SECRET_KEY');
        console.log(verify);
        next();
        // const token = req.headers.authorization.split(" ")[1];
        // const verify = jwt.verify(token,'MY_SECRET_KEY');
        // verify.userData = decode
        // console.log(verify);
        // const token = req.body.token.split(" ")[1];
        // console.log(token);
        // const decode = jwt.verify(token,'MY_SECRET_KEY');
        // req.userData = decode
        // next();
        // console.log(req);
    }
    catch(error){
        console.log(error);
        return(
            res.status(401).json({
                message: 'invalid token'
            })
        )
    }
}