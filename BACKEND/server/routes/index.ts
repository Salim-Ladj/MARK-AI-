import { Router } from 'express';
import { authController } from '../controllers/index';

const apiRouter = Router();

apiRouter.post('/auth/login', authController.login);
apiRouter.post('/auth/register', authController.register);
apiRouter.post('/auth/forgot-password', authController.forgotPassword);
apiRouter.post('/auth/reset-password', authController.resetPassword);

export default apiRouter;
