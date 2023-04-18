import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidator: ClassConstructor<object>) {
	}
	execute(req: Request, res: Response, next: NextFunction): void {
		console.log(req.body);
		const instance = plainToInstance(this.classToValidator, req.body);
		validate(instance).then((errors) => {
			if(errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}

}