import {
	IsArray,
	IsString,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { IngredientsDto } from '../ingredients/ingredients.dto';
import { Type } from 'class-transformer';
export class TacosCreateDto {
	@IsString()
	@MinLength(3)
	name: string;
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => IngredientsDto)
		ingredients: IngredientsDto[];
}