import { inject, injectable } from 'inversify';
import { ILogger } from '../src/logger/logger.interface';
import { TYPES } from '../src/types';
import {MongoClient} from 'mongodb';
import "reflect-metadata";
@injectable()
export class MongooseService {
	private url: string = 'mongodb://127.0.0.1:27017';
	private readonly mongoClient: MongoClient;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.mongoClient = new MongoClient(this.url);
	}

	public async connect() {
		await this.mongoClient.connect();
		this.logger.log(`Connection success to ${this.mongoClient.options.dbName}`);
	}

	public async close() {
		await this.mongoClient.close();
		this.logger.log("Connection to database closed");
	}

}