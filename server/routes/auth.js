const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');
const {PASSWORD_SECRET, JWT_SECRET} = require('../environments');
const Login = require('../models/Login');
const {setToken} = require('../common/session');


const registerUser = async (req, res, next) => {
    const password = crypto.createHmac("sha256", PASSWORD_SECRET).update(req.body.password).digest('hex');

    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password
        }).then( user => {
            res.status(200).send({userId: user._id});
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateLoginLog = async (userId, token) => {
    await Login.create({userId, token}).then(login => {
        console.log(`User logged ${login}`);
    });
}

const loginUser = async (req, res, next) => {
    try {
        User.findOne({email: req.body.email}).then(user => {
            if(user) {
                const password = crypto.createHmac("sha256", PASSWORD_SECRET).update(req.body.password).digest('hex');
                if(user.password === password) {
                    const token = jsonwebtoken.sign({email: req.body.email}, JWT_SECRET, {expiresIn: '24h'});
                    updateLoginLog(user._id, token);
                    setToken(user._id, token);
                    res.status(200).send({message: "Login successful", token, userId: user._id});
                } else {
                    res.status(403).send({token: null, message: "Invalid password", userId: null});
                }
            } else {
                res.status(404).send({token: null, message: "User not fould", userId: null});
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

router.post('/create', registerUser);
router.post('/login', loginUser);

module.exports = router;