function isAdmin (req, res, next) {
    if (req.session.user && req.session.user.category == 'admin') {
        next();
    }
    else {
        res.redirect('/');
    }
}

module.exports = isAdmin;