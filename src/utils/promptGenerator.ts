import { GeneratedPrompt, PromptBreakdown, StockCategory, VisualStyle, AspectRatio } from '../types';
import { VISUAL_STYLES } from '../data/categories';

interface AngleBlueprint {
  title: string;
  compositionType: string;
  copySpace: string;
  focusAngle: string;
  commercialValue: string;
}

const ANGLE_BLUEPRINTS: AngleBlueprint[] = [
  {
    title: 'Commercial Hero Banner (Negative Copy Space)',
    compositionType: 'Wide horizontal rule-of-thirds composition with generous clean negative space on the left side designed for marketing copy, ad banners, and headlines',
    copySpace: 'Left third of frame, clean uncluttered space for headline text',
    focusAngle: 'hero-banner',
    commercialValue: 'High buyer demand: Ad agencies constantly purchase hero compositions for web banners and landing page headers.',
  },
  {
    title: 'Authentic In-Situ Action (Candid Editorial)',
    compositionType: 'Eye-level dynamic environmental framing capturing natural organic movement, authentic human interaction, and candid storytelling moments',
    copySpace: 'Upper margin, soft background suitable for subtle branding overlay',
    focusAngle: 'lifestyle-action',
    commercialValue: 'Top seller: Brands prefer authentic, unposed imagery over stiff traditional stock.',
  },
  {
    title: 'Macro Detail & Tactile Texture (Close-Up)',
    compositionType: 'Ultra-close macro framing with shallow depth of field (f/2.8), drawing sharp focus to intricate surface textures, micro-details, and material craftsmanship',
    copySpace: 'Defocused peripheral edges with smooth creamy bokeh',
    focusAngle: 'macro-detail',
    commercialValue: 'Essential asset: Editorial publications frequently use high-res detail shots as section headers and tactile backgrounds.',
  },
  {
    title: 'Studio Still Life Flatlay (Clean E-Commerce)',
    compositionType: 'Direct 90-degree overhead top-down flatlay arrangement with geometric balance, knolling alignment, and harmonious breathing room between elements',
    copySpace: 'Centered or lower perimeter with balanced margins for promotional labels',
    focusAngle: 'studio-flatlay',
    commercialValue: 'E-commerce favorite: Ideal for social media product campaigns, blogs, and packaging previews.',
  },
  {
    title: 'Conceptual Narrative & Future Vision (Editorial)',
    compositionType: 'Cinematic low-angle three-quarter perspective framing an aspirational visual metaphor, blending progressive design with atmospheric depth',
    copySpace: 'Right third or sky gradient, allowing seamless magazine-style typographic integration',
    focusAngle: 'conceptual-narrative',
    commercialValue: 'Premium license value: Conceptual imagery commands top commercial licensing prices in tech and finance sectors.',
  },
];

// Rich domain vocabularies to generate tailored descriptions
const LIGHTING_PRESETS: Record<VisualStyle, string[]> = {
  Photorealistic: [
    'Soft diffused natural morning daylight streaming through a large industrial factory window, creating gentle shadows and delicate highlights without harsh glare',
    'Warm golden hour rim lighting with a subtle secondary fill from an unbranded reflector, accentuating organic contours and rich material finishes',
    'High-key commercial studio lighting with dual diffused octa-softboxes, casting subtle feather-soft contact shadows on pristine neutral surfaces',
    'Moody directional chiaroscuro side lighting with cinematic atmosphere, gentle volumetric dust motes, and a balanced tonal range',
    'Clean midday diffused daylight under a light overcast sky, providing even color temperature, true-to-life tones, and zero blown highlights',
  ],
  '3D Render': [
    'Studio three-point lighting setup with soft key light, gentle ambient rim reflection, and ray-traced global illumination',
    'Warm volumetric accent lighting with soft pastel highlights and physical caustics reflecting off translucent elements',
    'Sleek modern studio illumination with soft specular highlights, diffuse ambient bounce, and accurate subsurface scattering passes',
    'Clean gradient rim lighting contrasting against subtle dark studio fill, showcasing tactile bevels and smooth radii',
    'High-dynamic-range environment map lighting with balanced fill and soft ground shadow contact',
  ],
  Minimalist: [
    'Soft, shadowless high-key ambient illumination with crisp, subtle daylight gradients that accentuate pure forms',
    'Gentle monochrome natural north-facing window light creating long, elegant, pale grey shadows across smooth planes',
    'Uniform, airy daylight bouncing off neutral off-white surfaces, eliminating clutter and maximizing optical serenity',
    'Delicate architectural light slicing through an unseen aperture, casting a clean graphic diagonal shadow across a quiet void',
    'Diffused white-box studio ambient light with minimal contrast, pristine white balance, and high dynamic range',
  ],
  'Flat Vector': [
    'Clean graphic flat lighting with sharp crisp color transitions, zero gradients, and high contrast visual clarity',
    'Subtle duo-tone graphic lighting suggested through geometric shade blocks and clean vector planes',
    'Vibrant high-contrast daylight palette depicted with solid vector fills and distinct silhouette definition',
    'Contemporary editorial graphic palette with flat tonal separation and crisp line boundaries',
    'Harmonious corporate vector flat illumination with balanced tint fills and pristine negative space',
  ],
};

