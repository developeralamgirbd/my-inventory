const express = require('express');
const router = express.Router();
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");
const {
    postCategory,
    patchCategory,
    deleteCategory,
    getCategoryForDropdown,
    getCategories
} = require("../controllers/category/categoryController");

router.post('/categories', AuthVerifyMiddleware, postCategory);
router.patch('/categories/:id', AuthVerifyMiddleware, patchCategory);
router.delete('/categories/:id', AuthVerifyMiddleware, deleteCategory);
router.get('/categories/dropdown', AuthVerifyMiddleware, getCategoryForDropdown);
router.get('/categories/:keyword/:page/:perpage', AuthVerifyMiddleware, getCategories);

module.exports = router;