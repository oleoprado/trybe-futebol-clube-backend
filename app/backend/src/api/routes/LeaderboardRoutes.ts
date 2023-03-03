import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes
  .get('/leaderboard/home', (req: Request, res: Response) =>
    leaderboardController.homeTeam(req, res))
  .get('/leaderboard/away', (req: Request, res: Response) =>
    leaderboardController.awayTeam(req, res));

export default leaderboardRoutes;
