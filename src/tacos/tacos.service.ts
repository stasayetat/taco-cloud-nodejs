import { ITacosService } from './tacos.service.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
@injectable()
export class TacosService implements ITacosService{
	async createTaco(taco: Object): Promise<object> {
		return Promise<object>;
	}

	async findTaco(id: number | undefined, name: string | undefined): Promise<object> {
		return Promise<object>;
	}

}