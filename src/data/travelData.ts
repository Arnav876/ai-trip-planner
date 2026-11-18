import React from 'react';

export type Rank = 'Best' | 'Cheapest' | 'Most comfortable';
export type Category = 'flights' | 'hotels' | 'conveyance' | 'places' | 'food';

export type Profile = {
  name: string;
  phone: string;
  email: string;
};

export type FamilyMember = {
  id: number;
  name: string;
  age: string;
  relation: string;
};

export type TripInputs = {
  from: string;
  to: string;
  dates: string;
  travelers: number;
  budget: number;
};

export type Option = {
  id: string;
  title: string;
  provider: string;
  price: number;
  duration: string;
  rank: Rank;
  score: number;
  bookingUrl: string;
  detail: string;
  tags?: string[];
  image?: string;
  departureTime?: string;
  returnTime?: string;
  highlights?: string[];
};

export const rankOrder: Rank[] = ['Best', 'Cheapest', 'Most comfortable'];

export const categoryMeta: Record<
  Category,
  { label: string; shortDesc: string; accentColor: string }
> = {
  flights: {
    label: 'Airborne Journey',
    shortDesc: 'Flight schedules & cabin classes',
    accentColor: 'from-sky-500/20 to-teal-500/20',
  },
  hotels: {
    label: 'Boutique Residence',
    shortDesc: 'Selected resorts & suites',
    accentColor: 'from-amber-500/20 to-rose-500/20',
  },
  conveyance: {
    label: 'Urban Mobility',
    shortDesc: 'Rapid transit & private transfers',
    accentColor: 'from-emerald-500/20 to-teal-500/20',
  },
  places: {
    label: 'Cultural Landmarks',
    shortDesc: 'Curated sights & hidden alleys',
    accentColor: 'from-violet-500/20 to-purple-500/20',
  },
  food: {
    label: 'Gastronomy Trail',
    shortDesc: 'Signature dining & street gems',
    accentColor: 'from-orange-500/20 to-amber-500/20',
  },
};

