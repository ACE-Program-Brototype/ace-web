import { ALUMNI_MEMBERS, ALUMNI_STATS } from './alumniDatas';

export const PARTNER_LOGOS = [
  {
    name: 'Skai Lama',
    src: 'https://cdn.prod.website-files.com/65b9cd8c16eb7681935c8d2c/689dc9b00b6d7e7b56e99847_Frame%20170.svg',
    type: 'dark',
  },
  {
    name: 'Golgix',
    src: 'https://cdn.prod.website-files.com/67cf078ee6e3ee8930aaf6cd/67cf3e3eb2864bf60d7163da_Golgix-Logo.png',
    type: 'white',
  },
  {
    name: 'KubeNine',
    src: 'https://www.kubenine.com/_next/static/media/kubenine-logo-white.0a44c4-x43_sp.png',
    type: 'white',
  },
  {
    name: 'Kalpas Innovations',
    src: '/kalpas.svg',
    type: 'dark',
  },
  {
    name: 'AccuMateAi',
    src: '/accumate.svg',
    type: 'dark',
  },
];

// Single source of truth: derived directly from ALUMNI_MEMBERS
export const PLACEMENTS = ALUMNI_MEMBERS;

// Single source of truth: shared stats
export const PLACEMENT_STATS = ALUMNI_STATS;
