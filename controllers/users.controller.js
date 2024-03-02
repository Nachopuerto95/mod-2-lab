const User = require('../models/user.model')
const mongoose = require('mongoose')
const createError = require('http-errors')
const bcrypt = require("bcrypt");


module.exports.create = (req, res, next) => {
    res.render('users/signup')
}

module.exports.doCreate = (req, res, next) => {

    const user = req.body
    User.create(user) 
        .then((user) => {
            res.redirect('/login')
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res
                    .status(400)
                    .render('users/signup', {user, errors: error.errors}) 
            } else {
                next(error);
            }
        });

        
}

module.exports.login = (req, res ,next) => {
    res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then((user) => {
            if(!user) {
                res
                    .status(401)
                    .render('users/login', {user: req.body, errors: {password: 'invalid username or password'}})
            } else {
                res.redirect('/profile')
            }
        })
        .catch(next)
}

module.exports.profile = (req, res, next) => {
    res.render('users/profile')
}