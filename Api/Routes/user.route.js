import express from "express";
import { test } from "../Controllers/user.controllers.js";

const router = express.Router();

router.get("/text", test);
export default router;
