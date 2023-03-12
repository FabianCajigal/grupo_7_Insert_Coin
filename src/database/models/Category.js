module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tablename: 'categories'
    };

    const Category = sequelize.define (alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany (models.Product, {
            as: 'category',
            foreignKey: 'categoryId'
        })
    }

    return Category
}