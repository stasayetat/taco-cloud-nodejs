import { BaseController } from '../common/base.controller';
import { ITacosController } from './tacos.controller.interface';
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IMiddleware } from '../common/middleware.interface';
import { IControllerRoute } from '../common/route.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { TacosCreateDto } from './dto/tacos.create.dto';
@injectable()
export class TacosController extends BaseController implements ITacosController{
	tacosRoutes: IControllerRoute[] = [
		{
			path: '/create',
			func: this.create,
			method: 'post',
			middlewares: [new ValidateMiddleware(TacosCreateDto)]
		},
		{
			path: '/find',
			func: this.find,
			method: 'get'
		}
	];
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger ) {
		super(loggerService);
		this.bindRouter(this.tacosRoutes);
	}

	create(req: Request<{}, {}, TacosCreateDto>, res: Response, next: NextFunction): Promise<void> {
		console.log("Taco checked success" + req.body);
		return Promise.resolve(undefined);
	}

	find(req: Request, res: Response, next: NextFunction): Promise<void> {
		return Promise.resolve(undefined);
	}
}