import aswin from '../../assets/candidates/aswin.webp';
import ajex from '../../assets/candidates/ajex.webp';
import navaneeth from '../../assets/candidates/navaneeth.webp';
import evntxProject from '../../assets/projects/Evntx.png';
import elevenJerseryProject from '../../assets/projects/11Jersey.shop.jpeg';
import grolanceProject from '../../assets/projects/grolance.png';

export const PROJECTS = [
  {
    tag: "Go / React",
    title: "EVNTX",
    meta: "Event Management Platform ",
    desc: "A scalable, multi-role event management platform for discovering events, booking tickets, managing wallets, and enabling organizers and admins to manage events, payments, analytics, and platform operations.",
    author: "Aswin Sreeraj",
    authorImg: aswin,
    img: evntxProject,
    githubUrl: "https://github.com/aswinsreeraj/evntx",
  },
  {
    tag: "MERN",
    title: "11Jersey.shop",
    meta: "E-Commerce Platform",
    desc: "A full-stack football jersey e-commerce platform designed for seamless online shopping, featuring an AI-powered support experience, real-time customer assistance, and reliable inventory management for high-concurrency orders.",
    author: "Ajex Joshy",
    authorImg: ajex,
    img: elevenJerseryProject,
    githubUrl: "https://github.com/Ajex-Joshy/11jersery.com",
  },
  {
    tag: "Django / React",
    title: "Grolance",
    meta: "Freelancing Platform",
    desc: "A full-stack freelancing platform connecting clients with independent professionals, featuring escrow-based payments, real-time chat, contract management, structured dispute resolution, and role-based administration.",
    author: "Navaneeth Sankar",
    authorImg: navaneeth,
    img: grolanceProject,
    githubUrl: "https://github.com/navaneethsankar07/Grolance",
  },
];
