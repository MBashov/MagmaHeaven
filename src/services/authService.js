import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { generetToken } from '../utils/tokenUtils.js';


export default {
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid user or email!');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid user or email!');
        }

        const token = generetToken(user);

        return token;
    },

    async register(userData) {
        if (userData.password !== userData.rePassword) {
            throw new Error('Password don\'t match!');
        }

        const user = await User.findOne({ email: userData.email }).select({ _id: true });

        if (user) {
            throw new Error('Email already exist!');
        }

        const createdUser = await User.create(userData);

        const token = generetToken(createdUser);

        return token;
    },

}

