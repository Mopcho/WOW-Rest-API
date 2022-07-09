import { Item, PrismaClient } from '@prisma/client';
import { ItemType as ItemType } from '@prisma/client';
import type { WeaponType as WeaponType } from '@prisma/client';
import type { ArrmorType as ArrmorType } from '@prisma/client';
import { QueryDB, Query, Entry } from '../../types';
import { buildSelect, buildOrderBy } from '../../utils/queryUtils';
const prisma = new PrismaClient();

type itemData = {
	type: ItemType;
	weaponType?: WeaponType;
	arrmorType?: ArrmorType;
	physicalDamage?: number;
	defence?: number;
	dodge?: number;
};

// Find - Done
async function find(
	query: Query,
	skip?: Number,
	take?: Number,
	sort?: String,
	select?: Entry
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
			if (key == 'defence' || key == 'dodge' || key == 'physicalDamage') {
				queryBuilder.where[key] = Number(query[key]);
			} else {
				queryBuilder.where[key] = query[key];
			}
		}

		let result = await prisma.item.findMany(queryBuilder);

		return result;
	} catch (err) {
		console.log('Error in Character > Controller > find');
		console.log(err);
	}
}

//Create One | Create Many - Done
async function create(data: itemData | itemData[]) {
	try {
		if (Array.isArray(data)) {
			let response: Array<Item> = [];
			data.forEach(async (item) => {
				let itemType = item.type;

				if (itemType == ItemType.Weapon) {
					let { physicalDamage, weaponType } = item;

					let result = await prisma.item.create({
						data: {
							type: itemType,
							physicalDamage: Number(physicalDamage),
							weaponType: weaponType,
						},
					});

					response.push(result);
				}
				if (itemType == ItemType.Arrmor) {
					let { defence, arrmorType, dodge } = item;

					defence = Number(defence);
					dodge = Number(dodge);

					let result = await prisma.item.create({
						data: {
							type: itemType,
							defence: defence,
							arrmorType: arrmorType,
							dodge: dodge,
						},
					});

					response.push(result);
				}
			});

			return response;
		} else {
			let itemType = data.type;

			if (itemType == ItemType.Weapon) {
				let { physicalDamage, weaponType } = data;

				let result = await prisma.item.create({
					data: {
						type: itemType,
						physicalDamage: Number(physicalDamage),
						weaponType: weaponType,
					},
				});

				return result;
			}
			if (itemType == ItemType.Arrmor) {
				let { defence, arrmorType, dodge } = data;

				defence = Number(defence);
				dodge = Number(dodge);

				let result = await prisma.item.create({
					data: {
						type: itemType,
						defence: defence,
						arrmorType: arrmorType,
						dodge: dodge,
					},
				});

				return result;
			}
		}
	} catch (err) {
		console.log('Error in Item > Controller > Create');
		console.log(err);
	}
}

//GetOne - Done
async function get(id: string) {
	try {
		let result = await prisma.item.findUnique({
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

// Update one / Update Many - Done
async function update(data: Entry | Entry[]) {
	try {
		if (!Array.isArray(data)) {
			let result = await prisma.item.update({
				where: {
					id: data.id,
				},
				data: data,
			});

			return result;
		} else {
			let result: Entry[] = [];
			data.forEach(async (item) => {
				let response = await prisma.item.update({
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

//Delete One / Delete Many - Done
async function _delete(data: Entry | Entry[]) {
	try {
		if (!Array.isArray(data)) {
			let result = await prisma.item.delete({
				where: {
					id: data.id,
				},
			});

			return result;
		} else {
			let result: Entry[] = [];
			data.forEach(async (item) => {
				let response = await prisma.item.delete({
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
};
