const productController = {
    index: (req, res) => res.render('home', { title: 'home' }),
    create: (req, res) => res.render('productCreate', { title: 'productCreate' }),
    detail: (req, res) => res.render('productDetail', { title: 'productDetail' }),
    cart: (req, res) => res.render('productCart', { title: 'productCart' })
};

module.exports = productController;