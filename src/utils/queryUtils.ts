import { AdvancedQuery, Entry, Query, QueryDB } from '../types';

export function buildSelect(select: string | string[]): Entry {
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

export function buildQuery(query: AdvancedQuery): QueryDB {
	let queryBuilder: Entry = {};

	//Recursion
	for (const key in query) {
		// Nested Cmd
		if (typeof query[key] == 'object' && !Array.isArray(query[key])) {
			queryBuilder[key] = buildQuery(query[key]);
		} else {
			//Not nested
			queryBuilder[key] = query[key];
		}
	}

	return queryBuilder;
}

export function buildOrderBy(sort: string | string[]): Entry {
	let orderBy: Entry = {};

	if (Array.isArray(sort)) {
		//On Multiple sorts
		sort.forEach((x) => {
			if (x.startsWith('-')) {
				//Descending
				let key = x.slice(1, x.length);
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
			let key = sort.slice(1, sort.length);
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
