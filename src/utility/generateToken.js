import jwt from 'jsonwebtoken';

const generateToken = UUID => {
    return new Promise((resolve, reject) => {
        
        const payload = {
            uuid: UUID
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                
                reject('Something went wrong generating the token');
            
            } else {

                resolve(token);

            }
        });
    });
}

export default generateToken;