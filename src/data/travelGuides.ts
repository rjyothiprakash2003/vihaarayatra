import type { DestinationSlug } from './destinations';

export interface TravelGuideSeo {
  title: string;
  description: string;
}

export interface TravelGuide {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  destinations: DestinationSlug[];
  seo: TravelGuideSeo;
  publishedDate: string;
  coverImage: string;
}

const cover = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const travelGuides: TravelGuide[] = [
  {
    slug: 'singapore-first-timer-tips',
    title: 'Singapore for First-Timers: Smart Planning Without the Rush',
    excerpt:
      'Make the most of a short Singapore trip with sensible pacing, MRT basics, and neighbourhood choices that suit families and senior travellers.',
    destinations: ['singapore'],
    publishedDate: '2024-11-08',
    coverImage: cover('photo-1525625293386-3f8f99389edd'),
    seo: {
      title: 'Singapore First-Timer Tips | VihaaraYatra Travel Guides',
      description:
        'Practical advice for your first Singapore visit - transport, timing, hawker etiquette, and must-see districts.',
    },
    content: [
      'Singapore looks futuristic on postcards, but on the ground it feels organised and walkable once you understand the MRT map. Purchase an EZ-Link or SimplyGo ticket at the airport or any station, load a modest balance, and rely on trains for Marina Bay, Orchard, and Sentosa via HarbourFront. Taxis and ride-hailing are metered and reliable when you return late from Gardens by the Bay light shows.',
      '**Pace your days.** Heat and humidity are real, especially for grandparents and young children. Plan outdoor sightseeing for morning or late afternoon, and keep midday for malls, museums, or conservatories. Universal Studios Singapore and Sentosa can each consume a full day - avoid stacking them with a midnight flight.',
      '**Food is a destination in itself.** Hawker centres such as Maxwell, Lau Pa Sat, or Chinatown Complex offer affordable meals if you follow busy stalls and observe tray-return rules. If anyone in your group avoids spice, say so politely - the default chilli in some dishes can surprise first-timers.',
      '**Documents and customs.** Keep your arrival card details accessible, declare goods honestly at customs, and carry a light sweater for aggressively air-conditioned interiors. Singapore enforces chewing-gum restrictions and littering fines - when in doubt, use bins provided at MRT stations and food courts.',
      'When you speak with VihaaraYatra International Tours, share who is travelling, mobility needs, and must-see lists early. That helps us suggest realistic daily clusters - Marina Bay with Merlion Park one evening, Gardens by the Bay another - rather than crisscrossing the island twice in one afternoon.',
    ],
  },
  {
    slug: 'malaysia-kuala-lumpur-highlights',
    title: 'Kuala Lumpur Highlights: Towers, Caves, and Hill Air',
    excerpt:
      'How to structure a KL stay that balances iconic towers, cultural districts, and optional day trips to Batu Caves or Genting Highlands.',
    destinations: ['malaysia'],
    publishedDate: '2025-01-19',
    coverImage: cover('photo-1480714378408-67cf0d13bc1b'),
    seo: {
      title: 'Kuala Lumpur Travel Highlights | VihaaraYatra',
      description:
        'Plan Petronas viewpoints, Batu Caves mornings, and highland escapes from Kuala Lumpur with timing tips.',
    },
    content: [
      'Kuala Lumpur rewards travellers who group sights by district. Base yourself near KLCC or Bukit Bintang if you want walkable malls and evening dining, or choose a quieter neighbourhood and ride the LRT when needed. The Petronas Twin Towers look spectacular at night, but book skybridge tickets early on the official channel when they are offered.',
      '**Batu Caves etiquette.** Arrive before 9 a.m. to climb the rainbow stairs with softer light and fewer tour buses. Dress modestly, carry water, and secure sunglasses from curious macaques. Photography is welcome, but respect worshippers inside the cave temple.',
      '**Genting Highlands timing.** The cable car journey is part of the experience; weekends and public holidays bring crowds. Pack a light jacket - temperatures drop compared with the city. If anyone experiences motion sensitivity, sit facing forward and avoid reading during the ride.',
      '**Langkawi extensions.** When your itinerary allows an extra flight, Langkawi’s beaches and mangrove tours provide contrast after urban KL. Duty-free shopping is popular, but focus on experiences - Sky Bridge views, island hopping, and sunset sails - rather than impulse purchases at the airport.',
      'VihaaraYatra often pairs Malaysia with Singapore for Indian and Singapore-based families. Confirm visa rules for both countries, and keep passport pages free for separate entry stamps. We can help you understand typical transfer times so you are not rushing through Batu Caves on the same day as a long border crossing.',
    ],
  },
  {
    slug: 'thailand-bangkok-pattaya-planning',
    title: 'Bangkok & Pattaya: Balancing Temples, Markets, and Beach Days',
    excerpt:
      'A sensible rhythm for combining Bangkok’s cultural core with Pattaya’s coastal resorts, without exhausting travel days.',
    destinations: ['thailand'],
    publishedDate: '2025-03-02',
    coverImage: cover('photo-1508009603885-50cf7c579365'),
    seo: {
      title: 'Bangkok & Pattaya Planning Guide | VihaaraYatra',
      description:
        'Temple dress codes, river transport, and when to move from Bangkok to Pattaya for a smoother Thai holiday.',
    },
    content: [
      'Bangkok is intense in the best way - golden temples, long-tail boats, and night markets compete for your attention. Start with the Chao Phraya river: a basic boat pass links Wat Arun, Wat Pho, and riverside communities without sitting in Sukhumvit traffic. Schedule Grand Palace visits on weekday mornings and wear clothing that covers shoulders and knees.',
      '**Food confidence.** Street vendors with high turnover are usually safe bets. Begin with cooked dishes, bottled water, and gradual experiments with spice. Many VihaaraYatra guests appreciate guides who translate menus and suggest milder versions of beloved curries.',
      '**Moving to Pattaya.** The drive takes a few hours depending on departure point and traffic. Use the transfer day for rest rather than stacking a temple tour beforehand. Pattaya suits evening strolls on the beach road and optional island tours; families may prefer dolphin shows or easy snorkel trips over late-night entertainment zones.',
      '**Respect at temples.** Never climb on Buddha images, keep voices low, and turn off flash photography where requested. Monks are not posed for selfies without permission.',
      'Advertised Bangkok-Pattaya programmes from VihaaraYatra show starting prices that must be reconfirmed. Airfare, specific hotel grades, and optional shows are not guaranteed until you receive a written quote - use this guide to decide priorities before you call.',
    ],
  },
  {
    slug: 'group-tour-packing-checklist',
    title: 'Group Tour Packing: Essentials for Southeast Asia Together',
    excerpt:
      'A practical packing list when six or more travellers share buses, flights, and hotel corridors across humid destinations.',
    destinations: ['singapore', 'malaysia', 'thailand', 'indonesia', 'vietnam', 'cambodia'],
    publishedDate: '2024-09-14',
    coverImage: cover('photo-1555400038-63f5ba517a47'),
    seo: {
      title: 'Group Tour Packing Tips | VihaaraYatra Travel Guides',
      description:
        'What families and friend groups should pack for Southeast Asia group departures of six or more travellers.',
    },
    content: [
      'VihaaraYatra group tours typically start from six participants - a size that keeps per-person costs reasonable while still filling a private coach seat plan. Packing for a group means balancing individual needs with shared logistics: one person should carry a basic first-aid pouch, another a multi-port USB charger, and everyone should label luggage inside and out.',
      '**Clothing strategy.** Lightweight, breathable fabrics dry overnight in humid cities. Include one smart-casual outfit for hotel dinners and a modest set for temples (shoulders and knees covered). Slip-on shoes speed up airport security and temple visits where footwear is removed.',
      '**Health and comfort.** Prescription medicines belong in hand luggage with copies of scripts. Insect repellent, high-SPF sunscreen, and electrolyte sachets help in tropical climates. If anyone snores or uses a CPAP machine, mention it when booking rooms so we can request suitable layouts where properties allow.',
      '**Documents folder.** Passports need six months’ validity for many Southeast Asian countries. Store visa PDFs, travel insurance, and emergency contacts in a shared chat thread plus offline on phones. Group leaders should photograph everyone’s passport bio pages in case of loss - delete the folder after the trip if you prefer.',
      'Finally, agree on a daily meet-up time and WhatsApp check-in before excursions. Our India WhatsApp line (+91 94919 46014) is the primary booking CTA; save it before departure so any transport delay can be relayed quickly to coordinators in Singapore or destination partners.',
    ],
  },
  {
    slug: 'southeast-asia-languages-with-vihaarayatra',
    title: 'Languages on the Road: Telugu, English, Tamil & Local Phrases',
    excerpt:
      'How VihaaraYatra’s trilingual support complements English-friendly destinations - and a few phrases that still delight locals.',
    destinations: [
      'singapore',
      'malaysia',
      'thailand',
      'indonesia',
      'sri-lanka',
      'hong-kong',
      'vietnam',
      'cambodia',
    ],
    publishedDate: '2025-05-22',
    coverImage: cover('photo-1488646953014-85cb44e25828'),
    seo: {
      title: 'Southeast Asia Travel Languages | VihaaraYatra',
      description:
        'VihaaraYatra offers Telugu, English, and Tamil guidance - plus practical language tips for Southeast Asia travel.',
    },
    content: [
      'Planning a holiday is easier when you can ask questions in the language you think in. VihaaraYatra International Tours provides consultations in **Telugu, English, and Tamil**, which helps families from India and the diaspora clarify visa questions, room arrangements, and dietary needs before departure. On the ground, Singapore and Malaysia use English widely on signs and in tourist services; Thailand, Vietnam, and Cambodia may require more patience and translation apps outside hotels.',
      '**English as a bridge.** Younger hospitality staff across the region often speak conversational English. Speak clearly, avoid idioms, and confirm numbers twice when discussing times or prices. Written notes help when accents differ.',
      '**Telugu and Tamil at home base.** Call our Singapore office during published hours (Mon-Fri 09:00-21:00, Sat-Sun 08:00-21:00) or message WhatsApp on the India primary line for quicker replies. Mr Narasimha and the team can loop in Telugu or Tamil speakers when coordinating group manifests or special requests.',
      '**Local courtesy words.** “Hello” and “thank you” in the national language still matter. Learn *sawasdee* (Thai), *xin chào* (Vietnamese), and *swasdey* (Khmer) basics; in Bali, *suksma* shows gratitude. Malay/Indonesian *terima kasih* works in both Kuala Lumpur and Denpasar.',
      '**Translation tools.** Download offline packs for Google Translate or similar apps before flights. Screenshot hotel addresses in local script for taxi drivers. Group chats mixing Telugu, Tamil, and English are fine - just pin the English hotel name and contact number at the top for any driver or guide who joins mid-trip.',
    ],
  },
];

export const travelGuideBySlug: Record<string, TravelGuide> = travelGuides.reduce(
  (acc, guide) => {
    acc[guide.slug] = guide;
    return acc;
  },
  {} as Record<string, TravelGuide>,
);

export default travelGuides;