const users = require('../../data/usersDataBase.json');

function isRemembered(req, res, next) {
    if (req.cookies && req.cookies.id) {
        const userToRemember = users.find(user => user.id == req.cookies.id);
        req.session.user = { 
            id: userToRemember.id,
            username: userToRemember.username,
            category: userToRemember.category,
            image: userToRemember.image
        };
    } 

    next();
}

module.exports = isRemembered;