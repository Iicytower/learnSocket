import { Request, Response, Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  // console.log('Hello, World!');

  const pathToFile = path.join(__dirname, '..', 'public/index.html');

  return res.sendFile(pathToFile);
});

export { router };
