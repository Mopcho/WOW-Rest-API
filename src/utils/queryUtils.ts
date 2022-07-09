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
