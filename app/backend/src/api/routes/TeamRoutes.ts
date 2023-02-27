import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter
  .get('/teams', (req: Request, res: Response) => teamController.readAll(req, res));

export default teamRouter;
