const userController = {
    register: (req, res) => res.render('register', { title: 'register' }),
    login: (req, res) => res.render('login', { title: 'login' }),
    profile: (req, res) => res.render('profile', { title: 'profile' }),
    edit: (req, res) => res.render('userEdit', { title: 'userEdit' }),
    passwordChange: (req, res) => res.render('passwordChange', { title: 'passwordChange' })
};

module.exports = userController;
