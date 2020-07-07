const express = require('express');
const User = require('../models/User');
const Login = require('../models/Login');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { setToken } = require('../common/session');

router.use(verifyToken);

const getUserDetails = async (req, res, next) => {
    try {
        await User.find({}, {password: 0}).then(users => {
            res.status(200).send(users);
            setToken(req.params.id, req.headers['x-access-token']);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getLoginDetails = async (req, res, next) => {
    try {
        await Login.find({userId: req.params.id}).then(logins => {
            res.status(200).send(logins);
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

router.get('/', getUserDetails);
router.get('/:id', getUserDetails);
router.get('/login/:id', getLoginDetails)

module.exports = router;
