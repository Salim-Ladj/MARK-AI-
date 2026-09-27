export interface Brand {
	id: string;
	name: string;
	logo?: string;
	industry?: string;
	description?: string;
	productsAndServices?: string[];
	targetAudience?: {
		demographics?: string;
		psychographics?: string;
		geography?: string;
		interests?: string[];
	};
	positioning?: string;
	toneOfVoice?: string[];
	marketingObjectives?: string[];
	socialPlatforms?: string[];
	campaignsCount?: string;
}
