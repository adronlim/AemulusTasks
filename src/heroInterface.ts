import { Hero } from "./Hero"

export interface HeroInt extends Array<Hero>{
	
	[index1: number]: {
		id: 	number;
		name: string;
		str:	number;
		ag:	number;
		int:	number;
	};
	
}
    // [index: number]: { id: number; label: string; key: any };
