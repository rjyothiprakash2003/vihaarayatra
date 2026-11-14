export type DestinationSlug =
  | 'singapore'
  | 'malaysia'
  | 'thailand'
  | 'indonesia'
  | 'sri-lanka'
  | 'hong-kong'
  | 'vietnam'
  | 'cambodia';

export interface DestinationAttraction {
  name: string;
  description: string;
}

export interface DestinationFaq {
  question: string;
  answer: string;
}

export interface DestinationSeo {
  title: string;
  description: string;
}

export interface Destination {
  slug: DestinationSlug;
  name: string;
  tagline: string;
  shortDescription: string;
  longIntroduction: string;
  heroImage: string;
  cardImage: string;
  attractions: DestinationAttraction[];
  travelInspiration: string;
  faqs: DestinationFaq[];
  seo: DestinationSeo;
  accentColor: string;
}

const unsplash = (id: string, width = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const destinations: Destination[] = [
  {
    slug: 'singapore',
    name: 'Singapore',
    tagline: 'Where gardens, skylines, and cultures meet',
    shortDescription:
      'A compact city-state famed for clean streets, world-class attractions, and food from every corner of Asia - all easy to navigate in a few well-planned days.',
    longIntroduction:
      'Singapore rewards travellers who like variety without long transfers. Morning walks through colonial districts and hawker centres can lead to afternoons at futuristic waterfront landmarks and family theme parks. English is widely used for signs and services, public transport is efficient, and neighbourhoods from Little India to Chinatown offer distinct flavours within a short MRT ride. Whether you are visiting for the first time or returning with family, the island balances iconic sights with relaxed evenings by the bay.',
    heroImage: unsplash('photo-1525625293386-3f8f99389edd'),
    cardImage: unsplash('photo-1600664356348-10686526af4f', 800),
    attractions: [
      {
        name: 'Marina Bay Sands',
        description:
          'The waterfront trio of towers with its sky-park and infinity pool defines the modern skyline. The surrounding promenade links malls, light shows, and evening strolls along Marina Bay.',
      },
      {
        name: 'Gardens by the Bay',
        description:
          'Supertrees, cooled conservatories, and open lawns create a botanic experience unlike any other. Sunset and the nightly Garden Rhapsody light show are favourites for all ages.',
      },
      {
        name: 'Sentosa',
        description:
          'Singapore’s resort island brings beaches, cable-car rides, aquariums, and entertainment zones together. It is a natural base for families wanting a mix of thrill and downtime.',
      },
      {
        name: 'Merlion Park',
        description:
          'The Merlion statue overlooking the bay remains the city’s most recognisable photo stop, with views toward the financial district and Esplanade.',
      },
      {
        name: 'Universal Studios Singapore',
        description:
          'Southeast Asia’s Universal Studios packs themed zones, rides, and shows into a full-day outing - ideal when travelling with children or first-time theme-park visitors.',
      },
    ],
    travelInspiration:
      'Picture starting your day with kaya toast and kopi, then crossing the city by MRT to misty conservatories and evening lights reflecting off the bay. Singapore is less about ticking one monument and more about layering food, architecture, and calm green spaces into a rhythm that still feels unhurried.',
    faqs: [
      {
        question: 'Do I need a visa to visit Singapore?',
        answer:
          'Requirements depend on your passport nationality. Many travellers can enter visa-free for short stays, while others must apply in advance. Always check the official Immigration & Checkpoints Authority (ICA) guidance before you book flights.',
      },
      {
        question: 'What is the best time of year to visit?',
        answer:
          'Singapore is warm and humid year-round, with heavier showers during the northeast and southwest monsoon periods. Many visitors choose drier windows between February and April, though indoor attractions and covered transport make any month workable.',
      },
      {
        question: 'Is public transport easy for first-time visitors?',
        answer:
          'Yes. The MRT and bus network cover major sights, and contactless payment options are widely accepted. Taxis and ride-hailing apps are also regulated and straightforward for late evenings or door-to-door comfort.',
      },
      {
        question: 'Are hawker centres safe and hygienic for tourists?',
        answer:
          'Licensed hawker centres are popular with locals and visitors alike. Look for busy stalls, observe local customs around returning trays, and drink bottled or boiled water if you are sensitive to spice or new cuisines.',
      },
    ],
    seo: {
      title: 'Singapore Travel Guide | VihaaraYatra International Tours',
      description:
        'Explore Marina Bay, Gardens by the Bay, Sentosa, and more with practical tips for first-time visitors to Singapore.',
    },
    accentColor: '#0d9488',
  },
  {
    slug: 'malaysia',
    name: 'Malaysia',
    tagline: 'Twin towers, highlands, islands, and heritage',
    shortDescription:
      'From Kuala Lumpur’s gleaming skyline to limestone temples, cool hill resorts, and Langkawi’s beaches, Malaysia packs contrast into one approachable itinerary.',
    longIntroduction:
      'Malaysia invites travellers to switch gears quickly. Kuala Lumpur offers museums, street food, and shopping anchored by the Petronas Towers, while a short drive or flight opens Batu Caves, Genting Highlands, or the Andaman Sea around Langkawi. Malay, Chinese, and Indian communities shape the cuisine and festivals you will see in cities and towns. Roads and domestic flights are well developed, making Malaysia a natural partner destination when combined with Singapore.',
    heroImage: unsplash('photo-1480714378408-67cf0d13bc1b'),
    cardImage: unsplash('photo-1449824913935-59a10b8d2000', 800),
    attractions: [
      {
        name: 'Kuala Lumpur',
        description:
          'The capital blends colonial architecture, vibrant markets, and rooftop dining. Key districts include KLCC around the towers, Bukit Bintang for nightlife, and Merdeka Square for history.',
      },
      {
        name: 'Petronas Twin Towers',
        description:
          'Once the world’s tallest buildings, the twin steel-and-glass towers remain Malaysia’s icon. The skybridge and observation deck offer sweeping city views when open to visitors.',
      },
      {
        name: 'Genting Highlands',
        description:
          'A cool hill resort north of Kuala Lumpur, Genting combines cable-car scenery, indoor entertainment, and mountain air - a contrast to the lowland heat.',
      },
      {
        name: 'Batu Caves',
        description:
          'A limestone hill crowned by a Hindu temple complex, famous for its rainbow staircase and resident macaques. Dress modestly and plan morning visits to avoid crowds and heat.',
      },
      {
        name: 'Langkawi',
        description:
          'An archipelago of duty-free islands with beaches, mangrove tours, and the Langkawi Sky Bridge. It suits couples and families seeking a slower island pace after city sightseeing.',
      },
    ],
    travelInspiration:
      'Imagine praying hands of golden limestone at dawn in Batu Caves, then an afternoon among clouds at Genting, and a final chapter barefoot on Langkawi sand. Malaysia’s appeal is this easy shift between spiritual sites, urban buzz, and island calm.',
    faqs: [
      {
        question: 'Can I combine Malaysia with Singapore in one trip?',
        answer:
          'Many itineraries link the two countries by short flight or coach, often clearing immigration at each border. Allow time for customs and confirm your visa status for both countries separately.',
      },
      {
        question: 'What currency is used in Malaysia?',
        answer:
          'The Malaysian ringgit (MYR) is used nationwide. ATMs are common in cities; carry some cash for rural markets and small eateries.',
      },
      {
        question: 'Is Genting Highlands suitable for children?',
        answer:
          'Genting offers family-oriented indoor attractions and cable-car rides, but altitude and weather can change quickly. Pack a light jacket and check attraction schedules during public holidays.',
      },
      {
        question: 'How do I dress when visiting Batu Caves?',
        answer:
          'Shoulders and knees should be covered as a sign of respect. Comfortable shoes help on the long stair climb, and you may wish to keep valuables secure around monkeys.',
      },
    ],
    seo: {
      title: 'Malaysia Holidays & Highlights | VihaaraYatra',
      description:
        'Kuala Lumpur, Petronas Towers, Genting, Batu Caves, and Langkawi - plan your Malaysia journey with destination insights.',
    },
    accentColor: '#1e3a5f',
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    tagline: 'Temples, coastlines, and legendary hospitality',
    shortDescription:
      'Bangkok’s energy, Pattaya’s seaside fun, and southern islands such as Phuket and Krabi deliver culture, beaches, and cuisine that appeal to every generation.',
    longIntroduction:
      'Thailand remains one of Southeast Asia’s most visited countries for good reason: ornate temples, royal palaces, night markets, and islands with limestone karsts are all within reach. Bangkok rewards curious food lovers and culture seekers, while the eastern seaboard around Pattaya offers resort comfort a few hours from the capital. Further south, Phuket and Krabi pair Andaman Sea waters with snorkelling, island-hopping, and relaxed beach evenings. Respectful dress at religious sites and awareness of local customs will enrich any visit.',
    heroImage: unsplash('photo-1508009603885-50cf7c579365'),
    cardImage: unsplash('photo-1528181304800-259b08848526', 800),
    attractions: [
      {
        name: 'Bangkok',
        description:
          'A sprawling capital where golden spires, riverside communities, and modern malls coexist. Don’t miss the Grand Palace area, river ferries, and neighbourhood markets after dark.',
      },
      {
        name: 'Pattaya',
        description:
          'A coastal city known for beaches, family attractions, and island day trips. It is a common pairing with Bangkok for travellers who want city culture plus seaside downtime.',
      },
      {
        name: 'Phuket',
        description:
          'Thailand’s largest island offers west-coast beaches, Old Phuket Town’s Sino-Portuguese architecture, and boat excursions to Phi Phi and surrounding islets.',
      },
      {
        name: 'Krabi',
        description:
          'Railay Beach and Ao Nang serve as gateways to dramatic cliffs, emerald pools, and four-island tours - favourites for photographers and relaxed adventurers.',
      },
      {
        name: 'Cultural attractions',
        description:
          'From Chiang Mai’s temples to Ayutthaya’s ruins near Bangkok, Thailand’s heritage sites reward travellers who pause for monk blessings, classical dance, and regional crafts.',
      },
    ],
    travelInspiration:
      'Envision incense at dawn by the Chao Phraya River, spicy boat noodles at noon, and a pink Andaman sunset from a long-tail boat. Thailand is as much about gentle routine - smiles, sandals, and shared dishes - as it is about famous beaches.',
    faqs: [
      {
        question: 'What should I wear when visiting temples?',
        answer:
          'Cover shoulders and knees, remove shoes where indicated, and avoid pointing feet toward Buddha images. Scarves or wraps are handy if your day outfit is more casual.',
      },
      {
        question: 'Is street food in Bangkok safe for tourists?',
        answer:
          'Busy stalls with high turnover are generally a good sign. Start with cooked dishes, peel fruit yourself, and stay hydrated. If you have dietary restrictions, learn a few Thai phrases or use translation apps.',
      },
      {
        question: 'When is monsoon season in southern Thailand?',
        answer:
          'The Andaman coast (Phuket, Krabi) often sees heavier rain from May to October, while the Gulf side can differ. Shoulder months can offer good value with occasional showers.',
      },
      {
        question: 'Do I need cash or cards?',
        answer:
          'Cards work in hotels and many restaurants, but markets, tuk-tuks, and smaller vendors prefer Thai baht cash. ATMs are widespread in tourist areas.',
      },
    ],
    seo: {
      title: 'Thailand Travel: Bangkok, Pattaya, Phuket & Krabi',
      description:
        'Inspiration for Thailand itineraries spanning capital culture, eastern seaboard resorts, and Andaman island scenery.',
    },
    accentColor: '#0f766e',
  },
  {
    slug: 'indonesia',
    name: 'Indonesia',
    tagline: 'Bali’s spirit, cliffs, and island escapes',
    shortDescription:
      'Indonesia spans thousands of islands; for many travellers, Bali’s rice terraces, temples, and nearby islets deliver the quintessential tropical escape.',
    longIntroduction:
      'While Indonesia’s scale is vast, Bali concentrates much of what visitors seek: Hindu ceremonies in Ubud, surf and sunsets on the Bukit Peninsula, and day trips to snorkel-friendly Nusa Penida. The island’s “Island of the Gods” nickname reflects daily offerings, gamelan music, and temple gates framing volcanoes. Traffic can be busy in peak season, so planning around early-morning excursions helps. Respect local customs at ceremonies and dress appropriately when entering village temples.',
    heroImage: unsplash('photo-1537996194471-e657df975ab4'),
    cardImage: unsplash('photo-1476514525535-07fb3b4ae5f1', 800),
    attractions: [
      {
        name: 'Bali',
        description:
          'The cultural heart of Indonesian tourism, with beaches in the south, artistic communities in the central highlands, and wellness retreats woven into the landscape.',
      },
      {
        name: 'Ubud',
        description:
          'Known for rice paddies, art markets, dance performances, and the Sacred Monkey Forest. It is an ideal base for slower days and craft shopping.',
      },
      {
        name: 'Uluwatu',
        description:
          'Perched on sea cliffs in the island’s south, Uluwatu Temple hosts kecak fire dances at sunset and draws surfers to breaks below.',
      },
      {
        name: 'Nusa Penida',
        description:
          'A rugged island east of Bali famous for Kelingking Beach viewpoints, crystal bays, and manta ray snorkeling - usually visited on organised day boats.',
      },
    ],
    travelInspiration:
      'Think morning light through palm fronds in Tegallalang, afternoon silence in a cliffside temple, and turquoise water seen from a Nusa Penida viewpoint. Bali invites you to alternate awe with rest.',
    faqs: [
      {
        question: 'Do visitors need a visa for Indonesia?',
        answer:
          'Policies vary by nationality and length of stay, including visa-on-arrival and e-VOA options for many passports. Verify the latest rules on Indonesia’s official immigration portals before travel.',
      },
      {
        question: 'What is the best way to get around Bali?',
        answer:
          'Private drivers and ride-hailing apps are popular for day tours. Scooter rental is common but requires caution and an appropriate licence; traffic and road conditions demand experience.',
      },
      {
        question: 'Are there dress codes at temples?',
        answer:
          'Sarongs and sashes are often required and may be rented at temple entrances. Shoulders should be covered, and menstruating visitors may be asked not to enter certain inner sanctums per local custom.',
      },
      {
        question: 'When is Nyepi (Day of Silence)?',
        answer:
          'Nyepi closes the island for 24 hours of quiet, including limited airport operations. Check the Balinese Saka calendar when planning March or early-April trips.',
      },
    ],
    seo: {
      title: 'Bali & Indonesia Highlights | VihaaraYatra Tours',
      description:
        'Ubud, Uluwatu, Nusa Penida, and Bali’s cultural landscape - plan an Indonesia escape with practical traveller notes.',
    },
    accentColor: '#134e4a',
  },
  {
    slug: 'sri-lanka',
    name: 'Sri Lanka',
    tagline: 'Tea hills, fort towns, and Indian Ocean light',
    shortDescription:
      'This teardrop island pairs colonial coasts with hill-country trains, wildlife parks, and Buddhist heritage - a rewarding choice for scenic road trips.',
    longIntroduction:
      'Sri Lanka fits a surprising range into modest distances. Colombo introduces urban energy and seaside dining, while Kandy guards the Temple of the Tooth and lush peradeniya gardens. The train to Ella is among Asia’s great rail journeys, rolling past tea plantations and misty valleys. Galle’s Dutch fort overlooks the south coast, where beaches and stilt fishermen complete the picture. Travellers should allow buffer time on mountain roads and check weather patterns on both southwest and northeast coasts depending on season.',
    heroImage: unsplash('photo-1514282401047-d79a71a590e8'),
    cardImage: unsplash('photo-1506905925346-21bda4d32df4', 800),
    attractions: [
      {
        name: 'Colombo',
        description:
          'The commercial capital mixes colonial buildings, lakeside parks, and modern cafes - often the first or last stop on an island circuit.',
      },
      {
        name: 'Kandy',
        description:
          'The hill-country capital centres on the Temple of the Tooth Relic and cultural performances, with botanical gardens and lake walks nearby.',
      },
      {
        name: 'Ella',
        description:
          'A small town famed for Nine Arch Bridge views, Little Adam’s Peak hikes, and cool nights after scenic train rides from the central highlands.',
      },
      {
        name: 'Galle',
        description:
          'A UNESCO-listed fort city on the south coast, with ramparts, boutique shops, and sunsets over the cricket oval and lighthouse.',
      },
      {
        name: 'Scenic countryside',
        description:
          'Tea estates in Nuwara Eliya, waterfalls en route to Ella, and national parks such as Yala or Udawalawe appeal to nature lovers - always follow park rules and licensed guides.',
      },
    ],
    travelInspiration:
      'Picture steam rising from a cup of Ceylon tea above cloud-filled valleys, then an afternoon within Galle’s stone walls as monsoon light softens the ocean. Sri Lanka is a journey of vistas that change every few hours.',
    faqs: [
      {
        question: 'Is the Kandy to Ella train worth booking in advance?',
        answer:
          'Reserved seats in observation or first class can sell out in peak season. Many travellers board unreserved second class for an authentic experience - arrive early and secure a window if photography matters.',
      },
      {
        question: 'What is the typical driving side and road etiquette?',
        answer:
          'Sri Lanka drives on the left. Mountain roads are winding; plan daylight hours for transfers and expect occasional cattle or buses on narrow stretches.',
      },
      {
        question: 'Are there cultural norms at Buddhist sites?',
        answer:
          'Remove shoes and hats, dress modestly, and avoid turning your back close to Buddha statues for photographs. Ask permission before photographing monks.',
      },
      {
        question: 'When is the best beach weather?',
        answer:
          'The southwest coast (including Galle) is drier roughly from December to March, while the east coast favours April to September. Monsoon patterns shift annually - check forecasts for your route.',
      },
    ],
    seo: {
      title: 'Sri Lanka Scenic Travel | Colombo, Kandy, Ella & Galle',
      description:
        'Hill-country trains, heritage forts, and coastal beauty - discover Sri Lanka destination highlights.',
    },
    accentColor: '#115e59',
  },
  {
    slug: 'hong-kong',
    name: 'Hong Kong',
    tagline: 'Harbour skylines, peaks, and neighbourhood character',
    shortDescription:
      'Hong Kong compresses vertical architecture, harbour vistas, dim sum traditions, and island escapes into one of Asia’s most dynamic city experiences.',
    longIntroduction:
      'Hong Kong rewards walkers and food lovers in equal measure. Victoria Harbour frames the nightly Symphony of Lights, while the Peak Tram lifts visitors above skyscrapers for classic panoramas. Families often balance urban days with Disneyland or outlying islands such as Lamma and Cheung Chau. Districts like Mong Kok, Sham Shui Po, and Central each tell a different story of heritage, finance, and street life. Octopus cards simplify MTR and ferry hops, making multi-day exploration straightforward.',
    heroImage: unsplash('photo-1508804185872-d7badad00f7d'),
    cardImage: unsplash('photo-1537953773345-d172ccf13cf1', 800),
    attractions: [
      {
        name: 'Victoria Harbour',
        description:
          'The waterfront heart of the city, best viewed from the Tsim Sha Tsui promenade, Star Ferry crossings, or harbour cruises at dusk.',
      },
      {
        name: 'Victoria Peak',
        description:
          'The Peak offers the quintessential Hong Kong viewpoint. Combine the historic tram with skyline walks along Lugard Road on clear days.',
      },
      {
        name: 'Hong Kong Disneyland',
        description:
          'Located on Lantau Island, the park adds Disney magic to a regional trip - especially appealing for families with younger children.',
      },
      {
        name: 'Cultural districts',
        description:
          'Explore Sheung Wan’s dried seafood streets, Tai Kwun’s heritage compound, and Wong Tai Sin Temple for a cross-section of living traditions.',
      },
    ],
    travelInspiration:
      'Imagine neon reflecting on harbour water, then silence on a peak path above the clouds. Hong Kong is contrast by design - cha chaan teng breakfasts followed by avant-garde galleries.',
    faqs: [
      {
        question: 'Do I need a visa to enter Hong Kong?',
        answer:
          'Entry rules depend on passport type and purpose of visit. Many nationalities enjoy visa-free short stays, but requirements differ from mainland China. Confirm with the Hong Kong Immigration Department before booking.',
      },
      {
        question: 'Is Hong Kong expensive for dining?',
        answer:
          'You can eat well at modest dim sum halls and dai pai dong stalls as well as at fine-dining venues. Lunch sets often provide better value than dinner in central districts.',
      },
      {
        question: 'What is the best way to pay?',
        answer:
          'Octopus cards cover transport and many shops; contactless cards and mobile wallets are widely accepted. Some older markets still prefer cash.',
      },
      {
        question: 'When is typhoon season?',
        answer:
          'Typhoons are most likely from May to November. Monitor Hong Kong Observatory alerts; attractions and transport may pause briefly during higher signal numbers.',
      },
    ],
    seo: {
      title: 'Hong Kong City & Harbour Guide | VihaaraYatra',
      description:
        'Victoria Harbour, the Peak, Disneyland, and cultural neighbourhoods - plan your Hong Kong visit.',
    },
    accentColor: '#1e40af',
  },
  {
    slug: 'vietnam',
    name: 'Vietnam',
    tagline: 'Old quarters, karst bays, and central coast charm',
    shortDescription:
      'From Hanoi’s lakes and street food to Ha Long’s limestone seascapes and the lantern glow of Hoi An, Vietnam blends history with coastal beauty.',
    longIntroduction:
      'Vietnam stretches longitudinally, inviting north-to-south routes or focused regional trips. Hanoi’s Old Quarter hums with scooters, pho stalls, and French-colonial facades. Overnight cruises on Ha Long or Lan Ha Bay reveal karst islands at sunrise. Further south, Da Nang bridges beach resorts with easy access to Ba Na Hills, while Hoi An preserves a walkable heritage town perfect for evening lantern festivals. Visa policies and domestic flights should be confirmed early, especially during Tet (Lunar New Year) when transport books up.',
    heroImage: unsplash('photo-1528127269322-539801943592'),
    cardImage: unsplash('photo-1518684079-3c830dcef090', 800),
    attractions: [
      {
        name: 'Hanoi',
        description:
          'The capital balances Hoan Kiem Lake serenity with the bustle of the Old Quarter and cultural sites such as the Temple of Literature.',
      },
      {
        name: 'Ha Long Bay',
        description:
          'Thousands of limestone islets rise from emerald water; overnight boats let travellers kayak, swim, and watch mist roll between peaks.',
      },
      {
        name: 'Da Nang',
        description:
          'A coastal hub with wide beaches, the Dragon Bridge, and day trips to Marble Mountains or the Golden Bridge at Ba Na Hills.',
      },
      {
        name: 'Hoi An',
        description:
          'A UNESCO-listed ancient town where yellow walls, tailor shops, and monthly lantern nights create a romantic central coast highlight.',
      },
    ],
    travelInspiration:
      'Picture sipping egg coffee beside a Hanoi lake, then waking on a bay where silence is broken only by oars against limestone. Vietnam rewards travellers who embrace both motorbike rhythm and slow waterfront evenings.',
    faqs: [
      {
        question: 'Should I book Ha Long Bay cruises in advance?',
        answer:
          'Reputable operators differ in route, cabin standard, and environmental practices. Booking ahead in peak season secures better vessels; check pickup points from Hanoi or Haiphong.',
      },
      {
        question: 'Is Hoi An crowded?',
        answer:
          'The ancient town is pedestrian-friendly but busy on weekends and lantern festival dates. Stay nearby to enjoy mornings before day-trip coaches arrive.',
      },
      {
        question: 'What plug type and voltage does Vietnam use?',
        answer:
          'Many outlets accept types A, C, and F at around 220V. A universal adapter is handy when moving between older guesthouses and new hotels.',
      },
      {
        question: 'How should I handle road crossings in cities?',
        answer:
          'Traffic in Hanoi and Ho Chi Minh City is dense. Locals often cross steadily at a predictable pace so scooters can flow around them - observe before stepping in, or use pedestrian bridges where available.',
      },
    ],
    seo: {
      title: 'Vietnam Travel: Hanoi, Ha Long Bay, Da Nang & Hoi An',
      description:
        'Northern heritage, karst bays, and lantern-lit towns - Vietnam destination inspiration for your next trip.',
    },
    accentColor: '#0e7490',
  },
  {
    slug: 'cambodia',
    name: 'Cambodia',
    tagline: 'Angkor’s temples and the rhythm of the Mekong',
    shortDescription:
      'Cambodia centres on the Angkor Archaeological Park near Siem Reap, complemented by Phnom Penh’s museums and riverfront life.',
    longIntroduction:
      'Cambodia’s story is told in sandstone carvings and modern city revival. Siem Reap serves as the gateway to Angkor Wat and surrounding Khmer temples where sunrise silhouettes draw photographers from around the world. Beyond temples, floating villages, craft markets, and circus arts add depth to a Siem Reap stay. Phnom Penh, on the Mekong and Tonlé Sap confluence, offers royal palaces and sobering historical sites that provide context for the country’s resilience. Dress modestly at religious monuments and hire licensed guides to enrich your understanding of symbolism and restoration work.',
    heroImage: unsplash('photo-1559592413-7cec4d0cae2b'),
    cardImage: unsplash('photo-1501785888041-af3ef285b470', 800),
    attractions: [
      {
        name: 'Angkor Wat',
        description:
          'The largest religious monument on Earth, Angkor Wat’s bas-reliefs and lotus-shaped towers are best explored with time, hydration, and respectful attire.',
      },
      {
        name: 'Siem Reap',
        description:
          'A lively town balancing night markets, Apsara dance dinners, and day trips to outlying temples such as Ta Prohm and Banteay Srei.',
      },
      {
        name: 'Phnom Penh',
        description:
          'The capital features the Royal Palace, Silver Pagoda, and museums that document Cambodia’s twentieth-century history alongside a reviving riverfront cafe scene.',
      },
    ],
    travelInspiration:
      'Envision lotus pools mirroring five towers at dawn, then an evening tuk-tuk ride through Siem Reap’s lantern-lit alleys. Cambodia leaves visitors humbled by artistry and warmed by hospitality.',
    faqs: [
      {
        question: 'How many days do I need for Angkor?',
        answer:
          'Many travellers spend three days exploring major temples and rest breaks. Multi-day park passes offer better value; start early to avoid heat and crowds at Angkor Wat.',
      },
      {
        question: 'What is the Angkor pass and where do I buy it?',
        answer:
          'Official passes are sold at the APSARA ticket counter with photo ID. Pass lengths typically include one, three, and seven days - only buy from authorised outlets.',
      },
      {
        question: 'Is tap water safe in Cambodia?',
        answer:
          'Stick to sealed bottled water and avoid ice from unknown sources in rural areas. Reputable hotels and restaurants in tourist centres generally follow safe preparation practices.',
      },
      {
        question: 'What currency should I carry?',
        answer:
          'US dollars are widely used alongside the Cambodian riel for change. Keep small notes for temple donations, tuk-tuks, and market purchases.',
      },
    ],
    seo: {
      title: 'Cambodia & Angkor Wat Travel Guide | VihaaraYatra',
      description:
        'Siem Reap, Angkor Wat, and Phnom Penh - essential Cambodia inspiration for temple explorers.',
    },
    accentColor: '#164e63',
  },
];

export const destinationBySlug: Record<DestinationSlug, Destination> = destinations.reduce(
  (acc, dest) => {
    acc[dest.slug] = dest;
    return acc;
  },
  {} as Record<DestinationSlug, Destination>,
);

export default destinations;