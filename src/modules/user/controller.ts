import { PrismaClient, User } from '@prisma/client';
import { QueryDB, Query, Entry } from '../../types';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

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

	selectBuilder['password'] = false;

	return selectBuilder;
}

type userCreationInfo = {
	username: string;
	email?: string;
	password: string;
};

//GetOne - Done
async function get(id: string) {
	try {
		let result = await prisma.user.findUnique({
			where: {
				id: id,
			},
			select: {
				username: true,
				password: false,
				email: true,
				id: true,
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
		} else {
			if (!queryBuilder.select) {
				queryBuilder.select = {
					username: true,
					password: false,
					email: true,
					id: true,
				};
			}
		}

		//Build where
		if (!queryBuilder.where) {
			queryBuilder.where = {};
		}

		for (const key in query) {
			queryBuilder.where[key] = query[key];
		}

		let result = await prisma.user.findMany(queryBuilder);

		return result;
	} catch (err) {
		console.log('Error in Character > Controller > find');
		console.log(err);
	}
}

//CreateOne
async function create(data: userCreationInfo) {
	try {
		let { username, email, password } = data;

		let hashedPassword = await bcrypt.hash(password, 10);

		if (email) {
			let response = await prisma.user.create({
				data: {
					username: username,
					password: hashedPassword,
					email: email,
				},
			});

			return response;
		} else {
			let response = await prisma.user.create({
				data: {
					username: username,
					password: hashedPassword,
				},
			});

			return response;
		}
	} catch (err) {
		console.log('Error in Character > Controller > Create');
		console.log(err);
	}
}

// Update one / Update Many
async function update(data: Entry | Entry[]) {
	try {
		if (!Array.isArray(data)) {
			let result = await prisma.user.update({
				where: {
					id: data.id,
				},
				data: data,
			});

			return result;
		} else {
			let result: Entry[] = [];
			data.forEach(async (user) => {
				let response = await prisma.user.update({
					where: {
						id: user.id,
					},
					data: user,
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
			let result = await prisma.user.delete({
				where: {
					id: data.id,
				},
			});

			return result;
		} else {
			let result: Entry[] = [];
			data.forEach(async (user) => {
				let response = await prisma.user.delete({
					where: {
						id: user.id,
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
