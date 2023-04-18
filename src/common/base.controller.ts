import { IControllerRoute } from './route.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { Router } from 'express';
import 'reflect-metadata';
@injectable()
export class BaseController {
	private readonly _router: Router;
	private logger: ILogger
	constructor(logger: ILogger) {
		this.logger = logger;
		this._router = Router();
	}
	get router(): Router {
		return this._router;
	}
	bindRouter(routes: IControllerRoute[]): void {
		for(let route of routes) {
			this.logger.log(`${route.method} bind ${route.path}`);
			const middlewares = route.middlewares?.map((el) => {
				return el.execute.bind(el);
			});
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}