import { Router } from 'express';
import TourController from '../controllers/TourController';

const router = Router();
const { addEntry } = TourController;

router.post('/', addEntry);

export default router;