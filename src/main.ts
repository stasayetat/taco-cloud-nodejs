import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { App } from './app';
import { MongooseService } from '../database/mongoose.service';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<MongooseService>(TYPES.MongooseService).to(MongooseService).inSingletonScope();
	bind<App>(TYPES.App).to(App);
});

async function startApp(): Promise<void> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.App);
	await app.init();
}

startApp();
