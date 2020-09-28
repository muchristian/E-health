import authRoutes from './auth.routes';
import express, {Router} from 'express';
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);

export default apiRouter;
