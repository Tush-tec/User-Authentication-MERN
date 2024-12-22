import jwt from 'jsonwebtoken'

const protect  = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startWith('Bearer ')){
        res.status(401).json({message:'Not authorized, no token'})
    }

    try {
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = decoded._id;
        next();

    } catch (error) {
        res.status(401).json({
            message:'Token expired or invalid'
        })
    }
}

export default protect;