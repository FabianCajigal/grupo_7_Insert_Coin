const db = require('../../database/models');

function isRemembered(req, res, next) {
    if (req.cookies && req.cookies.id) {
        db.User.findByPk (req.cookies.id, { raw: true })
            .then( user => {
                req.session.user = { 
                    id: user.id,
                    username: user.username,
                    admin: user.admin,
                    image: user.image
                };
                next();
            });
    } 
    else {
        next();
    } 
}

module.exports = isRemembered;