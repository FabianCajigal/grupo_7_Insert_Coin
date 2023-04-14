/*------------ Requires ------------*/
const db = require('../database/models');

const userApiController = {
    list: (req, res) => {
        db.User.findAll()
            .then( users => {
                const formattedUsers = users.map(user => user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    admin: user.admin == 1,
                    detail: `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}/${user.id}`
                });
                res.status(200).json({
                    status: 200,
                    url: `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}`,
                    count: users.length,
                    countByCategory: {
                        admin: users.filter(user => user.admin).length,
                        user: users.filter(user => !user.admin).length
                    },
                    users: formattedUsers
                });
            });
    },
    detail: (req, res) => {
        db.User.findByPk ( req.params.id )
            .then( user => {
                const formattedUser = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    admin: user.admin == 1,
                    imageUrl: `${req.protocol}://${req.headers.host}/img/users/${user.image}`
                };
                res.status(200).json({
                    status: 200,
                    url: `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}`,
                    user: formattedUser
                });
            });
    }
}

module.exports = userApiController;