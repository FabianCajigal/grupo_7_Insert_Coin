const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/img/products'));
    },
    filename: function (req, file, cb) {
        cb(null, `products-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.get('/', productController.list)

router.get('/create', productController.create);
router.post('/', upload.single('image'), productController.store);

router.get('/:id', productController.detail);

router.get('/:id/edit', productController.edit);
router.put('/:id', upload.single('image'), productController.update);
router.delete('/:id', productController.destroy);


module.exports = router;