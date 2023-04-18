import { IErrorMiddleware } from './error.middleware.interface';
import { Request, NextFunction, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
@injectable()
export class ErrorService implements IErrorMiddleware {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
	}
	catch(error: Error, req: Request, res: Response, next: NextFunction): void {
		this.logger.error(`${error.name}: ${error.message}`);
		res.send(error);
	}

}