export const optionBank: Record<Category, Option[]> = {
  flights: [
    {
      id: 'flight-best',
      title: 'One-stop morning flight',
      provider: 'Skyscanner scan',
      price: 18700,
      duration: '5h 20m',
      rank: 'Best',
      score: 94,
      bookingUrl: 'https://www.skyscanner.com/',
      detail: 'Good arrival time, one checked bag, reliable connection window.',
      tags: ['Optimal Layover', 'Checked Bag Included', 'Morning Departure'],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
      departureTime: '08:30 AM → 01:50 PM',
      highlights: ['Premium Cabin Amenities', 'On-time Reliability: 96%', 'Complimentary Hot Meal'],
    },
    {
      id: 'flight-cheap',
      title: 'Late-night economy fare',
      provider: 'Google Flights',
      price: 12900,
      duration: '7h 45m',
      rank: 'Cheapest',
      score: 84,
      bookingUrl: 'https://www.google.com/travel/flights',
      detail: 'Lowest fare found, longer layover, cabin bag included.',
      tags: ['Budget Saver', 'Night Flight', 'Cabin Bag Only'],
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop',
      departureTime: '11:45 PM → 07:30 AM (+1)',
      highlights: ['Maximum Cost Efficiency', 'Digital Boarding Pass', 'Self-service Layover'],
    },
    {
      id: 'flight-comfort',
      title: 'Direct premium economy',
      provider: 'Airline portal',
      price: 24600,
      duration: '3h 05m',
      rank: 'Most comfortable',
      score: 91,
      bookingUrl: 'https://www.expedia.com/Flights',
      detail: 'Direct route with wider seat pitch and priority boarding.',
      tags: ['Non-Stop Express', '38" Pitch', 'Priority Pass'],
      image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800&auto=format&fit=crop',
      departureTime: '10:15 AM → 01:20 PM',
      highlights: ['Extra Legroom Seating', 'Priority Lounge Access', 'Fast-Track Immigration'],
    },
  ],
  hotels: [
    {
      id: 'hotel-best',
      title: 'Central boutique hotel',
      provider: 'Booking.com',
      price: 22400,
      duration: '4 nights',
      rank: 'Best',
      score: 95,
      bookingUrl: 'https://www.booking.com/',
      detail: 'Near transit, breakfast included, strong guest ratings.',
      tags: ['Boutique Design', 'Breakfast Included', 'City Center'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      highlights: ['Artisan Breakfast Buffet', 'Walking distance to Metro', 'Rooftop Lounge'],
    },
    {
      id: 'hotel-cheap',
      title: 'Clean budget stay',
      provider: 'Agoda',
      price: 13800,
      duration: '4 nights',
      rank: 'Cheapest',
      score: 81,
      bookingUrl: 'https://www.agoda.com/',
      detail: 'Simple room, walkable food options, no-frills amenities.',
      tags: ['High Value', 'Clean & Secure', 'Transit Friendly'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
      highlights: ['High-speed Fiber WiFi', 'Keyless Mobile Entry', 'Surrounded by Street Cafes'],
    },
    {
      id: 'hotel-comfort',
      title: 'Family suite with pool',
      provider: 'Hotels.com',
      price: 31800,
      duration: '4 nights',
      rank: 'Most comfortable',
      score: 89,
      bookingUrl: 'https://www.hotels.com/',
      detail: 'Larger room, pool, airport pickup, flexible cancellation.',
      tags: ['Panoramic Suite', 'Infinity Pool', 'Chauffeur Included'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
      highlights: ['Private Balcony with Skyline View', 'Airport Chauffeur Transfer', 'Spa & Wellness Access'],
    },
  ],
  conveyance: [
    {
      id: 'ride-best',
      title: 'Transit pass plus airport cab',
      provider: 'Rome2Rio blend',
      price: 7200,
      duration: 'Full trip',
      rank: 'Best',
      score: 92,
      bookingUrl: 'https://www.rome2rio.com/',
      detail: 'Balances local trains, cabs, and predictable transfer times.',
      tags: ['Metro Pass', 'Prepaid Airport Cab', 'Zero Surge'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
      highlights: ['Unlimited 4-Day Transit Card', 'Airport Direct Express Taxi', 'Real-time Navigation Card'],
    },
    {
      id: 'ride-cheap',
      title: 'Metro and bus plan',
      provider: 'Local transit',
      price: 3900,
      duration: 'Full trip',
      rank: 'Cheapest',
      score: 78,
      bookingUrl: 'https://www.google.com/maps',
      detail: 'Lowest cost route set with more walking and transfers.',
      tags: ['All-Transit Pass', 'Green Footprint', 'Unlimited Rides'],
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop',
      highlights: ['Lowest Carbon Footprint', 'Direct Rail to Terminals', 'Card Tap-and-Go Access'],
    },
    {
      id: 'ride-comfort',
      title: 'Private car package',
      provider: 'Klook',
      price: 16400,
      duration: 'Full trip',
      rank: 'Most comfortable',
      score: 88,
      bookingUrl: 'https://www.klook.com/',
      detail: 'Door-to-door transfers and flexible hourly city rides.',
      tags: ['Private Chauffeur', 'Mercedes Sedan', 'Luggage Assistance'],
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop',
      highlights: ['Dedicated Chauffeur on Call', 'Bottled Mineral Water & Wi-Fi', 'Doorstep Pickups'],
    },
  ],
  places: [
    {
      id: 'places-best',
      title: 'Landmarks and local quarter',
      provider: 'Tripadvisor',
      price: 9500,
      duration: '3 days',
      rank: 'Best',
      score: 93,
      bookingUrl: 'https://www.tripadvisor.com/Attractions',
      detail: 'Top sights with two slower neighborhood blocks.',
      tags: ['Curated Circuit', 'Fast Track Pass', 'Local District'],
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop',
      highlights: ['Gardens by the Bay Supertrees', 'Marina Bay SkyPark Deck', 'Chinatown Heritage Alleys'],
    },
    {
      id: 'places-cheap',
      title: 'Free walks and public sights',
      provider: 'Wikivoyage route',
      price: 2800,
      duration: '3 days',
      rank: 'Cheapest',
      score: 80,
      bookingUrl: 'https://www.wikivoyage.org/',
      detail: 'Free viewpoints, markets, and self-guided walking loops.',
      tags: ['Scenic Viewpoints', 'Botanical Walks', 'Architecture'],
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop',
      highlights: ['Singapore Botanic Gardens UNESCO Walk', 'Marina Barrage Sunset Lawn', 'Jewel Changi Rain Vortex'],
    },
    {
      id: 'places-comfort',
      title: 'Guided small-group itinerary',
      provider: 'GetYourGuide',
      price: 17800,
      duration: '3 days',
      rank: 'Most comfortable',
      score: 90,
      bookingUrl: 'https://www.getyourguide.com/',
      detail: 'Skip-line entries, guide support, and gentler pacing.',
      tags: ['Private Docent', 'Skip-All-Lines', 'Luxury AC Van'],
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
      highlights: ['VIP Night Safari Tram', 'Exclusive Cloud Forest Curator Tour', 'Private Harbour Sunset Yacht'],
    },
  ],
  food: [
    {
      id: 'food-best',
      title: 'Local favorites mix',
      provider: 'Google Maps picks',
      price: 11800,
      duration: '4 days',
      rank: 'Best',
      score: 94,
      bookingUrl: 'https://www.google.com/maps/search/restaurants/',
      detail: 'Casual classics, one signature dinner, strong review density.',
      tags: ['Hawker Legends', 'Michelin Bib Gourmand', 'Peranakan Feast'],
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
      highlights: ['Tian Tian Hainanese Chicken Rice', 'Candlenut Michelin Peranakan Dining', 'Old Airport Road Satay Feast'],
    },
    {
      id: 'food-cheap',
      title: 'Street food and cafes',
      provider: 'Eater lists',
      price: 6200,
      duration: '4 days',
      rank: 'Cheapest',
      score: 83,
      bookingUrl: 'https://www.eater.com/maps',
      detail: 'Market meals, bakeries, and budget-friendly lunch stops.',
      tags: ['Hawker Centers', 'Kaya Toast Rituals', 'Noodle Stalls'],
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
      highlights: ['Ya Kun Kaya Toast Morning Set', 'Maxwell Food Centre Laksa', 'Amoy Street Curry Puffs'],
    },
    {
      id: 'food-comfort',
      title: 'Reserved dining route',
      provider: 'OpenTable',
      price: 19800,
      duration: '4 days',
      rank: 'Most comfortable',
      score: 89,
      bookingUrl: 'https://www.opentable.com/',
      detail: 'Reserved restaurants with dietary notes and calmer seating.',
      tags: ['Waterfront Fine Dining', 'Tasting Menu', 'Sommelier Pairing'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
      highlights: ['National Gallery 3-Course Tasting Menu', 'Waterfront Marina Seafood Terrace', 'Rooftop Craft Cocktail Pairing'],
    },
  ],
};

export const featuredDestinations = [
  {
    name: 'Singapore',
    tag: 'GARDEN METROPOLIS',
    airport: 'SIN',
    flightTime: '5h 20m',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop',
    recommendedBudget: 90000,
  },
  {
    name: 'Tokyo, Japan',
    tag: 'NEON TRADITION',
    airport: 'HND',
    flightTime: '7h 10m',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop',
    recommendedBudget: 145000,
  },
  {
    name: 'Amalfi Coast, Italy',
    tag: 'COASTAL LUXURY',
    airport: 'NAP',
    flightTime: '9h 40m',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop',
    recommendedBudget: 180000,
  },
  {
    name: 'Swiss Alps, Switzerland',
    tag: 'ALPINE MAJESTY',
    airport: 'ZRH',
    flightTime: '8h 30m',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop',
    recommendedBudget: 195000,
  },
  {
    name: 'Kyoto, Japan',
    tag: 'ZEN SANCTUARY',
    airport: 'KIX',
    flightTime: '7h 30m',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
    recommendedBudget: 130000,
  },
  {
    name: 'Paris, France',
    tag: 'ART & ARCHITECTURE',
    airport: 'CDG',
    flightTime: '9h 15m',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
    recommendedBudget: 160000,
  },
  {
    name: 'Bali, Indonesia',
    tag: 'TROPICAL ESCAPE',
    airport: 'DPS',
    flightTime: '6h 00m',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop',
    recommendedBudget: 75000,
  },
];

export const experienceShowcase = [
  {
    id: 'exp-1',
    title: 'Gardens by the Bay & Cloud Forest',
    category: 'Botanical Wonder',
    time: 'Day 1 · Afternoon',
    score: 9.8,
    cost: '₹2,400',
    tag: 'MUST SEE',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop',
    description: 'Wander inside a 35-meter-tall veiled cloud mountain with the world’s tallest indoor waterfall.',
  },
  {
    id: 'exp-2',
    title: 'Marina Bay Skyline & Sands Observation',
    category: 'Architectural Icon',
    time: 'Day 2 · Sunset',
    score: 9.6,
    cost: '₹2,100',
    tag: 'VIP ACCESS',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop',
    description: 'Panoramic 360-degree vistas across Singapore Strait and glittering futuristic towers.',
  },
  {
    id: 'exp-3',
    title: 'Michelin Hawker & Peranakan Trail',
    category: 'Culinary Journey',
    time: 'Day 2 · Evening',
    score: 9.9,
    cost: '₹1,800',
    tag: 'SIGNATURE TASTE',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    description: 'Taste authentic Hainanese chicken rice, crispy laksa, and heritage spiced satay with local masters.',
  },
  {
    id: 'exp-4',
    title: 'Night Safari Private Tram Expedition',
    category: 'Wildlife & Nature',
    time: 'Day 3 · Night',
    score: 9.4,
    cost: '₹3,600',
    tag: 'NIGHT ADVENTURE',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    description: 'Traverse 6 geographical zones under ambient moonlight encountering 900+ nocturnal wildlife species.',
  },
  {
    id: 'exp-5',
    title: 'Jewel Changi Rain Vortex & Canopy Bridge',
    category: 'Modern Landmark',
    time: 'Day 4 · Departure',
    score: 9.7,
    cost: 'Free Entry',
    tag: 'TERMINAL ICON',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800&auto=format&fit=crop',
    description: 'Witness seven stories of cascading water surrounded by thousands of trees before your homeward flight.',
  },
];

export function currency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function preferredOption(
  category: Category,
  selected: Record<Category, Rank>,
  budgetPressure: number
) {
  const options = [...optionBank[category]];
  const rank = selected[category];
  const chosen = options.find((option) => option.rank === rank) ?? options[0];

  if (budgetPressure > 1 && category !== 'flights' && rank === 'Most comfortable') {
    return options.find((option) => option.rank === 'Best') ?? chosen;
  }

  if (budgetPressure > 1.15 && rank === 'Best') {
    return options.find((option) => option.rank === 'Cheapest') ?? chosen;
  }

  return chosen;
}

export function recomputePlan(selected: Record<Category, Rank>, budget: number) {
  const firstPass = (Object.keys(optionBank) as Category[]).map((category) =>
    preferredOption(category, selected, 0)
  );
  const total = firstPass.reduce((sum, option) => sum + option.price, 0);
  const pressure = total / budget;
  return (Object.keys(optionBank) as Category[]).map((category) =>
    preferredOption(category, selected, pressure)
  );
}
