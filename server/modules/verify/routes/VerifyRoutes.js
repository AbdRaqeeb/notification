import { Router } from 'express';
import ReceiverController from "../controller/VerifyController";

const router = Router();
const { addEntry } = ReceiverController;

router.post('/', addEntry);

export default router;