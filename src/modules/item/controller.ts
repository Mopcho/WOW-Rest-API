import { PrismaClient } from '@prisma/client';
import { ItemType as ItemType } from '@prisma/client';
import type { WeaponType as WeaponType } from '@prisma/client';
import type { ArrmorType as ArrmorType } from '@prisma/client';
const prisma = new PrismaClient();

type Query = {
	limit?: Number;
	page?: Number;
	sort?: String;
	select?: String;
};

type itemData = {
	type: ItemType;
	weaponType?: WeaponType;
	arrmorType?: ArrmorType;
	physicalDamage?: number;
	defence?: number;
	dodge?: number;
};

async function get() {}

async function find(
	query: Query,
	limit?: Number,
	page?: Number,
	sort?: String,
	select?: String
) {
	try {
		let result = await prisma.item.findMany();

		console.log(result);

		return result;
	} catch (err) {
		console.log('Error in Item > Controller > Create');
		console.log(err);
	}
}

async function create(data: itemData) {
	try {
		let itemType = data.type;

		console.log(itemType);

		console.log(ItemType.Weapon);

		console.log(itemType == ItemType.Weapon);

		if (itemType == ItemType.Weapon) {
			let { physicalDamage, weaponType } = data;

			let result = await prisma.item.create({
				data: {
					type: itemType,
					physicalDamage: physicalDamage,
					weaponType: weaponType,
				},
			});

			console.log(result);

			return result;
		}
		if (itemType == ItemType.Arrmor) {
			let { defence, arrmorType, dodge } = data;

			let result = await prisma.item.create({
				data: {
					type: itemType,
					defence: defence,
					arrmorType: arrmorType,
					dodge: dodge,
				},
			});

			console.log(result);

			return result;
		}
	} catch (err) {
		console.log('Error in Item > Controller > Create');
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
