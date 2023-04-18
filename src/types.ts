import { MongooseService } from './database/mongoose.service';
import { IUsersController } from './users/users.interface';
import { ErrorService } from './errors/error.service';
import { IErrorMiddleware } from './errors/error.middleware.interface';

export const TYPES = {
	ILogger: Symbol.for('ILogger'),
	App: Symbol.for('App'),
	MongooseService: Symbol.for('MongooseService'),
	IUsersController: Symbol.for('IUsersController'),
	IErrorMiddleware: Symbol.for('IErrorMiddleware'),
};
