import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  res.send(req.body);
});

router.get('/', (req: Request, res: Response) => {
  res.send("Hello world");
});

export default router;