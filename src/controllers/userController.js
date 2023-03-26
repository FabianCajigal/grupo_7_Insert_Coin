/*------------ Requires ------------*/
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');

const userController = {
    register: (req, res) => res.render('register'),
    store: (req,res) => {
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            db.User.findOne ({
                where: {
                    username: req.body.username
                }
            }).then( user => {
                if (user) {
                    let errors = {
                        username: { msg: 'El nombre de usuario ya se encuentra en uso' }
                    }
                    return res.render('register', { errors: errors, old: req.body });
                }
                db.User.create({
                    email: req.body.email,
                    username: req.body.username, 
                    admin: req.body.category,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: req.file ? req.file.filename : 'default-image.png'
                }).then( user => {
                    req.session.user = { 
                        id: user.id,
                        username: user.username,
                        admin: user.admin,
                        image: user.image
                    };
                    res.redirect('/');
                });
            });
        }
        else {
            res.render('register', { errors: errors.mapped(), old: req.body });
        }
    },
    login: (req, res) => {
        res.render('login');
    },
    authenticate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.findOne ({
                where: {
                    username: req.body.username
                }
            }).then( user => {
                if (user && bcrypt.compareSync(req.body.password, user.password)) {
                
                    if (req.body.rememberMe != undefined) {
                        res.cookie('id', user.id, { maxAge: 2592000000, httpOnly: true });
                    }

                    req.session.user = { 
                        id: user.id,
                        username: user.username,
                        admin: user.admin,
                        image: user.image
                    };
                    res.redirect('/');
                }
                else {
                    let errors = {
                        credentials: { msg: 'Usuario o contraseña incorrectos' }
                    }
                    res.render('login', { errors: errors, old: req.body });
                }
            });
        }
        else {
            res.render('login', { errors: errors.mapped(), old: req.body });
        }
    },
    profile: (req, res) => res.render('profile'),
    edit: (req, res) => {
        db.User.findByPk (req.session.user.id)
            .then( user => {
                res.render('userEdit', { user: user });
            });
    },
    update: (req,res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.findOne ({
                where: {
                    username: req.body.username,
                    id: { [Op.not]: req.session.user.id }
                }
            }).then( user => {
                if (user) {
                    let errors = {
                        username: { msg: 'El nombre de usuario ya se encuentra en uso' }
                    }
                    return res.render('userEdit', { errors: errors, old: req.body });
                }
                db.User.update(
                    {
                        email: req.body.email,
                        username: req.body.username, 
                        admin: req.body.category,
                        image: req.file ? req.file.filename : req.session.user.image 
                    },
                    {
                        where: { id: req.session.user.id }
                    })
                        .then( () => {
                            db.User.findByPk (req.session.user.id)
                                .then( user => {
                                    if (req.file && req.session.user.image != 'default-image.png') {
                                        fs.unlinkSync(path.resolve(__dirname, `../../public/img/users/${req.session.user.image}`));
                                    };
                                    req.session.user.username = user.username;
                                    req.session.user.admin = user.admin;
                                    req.session.user.image = user.image;
                                    res.redirect('/account');
                                });
                        });
                    });
        }
        else {
            res.render('userEdit', { errors: errors.mapped(), old: req.body });
        }
    },
    passwordChange: (req, res) => {
        res.render('passwordChange');
    },
    passwordUpdate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.findByPk (req.session.user.id)
                .then( user => {
                    if (bcrypt.compareSync(req.body.oldPassword, user.password) && req.body.password == req.body.passwordConfirm) {
                        db.User.update(
                            {
                                password: bcrypt.hashSync(req.body.password, 10) 
                            },
                            {
                                where: { id: req.session.user.id }
                            })
                                .then( () => {
                                    res.redirect('/account');
                                });
                    }
                    else {
                        res.render('passwordChange');
                    }
                });  
            }
            else {
                res.render('passwordChange', { errors: errors.mapped(), old: req.body });
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
