import { Router } from 'express';
import { authController } from '../controllers/index.js';
import { aiController } from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { demoController } from '../controllers/demoController.js';

const apiRouter = Router();

apiRouter.post('/auth/login', authController.login);
apiRouter.post('/auth/register', authController.register);
apiRouter.post('/auth/forgot-password', authController.forgotPassword);
apiRouter.post('/auth/reset-password', authController.resetPassword);

// Temporary authenticated in-memory marketing API for the frontend demo.
apiRouter.get('/brands', authMiddleware, demoController.getBrands);
apiRouter.post('/brands', authMiddleware, demoController.createBrand);
apiRouter.patch('/brands/:id', authMiddleware, demoController.updateBrand);
apiRouter.get('/campaigns', authMiddleware, demoController.getCampaigns);
apiRouter.post('/campaigns', authMiddleware, demoController.createCampaign);
apiRouter.get('/tasks', authMiddleware, demoController.getTasks);
apiRouter.post('/tasks', authMiddleware, demoController.createTask);
apiRouter.get('/calendar', authMiddleware, demoController.getCalendar);
apiRouter.post('/calendar', authMiddleware, demoController.createCalendar);
apiRouter.get('/assets', authMiddleware, demoController.getAssets);
apiRouter.get('/creative-team', authMiddleware, demoController.getCreativeTeam);
apiRouter.get('/performance', authMiddleware, demoController.getPerformance);
apiRouter.get('/overview', authMiddleware, demoController.getOverview);
apiRouter.get('/creative/dashboard', authMiddleware, demoController.getCreativeDashboard);
apiRouter.get('/creative/briefs', authMiddleware, demoController.getCreativeBriefs);
apiRouter.get('/creative/reviews', authMiddleware, demoController.getCreativeReviews);
apiRouter.get('/creative/completed', authMiddleware, demoController.getCompletedWork);
apiRouter.post('/creative/submissions', authMiddleware, demoController.submitCreativeWork);
apiRouter.post('/creative/revisions', authMiddleware, demoController.submitRevision);
apiRouter.post('/creative/archive', authMiddleware, demoController.archiveWork);

// FastAPI owns campaigns, briefs, tasks and assets. Keep the frontend on one API origin.
apiRouter.use('/ai', authMiddleware, aiController.proxy);

export default apiRouter;
