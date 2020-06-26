const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const userId= decoded.user._id;
            if(req.body.userId && req.body.userId !== userId){
                throw 'invalid user ID';
            }else{ 
                    req.jwtPayload = decoded;
                    next();  
            }
    }catch{
        res.status(401).json({error : "invalid req"});
    }
}
