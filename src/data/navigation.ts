export interface NavLink {
  label: string;
  path: string;
  description?: string;
}

export const mainNavigation: NavLink[] = [
  { label: 'Home', path: '/', description: 'Welcome to VihaaraYatra International Tours' },
  { label: 'About', path: '/about', description: 'Our story, values, and team' },
  { label: 'Destinations', path: '/destinations', description: 'Places we help you explore' },
  { label: 'Packages', path: '/packages', description: 'Sample programmes and starting prices' },
  { label: 'Group Tours', path: '/group-tours', description: 'Travel together with a minimum group size' },
  { label: 'Gallery', path: '/gallery', description: 'Moments from across our destinations' },
  { label: 'Travel Guides', path: '/travel-guides', description: 'Practical tips and destination inspiration' },
  { label: 'Contact', path: '/contact', description: 'Call, WhatsApp, or visit our Singapore office' },
];

export const footerQuickLinks: NavLink[] = mainNavigation.filter(
  (link) => !['Home', 'Contact'].includes(link.label),
);

export default mainNavigation;