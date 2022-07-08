import express from 'express';
import characterRouter from '../character/router';

const router = express.Router();

router.use('/character', characterRouter);

export default router;
