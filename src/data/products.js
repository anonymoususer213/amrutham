// src/data/products.js
// Comprehensive catalog data for Amrutham traditional masalas and health mixes

export const PRODUCTS = [
  {
    id: 'traditional-health-mix',
    name: 'Traditional Health Mix',
    tamilName: 'சத்து மாவு (18 பாரம்பரிய தானியங்கள்)',
    category: 'HERITAGE HEALTH MIX',
    tagline: '18 sprouted whole grains, millets, pulses, and nutrient-dense dry fruits',
    shortDescription: 'A wholesome nourishing breakfast porridge crafted with 18 sprouted whole grains, native millets, and dry fruits. Slow-roasted over firewood to maximize bioavailability and digestive wellness for all age groups.',
    fullDescription: 'Amrutham Sathu Maavu is prepared strictly without added sugar, maltodextrin, milk solids, or synthetic flavoring. A complete wholesome meal for growing children, active adults, and elders seeking authentic sustained energy.',
    defaultSize: '250g',
    packSizes: [
      { size: '250g', price: 125, label: '250g (Pouch)' },
      { size: '500g', price: 260, label: '500g (Family Pack)' }
    ],
    images: [
      {
        url: '/assets/product-health-mix.png',
        alt: 'Amrutham Traditional Health Mix Sathu Maavu pack'
      },
      {
        url: '/assets/health-mix-nutrition.jpg',
        alt: 'Amrutham Traditional Health Mix Nutritional Information'
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
          { label: 'Energy', value: '364 kcal' },
          { label: 'Protein', value: '9 g' },
          { label: 'Carbohydrates', value: '76 g' },
          { label: 'Total Sugars', value: '2 g' },
          { label: 'Added Sugars', value: '0 g' },
          { label: 'Dietary Fibre', value: '8 g' },
          { label: 'Total Fat', value: '1 g' },
          { label: 'Saturated Fat', value: '0.8 g' },
          { label: 'Trans Fat', value: '0 g' },
          { label: 'Cholesterol', value: '0 mg' },
          { label: 'Calcium', value: '85 mg' },
          { label: 'Iron', value: '3.5 mg' },
          { label: 'Sodium', value: '15 mg' }
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
    tagline: '100% pure whole unpolished black gram (with skin)',
    shortDescription: 'Our Karuppu Ulundhu flour is an ancient Tamil superfood renowned for bone density, lower-back strengthening, and maternal nourishment. Ground with whole black husk to retain maximum fiber and antioxidants.',
    fullDescription: 'Handcrafted by Amrutham with 100% premium whole unpolished black urad dal (with skin). Ideal for making traditional sweet or savory kali, porridge, and kanji.',
    defaultSize: '500g',
    packSizes: [
      { size: '500g', price: 250, label: '500g (Standard Pack)' }
    ],
    images: [
      {
        url: '/assets/product-black-urad.png',
        alt: 'Amrutham Black Urad Dal Powder pack'
      },
      {
        url: '/assets/black-urad-nutrition.jpg',
        alt: 'Amrutham Black Urad Dal Powder Nutritional Information'
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
        title: 'Single-origin purity',
        subtitle: '100% pure whole black gram without additives'
      }
    ],
    accordions: [
      {
        id: 'ingredients',
        title: 'INGREDIENTS',
        content: 'Whole Unpolished Black Urad Dal (with skin).'
      },
      {
        id: 'nutritional-info',
        title: 'NUTRITIONAL INFORMATION',
        table: [
          { label: 'Calories (Per 100g)', value: '341 kcal' },
          { label: 'Protein', value: '25.21 g' },
          { label: 'Carbohydrates', value: '58.99 g' },
          { label: 'Dietary Fiber', value: '18.3 g' },
          { label: 'Total Fat', value: '1.64 g' },
          { label: 'Sugars', value: '0 g' }
        ]
      },
      {
        id: 'storage-shelf-life',
        title: 'STORAGE & SHELF LIFE',
        content: 'Store in an airtight container in a dry pantry. Best consumed within 6 months of milling.'
      }
    ]
  }
];

export const AMRUTHAM_PHONE = '+919445831616';
export const AMRUTHAM_PHONE_RAW = '919445831616';
