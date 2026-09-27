import { Brand, Campaign, CreativeMember, CreativeTask, ContentCalendarItem, Asset, User } from '../../src/types';

export const USERS: User[] = [
  {
    id: 'user-mkt-1',
    email: 'marketing@markai.demo',
    name: 'Sarah Benali',
    role: 'marketing',
    title: 'Head of Brand Marketing',
    avatar: '/src/assets/images/avatar_marketing_lead_1790502135896.jpg',
    bio: 'Brand strategist specializing in lifestyle and urban streetwear growth in North Africa and Europe.'
  },
  {
    id: 'user-crt-1',
    email: 'creative@markai.demo',
    name: 'Yacine Kaci',
    role: 'creative',
    title: 'Lead Graphic Designer & Art Director',
    specialty: 'Brand Identity, 3D & Streetwear Typography',
    avatar: '/src/assets/images/avatar_creative_lead_1790502147335.jpg',
    bio: 'Algiers-based visual artist blending brutalist Maghrebi architecture with contemporary urban apparel aesthetics.'
  },
  {
    id: 'user-crt-2',
    email: 'amina@markai.demo',
    name: 'Amina Belkacem',
    role: 'creative',
    title: 'Senior Motion Designer & Video Editor',
    specialty: 'Reels, Short-Form Cinema & Kinetic Typography',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Motion designer crafting high-impact narrative cuts and social-first video campaigns.'
  }
];

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-urbana',
    name: 'URBANA',
    logo: 'https://api.iconify.design/lucide:zap.svg?color=%237c3aed',
    industry: 'Urban Apparel & Streetwear',
    description: 'Algerian contemporary streetwear label fusing Mediterranean youth culture, raw brutalist architecture, and premium heavy-cotton silhouettes.',
    productsAndServices: [
      'Heavyweight 450GSM Drop-Shoulder Hoodies',
      'Boxy Minimalist Graphic Tees',
      'Technical Cargo Utility Pants',
      'Tactical Streetwear Crossbody Bags',
      'Embroidered Structured Caps'
    ],
    targetAudience: {
      demographics: 'Gen-Z & Young Millennials (18–32), Urban creative class, students, creators',
      psychographics: 'Bold, culturally proud, values authenticity, indie music & underground hip-hop culture',
      geography: 'Algiers, Oran, Constantine, Paris, Montreal diaspora',
      interests: ['Street Fashion', 'Hip-hop Culture', 'Brutalist Architecture', 'Sneaker Culture', 'Contemporary Art']
    },
    positioning: 'The undisputed vanguard of North African street fashion: unapologetic, architecturally sculpted, rooted in local pride.',
    toneOfVoice: ['Authentic', 'Rebellious', 'Concise', 'Architectural', 'Youth-Driven'],
    marketingObjectives: [
      'Dominate Algerian urban apparel market share',
      'Increase Instagram & TikTok viral video engagement by 180%',
      'Sell out Fall/Winter "Kasbah Brutalism" drop in under 48 hours',
      'Establish brand loyalty across North African creative hubs'
    ],
    socialPlatforms: ['Instagram', 'TikTok', 'YouTube', 'Facebook'],
    createdAt: '2026-08-15T10:00:00.000Z'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-kasbah-fall',
    name: 'Kasbah Brutalism Fall/Winter 26',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    objective: 'Launch the capsule collection with cinematic street video and high-contrast editorial lookbook',
    targetAudience: 'Streetwear enthusiasts, visual creatives and sneakerheads aged 18-30 in Algiers and Paris',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    budget: 12500,
    startDate: '2026-10-01',
    endDate: '2026-11-15',
    status: 'active',
    metrics: {
      reach: 245000,
      impressions: 480000,
      clicks: 18400,
      conversions: 1420,
      spend: 5800
    }
  },
  {
    id: 'camp-drop-tee-teaser',
    name: 'Raw Concrete Tee Drop',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    objective: 'Create organic viral hype on TikTok and Instagram Reels for the limited 48h graphic tee preorder',
    targetAudience: 'University youth and underground streetwear collectors in Algeria',
    platforms: ['Instagram', 'TikTok'],
    budget: 4500,
    startDate: '2026-10-10',
    endDate: '2026-10-25',
    status: 'active',
    metrics: {
      reach: 112000,
      impressions: 198000,
      clicks: 8900,
      conversions: 710,
      spend: 2100
    }
  }
];

