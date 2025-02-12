import jwt from 'jsonwebtoken';

import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config.js";

export const auth = (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];
    
    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        
        req.user = decodedToken;
        res.locals.user = decodedToken;
        next();   

    } catch (error) {
        res.clearCookie(AUTH_COOKIE_NAME);
        res.redirect('/auth/login');
    }
    
};

export const isAuth = (req, res, next) => {
    
    if (!req.user) {
        res.setError('Please log in!');
        return res.redirect('/auth/login');
    }

    next();
}

export const isGuest = (req, res, next) => {
    
    if (req.user) {
        res.setError('You are already logged in!');
        return res.redirect('/');
    }

    next();
}