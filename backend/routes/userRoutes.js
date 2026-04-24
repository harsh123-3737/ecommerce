import express from "express";
import {
  allUser,
  changePassword,
  forgotPassword,
  getUserById,
  login,
  logout,
  register,
  reVerify,
  updateUser,
  verify,
  verifyOtp,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.get("/verify/:token", verify);
router.post("/reverify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/change-password/:email", changePassword);
router.get("/all-user", isAuthenticated, isAdmin, allUser);
router.get("/get-user/:userId", getUserById);
router.put("/update/:id", isAuthenticated, singleUpload, updateUser);
router.get("/register", (req, res) => {
  res.send("Registration endpoint is POST only");
});

export default router;
