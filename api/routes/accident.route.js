import express from 'express';
import { createAccident, getAccidents } from '../controllers/accident.controller.js';

const router = express.Router();

router.post('/accidents', createAccident);
router.get('/accidents', getAccidents);

export default router;
