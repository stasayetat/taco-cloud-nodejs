import { Ingredient } from './ingredients/ingredient.entity';
import { Document } from 'mongoose';

export class Taco {
	constructor(private readonly _name: string, private readonly _ingredients: Ingredient[]) {
	}


	get name(): string {
		return this._name;
	}

	get ingredients(): Ingredient[] {
		return this._ingredients;
	}
}