import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { Server } from 'http';
import { json } from 'body-parser';
import { MongooseService } from './database/mongoose.service';
import "reflect-metadata";
import { IErrorMiddleware } from './errors/error.middleware.interface';
import { IUsersController } from './users/users.interface';
import { UsersController } from './users/users.controller';
import { TacosController } from './tacos/tacos.controller';
@injectable()
export class App {
	public app: Express;
	public port: number;
	public server: Server;

	constructor(@inject(TYPES.ILogger) private logger: ILogger,
							@inject(TYPES.MongooseService) private mongoClient: MongooseService,
							@inject(TYPES.IErrorMiddleware) private errorService: IErrorMiddleware,
							@inject(TYPES.IUsersController) private usersController: UsersController,
							@inject(TYPES.ITacosController) private tacosController: TacosController) {
		this.app = express();
		this.port = 8000;
	}

	public useMiddleware(): void {
		this.app.use(express.static('public'));
		this.app.use(json());
	}

	public useRoutes(): void {
		this.app.use('/users', this.usersController.router);
		this.app.use('/tacos', this.tacosController.router);
	}

	public useExceptionFilter(): void {
		this.app.use(this.errorService.catch.bind(this.errorService));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		this.logger.log("Connecting to database...");
		await this.mongoClient.connect();
		this.server = this.app.listen(this.port);
		this.logger.log("Server started");
	}

	public async close() {
		this.server.close();
		await this.mongoClient.close();
	}
}
