import { Taco } from './taco.entity';
import mongoose from 'mongoose';

export interface ITacoRepository {
	create: (taco: Taco) => Promise<Taco | null>;
	findById: (tacoId: number)=> Promise<Taco | null>;
	findByName: (tacoName: string)=> Promise<Taco | null>;
	findAllTacos: ()=> Promise<Taco[] | null>;
}