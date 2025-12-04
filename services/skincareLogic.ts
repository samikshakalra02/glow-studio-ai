import { Goal, IngredientAnalysis, IngredientDetail, MaskValidationResult, Routine, SkinProblem, SkinType, SynergyResult, TimeAvailable, MarketProduct } from '../types';

export const generateRoutine = (skinType: SkinType, time: TimeAvailable, goal: Goal): Routine => {
  const morning: any[] = [
    { step: 'Cleanser', product: 'Gentle Hydrating Cleanser' }
  ];
  const evening: any[] = [
    { step: 'Cleanser', product: 'Double Cleanse Balm' }
  ];

  if (skinType === SkinType.Oily) {
    morning[0].product = 'Foaming Gel Cleanser';
  } else if (skinType === SkinType.Sensitive) {
    morning[0].product = 'Micellar Water or Milk Cleanser';
  }

  if (goal === Goal.Acne) {
    morning.push({ step: 'Treatment', product: 'Salicylic Acid Toner' });
    evening.push({ step: 'Treatment', product: 'Niacinamide Serum' });
  } else if (goal === Goal.AntiAging) {
    morning.push({ step: 'Antioxidant', product: 'Vitamin C Serum' });
    evening.push({ step: 'Active', product: 'Retinol Complex' });
  } else if (goal === Goal.Hydration) {
    morning.push({ step: 'Hydration', product: 'Hyaluronic Acid Serum' });
    evening.push({ step: 'Hydration', product: 'Polyglutamic Acid Essence' });
  }

  if (time !== TimeAvailable.Five) {
    morning.push({ step: 'Eye Care', product: 'Caffeine Eye Cream' });
    evening.push({ step: 'Eye Care', product: 'Peptide Eye Cream' });
  }

  if (time === TimeAvailable.Thirty) {
    evening.push({ step: 'Mask', product: 'Overnight Sleeping Mask' });
    morning.unshift({ step: 'Tool', product: 'Ice Roller or Gua Sha' });
  }

  morning.push({ step: 'Moisturizer', product: 'Lightweight Gel Cream' });
  morning.push({ step: 'SPF', product: 'Broad Spectrum SPF 50' });

  evening.push({ step: 'Moisturizer', product: 'Barrier Repair Cream' });

  return { morning, evening };
};

