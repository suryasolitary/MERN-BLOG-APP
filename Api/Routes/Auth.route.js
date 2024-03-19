import express from "express";
import { signup } from "../Controllers/Auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
