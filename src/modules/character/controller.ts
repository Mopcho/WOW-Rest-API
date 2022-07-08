import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function get(id: string) {
	try {
		let result = await prisma.player.findUnique({
			where: {
				id: id,
			},
		});

		if (!result) {
			throw new Error('Not Found!');
		}

		return result;
	} catch (err) {
		console.log('Error in Character > Controller');
		console.log(err);
	}
}

async function find() {}

async function create() {}

async function update() {}

async function _delete() {}

export default {
	get,
	find,
	create,
	update,
	_delete,
};
