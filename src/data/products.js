// src/data/products.js
// Comprehensive catalog data for Amrutham traditional masalas and health mixes

export const PRODUCTS = [
  {
    id: 'sambar-podi',
    name: 'Sambar Podi',
    tamilName: 'பாரம்பரிய சாம்பார் பொடி',
    category: 'TRADITIONAL SPICES',
    tagline: 'Hand-roasted heirloom recipe with sun-dried red chillies & stone-ground coriander',
    shortDescription: 'Elevate your daily meals with our authentic South Indian Sambar Podi. A time-tested blend of slow-roasted coriander seeds, Guntur red chillies, virali turmeric, and fragrant fenugreek, ground to traditional perfection for rich aroma and deep flavor.',
    fullDescription: 'Crafted following generations of grandmother’s culinary wisdom in Tamil Nadu, Amrutham Sambar Podi uses 100% native spices slow-roasted in iron vessels to seal in natural essential oils. Free from synthetic additives, colors, or starches.',
    defaultSize: '100g',
    packSizes: [
      { size: '100g', price: 120, label: '100g (Pouch)' },
      { size: '250g', price: 280, label: '250g (Family Pack)' },
      { size: '500g', price: 540, label: '500g (Saver Pack)' },
      { size: '1kg', price: 1050, label: '1kg (Bulk Value)' }
    ],
    images: [
      {
        url: '/assets/hero-spices.jpg',
        alt: 'Amrutham Sambar Podi freshly stone ground with aromatic whole spices'
      },
      {
        url: '/assets/our-story-masala.jpg',
        alt: 'Heirloom whole spices slow-roasted for Amrutham Sambar Podi'
      },
      {
        url: '/assets/hero-spices-bg.png',
        alt: 'Traditional South Indian spices display'
      },
      {
        url: '/assets/product-health-mix.png',
        alt: 'Amrutham authentic craft packaging'
      }
    ],
    topBadges: [
      {
        title: 'Made with',
        subtitle: 'Stone-Ground Spices',
        icon: 'stone'
      },
      {
        title: 'Crafted with',
        subtitle: 'Heritage Recipe',
        icon: 'recipe'
      }
    ],
    benefits: [
      {
        id: 'b1',
        title: 'Traditional recipe',
        subtitle: 'Grandmother’s authentic proportion'
      },
      {
        id: 'b2',
        title: 'No artificial additives',
        subtitle: 'Zero preservatives, MSG or artificial colors'
      },
      {
        id: 'b3',
        title: 'Authentic spices',
        subtitle: 'Sun-dried & slow iron-pan roasted'
      },
      {
        id: 'b4',
        title: 'Small-batch prep',
        subtitle: 'Freshly ground to preserve essential oils'
      }
    ],
    accordions: [
      {
        id: 'ingredients',
        title: 'INGREDIENTS',
        content: 'Coriander Seeds (Dhaniya), Guntur Sun-Dried Red Chillies, Cumin Seeds (Jeera), Black Peppercorns, Fenugreek (Methi), Virali Turmeric (Manjal), Chana Dal, Urad Dal, Curry Leaves, and Hing (Compounded Asafoetida).'
      },
      {
        id: 'nutritional-info',
        title: 'NUTRITIONAL INFORMATION',
        table: [
          { label: 'Energy (per 100g)', value: '378 kcal' },
          { label: 'Dietary Fiber', value: '26.4 g' },
          { label: 'Protein', value: '13.8 g' },
          { label: 'Total Carbohydrates', value: '48.2 g' },
          { label: 'Healthy Fats', value: '14.1 g' },
          { label: 'Iron', value: '18.4 mg' },
          { label: 'Calcium', value: '380 mg' }
        ]
      },
      {
        id: 'storage-shelf-life',
        title: 'STORAGE & SHELF LIFE',
        content: 'Store in a cool, dry place inside an airtight glass or ceramic container away from direct moisture. Always use a dry spoon. Shelf life: 9 months from the date of small-batch milling.'
      }
    ]
  },
  {
    id: 'traditional-health-mix',
    name: 'Traditional Health Mix',
    tamilName: 'சத்து மாவு (18 பாரம்பரிய தானியங்கள்)',
    category: 'HERITAGE HEALTH MIX',
    tagline: '18 sprouted whole grains, millets, pulses, and nutrient-dense dry fruits',
    shortDescription: 'A wholesome nourishing breakfast porridge crafted with 18 sprouted whole grains, native millets, and dry fruits. Slow-roasted over firewood to maximize bioavailability and digestive wellness for all age groups.',
    fullDescription: 'Amrutham Sathu Maavu is prepared strictly without added sugar, maltodextrin, milk solids, or synthetic flavoring. A complete wholesome meal for growing children, active adults, and elders seeking authentic sustained energy.',
    defaultSize: '500g',
    packSizes: [
      { size: '250g', price: 190, label: '250g (Trial Pack)' },
      { size: '500g', price: 360, label: '500g (Standard Pack)' },
      { size: '1kg', price: 690, label: '1kg (Value Pack)' },
      { size: '2kg', price: 1320, label: '2kg (Family Pack)' }
    ],
    images: [
      {
        url: '/assets/product-health-mix.png',
        alt: 'Amrutham Traditional Health Mix Sathu Maavu pack'
      },
      {
        url: '/assets/health-mix-tradition.jpg',
        alt: 'Traditional multi-grain and sprouted millets wholesome porridge'
      },
      {
        url: '/assets/our-story-masala.jpg',
        alt: 'Authentic roasted grains for health mix'
      },
      {
        url: '/assets/hero-spices.jpg',
        alt: 'Natural whole grain ingredients'
      }
    ],
    topBadges: [
      {
        title: 'Made with',
        subtitle: '18 Sprouted Grains',
        icon: 'grain'
      },
      {
        title: 'Crafted with',
        subtitle: 'Zero Refined Sugar',
        icon: 'sugar-free'
      }
    ],
    benefits: [
      {
        id: 'b1',
        title: 'Sprouted grains',
        subtitle: 'Higher protein & easy digestion'
      },
      {
        id: 'b2',
        title: '100% natural',
        subtitle: 'Zero preservatives, milk solids or chemicals'
      },
      {
        id: 'b3',
        title: 'Wholesome nutrition',
        subtitle: 'Rich in iron, calcium, fiber & complex carbs'
      },
      {
        id: 'b4',
        title: 'Firewood roasted',
        subtitle: 'Slow artisan roasting for golden nutty aroma'
      }
    ],
    accordions: [
      {
        id: 'ingredients',
        title: 'INGREDIENTS',
        content: 'Sprouted Ragi (Finger Millet), Sprouted Kambu (Pearl Millet), Red Rice, Sprouted Wheat, Green Gram, Fried Gram, Soya Bean, Barley, Maize, Foxtail Millet, Little Millet, Kodo Millet, Almonds, Cashewnuts, Cardamom (Elaichi), and Dry Ginger (Sukku).'
      },
      {
        id: 'nutritional-info',
        title: 'NUTRITIONAL INFORMATION',
        table: [
          { label: 'Energy (per 100g)', value: '394 kcal' },
          { label: 'Protein', value: '16.5 g' },
          { label: 'Dietary Fiber', value: '12.8 g' },
          { label: 'Total Carbohydrates', value: '68.4 g' },
          { label: 'Calcium', value: '310 mg' },
          { label: 'Iron', value: '7.8 mg' },
          { label: 'Naturally Occurring Sugars', value: '2.1 g' }
        ]
      },
      {
        id: 'storage-shelf-life',
        title: 'STORAGE & SHELF LIFE',
        content: 'Keep in an airtight container in a cool, dry place. Best consumed within 6 months from packaging for maximum sprouted nutrient freshness.'
      }
    ]
  },
  {
    id: 'black-urad-dal-powder',
    name: 'Black Urad Dal Powder',
    tamilName: 'பாரம்பரிய கருப்பு உளுந்து கஞ்சி மாவு',
    category: 'TRADITIONAL SUPERFOOD',
    tagline: 'Whole unpolished black gram with fenugreek, raw rice & dry ginger',
    shortDescription: 'Our Karuppu Ulundhu Kanji flour is an ancient Tamil superfood renowned for bone density, lower-back strengthening, and maternal nourishment. Ground with whole black husk to retain maximum fiber and antioxidants.',
    fullDescription: 'Handcrafted by Amrutham with premium whole unpolished black urad dal, slow-roasted with small amounts of parboiled rice, fenugreek, and dry ginger. Ideal for making traditional sweet or savory kali, porridge, and kanji.',
    defaultSize: '500g',
    packSizes: [
      { size: '250g', price: 160, label: '250g (Trial Pack)' },
      { size: '500g', price: 310, label: '500g (Standard Pack)' },
      { size: '1kg', price: 590, label: '1kg (Value Pack)' }
    ],
    images: [
      {
        url: '/assets/product-black-urad.png',
        alt: 'Amrutham Black Urad Dal Powder pack'
      },
      {
        url: '/assets/health-mix-tradition.jpg',
        alt: 'Karuppu Ulundhu Kanji authentic preparation'
      },
      {
        url: '/assets/hero-spices-bg.png',
        alt: 'Traditional whole black gram grains'
      },
      {
        url: '/assets/our-story-masala.jpg',
        alt: 'Slow roasting black urad dal'
      }
    ],
    topBadges: [
      {
        title: 'Made with',
        subtitle: 'Unpolished Black Urad',
        icon: 'urad'
      },
      {
        title: 'Crafted with',
        subtitle: 'Husk-Rich Fiber',
        icon: 'fiber'
      }
    ],
    benefits: [
      {
        id: 'b1',
        title: 'Bone health',
        subtitle: 'Natural calcium & magnesium powerhouse'
      },
      {
        id: 'b2',
        title: 'Women’s wellness',
        subtitle: 'Traditional nourishment for spinal & joint strength'
      },
      {
        id: 'b3',
        title: 'Unpolished purity',
        subtitle: 'Retains wholesome outer skin & essential minerals'
      },
      {
        id: 'b4',
        title: 'Digestive aid',
        subtitle: 'Tempered with dry ginger & aromatic fenugreek'
      }
    ],
    accordions: [
      {
        id: 'ingredients',
        title: 'INGREDIENTS',
        content: 'Whole Unpolished Black Urad Dal (with skin), Traditional Parboiled Red Rice, Fenugreek Seeds (Methi), Dry Ginger (Sukku), and Green Cardamom.'
      },
      {
        id: 'nutritional-info',
        title: 'NUTRITIONAL INFORMATION',
        table: [
          { label: 'Energy (per 100g)', value: '352 kcal' },
          { label: 'Protein', value: '24.2 g' },
          { label: 'Dietary Fiber', value: '18.3 g' },
          { label: 'Iron', value: '7.5 mg' },
          { label: 'Calcium', value: '154 mg' },
          { label: 'Potassium', value: '983 mg' }
        ]
      },
      {
        id: 'storage-shelf-life',
        title: 'STORAGE & SHELF LIFE',
        content: 'Store in an airtight container in a dry pantry. Best consumed within 6 months of milling.'
      }
    ]
  },
  {
    id: 'rasam-powder',
    name: 'Rasam Powder',
    tamilName: 'அரோமா பாரம்பரிய ரசப்பொடி',
    category: 'TRADITIONAL SPICES',
    tagline: 'Pepper-cumin digestive blend slow-ground with wild coriander',
    shortDescription: 'Infuse your kitchen with the soothing, therapeutic aroma of authentic South Indian Rasam. Packed with hand-pounded Malabar black peppercorns, fragrant cumin seeds, and heirloom coriander for immune-boosting digestive harmony.',
    fullDescription: 'Our Rasam Podi is prepared in small batches using traditional sun-drying methods and low-heat hand grinding. It delivers the quintessential peppery warmth, subtle tang, and comforting soul food experience.',
    defaultSize: '100g',
    packSizes: [
      { size: '100g', price: 130, label: '100g (Pouch)' },
      { size: '250g', price: 300, label: '250g (Family Pack)' },
      { size: '500g', price: 570, label: '500g (Saver Pack)' }
    ],
    images: [
      {
        url: '/assets/our-story-masala.jpg',
        alt: 'Amrutham aromatic Rasam Podi whole spice blend'
      },
      {
        url: '/assets/hero-spices.jpg',
        alt: 'Malabar peppercorns, cumin and coriander for Rasam'
      },
      {
        url: '/assets/hero-spices-bg.png',
        alt: 'Traditional spices preparation'
      },
      {
        url: '/assets/product-health-mix.png',
        alt: 'Amrutham spice packaging'
      }
    ],
    topBadges: [
      {
        title: 'Made with',
        subtitle: 'Malabar Black Pepper',
        icon: 'pepper'
      },
      {
        title: 'Crafted with',
        subtitle: 'Digestive Herbs',
        icon: 'digestive'
      }
    ],
    benefits: [
      {
        id: 'b1',
        title: 'Digestive remedy',
        subtitle: 'Potent cumin & black pepper for gut ease'
      },
      {
        id: 'b2',
        title: 'Immunity booster',
        subtitle: 'Rich in piperine and pure turmeric antioxidants'
      },
      {
        id: 'b3',
        title: 'Zero filler starch',
        subtitle: '100% whole spices without added flour or color'
      },
      {
        id: 'b4',
        title: 'Hand-roasted batch',
        subtitle: 'Freshly roasted to preserve essential oils'
      }
    ],
    accordions: [
      {
        id: 'ingredients',
        title: 'INGREDIENTS',
        content: 'Malabar Black Peppercorns, Cumin Seeds (Jeera), Coriander Seeds, Sun-Dried Red Chillies, Toor Dal, Chana Dal, Turmeric, Curry Leaves, and Asafoetida.'
      },
      {
        id: 'nutritional-info',
        title: 'NUTRITIONAL INFORMATION',
        table: [
          { label: 'Energy (per 100g)', value: '364 kcal' },
          { label: 'Dietary Fiber', value: '24.1 g' },
          { label: 'Protein', value: '14.6 g' },
          { label: 'Total Carbohydrates', value: '44.8 g' },
          { label: 'Iron', value: '16.2 mg' }
        ]
      },
      {
        id: 'storage-shelf-life',
        title: 'STORAGE & SHELF LIFE',
        content: 'Keep in an airtight tin or glass jar away from direct sunlight. Shelf life: 9 months from manufacture.'
      }
    ]
  },
  {
    id: 'idli-milagai-podi',
    name: 'Idli Milagai Podi',
    tamilName: 'காரசார இட்லி மிளகாய்ப் பொடி (Gunpowder)',
    category: 'TRADITIONAL SPICES',
    tagline: 'Crunchy roasted dal gunpowder with sesame & Guntur dry chillies',
    shortDescription: 'The crown jewel of South Indian breakfast! A crunchy, aromatic gunpowder spice mix crafted with slow-roasted black gram, Bengal gram, aromatic sesame seeds, and hand-picked red chillies. Best savored with cold-pressed gingelly oil or hot desi ghee.',
    fullDescription: 'Amrutham Idli Podi is coarsely ground for that unmistakable traditional crunch. Every bite is an explosion of nutty roasted dal, toasty sesame, and subtle fiery heat.',
    defaultSize: '100g',
    packSizes: [
      { size: '100g', price: 125, label: '100g (Pouch)' },
      { size: '250g', price: 290, label: '250g (Family Pack)' },
      { size: '500g', price: 550, label: '500g (Saver Pack)' }
    ],
    images: [
      {
        url: '/assets/hero-spices.jpg',
        alt: 'Amrutham Idli Milagai Podi gunpowder texture'
      },
      {
        url: '/assets/our-story-masala.jpg',
        alt: 'Roasted lentils and sesame seeds for Idli Podi'
      },
      {
        url: '/assets/product-black-urad.png',
        alt: 'Amrutham spice craft packaging'
      },
      {
        url: '/assets/hero-spices-bg.png',
        alt: 'Traditional South Indian culinary spices'
      }
    ],
    topBadges: [
      {
        title: 'Made with',
        subtitle: 'Roasted Sesame & Dal',
        icon: 'sesame'
      },
      {
        title: 'Crafted with',
        subtitle: 'Authentic Coarse Crunch',
        icon: 'crunch'
      }
    ],
    benefits: [
      {
        id: 'b1',
        title: 'Coarse texture',
        subtitle: 'Traditional stone-ground crunchy bite'
      },
      {
        id: 'b2',
        title: 'Sesame goodness',
        subtitle: 'Rich in natural healthy fats and calcium'
      },
      {
        id: 'b3',
        title: 'Pure lentils',
        subtitle: 'Packed with plant-based protein from roasted dals'
      },
      {
        id: 'b4',
        title: 'Pure sesame aroma',
        subtitle: 'Pairs divinely with cold-pressed Nallennai & Ghee'
      }
    ],
    accordions: [
      {
        id: 'ingredients',
        title: 'INGREDIENTS',
        content: 'Urad Dal (Black Gram), Chana Dal (Bengal Gram), White Sesame Seeds, Guntur Dry Red Chillies, Curry Leaves, Compounded Asafoetida (Hing), and Rock Salt.'
      },
      {
        id: 'nutritional-info',
        title: 'NUTRITIONAL INFORMATION',
        table: [
          { label: 'Energy (per 100g)', value: '412 kcal' },
          { label: 'Protein', value: '18.7 g' },
          { label: 'Dietary Fiber', value: '15.4 g' },
          { label: 'Healthy Fats', value: '16.8 g' },
          { label: 'Calcium', value: '420 mg' }
        ]
      },
      {
        id: 'storage-shelf-life',
        title: 'STORAGE & SHELF LIFE',
        content: 'Store in an airtight container. Shelf life: 9 months.'
      }
    ]
  }
];

export const AMRUTHAM_PHONE = '+919445831616';
export const AMRUTHAM_PHONE_RAW = '919445831616';
