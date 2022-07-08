import express, { Request, Response } from 'express';
import characterRouter from '../modules/character/router';
import userRouter from '../modules/user/router';
import itemsRouter from '../modules/item/router';

const router = express.Router();

router.use('/users', userRouter);
router.use('/items', itemsRouter);
router.use('/characters', characterRouter);

export default router;
