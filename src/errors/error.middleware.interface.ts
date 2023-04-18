import { Request, NextFunction, Response } from 'express';

export interface IErrorMiddleware {
	catch: (error: Error, req: Request, res: Response, next: NextFunction) => void;
}