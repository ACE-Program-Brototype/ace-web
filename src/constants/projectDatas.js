import aswin from '../../assets/candidates/aswin.webp';
import ajex from '../../assets/candidates/ajex.webp';
import navaneeth from '../../assets/candidates/navaneeth.webp';
import fizan from '../../assets/alumnis/fizan.jpg';
import abhiram from '../../assets/alumnis/abhiram.jpg';
import kenneth from '../../assets/candidates/kenneth.jpeg';
import anandhu from '../../assets/alumnis/anandhu.jpg';
import venkitesh from '../../assets/candidates/venkitesh.jpg';
import evntxProject from '../../assets/projects/Evntx.png';
import elevenJerseryProject from '../../assets/projects/11Jersey.shop.jpeg';
import grolanceProject from '../../assets/projects/grolance.png';
import togatherProject from '../../assets/projects/togather.png';
import nexaroProject from '../../assets/projects/nexaro.png';

export const PROJECTS = [
  {
    tag: "Go / React",
    title: "EVNTX",
    meta: "Event Management Platform",
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
  {
    tag: "Microservices / K8s",
    title: "ToGather",
    meta: "Experience & Community Platform",
    desc: "A cloud-native, microservices-driven platform for discovering and booking curated community experiences. Orchestrated with Kubernetes and Skaffold, featuring GraphQL APIs, real-time chat, and ML ranking pipelines.",
    author: "Fizan, Abhiram S, Kenneth Roger Nelson, Anandhu P Raj",
    authorImg: fizan,
    authors: [
      { name: "Fizan", img: fizan },
      { name: "Abhiram S", img: abhiram },
      { name: "Kenneth Roger Nelson", img: kenneth },
      { name: "Anandhu P Raj", img: anandhu },
    ],
    img: togatherProject,
    githubUrl: "https://github.com/CrossroadsAcademy/togather-infra",
  },
  {
    tag: "MERN / Socket.io",
    title: "Nexaro",
    meta: "On-Demand Task Marketplace",
    desc: "A dynamic on-demand task marketplace connecting job posters with skilled workers. Features real-time bidding, geohashed location tracking with Leaflet, Socket.io messaging, and PayPal transactions.",
    author: "Venkitesh NS",
    authorImg: venkitesh,
    img: nexaroProject,
    imgFit: "contain",
    imgBg: "bg-[#f5fbf8]",
    githubUrl: "https://github.com/venkiteshns/Nexaro",
  },
];

