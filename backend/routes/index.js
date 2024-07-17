import express from "express";
import signUp from "../controllers/user/signup.controller.js";
import login from "../controllers/user/login.controller.js";
import userDetails from "../controllers/user/userDetails.controllers.js";
import authToken from "../middleware/authToken.js";
import logout from "../controllers/user/logout.controller.js";
import allUsers from "../controllers/user/allUsers.controller.js";
import updateUser from "../controllers/user/updateUser.controller.js";
import uploadProduct from "../controllers/product/uploadProduct.controller.js";
import getProduct from "../controllers/product/getProduct.controller.js";
import updateProduct from "../controllers/product/updateProduct.controller.js";
import getCategoryWiseSingleProduct from "../controllers/product/getCategoryWiseSingleProduct.controller.js";
import getCategoryWiseProduct from "../controllers/product/getCategoryWiseProduct.controller.js";
import getProductDetails from "../controllers/product/getProductDetails.controller.js";
import addToCartProduct from "../controllers/user/addToCart.controller.js";
import countAddToCartProduct from "../controllers/user/countAddToCart.controller.js";
import addToCartView from "../controllers/user/addToCartView.controller.js";
import updateAddToCartProduct from "../controllers/user/updateAddToCart.controller.js";
import deleteAddToCartProduct from "../controllers/user/deleteAddToCartProduct.controller.js";
import searchProduct from "../controllers/product/searchProduct.controller.js";
import filterProductController from "../controllers/product/filterProduct.controller.js";
import paymentController from "../controllers/order/payment.controller.js";

const router=express.Router();

router.post("/signup",signUp)
router.post("/login",login)
router.get("/user-details",authToken,userDetails)
router.get("/logout",logout)

//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)


//product routes
router.post("/upload-product",authToken,uploadProduct)
router.get("/get-product",getProduct)
router.post("/update-product",authToken,updateProduct)
router.get("/get-category",getCategoryWiseSingleProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartProduct)
router.get("/countAddToCart",authToken,countAddToCartProduct)
router.get("/veiw-cart-products",authToken,addToCartView)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//payment and order
router.post("/checkout",authToken,paymentController)

export default router

