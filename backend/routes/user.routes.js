import { Router } from "express";
import { createUser, searchUser } from "../controllers/user.controller.js";

const router = Router();
// Create a new user

router.post("/createUser", createUser);

router.get("/getUser", searchUser);

export { router };
