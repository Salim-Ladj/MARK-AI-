import { db } from '../config/db';
import { signToken } from '../utils/jwt';
import { verifyPassword } from '../utils/hashPassword';
import { User, Brand, Campaign, CreativeTask, Asset, ContentCalendarItem, CreativeMember } from '../../src/types';

// AUTH SERVICE
export const authService = {
  login: async (email: string, passwordPlain: string) => {
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('User not found with this email');
    }
    if (!verifyPassword(passwordPlain, '')) {
      throw new Error('Invalid credentials');
    }
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    return { user, token };
  },
  getUserById: (id: string) => {
    return db.users.find((u) => u.id === id) || null;
  }
};

// BRAND SERVICE
export const brandService = {
  getAll: () => db.brands,
  getById: (id: string) => db.brands.find((b) => b.id === id) || null,
  create: (brandData: Omit<Brand, 'id' | 'createdAt'>) => {
    const newBrand: Brand = {
      ...brandData,
      id: `brand-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    db.brands.unshift(newBrand);
    return newBrand;
  },
  update: (id: string, updates: Partial<Brand>) => {
    const idx = db.brands.findIndex((b) => b.id === id);
    if (idx === -1) throw new Error('Brand not found');
    db.brands[idx] = { ...db.brands[idx], ...updates };
    return db.brands[idx];
  },
  delete: (id: string) => {
    const idx = db.brands.findIndex((b) => b.id === id);
    if (idx === -1) throw new Error('Brand not found');
    const deleted = db.brands.splice(idx, 1)[0];
    return deleted;
  }
};

// CAMPAIGN SERVICE
export const campaignService = {
  getAll: (brandId?: string) => {
    if (brandId) return db.campaigns.filter((c) => c.brandId === brandId);
    return db.campaigns;
  },
  getById: (id: string) => db.campaigns.find((c) => c.id === id) || null,
  create: (data: Omit<Campaign, 'id'>) => {
    const newCampaign: Campaign = {
      ...data,
      id: `camp-${Date.now()}`
    };
    db.campaigns.unshift(newCampaign);
    return newCampaign;
  },
  update: (id: string, updates: Partial<Campaign>) => {
    const idx = db.campaigns.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Campaign not found');
    db.campaigns[idx] = { ...db.campaigns[idx], ...updates };
    return db.campaigns[idx];
  },
  delete: (id: string) => {
    const idx = db.campaigns.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Campaign not found');
    return db.campaigns.splice(idx, 1)[0];
  }
};

// TASK SERVICE (Creative Tasks & Workflow)
export const taskService = {
  getAll: (filters?: { assignedToId?: string; status?: string; brandId?: string }) => {
    let result = db.tasks;
    if (filters?.assignedToId) {
      result = result.filter((t) => t.assignedToId === filters.assignedToId);
    }
    if (filters?.status) {
      result = result.filter((t) => t.status === filters.status);
    }
    if (filters?.brandId) {
      result = result.filter((t) => t.brandId === filters.brandId);
    }
    return result;
  },
  getById: (id: string) => db.tasks.find((t) => t.id === id) || null,
  create: (taskData: Omit<CreativeTask, 'id' | 'createdAt' | 'updatedAt' | 'submissions'>) => {
    const newTask: CreativeTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      submissions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.tasks.unshift(newTask);

    // Update creative member active task count
    const member = db.creativeMembers.find((m) => m.id === taskData.assignedToId);
    if (member) member.activeTasksCount += 1;

    return newTask;
  },
  submitWork: (taskId: string, submission: { previewUrl: string; notes: string; mediaType: 'image' | 'video'; submittedBy: string }) => {
    const task = db.tasks.find((t) => t.id === taskId);
    if (!task) throw new Error('Task not found');

    const newSub = {
      id: `sub-${Date.now()}`,
      taskId,
      version: task.submissions.length + 1,
      previewUrl: submission.previewUrl,
      mediaType: submission.mediaType,
      notes: submission.notes,
      submittedAt: new Date().toISOString(),
      submittedBy: submission.submittedBy,
      feedback: []
    };

    task.submissions.unshift(newSub);
    task.status = 'in_review';
    task.updatedAt = new Date().toISOString();
    return task;
  },
  reviewSubmission: (taskId: string, review: { action: 'approved' | 'revision_requested'; comment: string; reviewer: { id: string; name: string } }) => {
    const task = db.tasks.find((t) => t.id === taskId);
    if (!task) throw new Error('Task not found');
    const latestSub = task.submissions[0];

    if (latestSub) {
      if (!latestSub.feedback) latestSub.feedback = [];
      latestSub.feedback.unshift({
        id: `fb-${Date.now()}`,
        authorId: review.reviewer.id,
        authorName: review.reviewer.name,
        authorRole: 'marketing',
        comment: review.comment,
        action: review.action,
        createdAt: new Date().toISOString()
      });
    }

    if (review.action === 'approved') {
      task.status = 'completed';
      // Automatically publish to Asset Hub!
      if (latestSub) {
        assetService.create({
          name: `${task.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_v${latestSub.version}.jpg`,
          fileUrl: latestSub.previewUrl,
          fileType: latestSub.mediaType,
          fileSize: '3.8 MB',
          dimensions: task.brief.dimensions || '1080x1350',
          brandId: task.brandId,
          brandName: task.brandName,
          campaignId: task.campaignId,
          campaignName: task.campaignName,
          creatorId: task.assignedToId,
          creatorName: task.assignedToName,
          approvalStatus: 'approved',
          folder: 'Approved Submissions'
        });
      }

      // Update creative member metrics
      const member = db.creativeMembers.find((m) => m.id === task.assignedToId);
      if (member) {
        member.activeTasksCount = Math.max(0, member.activeTasksCount - 1);
        member.completedTasksCount += 1;
      }
    } else {
      task.status = 'revision_requested';
    }

    task.updatedAt = new Date().toISOString();
    return task;
  },
  updateStatus: (taskId: string, status: CreativeTask['status']) => {
    const task = db.tasks.find((t) => t.id === taskId);
    if (!task) throw new Error('Task not found');
    task.status = status;
    task.updatedAt = new Date().toISOString();
    return task;
  }
};

// ASSET SERVICE
export const assetService = {
  getAll: (filters?: { brandId?: string; folder?: string; fileType?: string }) => {
    let result = db.assets;
    if (filters?.brandId) result = result.filter((a) => a.brandId === filters.brandId);
    if (filters?.folder) result = result.filter((a) => a.folder === filters.folder);
    if (filters?.fileType) result = result.filter((a) => a.fileType === filters.fileType);
    return result;
  },
  create: (data: Omit<Asset, 'id' | 'uploadedAt'>) => {
    const newAsset: Asset = {
      ...data,
      id: `ast-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    db.assets.unshift(newAsset);
    return newAsset;
  },
  delete: (id: string) => {
    const idx = db.assets.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Asset not found');
    return db.assets.splice(idx, 1)[0];
  },
  rename: (id: string, newName: string) => {
    const asset = db.assets.find((a) => a.id === id);
    if (!asset) throw new Error('Asset not found');
    asset.name = newName;
    return asset;
  }
};

// CALENDAR SERVICE
export const calendarService = {
  getAll: (filters?: { brandId?: string; platform?: string; month?: string }) => {
    let result = db.calendar;
    if (filters?.brandId) result = result.filter((c) => c.brandId === filters.brandId);
    if (filters?.platform) result = result.filter((c) => c.platform === filters.platform);
    if (filters?.month) result = result.filter((c) => c.scheduledDate.startsWith(filters.month!));
    return result;
  },
  create: (data: Omit<ContentCalendarItem, 'id'>) => {
    const item: ContentCalendarItem = {
      ...data,
      id: `cal-${Date.now()}`
    };
    db.calendar.unshift(item);
    return item;
  },
  update: (id: string, updates: Partial<ContentCalendarItem>) => {
    const idx = db.calendar.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Calendar item not found');
    db.calendar[idx] = { ...db.calendar[idx], ...updates };
    return db.calendar[idx];
  },
  delete: (id: string) => {
    const idx = db.calendar.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Calendar item not found');
    return db.calendar.splice(idx, 1)[0];
  }
};

// CREATIVE TEAM SERVICE
export const creativeTeamService = {
  getAll: () => db.creativeMembers,
  getById: (id: string) => db.creativeMembers.find((m) => m.id === id) || null
};
