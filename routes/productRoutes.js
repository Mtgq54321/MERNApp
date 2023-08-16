const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


//making a storage dir
const storageDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(storageDirectory)) {
  fs.mkdirSync(storageDirectory);
}
//using the storage dir
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storageDirectory); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });


router.get('/', productController.getProducts);
router.post('/', upload.array('images'), productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/', productController.deleteProduct);

module.exports = router;