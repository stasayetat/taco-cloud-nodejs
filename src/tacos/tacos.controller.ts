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
import { IErrorMiddleware } from '../errors/error.middleware.interface';
import { TacosService } from './tacos.service';
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
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger,
							@inject(TYPES.IErrorMiddleware) private errorMiddle: IErrorMiddleware,
							@inject(TYPES.ITacosService) private tacoService: TacosService) {
		super(loggerService);
		this.bindRouter(this.tacosRoutes);
	}

	async create(req: Request<{}, {}, TacosCreateDto>, res: Response, next: NextFunction): Promise<void> {
		console.log("Taco checked success" + req.body);
		const createdTaco = await this.tacoService.createTaco(req.body);
		console.log("Created taco: " + JSON.stringify(createdTaco));
		res.type("application/json");
		res.json(createdTaco);
	}

	async find(req: Request, res: Response, next: NextFunction): Promise<void> {
		const findTaco = await this.tacoService.findTaco(req.body as string);
		res.type("application/json");
		res.json(findTaco);
	}
}