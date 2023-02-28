const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");
const {postBrand, getBrand, patchBrand, deleteBrand, getBrandForDropdown} = require("../controllers/brand/brandController");

router.post('/brands', AuthVerifyMiddleware, postBrand);
router.patch('/brands/:id', AuthVerifyMiddleware, patchBrand);
router.delete('/brands/:id', AuthVerifyMiddleware, deleteBrand);
router.get('/brands/dropdown', AuthVerifyMiddleware, getBrandForDropdown);
router.get('/brands/:keyword/:page/:perpage', AuthVerifyMiddleware, getBrand);

module.exports = router;