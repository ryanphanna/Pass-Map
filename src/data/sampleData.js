// Sample data for Toronto cultural institutions
// This structure is designed to be easily replaced with Airtable API calls

export const institutions = [
  {
    id: 'rom',
    name: 'Royal Ontario Museum',
    shortName: 'ROM',
    type: 'museum',
    location: {
      address: '100 Queen\'s Park, Toronto, ON',
      neighborhood: 'University',
      lat: 43.6677,
      lng: -79.3948
    },
    membershipTiers: ['individual', 'family'],
    website: 'https://www.rom.on.ca',
    image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3a6?w=800&q=80'
  },
  {
    id: 'ago',
    name: 'Art Gallery of Ontario',
    shortName: 'AGO',
    type: 'gallery',
    location: {
      address: '317 Dundas St W, Toronto, ON',
      neighborhood: 'Downtown',
      lat: 43.6536,
      lng: -79.3925
    },
    membershipTiers: ['individual', 'family', 'plus'],
    website: 'https://ago.ca',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80'
  },
  {
    id: 'toronto-zoo',
    name: 'Toronto Zoo',
    shortName: 'Toronto Zoo',
    type: 'zoo',
    location: {
      address: '2000 Meadowvale Rd, Toronto, ON',
      neighborhood: 'Scarborough',
      lat: 43.8176,
      lng: -79.1859
    },
    membershipTiers: ['individual', 'family'],
    website: 'https://www.torontozoo.com',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80'
  },
  {
    id: 'gardiner',
    name: 'Gardiner Museum',
    shortName: 'Gardiner',
    type: 'museum',
    location: {
      address: '111 Queen\'s Park, Toronto, ON',
      neighborhood: 'University',
      lat: 43.6674,
      lng: -79.3938
    },
    membershipTiers: ['individual', 'family'],
    website: 'https://www.gardinermuseum.on.ca',
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&q=80'
  },
  {
    id: 'aga-khan',
    name: 'Aga Khan Museum',
    shortName: 'Aga Khan',
    type: 'museum',
    location: {
      address: '77 Wynford Dr, Toronto, ON',
      neighborhood: 'Don Mills',
      lat: 43.7253,
      lng: -79.3322
    },
    membershipTiers: ['individual', 'family', 'benefactor'],
    website: 'https://www.agakhanmuseum.org',
    image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&q=80'
  },
  {
    id: 'science-centre',
    name: 'Ontario Science Centre',
    shortName: 'Science Centre',
    type: 'science',
    location: {
      address: '770 Don Mills Rd, Toronto, ON',
      neighborhood: 'Don Mills',
      lat: 43.7166,
      lng: -79.3389
    },
    membershipTiers: ['individual', 'family'],
    website: 'https://www.ontariosciencecentre.ca',
    image: 'https://images.unsplash.com/photo-1567713165018-c392e80a2d7e?w=800&q=80'
  }
];

