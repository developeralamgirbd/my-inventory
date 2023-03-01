const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");
const {getProduct,  patchProduct, postProduct, deleteProduct} = require("../controllers/product/productController");

router.post('/products', AuthVerifyMiddleware, postProduct);
router.patch('/products/:id', AuthVerifyMiddleware, patchProduct);
router.delete('/products/:id', AuthVerifyMiddleware, deleteProduct);
router.get('/products/:keyword/:page/:perpage', AuthVerifyMiddleware, getProduct);

module.exports = router;