import { Router } from 'express';
import PasswordController from "../controllers/PasswordController";
const router = Router();
const { addEntry } = PasswordController;

router.post('/', addEntry);

export default router;