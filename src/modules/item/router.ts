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

async function updateCharacter(req: Request, res: Response) {
	try {
		let data = req.body;

		let response = await controller.update(data);

		res.json(response);
	} catch (err) {
		console.log('Error in : updateCharacter [Router]');
		console.log(err);
	}
}

async function deleteCharacter(req: Request, res: Response) {
	try {
		let data = req.body;

		let response = await controller._delete(data);

		res.json(response);
	} catch (err) {
		console.log('Error in : deleteCharacter [Router]');
		console.log(err);
	}
}
router.get('/:id', getOne); //Get by id
router.put('/', updateCharacter); //Update One | Update Many
router.delete('/', deleteCharacter); //Delete One | Delete Many
router.get('/', findItems);
router.post('/', createItem);

export default router;
