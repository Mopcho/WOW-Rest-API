import { Item, PrismaClient } from '@prisma/client';
import { ItemType as ItemType } from '@prisma/client';
import type { WeaponType as WeaponType } from '@prisma/client';
import type { ArrmorType as ArrmorType } from '@prisma/client';
import { QueryDB, Query, Entry, characterStartData } from '../../types';
import { response } from 'express';
const prisma = new PrismaClient();

type itemData = {
	type: ItemType;
	weaponType?: WeaponType;
	arrmorType?: ArrmorType;
	physicalDamage?: number;
	defence?: number;
	dodge?: number;
};

function buildOrderBy(sort: string | string[]): Entry {
	let orderBy: Entry = {};

	if (Array.isArray(sort)) {
		//On Multiple sorts
		sort.forEach((x) => {
			if (x.startsWith('-')) {
				//Descending
				let key = x.slice(0, 1);
				let value = 'desc';

				orderBy[key.toString()] = value;
			} else {
				//Ascending
				let key = x;
				let value = 'asc';

				orderBy[key.toString()] = value;
			}
		});
	} else {
		//On one sort
		if (sort.startsWith('-')) {
			//Descending
			let key = sort.slice(0, 1);
			let value = 'desc';

			orderBy[key.toString()] = value;
		} else {
			//Ascending
			let key = sort;
			let value = 'asc';

			orderBy[key.toString()] = value;
		}
	}

	return orderBy;
}

function buildSelect(select: string | string[]): Entry {
	let selectBuilder: Entry = {};

	if (Array.isArray(select)) {
		//On Multiple sorts
		select.forEach((x) => {
			selectBuilder[x] = true;
		});
	} else {
		selectBuilder[select] = true;
	}

	return selectBuilder;
}

async function find(
	query: Query,
	skip?: Number,
	take?: Number,
	orderBy?: String,
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

			delete query.take;
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
			queryBuilder.where[key] = query[key];
		}

		let result = await prisma.item.findMany(queryBuilder);

		return result;
	} catch (err) {
		console.log('Error in Character > Controller > find');
		console.log(err);
	}
}

//Create One | Create Many
async function create(data: itemData | itemData[]) {
	try {
		if (Array.isArray(data)) {
			data.forEach(async (item) => {
				let itemType = item.type;
				let response: Array<Item> = [];

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

//Delete One / Delete Many
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
