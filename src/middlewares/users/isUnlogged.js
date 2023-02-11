function isUnlogged (req, res, next) {
    if (req.session.user) {
        res.redirect('/account');
    }
    else {
        next();
    }
}

module.exports = isUnlogged;