// Market Recommendations Database
const productDatabase: Record<string, MarketProduct[]> = {
  // Cleansers
  'Gentle Hydrating Cleanser': [
    { brand: 'CeraVe', name: 'Hydrating Facial Cleanser', priceLevel: '$', description: 'Cult favorite with ceramides.' },
    { brand: 'La Roche-Posay', name: 'Toleriane Hydrating Gentle Cleanser', priceLevel: '$$', description: 'Prebiotic thermal water formula.' },
    { brand: 'Fresh', name: 'Soy Face Cleanser', priceLevel: '$$$', description: 'Luxurious gel texture.' }
  ],
  'Foaming Gel Cleanser': [
    { brand: 'CeraVe', name: 'Foaming Facial Cleanser', priceLevel: '$', description: 'Great for oily skin.' },
    { brand: 'Youth to the People', name: 'Superfood Cleanser', priceLevel: '$$$', description: 'Green juice for your face.' },
    { brand: 'Bioderma', name: 'Sébium Gel Moussant', priceLevel: '$$', description: 'Controls shine effectively.' }
  ],
  'Double Cleanse Balm': [
    { brand: 'Elf', name: 'Holy Hydration! Makeup Melting Balm', priceLevel: '$', description: 'Unbeatable budget option.' },
    { brand: 'Farmacy', name: 'Green Clean', priceLevel: '$$$', description: 'Smells like lime sorbet.' },
    { brand: 'Banila Co', name: 'Clean It Zero', priceLevel: '$$', description: 'The K-Beauty standard.' }
  ],
  'Micellar Water or Milk Cleanser': [
    { brand: 'Bioderma', name: 'Sensibio H2O', priceLevel: '$$', description: 'The original micellar water.' },
    { brand: 'Garnier', name: 'Micellar Cleansing Water', priceLevel: '$', description: 'Drugstore staple.' },
    { brand: 'Glossier', name: 'Milky Jelly Cleanser', priceLevel: '$$', description: 'Conditioning face wash.' }
  ],

  // Treatments & Actives
  'Salicylic Acid Toner': [
    { brand: 'Paula\'s Choice', name: 'Skin Perfecting 2% BHA', priceLevel: '$$', description: 'Global bestseller for pores.' },
    { brand: 'The Ordinary', name: 'Salicylic Acid 2% Solution', priceLevel: '$', description: 'Targeted spot treatment.' },
    { brand: 'Farmacy', name: 'Deep Sweep', priceLevel: '$$', description: 'Alcohol-free BHA.' }
  ],
  'Niacinamide Serum': [
    { brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', priceLevel: '$', description: 'Controls oil and blemishes.' },
    { brand: 'Glow Recipe', name: 'Watermelon Glow Niacinamide Dew Drops', priceLevel: '$$$', description: 'For that glass skin look.' },
    { brand: 'Inkey List', name: 'Niacinamide Serum', priceLevel: '$', description: 'Simple and effective.' }
  ],
  'Vitamin C Serum': [
    { brand: 'Skinceuticals', name: 'C E Ferulic', priceLevel: '$$$', description: 'The gold standard (pricey!).' },
    { brand: 'Timeless', name: '20% Vitamin C + E Ferulic', priceLevel: '$$', description: 'Best dupe for high-end.' },
    { brand: 'L\'Oreal', name: 'Revitalift 12% Pure Vitamin C', priceLevel: '$$', description: 'Accessible and stable.' }
  ],
  'Retinol Complex': [
    { brand: 'CeraVe', name: 'Resurfacing Retinol Serum', priceLevel: '$', description: 'Gentle entry-level retinol.' },
    { brand: 'Sunday Riley', name: 'A+ High-Dose Retinoid Serum', priceLevel: '$$$', description: 'Potent for experienced users.' },
    { brand: 'The Ordinary', name: 'Retinol 0.5% in Squalane', priceLevel: '$', description: 'Oil-based stability.' }
  ],

  // Hydration
  'Hyaluronic Acid Serum': [
    { brand: 'The Ordinary', name: 'Hyaluronic Acid 2% + B5', priceLevel: '$', description: 'Hydration hero.' },
    { brand: 'Vichy', name: 'Mineral 89', priceLevel: '$$', description: 'Simple, plumping booster.' },
    { brand: 'Torriden', name: 'Dive-In Serum', priceLevel: '$$', description: 'K-Beauty favorite.' }
  ],
  'Polyglutamic Acid Essence': [
    { brand: 'The Inkey List', name: 'Polyglutamic Acid Serum', priceLevel: '$', description: 'Holds 4x more moisture than HA.' },
    { brand: 'Charlotte Tilbury', name: 'Magic Serum Crystal Elixir', priceLevel: '$$$', description: 'Makeup prep powerhouse.' }
  ],

  // Moisturizers & SPF
  'Lightweight Gel Cream': [
    { brand: 'Neutrogena', name: 'Hydro Boost Water Gel', priceLevel: '$', description: 'Like a drink of water.' },
    { brand: 'Tatcha', name: 'The Water Cream', priceLevel: '$$$', description: 'Pore-refining botanical blend.' },
    { brand: 'Versed', name: 'Dew Point Moisturizing Gel-Cream', priceLevel: '$$', description: 'Clean beauty option.' }
  ],
  'Barrier Repair Cream': [
    { brand: 'La Roche-Posay', name: 'Cicaplast Baume B5', priceLevel: '$$', description: 'The ultimate skin healer.' },
    { brand: 'Dr. Jart+', name: 'Ceramidin Cream', priceLevel: '$$$', description: 'Serious ceramide power.' },
    { brand: 'CeraVe', name: 'Moisturizing Cream', priceLevel: '$', description: 'Classic tub for a reason.' }
  ],
  'Broad Spectrum SPF 50': [
    { brand: 'Beauty of Joseon', name: 'Relief Sun: Rice + Probiotics', priceLevel: '$$', description: 'Viral, no white cast.' },
    { brand: 'Supergoop!', name: 'Unseen Sunscreen', priceLevel: '$$$', description: 'Invisible primer finish.' },
    { brand: 'La Roche-Posay', name: 'Anthelios Melt-in Milk', priceLevel: '$$', description: 'Dermatologist favorite.' }
  ],
  
  // Eyes & Extras
  'Caffeine Eye Cream': [
    { brand: 'The Inkey List', name: 'Caffeine Eye Cream', priceLevel: '$', description: 'Reduces puffiness fast.' },
    { brand: 'Origins', name: 'GinZing Eye Cream', priceLevel: '$$', description: 'Brightens dark circles.' }
  ],
  'Peptide Eye Cream': [
    { brand: 'Drunk Elephant', name: 'Shaba Complex Eye Serum', priceLevel: '$$$', description: 'Firming copper peptides.' },
    { brand: 'Olay', name: 'Retinol 24 Night Eye Cream', priceLevel: '$$', description: 'Smooths fine lines.' }
  ],
  'Overnight Sleeping Mask': [
    { brand: 'Laneige', name: 'Water Sleeping Mask', priceLevel: '$$', description: 'Wake up glowing.' },
    { brand: 'Sulwhasoo', name: 'Overnight Vitalizing Mask', priceLevel: '$$$', description: 'Traditional herbal luxury.' }
  ],
  'Ice Roller or Gua Sha': [
    { brand: 'Skin Gym', name: 'Rose Quartz Gua Sha', priceLevel: '$$', description: 'Sculpting tool.' },
    { brand: 'Generic', name: 'Stainless Steel Ice Roller', priceLevel: '$', description: 'Instant de-puffing.' }
  ]
};

export const getProductRecommendations = (genericName: string): MarketProduct[] => {
  return productDatabase[genericName] || [
    { brand: 'Generic', name: 'Consult your local pharmacist for advice', priceLevel: '$' }
  ];
};


// Expanded Database with "Slang"
const ingredientDB: Record<string, { type: 'good' | 'bad' | 'caution' | 'neutral', description: string, slang: string }> = {
  // Natural / Kitchen
  'lemon': { type: 'bad', description: 'Highly acidic (pH ~2). Disrupts skin barrier.', slang: 'The Sour Destroyer 🍋' },
  'lime': { type: 'bad', description: 'Causes phytophotodermatitis in sun.', slang: 'The Risky Zest 🚫' },
  'baking soda': { type: 'bad', description: 'High pH (9) destroys acid mantle.', slang: 'The Basic Bully 🧂' },
  'toothpaste': { type: 'bad', description: 'Drying agents cause chemical burns.', slang: 'The Minty Mistake 🦷' },
  'sugar': { type: 'caution', description: 'Abrasive physical exfoliant. Micro-tears.', slang: 'The Rough Diamond 💎' },
  'honey': { type: 'good', description: 'Natural humectant and antibacterial.', slang: 'Liquid Gold 🍯' },
  'turmeric': { type: 'good', description: 'Potent anti-inflammatory & brightening.', slang: 'The Golden Glow ✨' },
  'yogurt': { type: 'good', description: 'Contains lactic acid (AHA) and probiotics.', slang: 'The Cool Cream 🍦' },
  'curd': { type: 'good', description: 'Rich in lactic acid and fats.', slang: 'The Probiotic Power 🥛' },
  'coconut oil': { type: 'caution', description: 'Highly comedogenic (clogs pores).', slang: 'The Pore Clogger 🥥' },
  'oatmeal': { type: 'good', description: 'Colloidal oatmeal soothes irritation.', slang: 'The Soothing Savior 🌾' },
  'besan': { type: 'good', description: 'Gram flour absorbs oil and exfoliates.', slang: 'The Oil Magnet 🏜️' },
  'gram flour': { type: 'good', description: 'Gram flour absorbs oil and exfoliates.', slang: 'The Oil Magnet 🏜️' },
  'aloe': { type: 'good', description: 'Hydrates and heals without clogging.', slang: 'The Green Healer 🌵' },
  'egg white': { type: 'caution', description: 'Risk of salmonella. Temporary effect.', slang: 'The Sticky Situation 🥚' },
  'cinnamon': { type: 'bad', description: 'Dermal irritant. Causes burning.', slang: 'The Spicy Hazard 🌶️' },
  'apple cider vinegar': { type: 'caution', description: 'Must be diluted. Balances pH.', slang: 'The Funky Ferment 🍎' },
  'coffee': { type: 'good', description: 'Antioxidant rich, de-puffing.', slang: 'The Morning Jolt ☕' },
  'tomato': { type: 'caution', description: 'Acidic, good for tanning but can irritate.', slang: 'The Red Acid 🍅' },
  'potato': { type: 'good', description: 'Enzymes help with dark circles/spots.', slang: 'The Starch Fighter 🥔' },
  
  // Actives / Chemicals
  'niacinamide': { type: 'good', description: 'Pore minimizer & barrier builder.', slang: 'The Multitasker 🦸‍♀️' },
  'glycerin': { type: 'good', description: 'Classic reliable humectant.', slang: 'The Thirst Trap 💧' },
  'hyaluronic acid': { type: 'good', description: 'Holds 1000x weight in water.', slang: 'The Moisture Magnet 🧲' },
  'ceramide': { type: 'good', description: 'Restores skin barrier glue.', slang: 'The Brick Layer 🧱' },
  'vitamin c': { type: 'good', description: 'Brightens and protects.', slang: 'The Glow Getter 🍊' },
  'retinol': { type: 'good', description: 'Anti-aging powerhouse.', slang: 'The Time Traveler ⏳' },
  'salicylic acid': { type: 'good', description: 'BHA that dives into pores.', slang: 'The Pore Police 👮' },
  'glycolic acid': { type: 'good', description: 'AHA for surface exfoliation.', slang: 'The Smooth Operator ⛷️' },
  'alcohol denat': { type: 'bad', description: 'Drying and sensitizing.', slang: 'The Moisture Vampire 🧛‍♂️' },
  'fragrance': { type: 'bad', description: 'Common sensitizer.', slang: 'The Perfumed Prickle 🌸' },
  'parabens': { type: 'neutral', description: 'Effective preservative, often unfairly demonized.', slang: 'The Misunderstood Guardian 🛡️' },
  'water': { type: 'neutral', description: 'The solvent for life.', slang: 'The OG 🌊' }
};

// ... (detectSynergies function remains mostly same, refined below) ...
const detectSynergies = (foundIngredients: string[]): SynergyResult[] => {
  const synergies: SynergyResult[] = [];
  const has = (name: string) => foundIngredients.some(i => i.includes(name));

  if (has('vitamin c') && has('retinol')) {
    synergies.push({ pair: 'Vit C + Retinol', description: 'Power couple, but high irritation risk! Use AM/PM separately.', type: 'conflict' });
  }
  if ((has('salicylic acid') || has('glycolic acid')) && has('retinol')) {
    synergies.push({ pair: 'Acids + Retinol', description: 'Exfoliation overload! Your barrier might scream.', type: 'conflict' });
  }
  if (has('niacinamide') && has('salicylic acid')) {
    synergies.push({ pair: 'Niacinamide + BHA', description: 'Pore-clearing dream team. Very effective together.', type: 'boost' });
  }
  if (has('vitamin c') && has('spf')) {
    synergies.push({ pair: 'Vit C + Sunscreen', description: 'The ultimate shield against UV damage.', type: 'boost' });
  }
  if (has('hyaluronic acid') && has('water')) {
    synergies.push({ pair: 'HA + Water', description: 'Hydration bomb! HA needs water to work.', type: 'boost' });
  }
  if (has('baking soda') && has('lemon')) {
    synergies.push({ pair: 'Baking Soda + Lemon', description: 'Volcano science experiment. Terrible for skin pH!', type: 'conflict' });
  }
  // New Synergies
  if (has('turmeric') && has('yogurt')) {
    synergies.push({ pair: 'Turmeric + Yogurt', description: 'Classic brightening duo. Fats in yogurt prevent turmeric stain.', type: 'boost' });
  }
  if (has('lemon') && has('sugar')) {
    synergies.push({ pair: 'Lemon + Sugar', description: 'Acid + Scratching = Micro-tears and burns. Avoid!', type: 'conflict' });
  }

  return synergies;
};

const calculateVibe = (details: IngredientDetail[]): string => {
  const badCount = details.filter(d => d.type === 'bad').length;
  const goodCount = details.filter(d => d.type === 'good').length;
  
  if (badCount > 1) return "The Red Flag 🚩";
  if (details.some(d => d.name.includes('baking soda') || d.name.includes('lemon'))) return "The Kitchen Nightmare 🍳";
  if (details.some(d => d.name.includes('retinol') || d.name.includes('acid'))) return "The Active Volcano 🌋";
  if (details.some(d => d.name.includes('honey') || d.name.includes('oat') || d.name.includes('aloe'))) return "The Soothing Smoothie 🥤";
  if (goodCount > 3) return "The Glow Potion ✨";
  return "The Mystery Mix 🧪";
};

export const analyzeIngredients = (text: string): IngredientAnalysis => {
  const lowerText = text.toLowerCase();
  const found: IngredientDetail[] = [];
  const foundNames: string[] = [];

  Object.keys(ingredientDB).forEach(key => {
    if (lowerText.includes(key)) {
      found.push({ name: key, ...ingredientDB[key] });
      foundNames.push(key);
    }
  });

  let score = 8;
  found.forEach(item => {
    if (item.type === 'good') score += 0.5;
    if (item.type === 'bad') score -= 2.0;
    if (item.type === 'caution') score -= 0.5;
  });
  score = Math.min(Math.max(score, 1), 10);

  const synergies = detectSynergies(foundNames);
  const vibe = calculateVibe(found);

  // Enhanced "Combined Judgment" Logic
  let summary = "A balanced mix.";
  let cocktailVerdict = "Safe for general use.";

  const badIngredients = found.filter(i => i.type === 'bad');
  const conflictSynergies = synergies.filter(s => s.type === 'conflict');

  if (badIngredients.length > 0) {
    summary = `Contains ${badIngredients.length} problematic ingredient(s) that are generally discouraged by dermatologists.`;
    cocktailVerdict = "⛔ NOT RECOMMENDED. The risks of irritation or barrier damage outweigh potential benefits.";
  } else if (conflictSynergies.length > 0) {
    summary = "Individually these ingredients are okay, but together they fight.";
    cocktailVerdict = "⚠️ CAUTION. This combination creates chemical conflicts that can cause redness or burns.";
  } else if (score > 8.5) {
    summary = "Excellent safety profile. These ingredients work harmoniously to support skin health.";
    cocktailVerdict = "🏆 DERM APPROVED. A harmonized formula with clear synergistic benefits.";
  } else if (score < 5) {
    summary = "Harsh formulation. Likely to strip natural oils.";
    cocktailVerdict = "🚫 AVOID. Too harsh for facial skin.";
  } else {
    cocktailVerdict = "✅ SAFE. A standard mix with no major red flags, though efficacy depends on concentration.";
  }

  return {
    score: Math.round(score * 10) / 10,
    identifiedIngredients: found,
    synergies,
    vibe,
    summary,
    cocktailVerdict
  };
};

// --- NEW FACE MASK VALIDATOR LOGIC ---

export const validateFaceMask = (ingredients: string[], problem: SkinProblem): MaskValidationResult => {
  const warnings: string[] = [];
  const alternatives: string[] = [];
  let score = 10;
  let isSafe = true;

  const lowerIng = ingredients.map(i => i.toLowerCase());
  const has = (name: string) => lowerIng.some(i => i.includes(name));

  // Universal Checks
  if (has('baking soda')) {
    warnings.push("Baking Soda is too alkaline (pH 9). It destroys your acid mantle.");
    score -= 4;
    alternatives.push("Besan (Gram Flour)");
  }
  if (has('toothpaste')) {
    warnings.push("Toothpaste causes chemical burns and does NOT fix pimples safely.");
    score -= 5;
    alternatives.push("Tea Tree Oil (diluted)");
  }
  if (has('lemon') || has('lime')) {
    warnings.push("Citrus juices are photosensitive. They can cause blistering in the sun.");
    score -= 3;
    alternatives.push("Yogurt (Lactic Acid)");
  }
  if (has('cinnamon') || has('clove')) {
    warnings.push("Spices like Cinnamon are severe irritants for facial skin.");
    score -= 3;
    alternatives.push("Turmeric");
  }

  // Problem-Specific Checks
  switch (problem) {
    case SkinProblem.Pimples:
      if (has('coconut oil')) {
        warnings.push("Coconut Oil is highly comedogenic. It will clog pores and worsen acne.");
        score -= 4;
        alternatives.push("Aloe Vera Gel");
      }
      if (has('sugar') || has('salt')) {
        warnings.push("Physical scrubbing on active acne spreads bacteria and causes scarring.");
        score -= 3;
        alternatives.push("Honey (Antibacterial)");
      }
      break;

    case SkinProblem.Tanning:
      if (has('lemon')) {
        // Lemon is traditionally used but risky
        warnings.push("While Lemon bleaches, it makes skin darker if you go in the sun (phytophotodermatitis).");
      }
      break;

    case SkinProblem.Dryness:
      if (has('clay') || has('multani mitti')) {
        warnings.push("Clays can be too drying for already dry skin.");
        score -= 2;
        alternatives.push("Honey & Milk");
      }
      if (has('lemon') || has('vinegar')) {
        warnings.push("Acids will strip your dry skin barrier further.");
        score -= 3;
      }
      break;
      
    case SkinProblem.Oily:
      if (has('milk cream') || has('malai')) {
        warnings.push("Heavy fats like Malai can trigger breakouts on oily skin.");
        score -= 2;
        alternatives.push("Rose Water");
      }
      break;
  }

  // Calculate Final Verdict
  let verdict = "Chef's Kiss! 👩‍🍳";
  if (score < 4) {
    verdict = "Kitchen Disaster 💥";
    isSafe = false;
  } else if (score < 7 || warnings.length > 0) {
    verdict = "Proceed with Caution ⚠️";
    isSafe = false; // Technically safe maybe, but not recommended
  }

  let explanation = "This mix looks gentle and effective.";
  if (warnings.length > 0) {
    explanation = "There are significant risks with this combination.";
  }

  return {
    isSafe,
    score: Math.max(0, score),
    verdict,
    explanation,
    warnings,
    betterAlternatives: [...new Set(alternatives)] // Unique
  };
};