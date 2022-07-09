import type { Faction as FactionRole } from '@prisma/client';
import type { Races as RaceRole } from '@prisma/client';

export type QueryDB = {
	skip?: number;
	take?: number;
	orderBy?: Entry;
	select?: Entry;
	where?: Entry;
};

export type Query = {
	[index: string]: any;
	skip?: number;
	take?: number;
	sort?: string | string[];
	select?: string | string[];
};

export type AdvancedQuery = {
	[index: string]: any;
	skip?: number;
	take?: number;
	sort?: string | string[];
	select?: Entry;
};

export type AdvancedQueryDB = {
	skip?: number;
	take?: number;
	orderBy?: Entry;
	select?: Entry;
	where?: Entry;
};

export type Entry = {
	[index: string]: any;
};

export type characterStartData = {
	username: string;
	faction: FactionRole;
	race: RaceRole;
	startingItem: string;
};
