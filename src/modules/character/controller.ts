import { Player, PrismaClient } from '@prisma/client';
import {
	QueryDB,
	Query,
	Entry,
	characterStartData,
	AdvancedQuery,
	AdvancedQueryDB,
} from '../../types';
import { buildQuery, buildSelect } from '../../utils/queryUtils';
import { buildOrderBy } from '../../utils/queryUtils';
const prisma = new PrismaClient();

async function advancedFind(
	query: AdvancedQuery,
	skip?: Number,
	take?: Number,
	orderBy?: Entry,
	select?: Entry
) {
	try {
		let queryBuilder: AdvancedQueryDB = buildQuery(query);

		let result = await prisma.player.findMany(queryBuilder);

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

export default {
	get,
	find,
	create,
	update,
	_delete,
	advancedFind,
};
