import express from "express";
import usersController from "../controllers/users.js";
import { verificateToken } from "../helpers/autentication.js";

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.get("/user/:id", usersController.getUserById);
router.get("/profile/:email", verificateToken, usersController.profile);
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.delete("/delete/:id", verificateToken, usersController.delete);
router.put("/update/:id", verificateToken, usersController.update);

export default router;
