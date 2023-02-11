/*------------ Requires ------------*/
const fs = require('fs');
const path = require('path');
const dataPath = path.resolve(__dirname, '../data/usersDatabase.json');
const users = require('../data/usersDataBase.json');

const userController = {
    register: (req, res) => res.render('register'),
    login: (req, res) => {
        res.render('login');
    },
    authenticate: (req, res) => {
        const userToLogin = users.find(user => user.username == req.body.username);
        if (userToLogin && userToLogin.password == req.body.password) {
            req.session.user = { 
                id: userToLogin.id,
                username: userToLogin.username,
                category: userToLogin.category
            };
            res.redirect('/');
        }
        else {
            res.render('login');
        }
    },
    profile: (req, res) => res.render('profile'),
    edit: (req, res) => {
        const userToEdit = users.find(user => user.id == req.session.user.id);
        res.render('userEdit', { user: userToEdit });
    },
    update: (req, res) => {
        res.send('ok');
    },
    passwordChange: (req, res) => {
        const userToEdit = users.find(user => user.id == req.session.user.id);
        res.render('passwordChange', { user: userToEdit });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.locals.user = null;
        res.redirect('/');
    }
};

module.exports = userController;
