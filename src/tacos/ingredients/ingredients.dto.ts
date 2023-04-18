import { IsArray, IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class IngredientsDto {
	@IsString()
		name: string;
	@IsNumber()
	@IsPositive()
		amount: number;
}
