const path = require("path");
const { check } = require("express-validator");

const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/admin-products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    check("title")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage("Title length should be at least 3 characters"),
    check("price").isNumeric().withMessage("price should number"),
    check("description")
      .isLength({ min: 5, max: 400 })
      .trim()
      .withMessage("Description length should be at least 5 characters"),
  ],
  isAuth,
  adminController.postAddProduct
);

// /admin/edit-product => GET
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    check("title")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage("Title length should be at least 3 characters"),
    check("price").isNumeric().withMessage("price should number"),
    check("description")
      .isLength({ min: 5, max: 400 })
      .trim()
      .withMessage("Description length should be at least 5 characters"),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
