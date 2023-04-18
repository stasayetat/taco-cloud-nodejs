import { IUsersController } from './users.interface';
import { IControllerRoute } from '../common/route.interface';
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController{
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
	}

	login(req: Request, res: Response, next: NextFunction): void {
	}

	register(req: Request, res: Response, next: NextFunction): void {
	}

}