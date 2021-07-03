import jwt from 'jsonwebtoken';

// Todos los middlewares tienen que tener req, res y next.

const verifyJwt = (req, res, next) => {
    const token = req.header('x-access-token');
    
    if (!token) {
        return res.status(401).json({
            message: "There's no token provided"
        });
    }

    try {
        
        //Extraemos el UUID del token.
        const { uuid } = jwt.verify(token, process.env.JWT_SECRET);
        
        // Colocamos el UUID del usuario en el request para que llegue hasta el controlador.
        req.uuid = uuid;

        next();

    } catch (error) {
        
        res.status(401).json({
            message: "Invalid token",
            error
        });
    }
}

export default verifyJwt;