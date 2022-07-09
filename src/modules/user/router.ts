import express, { Request, Response, Router } from 'express';
import controller from './controller';

const router: Router = express.Router();

async function getOne(req: Request, res: Response) {
	try {
		let id = req.params.id;

		let response = await controller.get(id);

		res.json(response);
	} catch (err) {
		console.log('Error in : getOne [Router]');
		console.log(err);
	}
}

async function createUser(req: Request, res: Response) {
	try {
		let data = req.body;

		let response = await controller.create(data);

		res.json(response);
	} catch (err) {
		console.log('Error in : createUser [Router]');
		console.log(err);
	}
}

async function find(req: Request, res: Response) {
	try {
		let query = req.query;

		let response = await controller.find(query);

		res.json(response);
	} catch (err) {
		console.log('Error in : find [Router]');
		console.log(err);
	}
}

async function updateUser(req: Request, res: Response) {
	try {
		let data = req.body;

		let response = await controller.update(data);

		res.json(response);
	} catch (err) {
		console.log('Error in : updateUser [Router]');
		console.log(err);
	}
}

async function deleteUser(req: Request, res: Response) {
	try {
		let data = req.body;

		let response = await controller._delete(data);

		res.json(response);
	} catch (err) {
		console.log('Error in : deleteUser [Router]');
		console.log(err);
	}
}

router.get('/:id', getOne); //Get by id
router.get('/', find); //Find by filter
router.post('/', createUser); // Create One | Create Many
router.put('/', updateUser); //Update One | Update Many
router.delete('/', deleteUser); //Delete One | Delete Many

export default router;
