import { ALUMNI_MEMBERS, ALUMNI_STATS } from './alumniDatas';

export const PARTNER_LOGOS = [
  {
    name: 'Skai Lama',
    src: '/skai-lama.svg',
    type: 'dark',
  },
  {
    name: 'Golgix',
    src: '/golgix.png',
    type: 'white',
  },
  {
    name: 'KubeNine',
    src: '/kubenine.png',
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