const BACKGROUND_PRESETS: Record<StockCategory, string[]> = {
  Business: [
    'Out-of-focus modern architectural office interior with warm oak timber panels, floor-to-ceiling glass partitions, and lush indoor greenery',
    'Minimalist contemporary coworking space with neutral limestone walls, soft daylight bokeh, and no visible logos or trademarks',
    'Clean neutral architectural concrete and light blonde birch backdrop with subtle depth of field and soft reflections',
    'Airy Scandinavian boardroom setting with frosted glass acoustic dividers and warm daylight diffusing from background windows',
    'Contemporary open-concept corporate lobby with blurred background movement and modern sustainable timber columns',
  ],
  Technology: [
    'Clean, futuristic minimalist studio environment with subtle ambient depth, brushed aluminum surfaces, and soft blurred bokeh',
    'Modern ergonomic workspace with clean matte black and oak textures, soft ambient screen glow, and clean wire management',
    'Pristine conceptual laboratory setting with sleek neutral architectural glass and soft diffuse lighting',
    'Subtle technological aesthetic backdrop with deep slate tones, optical blur, and clean geometry, free from clutter',
    'Minimalist server room or innovation hub hallway blurred softly in the distant background with subtle cool undertones',
  ],
  Nature: [
    'Lush misty Scandinavian forest canopy with soft natural morning dew, mossy granite boulders, and towering pine needles',
    'Sun-drenched coastal dune landscape with organic sea oats, fine neutral beige sand, and a soft horizon line',
    'Pristine alpine meadow surrounded by soft wild grasses, delicate botanical wildflowers, and gentle mountain bokeh',
    'Quiet serene botanical greenhouse backdrop with cascading monstera leaves, terracotta pots, and dappled sunbeams',
    'Frosted winter forest backdrop with fresh powder snow clinging to evergreen branches and soft crystal reflections',
  ],
  Food: [
    'Rustic honed travertine stone countertop with a subtle backdrop of natural linen napkins and ceramic stoneware',
    'Sunlit artisan kitchen scene with polished marble slab, handcrafted olive wood boards, and fresh organic herbs in soft focus',
    'Warm neutral café setting with subtle raw plaster walls, warm ceramic tableware, and soft ambient morning illumination',
    'Clean white marble pastry station with subtle flour dust in air and soft morning light coming from a courtyard window',
    'Earthy terracotta surface with rustic organic linen fabric and minimalist ceramic bowls blurred in the background',
  ],
  Lifestyle: [
    'Bright sunlit residential living room with Scandinavian linen sofa, warm oak parquet flooring, and trailing potted plants',
    'Calm minimalist bedroom retreat with crisp organic cotton sheets, warm neutral beige walls, and gentle morning sunlight',
    'Contemporary sunlit patio garden with handcrafted clay pots, warm terracotta tiles, and soft outdoor ambient foliage',
    'Serene wellness spa interior with natural river stones, bamboo accents, and soft steam particles caught in the light',
    'Modern home office or creative studio nook with warm natural light, books neatly shelved, and clean aesthetic workspace',
  ],
  Abstract: [
    'Ethereal seamless gradient backdrop transitioning from soft ivory to muted warm stone with subtle organic dust texture',
    'Fluid architectural wave surfaces with gentle ambient occlusion, physical material depth, and infinite horizon',
    'Geometric architectural planes in neutral plaster and soft stone with intersecting angled shadow voids',
    'Dynamic tactile liquid ripple surface with silky ribbons of neutral fluid frozen in gentle harmonic motion',
    'Clean monochromatic studio void with soft curvature, zero horizon lines, and gentle ambient light gradients',
  ],
};

