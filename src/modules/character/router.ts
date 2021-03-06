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

async function getAllItems(req: Request, res: Response) {
	try {
		let response = await controller.getAllItems(req.params.id);

		res.json(response);
	} catch (err) {
		console.log('Error in : getAllItems [Router]');
		console.log(err);
	}
}

async function buyItem(req: Request, res: Response) {
	try {
		let response = await controller.buyItem(
			req.params.playerId,
			req.params.itemId
		);

		res.json(response);
	} catch (err) {
		console.log('Error in : getAllItems [Router]');
		console.log(err);
	}
}

async function lose(req: Request, res: Response) {
	try {
		let response = await controller.addLose(req.params.id);

		res.json(response);
	} catch (err) {
		console.log('Error in : lose [Router]');
		console.log(err);
	}
}

async function win(req: Request, res: Response) {
	try {
		let response = await controller.addWin(req.params.id);

		res.json(response);
	} catch (err) {
		console.log('Error in : win [Router]');
		console.log(err);
	}
}

router.get('/:id', getOne); //Get by id
router.get('/', find); //Find by filter
router.post('/', createCharacter); // Create One | Create Many
router.put('/', updateCharacter); //Update One | Update Many
router.delete('/', deleteCharacter); //Delete One | Delete Many

//Secondary Endpoints
router.get('/:id/items', getAllItems);
router.get('/:playerId/buyItem/:itemId', buyItem);
router.put('/:id/lose', lose);
router.put('/:id/win', win);

export default router;
