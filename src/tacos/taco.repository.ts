import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ITacoRepository } from './tacos.repository.interface';
import { Taco } from './taco.entity';
import { TYPES } from '../types';
import { MongooseService } from '../database/mongoose.service';
import mongoose, { Model, Schema } from 'mongoose';
import { ILogger } from '../logger/logger.interface';
import { Ingredient } from './ingredients/ingredient.entity';
@injectable()
export class TacoRepository implements ITacoRepository{
	private ingredientSchema = new Schema({
		name: { type: String, required: true },
		amount: {type: Number, required: true}
	}, {_id: false});
	private tacoSchema = new Schema({
		name: {type: String, required: true},
		ingredients: {type: [this.ingredientSchema],required: true},
	});



	private readonly dataTaco: Model<any>;
	constructor(@inject(TYPES.MongooseService) private mongoService: MongooseService,
							@inject(TYPES.ILogger) private logger: ILogger) {
		this.dataTaco = this.mongoService.mongoose.model("Taco", this.tacoSchema);
	}
	async create(taco: Taco): Promise<Taco | null> {
		this.logger.log(`Taco ${taco.name} saving in DB`);
		const newTaco = new this.dataTaco({
			name: taco.name,
			ingredients: taco.ingredients
		});
		const qwe = await this.dataTaco.create(newTaco);
		console.log(qwe);
		return taco;
	}

	async findById(tacoId: number): Promise<Taco | null> {
		return this.dataTaco.findById(tacoId);
	}

	async findByName(tacoName: string): Promise<Taco | null> {
		this.logger.log(`Taco ${tacoName} finding in DB`);
		return this.dataTaco.findOne({name: tacoName});
	}

	async findAllTacos(): Promise<Taco[] | null> {
		this.logger.log('Finding all tacos');
		const dataTacoFindAll = await this.dataTaco.find().limit(5).sort([['_id', -1]]);
		return dataTacoFindAll;
	}

	async deleteAllTacos(): Promise<void> {
		this.logger.log("Deleted from DB");
		await this.dataTaco.deleteMany();
	}
}