export const INITIAL_CREATIVE_MEMBERS: CreativeMember[] = [
  {
    id: 'user-crt-1',
    name: 'Yacine Kaci',
    email: 'creative@markai.demo',
    role: 'Graphic Designer',
    specialty: 'Brutalist Typography & Lookbook Posters',
    avatar: '/src/assets/images/avatar_creative_lead_1790502147335.jpg',
    availability: 'available',
    activeTasksCount: 2,
    completedTasksCount: 14,
    maxWorkload: 5
  },
  {
    id: 'user-crt-2',
    name: 'Amina Belkacem',
    email: 'amina@markai.demo',
    role: 'Video Editor',
    specialty: 'High-Pace Reels & Audio-Reactive Cuts',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    availability: 'busy',
    activeTasksCount: 4,
    completedTasksCount: 21,
    maxWorkload: 5
  }
];

export const INITIAL_TASKS: CreativeTask[] = [
  {
    id: 'task-kasbah-hero',
    title: 'Kasbah Lookbook Hero Carousel (1080x1350)',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-kasbah-fall',
    campaignName: 'Kasbah Brutalism Fall/Winter 26',
    assignedToId: 'user-crt-1',
    assignedToName: 'Yacine Kaci',
    assignedToAvatar: '/src/assets/images/avatar_creative_lead_1790502147335.jpg',
    status: 'in_progress',
    priority: 'high',
    deadline: '2026-10-04',
    createdAt: '2026-09-24T10:00:00.000Z',
    updatedAt: '2026-09-26T14:30:00.000Z',
    brief: {
      id: 'brief-101',
      title: 'Kasbah Lookbook Hero Carousel',
      brandId: 'brand-urbana',
      brandName: 'URBANA',
      brandIdentity: {
        tone: 'Architectural, Raw, Unapologetic',
        positioning: 'North African Streetwear Vanguard',
        colorPalette: ['#7C3AED', '#06B6D4', '#0F172A', '#E2E8F0']
      },
      marketingStrategy: 'Highlight the intersection of heavy sand-washed cotton with historical Algiers architecture to position the brand as culturally rooted yet internationally competitive.',
      campaignObjective: 'Spark curiosity and drive pre-orders ahead of the October 1 drop.',
      targetAudience: 'Streetwear purists and creative tastemakers in North Africa.',
      contentIdea: 'Slide 1: High-contrast model against white stone stairway. Slide 2: Fabric texture zoom on 450GSM seam. Slide 3: Typographic Arabic-Latin geometric logo mark.',
      hook: 'When architecture becomes wearable armor.',
      caption: 'URBANA Fall/Winter 2026. Born in the labyrinth of the Kasbah, engineered for the global street. Sand-washed heavyweight fleece drops this Friday.',
      hashtags: ['#URBANAStreetwear', '#AlgiersFashion', '#KasbahBrutalism', '#NorthAfricanDesign'],
      visualDirection: 'High dynamic range, deep shadows, authentic film texture. Avoid over-retouched commercial skin. Keep raw street texture.',
      deliverables: ['Carousel 4:5 (5 Slides)', 'Instagram Story Teaser 9:16'],
      dimensions: '1080x1350px & 1080x1920px',
      format: 'Carousel 4:5',
      deadline: '2026-10-04'
    },
    submissions: [
      {
        id: 'sub-1',
        taskId: 'task-kasbah-hero',
        version: 1,
        previewUrl: '/src/assets/images/urbana_hero_streetwear_1790502102148.jpg',
        mediaType: 'image',
        notes: 'Initial moodboard and slide 1 composition ready. The sand hoodie contrast against the Algiers kasbah architecture came out with great depth.',
        submittedAt: '2026-09-25T16:00:00.000Z',
        submittedBy: 'Yacine Kaci'
      }
    ]
  },
  {
    id: 'task-raw-tee-poster',
    title: 'Raw Concrete Graphic Tee Promo Post',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-drop-tee-teaser',
    campaignName: 'Raw Concrete Tee Drop',
    assignedToId: 'user-crt-1',
    assignedToName: 'Yacine Kaci',
    assignedToAvatar: '/src/assets/images/avatar_creative_lead_1790502147335.jpg',
    status: 'in_review',
    priority: 'medium',
    deadline: '2026-10-08',
    createdAt: '2026-09-25T11:00:00.000Z',
    updatedAt: '2026-09-27T08:00:00.000Z',
    brief: {
      id: 'brief-102',
      title: 'Raw Concrete Tee Studio Showcase',
      brandId: 'brand-urbana',
      brandName: 'URBANA',
      brandIdentity: {
        tone: 'Industrial, Minimalist, Heavyweight',
        positioning: 'Elevated essentials for everyday creative hustle',
        colorPalette: ['#1E1B4B', '#06B6D4', '#64748B']
      },
      marketingStrategy: 'Showcase the structured silhouette and raw travertine background to communicate craftsmanship and durability.',
      campaignObjective: 'Drive traffic to the online VIP waiting list.',
      targetAudience: 'University students and design enthusiasts.',
      contentIdea: 'Flat-lay and 3D architectural staging of the Concrete Tee.',
      hook: 'Built like concrete. Wears like a dream.',
      caption: 'The Raw Concrete Tee. Zero compromise on fabric weight. Pre-orders open 48 hours only.',
      hashtags: ['#URBANATee', '#StreetwearDrop', '#MinimalistApparel'],
      visualDirection: 'Cool travertine concrete textures with warm studio side-light. Highlight crisp typographic screenprint.',
      deliverables: ['1:1 Square Feed Asset (PNG)', 'High-Res Print Poster'],
      dimensions: '1080x1080px',
      format: 'Post 1:1',
      deadline: '2026-10-08'
    },
    submissions: [
      {
        id: 'sub-2',
        taskId: 'task-raw-tee-poster',
        version: 1,
        previewUrl: '/src/assets/images/urbana_tee_graphic_1790502113503.jpg',
        mediaType: 'image',
        notes: 'Rendered with raw concrete travertine backdrop. Focused on the collar ribbing and typography layout as discussed in the AI brief.',
        submittedAt: '2026-09-27T08:00:00.000Z',
        submittedBy: 'Yacine Kaci'
      }
    ]
  },
  {
    id: 'task-teaser-reel',
    title: 'Fast-Cut Street Manifesto Reel (9:16)',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-kasbah-fall',
    campaignName: 'Kasbah Brutalism Fall/Winter 26',
    assignedToId: 'user-crt-2',
    assignedToName: 'Amina Belkacem',
    assignedToAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    status: 'revision_requested',
    priority: 'urgent',
    deadline: '2026-09-30',
    createdAt: '2026-09-22T09:00:00.000Z',
    updatedAt: '2026-09-26T18:00:00.000Z',
    brief: {
      id: 'brief-103',
      title: 'Fast-Cut Street Manifesto Reel',
      brandId: 'brand-urbana',
      brandName: 'URBANA',
      brandIdentity: {
        tone: 'Kinetic, High-BPM, Cinematic',
        positioning: 'Youth cultural anthem',
        colorPalette: ['#7C3AED', '#0F172A', '#38BDF8']
      },
      marketingStrategy: 'Generate viral sound sharing and high completion rate via quick transitions matching 140 BPM drill beat.',
      campaignObjective: 'Reach 100K+ organic views in first 72 hours.',
      targetAudience: 'TikTok & Reels mobile consumers (16-25).',
      contentIdea: '3-second hook with model running down Kasbah alleys, flash-cutting to close-up garment seams and urban street neon.',
      hook: 'Don’t just walk the streets. Own them.',
      caption: 'They said street fashion couldn’t speak our language. URBANA F/W 26 drops this week. Sound on 🔊',
      hashtags: ['#URBANAVideo', '#ReelsViral', '#AlgeriaStreet'],
      visualDirection: 'Analog CRT distortion, flash frames, anamorphic lens flares, sync to beat.',
      deliverables: ['9:16 MP4 (15s)', '9:16 Clean without text overlays'],
      dimensions: '1080x1920px',
      format: 'Story/Reel 9:16',
      deadline: '2026-09-30'
    },
    submissions: [
      {
        id: 'sub-3',
        taskId: 'task-teaser-reel',
        version: 1,
        previewUrl: '/src/assets/images/urbana_campaign_banner_1790502124105.jpg',
        mediaType: 'image',
        notes: 'First cut assembled with drill beat sync. Color graded with violet & cyan neon tones.',
        submittedAt: '2026-09-25T14:00:00.000Z',
        submittedBy: 'Amina Belkacem',
        feedback: [
          {
            id: 'fb-1',
            authorId: 'user-mkt-1',
            authorName: 'Sarah Benali',
            authorRole: 'marketing',
            comment: 'Great pacing on the opening 5 seconds! However, the typography at second 11 covers the model’s chest print logo. Please shift the text upward or use smaller tracking.',
            action: 'revision_requested',
            createdAt: '2026-09-26T18:00:00.000Z'
          }
        ]
      }
    ]
  },
  {
    id: 'task-completed-hero-banner',
    title: 'Autumn Launch Web Hero Banner',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-kasbah-fall',
    campaignName: 'Kasbah Brutalism Fall/Winter 26',
    assignedToId: 'user-crt-1',
    assignedToName: 'Yacine Kaci',
    assignedToAvatar: '/src/assets/images/avatar_creative_lead_1790502147335.jpg',
    status: 'completed',
    priority: 'high',
    deadline: '2026-09-20',
    createdAt: '2026-09-15T09:00:00.000Z',
    updatedAt: '2026-09-21T11:00:00.000Z',
    brief: {
      id: 'brief-100',
      title: 'Autumn Launch Web Hero Banner',
      brandId: 'brand-urbana',
      brandName: 'URBANA',
      brandIdentity: {
        tone: 'Cinematic, Architectural',
        positioning: 'Flagship digital storefront aesthetic',
        colorPalette: ['#7C3AED', '#06B6D4', '#0F172A']
      },
      marketingStrategy: 'Establish the collection atmosphere on the homepage hero section.',
      campaignObjective: 'Create immediate visual impact upon website arrival.',
      targetAudience: 'All store visitors.',
      contentIdea: 'Wide cinematic ensemble of streetwear models at dusk.',
      hook: 'The New Standard of North African Streetwear.',
      caption: 'Kasbah Brutalism collection banner.',
      hashtags: ['#URBANA'],
      visualDirection: 'Cinematic wide angle, violet and teal ambient lighting, razor-sharp garment details.',
      deliverables: ['16:9 Web Banner (WebP/PNG)'],
      dimensions: '1920x1080px',
      format: 'Banner 16:9',
      deadline: '2026-09-20'
    },
    submissions: [
      {
        id: 'sub-4',
        taskId: 'task-completed-hero-banner',
        version: 1,
        previewUrl: '/src/assets/images/urbana_campaign_banner_1790502124105.jpg',
        mediaType: 'image',
        notes: 'Final export with compressed lossless assets ready for web deployment.',
        submittedAt: '2026-09-20T17:00:00.000Z',
        submittedBy: 'Yacine Kaci',
        feedback: [
          {
            id: 'fb-2',
            authorId: 'user-mkt-1',
            authorName: 'Sarah Benali',
            authorRole: 'marketing',
            comment: 'Stunning visual direction! Approved for publication across the web portal and Asset Hub.',
            action: 'approved',
            createdAt: '2026-09-21T11:00:00.000Z'
          }
        ]
      }
    ]
  }
];

