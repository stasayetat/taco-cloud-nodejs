import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { Db, MongoClient } from 'mongodb';
import mongoose, { Mongoose, Schema } from 'mongoose';
import "reflect-metadata";
@injectable()
export class MongooseService {
	private url: string = 'mongodb://127.0.0.1:27017/tacos';
	mongoClient: MongoClient;
	mongoDB: Db;
	mongoose: Mongoose;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.mongoose = new Mongoose();
		// this.mongoClient = new MongoClient(this.url);
		// this.mongoDB = this.mongoClient.db('tacos');
	}

	public async connect() {
		await this.mongoose.connect(this.url);
		//await this.mongoClient.connect();
		this.logger.log(`Connection success to ${this.mongoose}`);
	}

	public async close() {
		await this.mongoClient.close();
		this.logger.log("Connection to database closed");
	}

}