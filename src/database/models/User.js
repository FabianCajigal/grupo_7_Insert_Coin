module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        admin: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tablename: 'users'
    };

    const User = sequelize.define (alias, cols, config);

    return User
}