import { IUsersController } from './users.interface';
import { IControllerRoute } from '../common/route.interface';
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { UserDto } from './dto/user.dto';

@injectable()
export class UsersController extends BaseController implements IUsersController{
	private userRoutes: IControllerRoute[] = [
		{
			path: '/login',
			func: this.login,
			method: 'post',
			middlewares: [new ValidateMiddleware(UserDto)]
		},

		{
			path: '/register',
			func: this.login,
			method: 'post',
			middlewares: [new ValidateMiddleware(UserDto)]
		}
	];
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRouter(this.userRoutes);
	}

	async login(req: Request<{}, {}, UserDto>, res: Response, next: NextFunction): Promise<void> {
	}

	async register(req: Request<{}, {}, UserDto>, res: Response, next: NextFunction): Promise<void> {

	}

}