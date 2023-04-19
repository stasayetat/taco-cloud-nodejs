import { NextFunction, Request, Response } from 'express';

export interface ITacosController {
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	find: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	findAll: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
	deleteAll: (req: Request, res: Response, next: NextFunction)=> Promise<void>
}