export type GalleryCategory =
  | 'singapore'
  | 'malaysia'
  | 'thailand'
  | 'indonesia'
  | 'sri-lanka'
  | 'hong-kong'
  | 'vietnam'
  | 'cambodia'
  | 'experiences';

export interface GalleryImage {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  photographer: string;
  attributionUrl: string;
  licence: 'Unsplash License';
}

const full = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=80`;
const thumb = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

function entry(
  id: string,
  photoId: string,
  alt: string,
  caption: string,
  category: GalleryCategory,
  photographer: string,
): GalleryImage {
  return {
    id,
    src: full(photoId),
    thumb: thumb(photoId),
    alt,
    caption,
    category,
    photographer,
    attributionUrl: `https://unsplash.com/photos/${photoId.replace('photo-', '')}`,
    licence: 'Unsplash License',
  };
}

/** All photo IDs below were HTTP-validated against images.unsplash.com. */
export const galleryImages: GalleryImage[] = [
  entry(
    'sg-marina-01',
    'photo-1525625293386-3f8f99389edd',
    'Marina Bay Sands and Singapore skyline',
    'Evening light on Marina Bay - Singapore’s modern waterfront.',
    'singapore',
    'Unsplash',
  ),
  entry(
    'sg-city-02',
    'photo-1600664356348-10686526af4f',
    'Singapore cityscape with modern towers',
    'A polished skyline that rewards unhurried evening walks.',
    'singapore',
    'Unsplash',
  ),
  entry(
    'sg-gardens-03',
    'photo-1574227492706-f65b24c3688a',
    'Lush tropical greenery and pathways',
    'Garden city moments between iconic attractions.',
    'singapore',
    'Unsplash',
  ),
  entry(
    'my-skyline-01',
    'photo-1480714378408-67cf0d13bc1b',
    'Modern Asian skyline reflecting on water',
    'Urban energy that sets the tone for a Kuala Lumpur city break.',
    'malaysia',
    'Unsplash',
  ),
  entry(
    'my-city-02',
    'photo-1449824913935-59a10b8d2000',
    'Dense city towers under a blue sky',
    'Layered cityscapes and easy day-trip connections across Malaysia.',
    'malaysia',
    'Unsplash',
  ),
  entry(
    'my-beach-03',
    'photo-1507525428034-b723cf961d3e',
    'Turquoise tropical beach and shoreline',
    'Island calm - Malaysia’s coastal escapes beyond the capital.',
    'malaysia',
    'Unsplash',
  ),
  entry(
    'th-bangkok-01',
    'photo-1508009603885-50cf7c579365',
    'Temple architecture in Bangkok',
    'Golden temples define Bangkok’s cultural skyline.',
    'thailand',
    'Unsplash',
  ),
  entry(
    'th-boats-02',
    'photo-1528181304800-259b08848526',
    'Thai long-tail boats on clear water',
    'Long-tail boats ready for Andaman island hops.',
    'thailand',
    'Unsplash',
  ),
  entry(
    'th-coast-03',
    'photo-1506929562872-bb421503ef21',
    'Tropical coastline with turquoise sea',
    'Coastal downtime after Bangkok’s temples and markets.',
    'thailand',
    'Unsplash',
  ),
  entry(
    'id-bali-01',
    'photo-1537996194471-e657df975ab4',
    'Balinese temple gates and tropical setting',
    'Temple gateways that frame Bali’s spiritual landscape.',
    'indonesia',
    'Unsplash',
  ),
  entry(
    'id-rice-02',
    'photo-1555400038-63f5ba517a47',
    'Rice terraces in Bali',
    'Terraced greens around Ubud invite slow morning walks.',
    'indonesia',
    'Unsplash',
  ),
  entry(
    'id-coast-03',
    'photo-1537953773345-d172ccf13cf1',
    'Cliffside ocean view in Bali',
    'Dramatic coastal cliffs near Uluwatu and the Bukit peninsula.',
    'indonesia',
    'Unsplash',
  ),
  entry(
    'lk-coast-01',
    'photo-1514282401047-d79a71a590e8',
    'Palm-lined tropical beach',
    'Palm-lined shores that echo Sri Lanka’s southern coasts.',
    'sri-lanka',
    'Unsplash',
  ),
  entry(
    'lk-scenic-02',
    'photo-1501785888041-af3ef285b470',
    'Mountain lake landscape',
    'Hill-country atmosphere reminiscent of Ella’s scenic routes.',
    'sri-lanka',
    'Unsplash',
  ),
  entry(
    'lk-nature-03',
    'photo-1506905925346-21bda4d32df4',
    'Mountain peaks above clouds',
    'Elevated viewpoints that reward travellers crossing the island.',
    'sri-lanka',
    'Unsplash',
  ),
  entry(
    'hk-harbour-01',
    'photo-1508804185872-d7badad00f7d',
    'Hong Kong style harbour skyline at dusk',
    'Harbour lights and vertical city living.',
    'hong-kong',
    'Unsplash',
  ),
  entry(
    'hk-city-02',
    'photo-1540959733332-eab4deabeeaf',
    'Dense neon city streets at night',
    'Night markets and glowing streets after Victoria Peak views.',
    'hong-kong',
    'Unsplash',
  ),
  entry(
    'hk-urban-03',
    'photo-1480796927426-f609979314bd',
    'Urban neon alleyway',
    'Compact cultural districts packed into walkable blocks.',
    'hong-kong',
    'Unsplash',
  ),
  entry(
    'vn-halong-01',
    'photo-1528127269322-539801943592',
    'Limestone karsts rising from the sea',
    'Ha Long Bay’s limestone pillars from the water.',
    'vietnam',
    'Unsplash',
  ),
  entry(
    'vn-street-02',
    'photo-1555921015-5532091f6026',
    'Vietnamese street food and scooters',
    'Street-level energy from Hanoi to coastal cities.',
    'vietnam',
    'Unsplash',
  ),
  entry(
    'vn-lantern-03',
    'photo-1590559899731-a382839e5549',
    'Lantern-lit old town street',
    'Lantern glow that defines evenings in Hoi An.',
    'vietnam',
    'Unsplash',
  ),
  entry(
    'kh-angkor-01',
    'photo-1559592413-7cec4d0cae2b',
    'Angkor Wat temple reflection',
    'Angkor Wat at first light near Siem Reap.',
    'cambodia',
    'Unsplash',
  ),
  entry(
    'kh-temple-02',
    'photo-1587595431973-160d0d94add1',
    'Ancient Khmer temple corridor',
    'Stone corridors and tree roots across the Angkor complex.',
    'cambodia',
    'Unsplash',
  ),
  entry(
    'kh-ruins-03',
    'photo-1578662996442-48f60103fc96',
    'Temple towers among jungle trees',
    'Temple towers rising through the jungle canopy.',
    'cambodia',
    'Unsplash',
  ),
  entry(
    'ex-road-01',
    'photo-1469854523086-cc02fe5d8800',
    'Travellers on an open scenic road',
    'The open-road feeling of a well-planned group journey.',
    'experiences',
    'Unsplash',
  ),
  entry(
    'ex-lake-02',
    'photo-1476514525535-07fb3b4ae5f1',
    'Canoe on a calm alpine lake',
    'Quiet water mornings between busy sightseeing days.',
    'experiences',
    'Unsplash',
  ),
  entry(
    'ex-coast-03',
    'photo-1516483638261-f4dbaf036963',
    'Coastal cliff town overlooking the sea',
    'Clifftop viewpoints that make itineraries memorable.',
    'experiences',
    'Unsplash',
  ),
  entry(
    'ex-passport-04',
    'photo-1439066615861-d1af74d74000',
    'Calm blue lake surrounded by forest',
    'Pause points that keep family travel feeling restorative.',
    'experiences',
    'Unsplash',
  ),
];

export const galleryByCategory = (category: GalleryCategory): GalleryImage[] =>
  galleryImages.filter((img) => img.category === category);

export default galleryImages;
