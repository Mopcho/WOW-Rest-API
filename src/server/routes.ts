import express from 'express';
import characterRouter from '../modules/character/router';
import userRouter from '../modules/user/router';

const router = express.Router();

router.use('/characters', characterRouter);
router.use('/users', userRouter);

export default router;
