// ACE Events Data
export const SPOTLIGHT_EVENT = {
    id: "ace-public-speaking-community-launch",
    title: "ACE Public Speaking and Community Launch Event",
    subtitle: "Public Speaking, Community Introduction & Launch",
    tagline: "Discover what ACE is, explore the opportunities, meet our members, and be a part of something bigger.",
    slogan: "More than just a program. It's your next step.",
    date: "Friday, 18 September 2026",
    time: "3:00 PM – 4:30 PM",
    venue: "Brototype Kochi Hub",
    category: "Community Launch & Keynote",
    isSpotlight: true,
    isVisible: true,
    poster: "/events/ace-launch-poster.jpg",
    carouselImages: ["/events/ace-launch-poster.jpg"],
    slug: "ace-public-speaking-community-launch",
    objective: "To introduce ACE and its benefits, highlight ACE results and member experiences, launch the ACE website and ACE Forge, and create an engaging and professional experience for students.",
    description: "Join us for the premier ACE Public Speaking and Community Introduction Launch Event. Discover how ACE is reshaping tech careers through rigor, public speaking, mentorship, and collective engineering excellence.",
    orchestratedBy: "ACE Members",
    coordinators: {
        aceCoordinator: {
            name: "Shahid Noushad",
            role: "R/D Associate & ACE Coordinator",
        },
        anchors: [
            { name: "Athira Suresh", role: "Anchor / ACE Member" },
            { name: "Venkitesh", role: "ACE Community Manager / Anchor" },
        ],
        aceForgeLead: {
            name: "Ashwin Sreeraj",
            role: "Assistant Manager / ACE Forge Lead",
        },
        programCoordinator: {
            name: "Al Ameen",
            role: "Program Coordinator",
        },
    },
    team: [
        { name: "Venkitesh", role: "ACE Community Manager / Anchor" },
        { name: "Aswin Sreeraj", role: "Assistant Manager / ACE Forge Lead" },
        { name: "Al Ameen", role: "Program Coordinator" },
        { name: "Athira Suresh", role: "ACE Member / Anchor" },
        { name: "Navaneeth", role: "ACE Member" },
        { name: "Ajex", role: "ACE Member" },
        { name: "Sreehari", role: "ACE Member" },
        { name: "Fathima Shifana", role: "ACE Member" },
    ],
    highlights: [
        {
            icon: "record_voice_over",
            title: "ACE Public Speaking",
            desc: "Build Confidence. Communicate with Impact.",
        },
        {
            icon: "trending_up",
            title: "ACE Results",
            desc: "Students, companies, packages & more",
        },
        {
            icon: "groups",
            title: "Member Journeys",
            desc: "Real stories. Real growth.",
        },
        {
            icon: "language",
            title: "ACE Website Launch",
            desc: "Explore, enquire, take the first step",
        },
        {
            icon: "rocket_launch",
            title: "ACE Forge Launch",
            desc: "Guidance & follow-up for interested students",
        },
        {
            icon: "forum",
            title: "Q&A Session",
            desc: "Your questions, our answers",
        },
        {
            icon: "military_tech",
            title: "Cash Prize Recognition",
            desc: "Be engaged. Win a prize.",
        },
    ],
    agenda: [
        {
            time: "3:00 PM – 3:05 PM",
            session: "Welcome & Ice Breaker",
            activity: "Welcome, introductions and a humorous/engaging question.",
        },
        {
            time: "3:05 PM – 3:15 PM",
            session: "ACE Introduction",
            activity: "Introduce ACE, what we do, benefits and audience interaction.",
        },
        {
            time: "3:15 PM – 3:25 PM",
            session: "ACE Results",
            activity: "Present students, companies, packages and other key benefits/results.",
        },
        {
            time: "3:25 PM – 3:40 PM",
            session: "Member Journeys",
            activity: "Current ACE members share their journey and benefits.",
        },
        {
            time: "3:40 PM – 3:50 PM",
            session: "ACE Website Launch",
            activity: "Launch and introduce the website; interested students can enquire through it.",
        },
        {
            time: "3:50 PM – 4:00 PM",
            session: "ACE Forge Launch",
            activity: "Introduce ACE Forge as guidance and follow-up for students who enquire to join ACE.",
        },
        {
            time: "4:00 PM – 4:15 PM",
            session: "Question & Answer",
            activity: "Open Q&A session with students.",
        },
        {
            time: "4:15 PM – 4:20 PM",
            session: "Cash Prize",
            activity: "Recognise an actively engaged student; prize presented by Shahid Noushad.",
        },
        {
            time: "4:20 PM – 4:25 PM",
            session: "Winding Up",
            activity: "Closing remarks, appreciation and final call to action.",
        },
        {
            time: "4:25 PM – 4:30 PM",
            session: "Buffer",
            activity: "Reserved for transitions or minor schedule overruns.",
        },
    ],
    audienceEngagement: "An engaging question will be included after each major segment to encourage participation and maintain audience involvement throughout the program.",
    cashPrize: {
        title: "Cash Prize Recognition",
        desc: "The cash prize will be awarded based on the student's response and engagement with the questions asked during the program. As the first ACE program to include a cash-prize recognition, this adds a distinctive, elegant, and professional touch to the overall event experience.",
        presentedBy: "Shahid Noushad",
    },
    finalCallToAction: "Students interested in ACE will be directed to the ACE website to learn more and submit an enquiry. ACE Forge will provide the subsequent guidance and follow-up.",
};

// Events array: Spotlight event + 1 placeholder template for future events (hidden from visitors)
export const EVENT_DATA = [
    SPOTLIGHT_EVENT,
    {
        id: "future-event-template",
        title: "Future Event Template",
        date: "TBA",
        time: "TBA",
        venue: "ACE Learning Hub",
        description: "Placeholder template for upcoming workshops and tech talks. Retained for future event scheduling.",
        carouselImages: ["/events/ace-launch-poster.jpg"],
        image: "/events/ace-launch-poster.jpg",
        slug: "future-event-template",
        category: "Workshop",
        isSpotlight: false,
        isVisible: false, // Keep invisible to visitors
        agenda: [
            { time: "TBA", topic: "Agenda details will be announced soon" },
        ],
        handler: {
            name: "ACE Mentor",
            role: "Technical Lead",
            image: "https://placehold.co/150x150",
        },
    },
];