export function generatePromptsForTopic(
  topic: string,
  category: StockCategory,
  visualStyle: VisualStyle,
  aspectRatio: AspectRatio
): GeneratedPrompt[] {
  const cleanTopic = topic.trim() || 'Modern Lifestyle';
  const styleConfig = VISUAL_STYLES.find((s) => s.id === visualStyle) || VISUAL_STYLES[0];
  const bgList = BACKGROUND_PRESETS[category] || BACKGROUND_PRESETS.Business;
  const lightList = LIGHTING_PRESETS[visualStyle] || LIGHTING_PRESETS.Photorealistic;

  return ANGLE_BLUEPRINTS.map((blueprint, index) => {
    const id = `prompt-${Date.now()}-${index + 1}-${Math.random().toString(36).substring(2, 7)}`;
    const lighting = lightList[index % lightList.length];
    const background = bgList[index % bgList.length];

    // Subject variations according to the angle
    let subject = '';
    let stockTitle = '';

    switch (index) {
      case 0: // Hero Shot
        subject = `A stunning, high-impact commercial scene featuring ${cleanTopic}, showcased with premium craftsmanship, elegant placement, and authentic human or organic elements. Every detail is rendered with pristine clarity and commercial viability, free of any brand logos, copyrighted designs, or recognizable trademarks`;
        stockTitle = `${cleanTopic} - Wide commercial hero banner with copy space on modern background`;
        break;
      case 1: // Candid Action
        subject = `An authentic, candid real-world depiction of ${cleanTopic} in practical use, showing realistic hands, natural posture, and genuine interaction that feels unposed, relatable, and documentary-grade`;
        stockTitle = `Authentic candid view of ${cleanTopic} during everyday activity in contemporary space`;
        break;
      case 2: // Macro Detail
        subject = `An exquisite macro close-up focusing on the micro-textures, tactile surfaces, and fine material nuances of ${cleanTopic}, highlighting authentic organic grain, edge crispness, and flawless quality`;
        stockTitle = `Macro close-up detail of ${cleanTopic} showing fine texture and authentic craftsmanship`;
        break;
      case 3: // Still Life / Flatlay
        subject = `A meticulously styled still-life composition of ${cleanTopic}, thoughtfully arranged with complementary props, natural textures, and harmonious spatial separation, conveying mindful organization and professional stock aesthetics`;
        stockTitle = `Clean flatlay still life arrangement of ${cleanTopic} on neutral surface`;
        break;
      case 4: // Conceptual Narrative
        subject = `A creative, forward-looking conceptual visual exploring the theme of ${cleanTopic}, evoking themes of growth, sustainability, efficiency, and modern aspiration through thoughtful visual metaphors`;
        stockTitle = `Conceptual editorial visualization representing ${cleanTopic} in modern commercial setting`;
        break;
      default:
        subject = `Professional commercial presentation of ${cleanTopic}`;
        stockTitle = `${cleanTopic} professional stock imagery`;
    }

    const breakdown: PromptBreakdown = {
      subject,
      composition: `${blueprint.compositionType}. Framed in ${aspectRatio} aspect ratio.`,
      lighting,
      background,
      visualStyle: `${styleConfig.description}. ${styleConfig.promptModifier}.`,
    };

    // Full Prompt synthesis tailored for Adobe Firefly & general AI generators
    const fullPrompt = [
      `${breakdown.subject}.`,
      `Composition: ${breakdown.composition}`,
      `Lighting: ${breakdown.lighting}.`,
      `Background: ${breakdown.background}.`,
      `Style & Quality: ${breakdown.visualStyle}`,
      `Commercial stock attributes: professional color grading, copy space, authentic aesthetic, 8k resolution, commercially cleared, no logos, no text watermark.`,
    ].join(' ');

    // Midjourney v6 specialized format
    const midjourneyPrompt = `${cleanTopic}, ${breakdown.subject.slice(0, 150)}, ${blueprint.compositionType.slice(0, 100)}, ${lighting.slice(0, 90)}, ${styleConfig.promptModifier} --ar ${aspectRatio.replace(':', ':')} --style raw --v 6.1`;

    // Generate relevant SEO keywords for Adobe Stock contributor metadata
    const topicKeywords = cleanTopic
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const baseKeywords = [
      ...topicKeywords,
      category.toLowerCase(),
      visualStyle.toLowerCase(),
      'stock photo',
      'commercial',
      'copy space',
      'concept',
      'design',
      'modern',
      'clean',
      'high resolution',
      'background',
      'isolated',
      'advertising',
      'editorial',
      'authentic',
    ];

    // Deduplicate keywords
    const keywords = Array.from(new Set(baseKeywords)).slice(0, 18);

    return {
      id,
      angleTitle: blueprint.title,
      breakdown,
      fullPrompt,
      midjourneyPrompt,
      aspectRatio,
      category,
      visualStyle,
      recommendedStockTitle: stockTitle,
      keywords,
      copySpaceLocation: blueprint.copySpace,
      commercialValueTip: blueprint.commercialValue,
    };
  });
}
