import { Router } from 'express';
import InquiryController from '../controllers/InquiryController';

const router = Router();
const { addEntry } = InquiryController;

router.post('/', addEntry);

export default router;