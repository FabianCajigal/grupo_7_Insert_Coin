const userController = {
    register: (req, res) => res.render('register', { title: 'register' }),
    login: (req, res) => res.render('login', { title: 'login' }),
    profile: (req, res) => res.render('profile', { title: 'profile' })
};

module.exports = userController;
