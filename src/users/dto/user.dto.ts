import { IMiddleware } from '../../common/middleware.interface';
import { IsEmail, IsNegative, IsOptional, IsString, Length, min, MinLength } from 'class-validator';

export class UserDto {
	@IsEmail()
	email: string;
	@IsString()
	@MinLength(3)
	@IsOptional()
	name?: string;
	@IsString()
	password: string;
}