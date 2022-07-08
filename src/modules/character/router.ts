import express, { Request, Response, Router } from 'express';
import controller from './controller';

const router: Router = express.Router();

async function getOne(req: Request, res: Response) {
	try {
		let id = req.params.id;

		let response = await controller.get(id);

		res.json(response);
	} catch (err) {
		console.log('Error in : GetOne [Router]');
		console.log(err);
	}
}

async function createCharacter(req: Request, res: Response) {
	try {
		let data = req.body;

		let response = await controller.create(data);

		res.json(response);
	} catch (err) {
		console.log('Error in : GetOne [Router]');
		console.log(err);
	}
}

async function find(req: Request, res: Response) {
	try {
		let query = req.query;

		let response = await controller.find(query);

		res.json(response);
	} catch (err) {
		console.log('Error in : GetOne [Router]');
		console.log(err);
	}
}

router.get('/:id', getOne);
router.get('/', find);
router.post('/', createCharacter);

export default router;
