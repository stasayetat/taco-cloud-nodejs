import { TacosCreateDto } from './dto/tacos.create.dto';
import { Taco } from './taco.entity';

export interface ITacosService {
	createTaco: (taco: TacosCreateDto) => Promise<Taco | null>;
	findTaco: (name: string | undefined, id?: number | undefined) => Promise<Taco | null>;
	findAllTacos: () => Promise<Taco[] | null>;
	deleteAllTacos: () => Promise<void>;
}