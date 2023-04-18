import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { App } from './app';
import { MongooseService } from './database/mongoose.service';
import { IUsersController } from './users/users.interface';
import { UsersController } from './users/users.controller';
import { IErrorMiddleware } from './errors/error.middleware.interface';
import { ErrorService } from './errors/error.service';
import { ITacosController } from './tacos/tacos.controller.interface';
import { TacosController } from './tacos/tacos.controller';
import { TacosService } from './tacos/tacos.service';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<MongooseService>(TYPES.MongooseService).to(MongooseService).inSingletonScope();
	bind<IUsersController>(TYPES.IUsersController).to(UsersController).inSingletonScope();
	bind<IErrorMiddleware>(TYPES.IErrorMiddleware).to(ErrorService).inSingletonScope();
	bind<ITacosController>(TYPES.ITacosController).to(TacosController).inSingletonScope();
	bind<TacosService>(TYPES.TacosService).to(TacosService).inSingletonScope();
	bind<App>(TYPES.App).to(App);
});

async function startApp(): Promise<void> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.App);
	await app.init();
}

startApp();
