/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');
const isAdmin = require('../middlewares/users/isAdmin');

/*------------ Multer setup ------------*/
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/img/products'));
    },
    filename: function (req, file, cb) {
        cb(null, `products-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

/*------------ Get full products list ------------*/
router.get('/', productController.list);

/*------------ Get creation form & submit new product ------------*/
router.get('/create', isAdmin, productController.create);
router.post('/', isAdmin, upload.single('image'), productController.store);

/*------------ Get product detail ------------*/
router.get('/:id', productController.detail);

/*------------ Get edition form & submit updated product ------------*/
router.get('/:id/edit', isAdmin, productController.edit);
router.put('/:id', isAdmin, upload.single('image'), productController.update);

/*------------ Delete product ------------*/
router.delete('/:id', isAdmin, productController.destroy);


module.exports = router;