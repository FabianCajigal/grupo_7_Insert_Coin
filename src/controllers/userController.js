/*------------ Requires ------------*/
const fs = require('fs');
const path = require('path');
const dataPath = path.resolve(__dirname, '../data/usersDatabase.json');
const users = require('../data/usersDataBase.json');

const userController = {
    register: (req, res) => res.render('register'),
    login: (req, res) => {
        res.render('login')
    },
    authenticate: (req, res) => {
        const user = users.find(user => user.username == req.body.username);
        if (user && user.password == req.body.password) {
            delete user.password;
            req.session.user = user;
            res.redirect('/');
        }
        else {
            res.render('login');
        }
    },
    profile: (req, res) => res.render('profile'),
    edit: (req, res) => res.render('userEdit'),
    update: (req, res) => {
        res.send('ok');
    },
    passwordChange: (req, res) => res.render('passwordChange'),
    logout: (req, res) => {
        res.redirect('/');
    }
};

module.exports = userController;
