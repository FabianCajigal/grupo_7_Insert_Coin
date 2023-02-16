/*------------ Requires ------------*/
const fs = require('fs');
const path = require('path');
const dataPath = path.resolve(__dirname, '../data/usersDatabase.json');
const users = require('../data/usersDataBase.json');
const bcrypt = require('bcryptjs');

const userController = {
    register: (req, res) => res.render('register'),
    store: (req,res) => {
        const userToRegister = { 
            id: users[users.length - 1].id + 1, 
            email: req.body.email,
            username: req.body.username, 
            category: req.body.category,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.file ? req.file.filename : 'default-image.png' 
        };
        users.push(userToRegister);
        fs.writeFileSync(dataPath, JSON.stringify (users, null, ' '));
        req.session.user = { 
            id: userToRegister.id,
            username: userToRegister.username,
            category: userToRegister.category,
            image: userToRegister.image
        };
        res.redirect('/');
    },
    login: (req, res) => {
        res.render('login');
    },
    authenticate: (req, res) => {
        const userToLogin = users.find(user => user.username == req.body.username);
        if (userToLogin && bcrypt.compareSync(req.body.password, userToLogin.password)) {
            
            if (req.body.rememberMe != undefined) {
                res.cookie('id', userToLogin.id, { maxAge: 2592000000, httpOnly: true });
            }

            req.session.user = { 
                id: userToLogin.id,
                username: userToLogin.username,
                category: userToLogin.category,
                image: userToLogin.image
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
    update: (req,res) => {
        const userToEdit = users.find(user => user.id == req.session.user.id);
        const index = users.findIndex(user => user.id == req.session.user.id);
        const editedUser = {
            id: userToEdit.id,
            email: req.body.email,
            username: req.body.username, 
            category: req.body.category,
            password: userToEdit.password,
            image: req.file ? req.file.filename : userToEdit.image 
        };
        if (req.file && userToEdit.image != 'default-image.png') {
            fs.unlinkSync(path.resolve(__dirname, `../../public/img/users/${userToEdit.image}`));
        }
        users[index] = editedUser;
        fs.writeFileSync(dataPath, JSON.stringify(users, null, ' '));
        req.session.user.username = editedUser.username;
        req.session.user.category = editedUser.category;
        res.redirect('/account');
    },
    passwordChange: (req, res) => {
        res.render('passwordChange');
    },
    passwordUpdate: (req, res) => {
        const index = users.findIndex(user => user.id == req.session.user.id);
        if (bcrypt.compareSync(req.body.oldPassword, users[index].password) && req.body.password == req.body.passwordConfirm) {
            users[index].password = bcrypt.hashSync(req.body.password, 10);
            fs.writeFileSync(dataPath, JSON.stringify(users, null, ' '));
            res.redirect('/account');
        }
        else {
            res.render('passwordChange');
        }
    },
    logout: (req, res) => {
        res.clearCookie('id');
        req.session.destroy();
        res.locals.user = null;
        res.redirect('/');
    }
};

module.exports = userController;
