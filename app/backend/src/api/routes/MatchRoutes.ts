import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes
  .get('/matches', (req: Request, res: Response) => matchController.readAll(req, res));

export default matchRoutes;