export const INITIAL_CALENDAR_ITEMS: ContentCalendarItem[] = [
  {
    id: 'cal-1',
    title: 'Kasbah Lookbook Carousel Part 1',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-kasbah-fall',
    campaignName: 'Kasbah Brutalism Fall/Winter 26',
    scheduledDate: '2026-10-02',
    time: '18:00',
    platform: 'Instagram',
    format: 'Carousel',
    status: 'scheduled',
    caption: 'URBANA Fall/Winter 2026. Born in the labyrinth of the Kasbah, engineered for the global street. Sand-washed heavyweight fleece drops this Friday.',
    hashtags: ['#URBANAStreetwear', '#AlgiersFashion', '#KasbahBrutalism'],
    mediaPreview: '/src/assets/images/urbana_hero_streetwear_1790502102148.jpg',
    taskId: 'task-kasbah-hero'
  },
  {
    id: 'cal-2',
    title: 'Fast-Cut Street Manifesto Reel',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-kasbah-fall',
    campaignName: 'Kasbah Brutalism Fall/Winter 26',
    scheduledDate: '2026-10-04',
    time: '20:30',
    platform: 'TikTok',
    format: 'Reel',
    status: 'scheduled',
    caption: 'They said street fashion couldn’t speak our language. URBANA F/W 26 drops this week. Sound on 🔊',
    hashtags: ['#URBANAVideo', '#ReelsViral', '#AlgeriaStreet'],
    mediaPreview: '/src/assets/images/urbana_campaign_banner_1790502124105.jpg',
    taskId: 'task-teaser-reel'
  },
  {
    id: 'cal-3',
    title: 'Raw Concrete Tee 48h VIP Access',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-drop-tee-teaser',
    campaignName: 'Raw Concrete Tee Drop',
    scheduledDate: '2026-10-10',
    time: '12:00',
    platform: 'Instagram',
    format: 'Post',
    status: 'draft',
    caption: 'Built like concrete. Wears like a dream. 48 hours only.',
    hashtags: ['#URBANATee', '#StreetwearDrop'],
    mediaPreview: '/src/assets/images/urbana_tee_graphic_1790502113503.jpg',
    taskId: 'task-raw-tee-poster'
  }
];

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'ast-1',
    name: 'urbana_kasbah_lookbook_hero.jpg',
    fileUrl: '/src/assets/images/urbana_hero_streetwear_1790502102148.jpg',
    fileType: 'image',
    fileSize: '3.4 MB',
    dimensions: '1920x1080',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-kasbah-fall',
    campaignName: 'Kasbah Brutalism Fall/Winter 26',
    creatorId: 'user-crt-1',
    creatorName: 'Yacine Kaci',
    uploadedAt: '2026-09-25T16:00:00.000Z',
    approvalStatus: 'approved',
    folder: 'Lookbooks'
  },
  {
    id: 'ast-2',
    name: 'urbana_raw_concrete_tee_mockup.jpg',
    fileUrl: '/src/assets/images/urbana_tee_graphic_1790502113503.jpg',
    fileType: 'image',
    fileSize: '2.1 MB',
    dimensions: '1440x1080',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-drop-tee-teaser',
    campaignName: 'Raw Concrete Tee Drop',
    creatorId: 'user-crt-1',
    creatorName: 'Yacine Kaci',
    uploadedAt: '2026-09-27T08:00:00.000Z',
    approvalStatus: 'approved',
    folder: 'Products'
  },
  {
    id: 'ast-3',
    name: 'urbana_manifesto_campaign_wide.jpg',
    fileUrl: '/src/assets/images/urbana_campaign_banner_1790502124105.jpg',
    fileType: 'image',
    fileSize: '4.8 MB',
    dimensions: '2560x1440',
    brandId: 'brand-urbana',
    brandName: 'URBANA',
    campaignId: 'camp-kasbah-fall',
    campaignName: 'Kasbah Brutalism Fall/Winter 26',
    creatorId: 'user-crt-1',
    creatorName: 'Yacine Kaci',
    uploadedAt: '2026-09-20T17:00:00.000Z',
    approvalStatus: 'approved',
    folder: 'Banners'
  }
];

// In-Memory Database store with simple mutable array storage
class DatabaseStore {
  users = [...USERS];
  brands = [...INITIAL_BRANDS];
  campaigns = [...INITIAL_CAMPAIGNS];
  creativeMembers = [...INITIAL_CREATIVE_MEMBERS];
  tasks = [...INITIAL_TASKS];
  calendar = [...INITIAL_CALENDAR_ITEMS];
  assets = [...INITIAL_ASSETS];
}

export const db = new DatabaseStore();
