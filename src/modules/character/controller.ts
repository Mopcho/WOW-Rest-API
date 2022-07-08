import { PrismaClient } from '@prisma/client';
import type { Faction as FactionRole } from '@prisma/client';
import type { Races as RaceRole } from '@prisma/client';
const prisma = new PrismaClient();

type Query = {
	limit?: Number;
	page?: Number;
	sort?: String;
	select?: String;
};

type characterStartData = {
	username: string;
	faction: FactionRole;
	race: RaceRole;
	startingItem: string;
};

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

async function find(
	query: Query,
	limit?: Number,
	page?: Number,
	sort?: String,
	select?: String
) {
	let result = await prisma.player.findMany({
		include: {
			items: true,
		},
	});

	return result;
}

async function create(data: characterStartData) {
	try {
		let { username, faction, race, startingItem } = data;

		console.log(startingItem);

		let result = await prisma.player.create({
			data: {
				username: username,
				faction: faction,
				race: race,
				items: {
					connect: { id: startingItem },
				},
			},
		});

		return result;
	} catch (err) {
		console.log('Error in Character > Controller > Create');
		console.log(err);
	}
}

async function update() {}

async function _delete() {}

export default {
	get,
	find,
	create,
	update,
	_delete,
};
