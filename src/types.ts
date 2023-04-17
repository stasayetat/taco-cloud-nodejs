import { MongooseService } from '../database/mongoose.service';

export const TYPES = {
	ILogger: Symbol.for('ILogger'),
	App: Symbol.for('App'),
	MongooseService: Symbol.for('MongooseService'),
};
