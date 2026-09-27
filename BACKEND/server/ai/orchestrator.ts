import {
  runStrategistAgent,
  runContentIdeasAgent,
  runCreativeBriefAgent,
  runCopywriterAgent
} from './agents/index';
import { AIContentGenerationResult } from '../../src/types';
import { logger } from '../utils/logger';

export interface GenerateContentRequestParams {
  brandId: string;
  brandName: string;
  campaignId: string;
  campaignName: string;
  objective: string;
  targetAudience: string;
  platform: string;
  format: string;
  tone: string;
  additionalInstructions?: string;
}

export async function orchestrateAIStudioGeneration(
  params: GenerateContentRequestParams
): Promise<AIContentGenerationResult> {
  logger.info(`Starting Orchestrator for ${params.brandName} - ${params.format}`);

  // Run strategist and ideator
  const strategySummary = await runStrategistAgent(params.brandName, params.objective, params.targetAudience);
  const idea = await runContentIdeasAgent(params.brandName, params.format, params.platform, params.objective);

  // In parallel, generate Creative Brief and Copywriting elements
  const [brief, copy] = await Promise.all([
    runCreativeBriefAgent({
      brandName: params.brandName,
      format: params.format,
      contentIdea: idea,
      tone: params.tone
    }),
    runCopywriterAgent({
      brandName: params.brandName,
      format: params.format,
      tone: params.tone,
      topic: idea
    })
  ]);

  const result: AIContentGenerationResult = {
    id: `gen-${Date.now()}`,
    brandId: params.brandId,
    campaignId: params.campaignId,
    format: params.format,
    platform: params.platform,
    contentIdea: idea,
    hook: copy.hook,
    caption: copy.caption,
    hashtags: copy.hashtags,
    callToAction: copy.callToAction,
    creativeBrief: brief,
    suggestedAssetPrompt: `Cinematic lookbook photo of streetwear hoodie model in urban Algiers Kasbah architecture, desert minimalist streetwear aesthetic, golden hour natural lighting`,
    createdAt: new Date().toISOString()
  };

  logger.info(`Orchestration completed successfully for generation ID ${result.id}`);
  return result;
}
