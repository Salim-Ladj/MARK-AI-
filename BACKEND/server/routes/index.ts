import { Router } from 'express';
import {
  authController,
  brandController,
  campaignController,
  aiStudioController,
  taskController,
  calendarController,
  assetController,
  creativeTeamController,
  performanceController
} from '../controllers/index';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const apiRouter = Router();

// ===================== AUTH ROUTES =====================
apiRouter.post('/auth/login', authController.login);
apiRouter.post('/auth/register', authController.register);
apiRouter.post('/auth/forgot-password', authController.forgotPassword);
apiRouter.post('/auth/reset-password', authController.resetPassword);
apiRouter.get('/auth/me', authMiddleware as any, authController.me as any);

// ===================== BRAND ROUTES (Marketing only for mutations) =====================
apiRouter.get('/brands', brandController.getAll);
apiRouter.get('/brands/:id', brandController.getById);
apiRouter.post('/brands', authMiddleware as any, roleMiddleware(['marketing']) as any, brandController.create);
apiRouter.put('/brands/:id', authMiddleware as any, roleMiddleware(['marketing']) as any, brandController.update);
apiRouter.delete('/brands/:id', authMiddleware as any, roleMiddleware(['marketing']) as any, brandController.delete);

// ===================== CAMPAIGN ROUTES =====================
apiRouter.get('/campaigns', campaignController.getAll);
apiRouter.get('/campaigns/:id', campaignController.getById);
apiRouter.post('/campaigns', authMiddleware as any, roleMiddleware(['marketing']) as any, campaignController.create);
apiRouter.put('/campaigns/:id', authMiddleware as any, roleMiddleware(['marketing']) as any, campaignController.update);
apiRouter.delete('/campaigns/:id', authMiddleware as any, roleMiddleware(['marketing']) as any, campaignController.delete);

// ===================== AI STUDIO ROUTES =====================
apiRouter.post('/ai/generate', authMiddleware as any, roleMiddleware(['marketing']) as any, aiStudioController.generate);

// ===================== TASK & CREATIVE WORKFLOW ROUTES =====================
apiRouter.get('/tasks', taskController.getAll);
apiRouter.get('/tasks/:id', taskController.getById);
apiRouter.post('/tasks', authMiddleware as any, roleMiddleware(['marketing']) as any, taskController.create as any);
apiRouter.patch('/tasks/:id/status', taskController.updateStatus);
apiRouter.post('/tasks/:id/submit', authMiddleware as any, taskController.submitWork as any);
apiRouter.post('/tasks/:id/review', authMiddleware as any, roleMiddleware(['marketing']) as any, taskController.reviewSubmission as any);

// ===================== CALENDAR ROUTES =====================
apiRouter.get('/calendar', calendarController.getAll);
apiRouter.post('/calendar', authMiddleware as any, roleMiddleware(['marketing']) as any, calendarController.create);
apiRouter.put('/calendar/:id', authMiddleware as any, roleMiddleware(['marketing']) as any, calendarController.update);
apiRouter.delete('/calendar/:id', authMiddleware as any, roleMiddleware(['marketing']) as any, calendarController.delete);

// ===================== ASSET HUB ROUTES =====================
apiRouter.get('/assets', assetController.getAll);
apiRouter.post('/assets', assetController.create);
apiRouter.patch('/assets/:id/rename', assetController.rename);
apiRouter.delete('/assets/:id', assetController.delete);

// ===================== CREATIVE TEAM ROUTES =====================
apiRouter.get('/creative-team', creativeTeamController.getAll);

// ===================== PERFORMANCE ROUTES =====================
apiRouter.get('/performance', authMiddleware as any, roleMiddleware(['marketing']) as any, performanceController.getMetrics);

export default apiRouter;
