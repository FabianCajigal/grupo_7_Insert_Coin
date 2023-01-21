const fs = require('fs');
const path = require('path');
const dataPath = path.resolve(__dirname, '../data/productsDatabase.json');
const products = require('../data/productsDataBase.json');

const productController = {
    index: (req, res) => {
        res.render('home', { title: 'home' })
    },
    list: (req, res) => {
        res.render('productList', { title: 'productList' })
    },
    detail: (req, res) => {
        const product = products.find(product => product.id == req.params.id);
        res.render('productDetail', { title: 'productDetail', product: product })
    },
    cart: (req, res) => {
        res.render('productCart', { title: 'productCart' })
    },
    create: (req, res) => {
        res.render('productCreate', { title: 'productCreate' })
    },
    store: (req,res) => {
        const product = { 
            id: products[products.length - 1].id + 1, 
            name: req.body.name,
            shortDescription: req.body.shortDescription, 
            price: parseInt(req.body.price),
            longDescription: req.body.longDescription.split(';'),
            category: req.body.category,
            news: Boolean(parseInt(req.body.news)),
            image: req.file ? req.file.filename : 'default-image.png' 
        };
        products.push(product);
        fs.writeFileSync(dataPath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },
    edit: (req, res) => {
        const product = products.find(product => product.id == req.params.id);
        res.render('productEdit', { title: 'productEdit', product: product })
    },
    update: (req,res) => {
        const product = products.find(product => product.id == req.params.id);
        const index = products.findIndex(product => product.id == req.params.id)
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
        products[index] = editedProduct;
        fs.writeFileSync(dataPath, JSON.stringify(products, null, ' '));
        res.redirect('/products/' + product.id);
    },
    destroy: (req,res) => {
        const newProducts = products.filter(product => product.id != req.params.id);
        fs.writeFileSync(dataPath, JSON.stringify(newProducts, null, ' '));
        res.redirect('/');
    }    
};

module.exports = productController;