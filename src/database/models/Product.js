module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        shortDescription: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        longDescription: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        news: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tablename: 'products'
    };

    const Product = sequelize.define (alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo (models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        })
    }

    return Product
}