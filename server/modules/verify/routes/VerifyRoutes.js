import { Router } from 'express';
import VerifyController from "../controller/VerifyController";

const router = Router();
const { addEntry } = VerifyController;

router.post('/', addEntry);

export default router;