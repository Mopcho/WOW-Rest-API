import express, { Request, Response, Router } from 'express';
import controller from './controller';

const router: Router = express.Router();

async function createItem(req: Request, res: Response) {
	try {
		let data = req.body;
		let response = await controller.create(data);

		res.status(204).json(response);
	} catch (err) {
		console.log('Error in Item > Router > createItem');
		res.json(err);
	}
}

async function findItems(req: Request, res: Response) {
	try {
		let query = req.query;
		let response = await controller.find(query);

		res.status(200).json(response);
	} catch (err) {
		console.log('Error in Item > Router > createItem');
		res.json(err);
	}
}

router.get('/', findItems);
router.post('/', createItem);

export default router;
