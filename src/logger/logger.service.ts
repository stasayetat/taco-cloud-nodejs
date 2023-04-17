import { injectable } from 'inversify';
import { ILogger } from './logger.interface';
import { Logger } from 'tslog';
import "reflect-metadata";
@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<any>;

	constructor() {
		this.logger = new Logger<any>();
	}
	log(...args: unknown[]): void {
		this.logger.info(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
}
