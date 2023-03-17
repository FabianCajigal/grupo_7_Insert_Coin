/*------------ Requires ------------*/
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const dataPath = path.resolve(__dirname, '../data/productsDatabase.json');
const products = require('../data/productsDataBase.json');

const productController = {
    index: (req, res) => {
        db.Product.findAll ({
            where: {
                news: true
            }
        }).then( products => {
            res.render('home', { products: products });
        });
    },
    list: (req, res) => {
        if (!req.query.category && !req.query.search) {
            const heading = 'Todos los productos';
            db.Product.findAll().then( products => {
                res.render('productList', { heading: heading, products: products });
            });
        }

        if (req.query.category) {
            let category = req.query.category.charAt(0).toUpperCase() + req.query.category.slice(1);
            category = category == 'Perifericos' ? 'Periféricos' : category;
            const heading = `Categoría: ${category}`;
            db.Product.findAll({
                include: { association: 'category' },
                where: { '$Category.name$' : req.query.category }
            }).then( products => {
                res.render('productList', { heading: heading, products: products });
            });
        }
        
        if (req.query.search) {
            const heading = `Resultados de búsqueda: "${req.query.search}"`;
            db.Product.findAll({
                include: { association: 'category' },
                where: { 
                    [Op.or]: [
                        {name: {[Op.like]: '%'+req.query.search+'%'}}, 
                        {shortDescription: {[Op.like]: '%'+req.query.search+'%'}}, 
                        {'$Category.name$': {[Op.like]: '%'+req.query.search+'%'}}
                    ]
                }
            }).then( products => {
                res.render('productList', { heading: heading, products: products });
            });
        }
    },
    detail: (req, res) => {
        db.Product.findByPk (req.params.id)
            .then( product => {
                product.longDescription = product.longDescription.split(';');
                res.render('productDetail', { product: product });
            });
    },
    cart: (req, res) => {
        res.render('productCart');
    },
    create: (req, res) => {
        res.render('productCreate');
    },
    store: (req,res) => {
        db.Product.create({
            name: req.body.name,
            shortDescription: req.body.shortDescription, 
            price: req.body.price,
            longDescription: req.body.longDescription,
            categoryId: req.body.category,
            news: req.body.news,
            image: req.file ? req.file.filename : 'default-image.png'
        }).then( () => {
            res.redirect('/products');
        });
    },
    edit: (req, res) => {
        db.Product.findByPk (req.params.id)
            .then( product => {
                res.render('productEdit', { product: product });
            });
    },
    update: (req,res) => {
        const product = products.find(product => product.id == req.params.id);
        const index = products.findIndex(product => product.id == req.params.id);
        const editedProduct = {
            id: product.id,
            name: req.body.name,
            shortDescription: req.body.shortDescription, 
            price: parseInt(req.body.price),
            longDescription: req.body.longDescription.split(';'),
            category: req.body.category,
            news: Boolean(parseInt(req.body.news)),
            image: req.file ? req.file.filename : product.image 
        };
        if (req.file && product.image != 'default-image.png') {
            fs.unlinkSync(path.resolve(__dirname, `../../public/img/products/${product.image}`));
        }
        products[index] = editedProduct;
        fs.writeFileSync(dataPath, JSON.stringify(products, null, ' '));
        res.redirect('/products/' + product.id);
    },
    destroy: (req,res) => {
        const product = products.find(product => product.id == req.params.id);
        const newProducts = products.filter(product => product.id != req.params.id);
        fs.writeFileSync(dataPath, JSON.stringify(newProducts, null, ' '));
        if (product.image != 'default-image.png') {
            fs.unlinkSync(path.resolve(__dirname, `../../public/img/products/${product.image}`));
        }
        res.redirect('/');
    }    
};

module.exports = productController;