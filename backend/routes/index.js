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

const router=express.Router();

router.post("/signup",signUp)
router.post("/login",login)
router.get("/user-details",authToken,userDetails)
router.get("/logout",logout)

//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

router.post("/upload-product",authToken,uploadProduct)
router.get("/get-product",getProduct)
router.post("/update-product",authToken,updateProduct)

export default router