export const exhibits = [
  // ROM Exhibits
  {
    id: 'rom-1',
    institutionId: 'rom',
    title: 'Zuul: Life of an Armoured Dinosaur',
    type: 'permanent',
    description: 'Meet Zuul crurivastator, the ROM\'s stunning armoured dinosaur from Montana.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['science', 'family', 'natural-history'],
    image: 'https://images.unsplash.com/photo-1551398286-c0c933e0d0a0?w=800&q=80',
    isFree: false
  },
  {
    id: 'rom-2',
    institutionId: 'rom',
    title: 'Spinosaurus: Lost Giant of the Cretaceous',
    type: 'special',
    description: 'Discover the largest predatory dinosaur ever discovered and its aquatic lifestyle.',
    startDate: '2024-12-01',
    endDate: '2025-01-15',
    isPermanent: false,
    interests: ['science', 'family', 'natural-history'],
    image: 'https://images.unsplash.com/photo-1597375194219-b2b0892e4c07?w=800&q=80',
    isFree: false
  },
  {
    id: 'rom-3',
    institutionId: 'rom',
    title: 'Ancient Egypt',
    type: 'permanent',
    description: 'Explore mummies, hieroglyphs, and the mysteries of ancient Egyptian civilization.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['history', 'culture', 'family'],
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80',
    isFree: false
  },
  // AGO Exhibits
  {
    id: 'ago-1',
    institutionId: 'ago',
    title: 'Impressionism: Capturing Light',
    type: 'special',
    description: 'A stunning collection of Impressionist masterpieces from private collections.',
    startDate: '2024-11-15',
    endDate: '2025-01-05',
    isPermanent: false,
    interests: ['art', 'culture', 'history'],
    image: 'https://images.unsplash.com/photo-1580168673295-8f24f7f6e112?w=800&q=80',
    isFree: false
  },
  {
    id: 'ago-2',
    institutionId: 'ago',
    title: 'Canadian & Indigenous Art',
    type: 'permanent',
    description: 'The world\'s largest collection of Canadian art, including the Group of Seven.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['art', 'culture', 'canadian'],
    image: 'https://images.unsplash.com/photo-1577720643272-265f7c43b562?w=800&q=80',
    isFree: false
  },
  {
    id: 'ago-3',
    institutionId: 'ago',
    title: 'Free Wednesday Evenings',
    type: 'program',
    description: 'Every Wednesday from 6-9 PM, admission is free for all visitors.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['art', 'culture', 'community'],
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    isFree: true,
    freeAccessDetails: {
      days: ['Wednesday'],
      times: '6:00 PM - 9:00 PM'
    }
  },
  // Toronto Zoo Exhibits
  {
    id: 'zoo-1',
    institutionId: 'toronto-zoo',
    title: 'Giant Panda Experience',
    type: 'permanent',
    description: 'Visit the beloved giant pandas in their specially designed habitat.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['family', 'animals', 'nature'],
    image: 'https://images.unsplash.com/photo-1525382455947-f319bc05fb35?w=800&q=80',
    isFree: false
  },
  {
    id: 'zoo-2',
    institutionId: 'toronto-zoo',
    title: 'Terra Lumina',
    type: 'special',
    description: 'An enchanting evening light show experience through the zoo grounds.',
    startDate: '2024-12-10',
    endDate: '2025-01-31',
    isPermanent: false,
    interests: ['family', 'art', 'nature'],
    image: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=800&q=80',
    isFree: false
  },
  // Gardiner Museum Exhibits
  {
    id: 'gardiner-1',
    institutionId: 'gardiner',
    title: 'Contemporary Ceramics',
    type: 'permanent',
    description: 'Innovative works pushing the boundaries of ceramic art.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['art', 'culture', 'craft'],
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e32dcf?w=800&q=80',
    isFree: false
  },
  {
    id: 'gardiner-2',
    institutionId: 'gardiner',
    title: 'Ancient Americas Collection',
    type: 'permanent',
    description: 'Pre-Columbian ceramics spanning 3,000 years of American history.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['history', 'culture', 'art'],
    image: 'https://images.unsplash.com/photo-1576224772743-66369de2c8c7?w=800&q=80',
    isFree: false
  },
  // Aga Khan Museum Exhibits
  {
    id: 'aga-1',
    institutionId: 'aga-khan',
    title: 'Islamic Art Through the Ages',
    type: 'permanent',
    description: 'A journey through 1,000 years of Islamic artistic achievement.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['art', 'culture', 'history'],
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
    isFree: false
  },
  {
    id: 'aga-2',
    institutionId: 'aga-khan',
    title: 'Listening to Art, Seeing Music',
    type: 'special',
    description: 'An immersive exploration of the connections between Islamic visual art and music.',
    startDate: '2024-10-20',
    endDate: '2025-01-08',
    isPermanent: false,
    interests: ['art', 'culture', 'music'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    isFree: false
  },
  // Science Centre Exhibits
  {
    id: 'science-1',
    institutionId: 'science-centre',
    title: 'Space Hall',
    type: 'permanent',
    description: 'Explore the cosmos with interactive exhibits about space exploration.',
    startDate: null,
    endDate: null,
    isPermanent: true,
    interests: ['science', 'family', 'space'],
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
    isFree: false
  },
  {
    id: 'science-2',
    institutionId: 'science-centre',
    title: 'Climate Change Challenge',
    type: 'special',
    description: 'An interactive experience about climate science and sustainable solutions.',
    startDate: '2024-11-01',
    endDate: '2025-02-28',
    isPermanent: false,
    interests: ['science', 'environment', 'family'],
    image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80',
    isFree: false
  }
];

export const reciprocalBenefits = [
  {
    id: 'rom-ago',
    fromInstitutionId: 'rom',
    toInstitutionId: 'ago',
    membershipTier: 'family',
    benefit: '10% discount on admission',
    description: 'ROM Family members get 10% off AGO admission'
  },
  {
    id: 'ago-gardiner',
    fromInstitutionId: 'ago',
    toInstitutionId: 'gardiner',
    membershipTier: 'plus',
    benefit: 'Free admission',
    description: 'AGO Plus members get free admission to Gardiner Museum'
  },
  {
    id: 'rom-gardiner',
    fromInstitutionId: 'rom',
    toInstitutionId: 'gardiner',
    membershipTier: 'family',
    benefit: 'Free admission',
    description: 'ROM Family members get free admission to Gardiner Museum'
  },
  {
    id: 'aga-gardiner',
    fromInstitutionId: 'aga-khan',
    toInstitutionId: 'gardiner',
    membershipTier: 'family',
    benefit: '2-for-1 admission',
    description: 'Aga Khan Museum Family members get 2-for-1 admission to Gardiner'
  }
];

// Helper functions to query data (mimics what API calls would look like)
export const getInstitutionById = (id) => {
  return institutions.find(inst => inst.id === id);
};

export const getExhibitsByInstitution = (institutionId) => {
  return exhibits.filter(ex => ex.institutionId === institutionId);
};

export const getExhibitsEndingSoon = (daysThreshold = 30) => {
  const now = new Date();
  const threshold = new Date(now.getTime() + daysThreshold * 24 * 60 * 60 * 1000);

  return exhibits.filter(ex => {
    if (!ex.endDate || ex.isPermanent) return false;
    const endDate = new Date(ex.endDate);
    return endDate >= now && endDate <= threshold;
  });
};

export const getFreeAccessOpportunities = () => {
  return exhibits.filter(ex => ex.isFree);
};

export const getExhibitsByInterests = (interests) => {
  if (!interests || interests.length === 0) return exhibits;

  return exhibits.filter(ex =>
    ex.interests.some(interest => interests.includes(interest))
  );
};

export const getReciprocalBenefits = (institutionId, membershipTier) => {
  return reciprocalBenefits.filter(
    rb => rb.fromInstitutionId === institutionId &&
          rb.membershipTier === membershipTier
  );
};
