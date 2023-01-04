const productController = {
    index: (req, res) => res.render('home', { title: 'home' }),
    list: (req, res) => res.render('productList', { title: 'productList' }),
    create: (req, res) => res.render('productCreate', { title: 'productCreate' }),
    edit: (req, res) => res.render('productEdit', { title: 'productEdit' }),
    detail: (req, res) => res.render('productDetail', { title: 'productDetail' }),
    cart: (req, res) => res.render('productCart', { title: 'productCart' })
};

module.exports = productController;