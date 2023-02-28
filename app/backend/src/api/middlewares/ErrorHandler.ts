import { Request, Response, NextFunction } from 'express';

export default class ErrorHandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    if (err instanceof Error && err.stack) {
      return res.status(Number(err.stack)).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Erro não identificado.' });
  }
}
