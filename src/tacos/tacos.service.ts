import { ITacosService } from './tacos.service.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TacosCreateDto } from './dto/tacos.create.dto';
import { Taco } from './taco.entity';
import { Ingredient } from './ingredients/ingredient.entity';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { ITacoRepository } from './tacos.repository.interface';
@injectable()
export class TacosService implements ITacosService{
	constructor(@inject(TYPES.ILogger) private logger: ILogger,
							@inject(TYPES.ITacoRepository) private tacoRepo: ITacoRepository) {
	}
	async createTaco(taco: TacosCreateDto): Promise<Taco | null> {
		this.logger.log(`Taco ${taco.name} received`);
		const newTaco = new Taco(taco.name, taco.ingredients as Ingredient[]);
		const resFind = await this.tacoRepo.findByName(newTaco.name);
		console.log(resFind);
		if(resFind === null) {
			return this.tacoRepo.create(newTaco);
		}
		else {
			return null;
		}
	}

	async findTaco(name: string | undefined, id?: number | undefined): Promise<Taco | null> {
		this.logger.log(`Taco ${name} finding`);
		if(name !== undefined) {
			return this.tacoRepo.findByName(name);
		}
		return this.tacoRepo.findById(id as number);
	}

}