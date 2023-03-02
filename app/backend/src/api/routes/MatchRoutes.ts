import { Router, Request, Response, NextFunction } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import Auth from '../middlewares/Auth';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes
  .get('/matches', (req: Request, res: Response) => matchController.readAll(req, res))
  .patch('/matches/:id/finish', Auth.auth, (req: Request, res: Response, next: NextFunction) =>
    matchController.endMatches(req, res, next))
  .patch('/matches/:id', Auth.auth, (req: Request, res: Response, next: NextFunction) =>
    matchController.updateGoals(req, res, next))
  .post('/matches', Auth.auth, (req: Request, res: Response, next: NextFunction) =>
    matchController.create(req, res, next));

export default matchRoutes;
