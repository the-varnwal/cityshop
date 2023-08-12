const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require("../controllers/categoryControllers");
const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, createCategoryController);
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);
router.get('/categories', categoryController);
router.get('/single-category/:slug', singleCategoryController);
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;