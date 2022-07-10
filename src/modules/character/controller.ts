import { Player, PrismaClient } from '@prisma/client';
import {
	QueryDB,
	Query,
	Entry,
	characterStartData,
	AdvancedQueryDB,
} from '../../types';
import { buildSelect } from '../../utils/queryUtils';
import { buildOrderBy } from '../../utils/queryUtils';
const prisma = new PrismaClient();

const levelX = 0.3;
const levelY = 2;

async function advancedFind(
	query: AdvancedQueryDB,
	skip?: Number,
	take?: Number,
	orderBy?: Entry,
	select?: Entry
) {
	try {
		let result = await prisma.player.findMany(query);

		return result;
	} catch (err) {
		console.log('Error in Character > Controller > find');
		console.log(err);
	}
}

//GetOne - Done
async function get(id: string) {
	try {
		let result = await prisma.player.findUnique({
			where: {
				id: id,
			},
			include: {
				items: true,
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

//Find - Done
async function find(
	query: Query,
	skip?: Number,
	take?: Number,
	sort?: String,
	select?: String
) {
	try {
		let queryBuilder: QueryDB = {};

		if (query.take) {
			queryBuilder.take = Number(query.take);
			delete query.take;
		} else {
			queryBuilder.take = 10;
		}

		if (query.skip) {
			queryBuilder.skip = Number(
				(Number(query.skip) - 1) * queryBuilder.take
			);
			delete query.skip;
		} else {
			queryBuilder.skip = 0;
		}

		if (query.sort) {
			// Check if sort is array or string
			if (!queryBuilder.orderBy) {
				queryBuilder.orderBy = {};
			}

			queryBuilder.orderBy = buildOrderBy(query.sort);

			delete query.sort;
		}

		if (query.select) {
			if (!queryBuilder.select) {
				queryBuilder.select = {};
			}

			queryBuilder.select = buildSelect(query.select);

			delete query.select;
		}

		//Build where
		if (!queryBuilder.where) {
			queryBuilder.where = {};
		}

		for (const key in query) {
			if (key == 'gold' || key == 'wins' || key == 'loses') {
				queryBuilder.where[key] = Number(query[key]);
			} else {
				queryBuilder.where[key] = query[key];
			}
		}

		let result = await prisma.player.findMany(queryBuilder);

		return result;
	} catch (err) {
		console.log('Error in Character > Controller > find');
		console.log(err);
	}
}

//CreateOne / Create Many - Done
async function create(data: characterStartData | characterStartData[]) {
	try {
		if (Array.isArray(data)) {
			let response: Array<Player> = [];

			data.forEach(async (x) => {
				let { username, faction, race, startingItem } = x;

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

				response.push(result);
			});

			return response;
		} else {
			let { username, faction, race, startingItem } = data;

			let response = await prisma.player.create({
				data: {
					username: username,
					faction: faction,
					race: race,
					items: {
						connect: { id: startingItem },
					},
				},
			});

			return response;
		}
	} catch (err) {
		console.log('Error in Character > Controller > Create');
		console.log(err);
	}
}

// Update one / Update Many - Done
async function update(data: Entry | Entry[]) {
	try {
		if (!Array.isArray(data)) {
			let result = await prisma.player.update({
				where: {
					id: data.id,
				},
				data: data,
			});

			return result;
		} else {
			let result: Entry[] = [];
			data.forEach(async (item) => {
				let response = await prisma.player.update({
					where: {
						id: item.id,
					},
					data: item,
				});

				result.push(response);
			});

			return result;
		}
	} catch (err) {
		console.log('Error in Character > Controller > Create');
		console.log(err);
	}
}

//Delete One / Delete Many
async function _delete(data: Entry | Entry[]) {
	try {
		if (!Array.isArray(data)) {
			let result = await prisma.player.delete({
				where: {
					id: data.id,
				},
			});

			return result;
		} else {
			let result: Entry[] = [];
			data.forEach(async (item) => {
				let response = await prisma.player.delete({
					where: {
						id: item.id,
					},
				});

				result.push(response);
			});

			return result;
		}
	} catch (err) {
		console.log('Error in Character > Controller > Create');
		console.log(err);
	}
}

async function getAllItems(playerId: string) {
	try {
		let response = await prisma.player.findFirst({
			where: {
				id: playerId,
			},
			select: {
				items: true,
			},
		});

		return response;
	} catch (err) {
		console.log('Error in Character > Controller > Find All Items');
		console.log(err);
	}
}

async function buyItem(playerId: string, itemId: string) {
	try {
		let player = await prisma.player.findUnique({
			where: {
				id: playerId,
			},
		});

		let item = await prisma.item.findUnique({
			where: {
				id: itemId,
			},
		});

		//Checks
		if (!item || !player) {
			throw new Error('Not Found');
		}

		if (item.price > player.gold) {
			return false;
		}

		const newGold = player.gold - item.price;

		let response = await prisma.player.update({
			where: {
				id: playerId,
			},
			data: {
				gold: newGold,
				items: {
					connect: {
						id: itemId,
					},
				},
			},
		});

		return response;
	} catch (err) {
		console.log('Error in Character > Controller > Buy Item');
		console.log(err);
	}
}

async function addLose(playerId: string) {
	try {
		let player = await prisma.player.findUnique({
			where: {
				id: playerId,
			},
		});

		if (!player) {
			throw new Error('Nor Found');
		}

		let newLoses = player.loses + 1;

		let newExp = player.totalExperience + 4;

		let newLevel = Math.floor(levelX * Math.sqrt(newExp));

		let response = await prisma.player.update({
			where: {
				id: playerId,
			},
			data: {
				loses: newLoses,
				level: newLevel,
				totalExperience: newExp,
			},
		});

		return response;
	} catch (err) {
		console.log('Error in Character > Controller > Buy Item');
		console.log(err);
	}
}

async function addWin(playerId: string) {
	try {
		let player = await prisma.player.findUnique({
			where: {
				id: playerId,
			},
		});

		if (!player) {
			throw new Error('Nor Found');
		}

		let newWins = player.wins + 1;

		let newExp = player.totalExperience + 8;

		let newLevel = Math.floor(levelX * Math.sqrt(newExp));

		let response = await prisma.player.update({
			where: {
				id: playerId,
			},
			data: {
				loses: newWins,
				level: newLevel,
				totalExperience: newExp,
			},
		});

		return response;
	} catch (err) {
		console.log('Error in Character > Controller > Buy Item');
		console.log(err);
	}
}

export default {
	get,
	find,
	create,
	update,
	_delete,
	advancedFind,
	getAllItems,
	buyItem,
	addWin,
	addLose,
};
