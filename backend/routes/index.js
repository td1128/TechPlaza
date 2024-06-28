import express from "express";
import signUp from "../controllers/signup.controller.js";
import login from "../controllers/login.controller.js";
import userDetails from "../controllers/userDetails.controllers.js";
import authToken from "../middleware/authToken.js";
import logout from "../controllers/logout.controller.js";
import allUsers from "../controllers/allUsers.controller.js";
import updateUser from "../controllers/updateUser.controller.js";
import uploadProduct from "../controllers/uploadProduct.controller.js";
import getProduct from "../controllers/getProduct.controller.js";
import updateProduct from "../controllers/updateProduct.controller.js";

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

