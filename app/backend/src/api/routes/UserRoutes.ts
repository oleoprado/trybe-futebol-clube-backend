import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import ValidateInputLogin from '../middlewares/ValidateInputLogin';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes
  .post(
    '/login',
    ValidateInputLogin.varifyFields,
    (req: Request, res: Response, next: NextFunction) =>
      userController.login(req, res, next),
  );

export default userRoutes;
