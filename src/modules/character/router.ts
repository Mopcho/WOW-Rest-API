import express, { Request, Response } from 'express';
import controller from './controller';

const router = express.Router();

async function getOne(req: Request, res: Response) {
	try {
		let id = req.params.id;

		return await controller.get(id);
	} catch (err) {
		console.log('Error in : GetOne [Router]');
		console.log(err);
	}
}

router.get('/:id', getOne);

export default router;
