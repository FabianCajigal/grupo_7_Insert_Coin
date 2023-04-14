/*------------ Requires ------------*/
const db = require('../database/models');

const productApiController = {
    list: (req, res) => {
        db.Product.findAll({
            include: [ 
                { association: 'category', attributes: ['name'] }
            ]})
            .then( products => {
                const formattedProducts = products.map(product => product = {
                    id: product.id,
                    name: product.name,
                    shortDescription: product.shortDescription,
                    price: product.price,
                    category: product.category.name,
                    longDescription: product.longDescription.split(';'),
                    news: product.news,
                    detail: `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}/${product.id}`
                });
                res.status(200).json({
                    status: 200,
                    url: `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}`,
                    count: products.length,
                    countByCategory: {
                        hardware: products.filter(product => product.categoryId == 1).length,
                        computadoras: products.filter(product => product.categoryId == 2).length,
                        notebooks: products.filter(product => product.categoryId == 3).length,
                        perifericos: products.filter(product => product.categoryId == 4).length,
                        consolas: products.filter(product => product.categoryId == 5).length,
                        videojuegos: products.filter(product => product.categoryId == 6).length
                    },
                    products: formattedProducts
                });
            });
    },
    detail: (req, res) => {
        db.Product.findByPk ( req.params.id, {
            include: [ 
                { association: 'category', attributes: ['name'] }
            ]})
            .then( product => {
                const formattedProduct = {
                    id: product.id,
                    name: product.name,
                    shortDescription: product.shortDescription,
                    price: product.price,
                    category: product.category.name,
                    longDescription: product.longDescription.split(';'),
                    news: product.news,
                    imageUrl: `${req.protocol}://${req.headers.host}/img/products/${product.image}`
                };
                res.status(200).json({
                    status: 200,
                    url: `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}`,
                    product: formattedProduct
                });
            });
    }
}

module.exports = productApiController;