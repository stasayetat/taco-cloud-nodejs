import { NextFunction, Request, Response } from 'express';
import { IControllerRoute } from '../common/route.interface';

export interface IUsersController {
	login: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
	register: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
	bindRouter: (routes: IControllerRoute[])=> void;
}