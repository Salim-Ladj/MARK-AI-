import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import {
  authService,
  brandService,
  campaignService,
  taskService,
  assetService,
  calendarService,
  creativeTeamService
} from '../services/index';
import { orchestrateAIStudioGeneration } from '../ai/orchestrator';
import { runPerformanceAnalystAgent } from '../ai/agents/index';
import { formatResponse } from '../utils/responseFormatter';
import { logger } from '../utils/logger';

// AUTH CONTROLLER
export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { full_name, email, password, role } = req.body;
      const result = await authService.register(full_name, email, password, role);
      res.status(201).json(formatResponse.success(result, 'Account created successfully'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(formatResponse.success(result, 'Authentication successful'));
    } catch (err: any) {
      res.status(401).json(formatResponse.error(err.message, 401));
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await authService.requestPasswordReset(email);
      logger.info(`Password reset requested for ${email}`);
      res.json(formatResponse.success({ resetInitiated: true }, 'If the email exists, a reset link has been sent.'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      await authService.resetPassword(token, password);
      res.json(formatResponse.success(null, 'Password reset successfully'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  me: async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json(formatResponse.error('Not authenticated', 401));
      return;
    }
    const user = await authService.getUserById(req.user.id);
    res.json(formatResponse.success(user));
  }
};

// BRAND CONTROLLER
export const brandController = {
  getAll: (req: Request, res: Response) => {
    res.json(formatResponse.success(brandService.getAll()));
  },
  getById: (req: Request, res: Response) => {
    const brand = brandService.getById(req.params.id);
    if (!brand) return res.status(404).json(formatResponse.error('Brand not found', 404));
    res.json(formatResponse.success(brand));
  },
  create: (req: Request, res: Response) => {
    try {
      const brand = brandService.create(req.body);
      res.status(201).json(formatResponse.success(brand, 'Brand created successfully'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  update: (req: Request, res: Response) => {
    try {
      const brand = brandService.update(req.params.id, req.body);
      res.json(formatResponse.success(brand, 'Brand updated successfully'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  },
  delete: (req: Request, res: Response) => {
    try {
      const deleted = brandService.delete(req.params.id);
      res.json(formatResponse.success(deleted, 'Brand deleted successfully'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  }
};

// CAMPAIGN CONTROLLER
export const campaignController = {
  getAll: (req: Request, res: Response) => {
    const brandId = req.query.brandId as string;
    res.json(formatResponse.success(campaignService.getAll(brandId)));
  },
  getById: (req: Request, res: Response) => {
    const campaign = campaignService.getById(req.params.id);
    if (!campaign) return res.status(404).json(formatResponse.error('Campaign not found', 404));
    res.json(formatResponse.success(campaign));
  },
  create: (req: Request, res: Response) => {
    const campaign = campaignService.create(req.body);
    res.status(201).json(formatResponse.success(campaign, 'Campaign created successfully'));
  },
  update: (req: Request, res: Response) => {
    try {
      const campaign = campaignService.update(req.params.id, req.body);
      res.json(formatResponse.success(campaign, 'Campaign updated'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  },
  delete: (req: Request, res: Response) => {
    try {
      const deleted = campaignService.delete(req.params.id);
      res.json(formatResponse.success(deleted, 'Campaign removed'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  }
};

// AI STUDIO CONTROLLER
export const aiStudioController = {
  generate: async (req: Request, res: Response) => {
    try {
      const generation = await orchestrateAIStudioGeneration(req.body);
      res.json(formatResponse.success(generation, 'AI Content and Creative Brief generated successfully'));
    } catch (err: any) {
      res.status(500).json(formatResponse.error('AI Generation failed: ' + err.message, 500));
    }
  }
};

// TASK CONTROLLER
export const taskController = {
  getAll: (req: Request, res: Response) => {
    const assignedToId = req.query.assignedToId as string;
    const status = req.query.status as string;
    const brandId = req.query.brandId as string;
    const tasks = taskService.getAll({ assignedToId, status, brandId });
    res.json(formatResponse.success(tasks));
  },
  getById: (req: Request, res: Response) => {
    const task = taskService.getById(req.params.id);
    if (!task) return res.status(404).json(formatResponse.error('Task not found', 404));
    res.json(formatResponse.success(task));
  },
  create: (req: AuthenticatedRequest, res: Response) => {
    try {
      const task = taskService.create(req.body);
      res.status(201).json(formatResponse.success(task, 'Creative task assigned successfully'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  submitWork: (req: AuthenticatedRequest, res: Response) => {
    try {
      const { previewUrl, notes, mediaType, submittedBy } = req.body;
      const updatedTask = taskService.submitWork(req.params.id, {
        previewUrl,
        notes,
        mediaType: mediaType || 'image',
        submittedBy: submittedBy || req.user?.email || 'Creative Team'
      });
      res.json(formatResponse.success(updatedTask, 'Work submitted for marketing review'));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  reviewSubmission: (req: AuthenticatedRequest, res: Response) => {
    try {
      const { action, comment } = req.body;
      const reviewer = {
        id: req.user?.id || 'user-mkt-1',
        name: 'Sarah Benali (Marketing)'
      };
      const updatedTask = taskService.reviewSubmission(req.params.id, {
        action,
        comment,
        reviewer
      });
      res.json(formatResponse.success(updatedTask, `Task submission ${action === 'approved' ? 'approved' : 'returned for revision'}`));
    } catch (err: any) {
      res.status(400).json(formatResponse.error(err.message, 400));
    }
  },
  updateStatus: (req: Request, res: Response) => {
    try {
      const updated = taskService.updateStatus(req.params.id, req.body.status);
      res.json(formatResponse.success(updated, 'Status updated'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  }
};

// CALENDAR CONTROLLER
export const calendarController = {
  getAll: (req: Request, res: Response) => {
    const brandId = req.query.brandId as string;
    const platform = req.query.platform as string;
    const month = req.query.month as string;
    res.json(formatResponse.success(calendarService.getAll({ brandId, platform, month })));
  },
  create: (req: Request, res: Response) => {
    const item = calendarService.create(req.body);
    res.status(201).json(formatResponse.success(item, 'Content scheduled successfully'));
  },
  update: (req: Request, res: Response) => {
    try {
      const item = calendarService.update(req.params.id, req.body);
      res.json(formatResponse.success(item, 'Calendar entry updated'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  },
  delete: (req: Request, res: Response) => {
    try {
      const deleted = calendarService.delete(req.params.id);
      res.json(formatResponse.success(deleted, 'Calendar entry deleted'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  }
};

// ASSET CONTROLLER
export const assetController = {
  getAll: (req: Request, res: Response) => {
    const brandId = req.query.brandId as string;
    const folder = req.query.folder as string;
    const fileType = req.query.fileType as string;
    res.json(formatResponse.success(assetService.getAll({ brandId, folder, fileType })));
  },
  create: (req: Request, res: Response) => {
    const asset = assetService.create(req.body);
    res.status(201).json(formatResponse.success(asset, 'Asset uploaded'));
  },
  rename: (req: Request, res: Response) => {
    try {
      const asset = assetService.rename(req.params.id, req.body.name);
      res.json(formatResponse.success(asset, 'Asset renamed'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  },
  delete: (req: Request, res: Response) => {
    try {
      const deleted = assetService.delete(req.params.id);
      res.json(formatResponse.success(deleted, 'Asset deleted'));
    } catch (err: any) {
      res.status(404).json(formatResponse.error(err.message, 404));
    }
  }
};

// CREATIVE TEAM CONTROLLER
export const creativeTeamController = {
  getAll: (req: Request, res: Response) => {
    res.json(formatResponse.success(creativeTeamService.getAll()));
  }
};

// PERFORMANCE CONTROLLER
export const performanceController = {
  getMetrics: async (req: Request, res: Response) => {
    const brandId = (req.query.brandId as string) || 'brand-urbana';
    const insights = await runPerformanceAnalystAgent({ brandId });

    const data = {
      brandId,
      kpis: {
        totalReach: 357000,
        reachGrowth: '+34.2%',
        impressions: 678000,
        impressionsGrowth: '+28.6%',
        engagementRate: '6.4%',
        engagementGrowth: '+1.8%',
        clicks: 27300,
        clicksGrowth: '+42.1%',
        conversions: 2130,
        conversionsGrowth: '+19.5%',
        roas: '4.8x'
      },
      topPerformingContent: [
        {
          id: 'post-top-1',
          title: 'Kasbah Lookbook Hero Carousel',
          format: 'Carousel',
          platform: 'Instagram',
          reach: 142000,
          engagementRate: '8.9%',
          conversions: 940,
          previewUrl: '/src/assets/images/urbana_hero_streetwear_1790502102148.jpg'
        },
        {
          id: 'post-top-2',
          title: 'Fast-Cut Street Manifesto Reel',
          format: 'Reel',
          platform: 'TikTok',
          reach: 184000,
          engagementRate: '9.4%',
          conversions: 810,
          previewUrl: '/src/assets/images/urbana_campaign_banner_1790502124105.jpg'
        },
        {
          id: 'post-top-3',
          title: 'Raw Concrete Graphic Tee Mockup',
          format: 'Post',
          platform: 'Instagram',
          reach: 78000,
          engagementRate: '5.2%',
          conversions: 380,
          previewUrl: '/src/assets/images/urbana_tee_graphic_1790502113503.jpg'
        }
      ],
      platformComparison: [
        { platform: 'Instagram', reachShare: '54%', engagement: '7.1%', conversions: 1280 },
        { platform: 'TikTok', reachShare: '36%', engagement: '8.4%', conversions: 720 },
        { platform: 'YouTube', reachShare: '10%', engagement: '4.2%', conversions: 130 }
      ],
      aiInsights: insights
    };

    res.json(formatResponse.success(data));
  }
};
