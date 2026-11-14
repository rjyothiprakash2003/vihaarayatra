export interface BusinessHours {
  weekdays: string;
  weekends: string;
}

export interface PhoneContact {
  label: string;
  number: string;
  display: string;
}

export interface WhatsAppContact {
  primary: string;
  primaryDisplay: string;
  primaryWaMe: string;
  secondary?: {
    label: string;
    display: string;
  };
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface SiteInfo {
  name: string;
  established: number;
  base: string;
  address: {
    line: string;
    city: string;
    postalCode: string;
    country: string;
    full: string;
  };
  phones: PhoneContact[];
  whatsapp: WhatsAppContact;
  hours: BusinessHours;
  languages: string[];
  destinations: { slug: string; name: string }[];
  website: string;
  stbLicenceNote: string;
  aboutContactPerson: string;
  coreValues: CoreValue[];
  groupTours: {
    minimumPax: number;
    note: string;
  };
  tagline: string;
  aboutSummary: string;
}

export const siteInfo: SiteInfo = {
  name: 'VihaaraYatra International Tours',
  established: 2016,
  base: 'Singapore',
  address: {
    line: '359 Tampines Street 34',
    city: 'Singapore',
    postalCode: '520359',
    country: 'Singapore',
    full: '359 Tampines Street 34, Singapore 520359, Singapore',
  },
  phones: [
    {
      label: 'Singapore',
      number: '+6588240027',
      display: '+65 8824 0027',
    },
    {
      label: 'India',
      number: '+919491946014',
      display: '+91 94919 46014',
    },
  ],
  whatsapp: {
    primary: '919491946014',
    primaryDisplay: '+91 94919 46014',
    primaryWaMe: 'https://wa.me/919491946014',
    secondary: {
      label: 'Singapore',
      display: '+65 8320 7990',
    },
  },
  hours: {
    weekdays: 'Mon-Fri 09:00-21:00',
    weekends: 'Sat-Sun 08:00-21:00',
  },
  languages: ['Telugu', 'English', 'Tamil'],
  destinations: [
    { slug: 'singapore', name: 'Singapore' },
    { slug: 'malaysia', name: 'Malaysia' },
    { slug: 'thailand', name: 'Thailand' },
    { slug: 'indonesia', name: 'Indonesia' },
    { slug: 'sri-lanka', name: 'Sri Lanka' },
    { slug: 'hong-kong', name: 'Hong Kong' },
    { slug: 'vietnam', name: 'Vietnam' },
    { slug: 'cambodia', name: 'Cambodia' },
  ],
  website: 'https://vihaarayatra.com',
  stbLicenceNote:
    'The company website has previously listed Singapore Tourism Board (STB) travel agent licence #2989. Licence numbers and status can change over time - please confirm current registration with STB or the operator before booking.',
  aboutContactPerson:
    'For enquiries and personalised planning, reach out via our contact channels. Mr Narasimha is listed on our existing website as a key point of contact for travellers.',
  coreValues: [
    {
      title: 'Quality Hospitality',
      description:
        'We aim to make every journey feel welcoming, well organised, and comfortable from first enquiry to return home.',
    },
    {
      title: 'Care',
      description:
        'Travel plans involve real people and real expectations - we listen carefully and respond with attentiveness.',
    },
    {
      title: 'Mutual Respect',
      description:
        'We work with guests, partners, and local communities in a spirit of courtesy and understanding.',
    },
    {
      title: 'Honesty',
      description:
        'Clear communication about pricing, timing, and what is included helps everyone plan with confidence.',
    },
    {
      title: 'Integrity',
      description:
        'We stand by our commitments and handle bookings and arrangements responsibly.',
    },
    {
      title: 'Trust and Values',
      description:
        'Long-term relationships with families and groups are built on reliability and shared values.',
    },
  ],
  groupTours: {
    minimumPax: 6,
    note: 'Group departures are typically arranged for parties of six travellers or more. Smaller groups may still enquire for custom/private arrangements.',
  },
  tagline: 'International tours with a personal touch - from Singapore to Southeast Asia and beyond.',
  aboutSummary:
    'Founded in 2016 and based in Singapore, VihaaraYatra International Tours helps travellers from India, Singapore, and the wider region explore curated destinations across Southeast Asia. With guidance available in Telugu, English, and Tamil, we specialise in family-friendly itineraries, combined Singapore-Malaysia routes, and group travel tailored to your pace.',
};

export default siteInfo;