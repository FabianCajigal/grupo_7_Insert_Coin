/*------------ Requires ------------*/
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const dataPath = path.resolve(__dirname, '../data/usersDatabase.json');
const users = require('../data/usersDataBase.json');
const bcrypt = require('bcryptjs');

const userController = {
    register: (req, res) => res.render('register'),
    store: (req,res) => {
        db.User.create({
            email: req.body.email,
            username: req.body.username, 
            category: req.body.category,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.file ? req.file.filename : 'default-image.png'
        }).then ( (user) => {
            req.session.user = { 
                id: user.id,
                username: user.username,
                category: user.category,
                image: user.image
            };
            res.redirect('/');
        });
    },
    login: (req, res) => {
        res.render('login');
    },
    authenticate: (req, res) => {
        db.User.findOne ({
            where: {
                username: req.body.username
            }
        }).then ( (user) => {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
            
                if (req.body.rememberMe != undefined) {
                    res.cookie('id', user.id, { maxAge: 2592000000, httpOnly: true });
                }
    
                req.session.user = { 
                    id: user.id,
                    username: user.username,
                    category: user.category,
                    image: user.image
                };
                res.redirect('/');
            }
            else {
                res.render('login');
            }
        });      
    },
    profile: (req, res) => res.render('profile'),
    edit: (req, res) => {
        db.User.findByPk (req.session.user.id)
            .then ( (user) => {
                res.render('userEdit', { user: user });
            });
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
