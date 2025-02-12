import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';


export const generetToken = (user) => {
    const paylod = {
        id: user.id,
        email: user.email,
        username: user.username
    }

    const token = jwt.sign(paylod, JWT_SECRET, {expiresIn: '2h'});

    return token;
}