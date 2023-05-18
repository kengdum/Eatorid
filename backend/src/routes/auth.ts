import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";

const router: Router = Router();

router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);
router.get("/user", AuthController.getUser);

export default router;
