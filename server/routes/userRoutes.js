import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { Error } from 'mongoose';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import { sendPasswordResetEmail } from '../middleware/sendPasswordResetEmail.js';

const userRoutes = express.Router();

// TODO: Redefinir 'expiresIn'
const genToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d'})
}

// Login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
        user.firstLogin = false;
        await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            googleImage: user.googleImage,
            googleId: user.googleId,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
            active: user.active,
            firstLogin: user.firstLogin,
            created: user.createdAt
        });
    } else {
        // AsyncHandler impede que o código trave no 'throw new Error'
        res.status(401).json({message: 'Invalid credentials.'});
        throw new Error('User not found!');
    }
})

// Register
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({message: 'User already exists.'})
    } 

    const user = await User.create({name, email, password});
    const newToken = genToken(user._id);

    sendVerificationEmail(newToken, email, name);

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            googleImage: user.googleImage,
            googleId: user.googleId,
            isAdmin: user.isAdmin,
            active: user.active,
            firstLogin: user.firstLogin,
            created: user.createdAt,
            token: newToken
    });
    } else {
        res.status(400).send('We could not register you.')
        throw new Error('Something went wrong. Please check your informations and try again.')
    }
})
// Verify Email
const verifyEmail = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded.id);

        if(user){
            user.active = true;
            await user.save();
            res.json("Thanks for activate your account! You can close this window now!")
        } else {
            res.status(400).json({message: 'User not found!'})
        }
    } catch (error) {
        res.status(401).send('E-mail address could not be verified!')
    }
});

// Password Reset Request
const passwordResetRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const newToken = genToken(user._id);
            sendPasswordResetEmail(newToken, user.email, user.name);
            res.status(200).send(`We have sent you a recover e-mail to ${email}`);
        } else {
                res.status(400).json({ message: 'User not found!' });
            }
    } catch (error) {
        res.status(401).send('There is no account with such an e-mail address!')
    }
})

// Password Reset
const passwordReset = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded.id);

        if(user){
            user.password = req.body.password;
            await user.save();
            res.json("Your password has been updated successfully!")
        } else {
            res.status(400).json({message: 'User not found!'})
        }
    } catch (error) {
        res.status(401).send('Password reset failed!')
    }
})

// Google Login
const googleLogin = asyncHandler(async (req, res) => {
    const { googleId, email, name, googleImage } = req.body;
    try {
        const user = await User.findOne({googleId: googleId});
        if (user) {
            user.firstLogin = false;
            await user.save();
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                googleImage: user.googleImage,
                googleId: user.googleId,
                isAdmin: user.isAdmin,
                token: genToken(user._id),
                active: user.active,
                firstLogin: user.firstLogin,
                created: user.createdAt
            });
            } else {
                const newUser = await User.create({ 
                    googleId: googleId,
                    name: name,
                    email: email,
                    googleImage: googleImage
                });
                const newToken = genToken(newUser._id);
                sendVerificationEmail(newToken, newUser.email, newUser.name)
                res.json({ newToken, newUser });
                }
    } catch (error) {
        res.status(401).send('Google login failed!')
    }
})

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/verify-email').get(verifyEmail);
userRoutes.route('/password-reset-request').post(passwordResetRequest);
userRoutes.route('/password-reset').post(passwordReset);
userRoutes.route('/google-login').post(googleLogin);

export default userRoutes