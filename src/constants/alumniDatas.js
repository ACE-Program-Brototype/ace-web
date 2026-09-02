import faheem from '../../assets/alumnis/faheem.jpeg';
import faizalR from '../../assets/alumnis/faizalR.jpeg';
import abhiram from '../../assets/alumnis/abhiram.jpg';
import afzal from '../../assets/alumnis/afzal.jpg';
import amal from '../../assets/alumnis/amal.jpg';
import anandhu from '../../assets/alumnis/anandhu.jpg';
import basith from '../../assets/alumnis/basith.jpg';
import fizan from '../../assets/alumnis/fizan.jpg';
import ijas from '../../assets/alumnis/ijas.jpg';
import shahan from '../../assets/alumnis/shahan.jpg';
import zameer from '../../assets/alumnis/zameer.jpg';

export const ALUMNI_MEMBERS = [
  // September 2026
  {
    id: 1,
    name: 'Faizal Raheem',
    role: 'Software Engineer',
    domain: 'MERN',
    company: 'Non-Disclosable',
    placedOn: 'September 2026',
    pkg: '30+ LPA',
    spotlight: true,
    quote: 'Secured a premier 30+ LPA role by mastering full-stack MERN architecture and building resilient high-throughput systems.',
    img: faizalR,
  },
  {
    id: 2,
    name: 'Zameer Ahammed',
    role: 'Software Engineer',
    domain: 'MERN',
    company: 'Non-Disclosable',
    placedOn: 'September 2026',
    pkg: '30+ LPA',
    spotlight: true,
    quote: 'Achieved a landmark 30+ LPA placement through rigorous mastery of scalable web infrastructure and software craft at ACE.',
    img: zameer,
  },
  // August 2026
  {
    id: 3,
    name: 'Abdul Basith',
    role: 'AI Engineer',
    companyRole: 'AI Engineer @ AccuMateAi',
    domain: 'MERN',
    company: 'AccuMateAi',
    placedOn: 'August 2026',
    pkg: 'Non-Disclosable',
    quote: 'The community aspect of ACE was unparalleled. Building complex side projects with peers prepared me perfectly for the fast pace of early-stage startups.',
    img: basith,
  },
  // June 2026
  {
    id: 4,
    name: 'Muhammed Shahan P P',
    role: 'Associate Engineer',
    domain: 'Data Science',
    company: 'Non-Disclosable',
    placedOn: 'June 2026',
    pkg: '25+ LPA',
    spotlight: true,
    quote: 'Stepped into an Associate Engineer role commanding 25+ LPA, driving machine learning models and intelligent data systems.',
    img: shahan,
  },
  // May 2026
  {
    id: 5,
    name: 'Afzal A',
    role: 'ML Engineer',
    companyRole: 'ML Engineer @ Golgix',
    domain: 'Data Science',
    company: 'Golgix',
    placedOn: 'May 2026',
    pkg: '8 LPA',
    quote: 'Working with real-world ML datasets and building end-to-end inference pipelines at ACE made the transition to industry seamless.',
    img: afzal,
  },
  {
    id: 6,
    name: 'Fizan Muhammed Faisal',
    role: 'Software Engineer',
    companyRole: 'Software Engineer @ Skai Lama',
    domain: 'MERN',
    company: 'Skai Lama',
    placedOn: 'May 2026',
    pkg: '8.5 LPA',
    quote: 'Building production architectures with intense peer code reviews helped me step into high-impact engineering from day one.',
    img: fizan,
  },
  {
    id: 7,
    name: 'Faheem Basheer',
    role: 'Software Engineer',
    companyRole: 'Software Engineer @ Skai Lama',
    domain: 'MERN',
    company: 'Skai Lama',
    placedOn: 'May 2026',
    pkg: '8.5 LPA',
    quote: 'The peer learning and engineering rigor at ACE set a benchmark that continues to guide my daily work.',
    img: faheem,
  },
  {
    id: 8,
    name: 'Ijas Ahammed',
    role: 'Full-stack Developer',
    companyRole: 'Full-stack Developer @ Kalpas Innovations',
    domain: 'MERN',
    company: 'Kalpas Innovations Pvt Ltd',
    placedOn: 'May 2026',
    pkg: '6 LPA',
    quote: 'The culture of building scalable web apps from ground up gave me the confidence to deliver production features effortlessly.',
    img: ijas,
  },
  {
    id: 9,
    name: 'Anandhu P Raj',
    role: 'ML Engineer',
    domain: 'AI/ML',
    company: 'Non-Disclosable',
    placedOn: 'May 2026',
    pkg: '9 LPA',
    quote: "ACE didn't just teach syntax; it taught us how to think like engineers. The transition to cloud AI environments felt completely natural.",
    img: anandhu,
  },
  // April 2026
  {
    id: 10,
    name: 'Amal Deep',
    role: 'DevOps Engineer',
    companyRole: 'DevOps Engineer @ KubeNine',
    domain: 'DevOps',
    company: 'KubeNine',
    placedOn: 'April 2026',
    pkg: '6 LPA',
    quote: 'The deep focus on cloud systems, containers, and deployment reliability at ACE gave me the exact skillset required in modern DevOps.',
    img: amal,
  },
  // March 2026
  {
    id: 11,
    name: 'Abhiram S Sajeev',
    role: 'Software Engineer',
    companyRole: 'Software Engineer @ Skai Lama',
    domain: 'MERN',
    company: 'Skai Lama',
    placedOn: 'March 2026',
    pkg: '9 LPA',
    quote: 'The rigorous architectural patterns taught at ACE became my foundation. When scaling distributed systems today, I still fall back on those core principles.',
    img: abhiram,
  },
];

export const SPOTLIGHT_ALUMNI = ALUMNI_MEMBERS.filter((a) => a.spotlight);

export const ALUMNI_STORIES = ALUMNI_MEMBERS.filter((a) => a.quote && !a.spotlight);

export const ALUMNI_STATS = [
  { value: '11+', label: 'Alumni Placed' },
  { value: '30+ LPA', label: 'Highest Package' },
  { value: '5+', label: 'Partner Companies' },
  { value: '13.45 LPA', label: 'Average Package' },
];
