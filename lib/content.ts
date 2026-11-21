import type { Count } from "@/components/CountUp";

// =============================================================================
// ALL site text and data lives here. Edit this file to update the website.
// Leave a URL as "" to hide that link everywhere.
// =============================================================================

export const person = {
  name: "Aksa Biju",
  firstName: "Aksa",
  lastName: "Biju",
  initial: "A.",
  role: "Banking & Insurance Professional",
  email: "aksabiju007@gmail.com",
  location: "Kochi, Kerala, India", // TODO confirm current location
  cvUrl: "", // add public/aksa-cv.pdf, then set this to "/aksa-cv.pdf"
  siteTagline: "Kochi, Kerala, India",
};

export type SocialName = "LinkedIn" | "GitHub";
export const socials: { name: SocialName; url: string }[] = [
  { name: "LinkedIn", url: "" }, // TODO add Aksa's LinkedIn URL
  { name: "GitHub", url: "" },
];
export const activeSocials = socials.filter((s) => s.url);

export const hero = {
  lines: ["BANKING\u00a0&", "INSURANCE"],
  ariaLabel: "Banking and Insurance",
  year: "©2026",
  focus: "/COMMERCE · FINANCIAL SERVICES · BUSINESS MANAGEMENT",
};

export const bio = {
  role: ["Banking & Insurance", "Professional."],
  current: {
    org: "[Current organisation]",
    title: "[Current role or what you are looking for]",
    place: "Kochi, Kerala",
  },
  // text segments: [plain, bold, plain, bold, plain]
  lead: [
    "Commerce graduate with ",
    "two years of experience",
    " across ",
    "HDFC Bank and Star Union Dai-ichi Life",
    " in Kochi. [Add one line about what you do best.]",
  ],
};

export const skills = [
  {
    id: "skills-banking",
    title: "Banking & Insurance",
    note: "Experience in financial services, sales and customer relationships.",
    items: [
      "Banking Products", "Life Insurance", "Customer Relationship Management",
      "Financial Services", "Sales Management", "Customer Communication",
    ],
  },
  {
    id: "skills-commerce",
    title: "Commerce & Accounting",
    note: "Accounting, auditing and financial markets.",
    items: [
      "Financial Accounting", "Corporate Accounting", "Cost Accounting",
      "Management Accounting", "Financial Markets", "Auditing & Assurance",
    ],
  },
  {
    id: "skills-tools",
    title: "Computer Applications & Tools",
    note: "Office, accounting, reporting and CRM tools.",
    items: ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "TallyPrime", "Power BI", "CRM Software"],
  },
];

// ---------- Projects ----------
export type FolderKind = "case-study" | "project";
export type Folder = {
  id: string;
  title: string;
  category: string;
  action: string;
  kind: FolderKind;
  image?: string;
  backLabel: string;
  frontLabel: string;
};

export const folders: Folder[] = [
  {
    id: "case-study", title: "[Highlight]", category: "[Category] · Case study",
    action: "Read case study", kind: "case-study",
    backLabel: "Case study overview", frontLabel: "Context, approach & result",
  },
  {
    id: "project-one", title: "[Project 1]", category: "[Short category]",
    action: "View project", kind: "project", image: "/project-1.png",
    backLabel: "Project overview", frontLabel: "Details",
  },
  {
    id: "project-two", title: "[Project 2]", category: "[Short category]",
    action: "View project", kind: "project", image: "/project-2.png",
    backLabel: "Project overview", frontLabel: "Details",
  },
  {
    id: "project-three", title: "[Project 3]", category: "[Short category]",
    action: "View project", kind: "project", image: "/project-3.png",
    backLabel: "Project overview", frontLabel: "Details",
  },
];

export const caseStudy = {
  id: "case-study",
  preview: { top: "[Organisation]", big: ["[Headline", "result.]"], bottom: "[Year] · Case study" },
  toolbar: "Case study",
  image: {
    src: "/case-study.png",
    width: 1536,
    height: 1024,
    alt: "Case study image placeholder",
    caption: "[Image caption]",
    sourceLabel: "[Image source]",
    sourceUrl: "#",
  },
  title: "[Case study title]",
  category: "[Organisation] · [Type of work]",
  summary: "[Two sentence summary of the work and why it mattered.]",
  facts: [
    ["Role", "[Your role]"],
    ["Period", "[MM/YYYY] – [MM/YYYY]"],
    ["Tools", "[Tools used]"],
    ["Team", "[Team size or setup]"],
    ["Result", "[Key result]"],
  ] as [string, string][],
  factCounts: {} as Record<string, Count>,
  note: "[Optional note, e.g. figures are illustrative.]",
  challenge: "[What problem or goal did you face?]",
  steps: [
    ["[Step 1]", "[What you did first.]"],
    ["[Step 2]", "[What you did next.]"],
    ["[Step 3]", "[How you followed through.]"],
    ["[Step 4]", "[How you checked the result.]"],
  ],
  impact: "[What changed because of your work.]",
  before: ["Before", "[Situation before]"],
  after: ["After", "[Situation after]"],
  estimate: "[Optional supporting detail.]",
};

export type Study = {
  id: string;
  title: string;
  category: string;
  summaryLabel: string;
  description: string;
  stack: string[];
  metric?: string;
  metricCount?: Count;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageBg: string;
  imageAlt: string;
  imageHref?: string;
  imageLinkLabel?: string;
  links: { label: string; href: string; icon: "source" | "demo" | "live" }[];
  details: string[];
};

export const eskf: Study & {
  diagram: {
    title: string; groupLabel: string;
    input: string; routerTitle: string; routerSub: string;
    a: { key: string; button: string; title: string; sub: string; explain: string };
    b: { key: string; button: string; title: string; sub: string; explain: string };
  };
} = {
  id: "project-one",
  title: "[Project 1]",
  category: "[Short category]",
  summaryLabel: "Project details",
  description: "[One or two sentences describing the project.]",
  stack: ["[Tool]", "[Tool]", "[Tool]"],
  metric: "[Key result]",
  image: "/project-1.png", imageWidth: 1600, imageHeight: 1000, imageBg: "#d1d2cf",
  imageAlt: "Project 1 image placeholder",
  links: [],
  details: ["[Detail about what you did.]", "[Detail about the outcome.]", "Period: [MM/YYYY] – [MM/YYYY]."],
  diagram: {
    title: "How it works",
    groupLabel: "Compare two options",
    input: "[Input]",
    routerTitle: "[Process]",
    routerSub: "[Short description]",
    a: { key: "a", button: "[Option A]", title: "[Option A]", sub: "[Short description]",
      explain: "[Explain option A.]" },
    b: { key: "b", button: "[Option B]", title: "[Option B]", sub: "[Short description]",
      explain: "[Explain option B.]" },
  },
};

export const studies: Study[] = [
  {
    id: "project-two",
    title: "[Project 2]",
    category: "[Short category]",
    summaryLabel: "Project details",
    description: "[One or two sentences describing the project.]",
    stack: ["[Tool]", "[Tool]", "[Tool]"],
    image: "/project-2.png", imageWidth: 1600, imageHeight: 900, imageBg: "#d5d1e0",
    imageAlt: "Project 2 image placeholder",
    links: [],
    details: ["[Detail about what you did.]", "Period: [MM/YYYY] – [MM/YYYY]."],
  },
  {
    id: "project-three",
    title: "[Project 3]",
    category: "[Short category]",
    summaryLabel: "Project details",
    description: "[One or two sentences describing the project.]",
    stack: ["[Tool]", "[Tool]", "[Tool]"],
    image: "/project-3.png", imageWidth: 1600, imageHeight: 800, imageBg: "#c7cdc7",
    imageAlt: "Project 3 image placeholder",
    links: [],
    details: ["[Detail about what you did.]"],
  },
];

// ---------- Experience ----------
// Wrap text in **double asterisks** to make it bold.
export type JourneyStop = {
  id: string; cls: string; pill: string; pillCount?: Count; date: string;
  title: string[]; place: string; sub: string; description: string;
};
export const journey: JourneyStop[] = [
  {
    id: "now", cls: "journey-now", pill: "Current", date: "Present",
    title: ["[Current role]"], place: "[Organisation]", sub: "[City]",
    description: "[What you are doing now, or the role you are looking for.]",
  },
  {
    id: "sud", cls: "journey-thesis", pill: "9 months", date: "10/2025 – 07/2026",
    title: ["Deputy Relationship", "Manager"], place: "Star Union Dai-ichi Life Insurance Co Ltd", sub: "Bancassurance (Peninsula) · Kochi, India",
    description: "**Deputy Relationship Manager, Bancassurance (Peninsula).** [Add key duties and achievements.]",
  },
  {
    id: "hdfc", cls: "journey-work", pill: "1 year", date: "[MM/YYYY] – [MM/YYYY]",
    title: ["[Job title]"], place: "HDFC Bank · Insurance", sub: "Kochi, India",
    description: "**[One line on your main responsibility.]** [Add key duties and achievements.]",
  },
  {
    id: "bachelor", cls: "journey-bachelor", pill: "", date: "2018 – 2021",
    title: ["B.Com", "Computer Applications"], place: "Mahatma Gandhi University", sub: "Kerala, India",
    description: "**Bachelor of Commerce, Model I: Computer Applications.** Computerised Accounting & Business Software Practical, Auditing and Assurance, Management Accounting, Cost Accounting II.",
  },
];

export const contact = {
  blurb: "Open to roles in banking, insurance and finance.",
};

// Source for the faint code wall behind the hero (also good context for the chatbot)
export const heroCode = `const aksa = {
  name: "${person.name}",
  role: "${person.role}",
  focus: ["Banking", "Insurance", "Commerce"],
  education: [
    { degree: "B.Com, Model I: Computer Applications",
      university: "Mahatma Gandhi University, Kerala", period: "2018 – 2021" }
  ],
  experience: [
    { company: "HDFC Bank (Insurance)", city: "Kochi", duration: "1 year" },
    { company: "Star Union Dai-ichi Life Insurance", role: "Deputy Relationship Manager (Bancassurance - Peninsula)",
      city: "Kochi", duration: "10/2025 – 07/2026" }
  ],
  location: "${person.location}",
  email: "${person.email}"
};

export default function Portfolio() {
  return <main>
    <header><h1>{aksa.name}</h1><p>{aksa.role}</p></header>
    <section><h2>Experience</h2>
      {aksa.experience.map((job) =>
        <article key={job.company}><h3>{job.company}</h3>
          <p>{job.city} · {job.duration}</p></article>)}
    </section>
    <section><h2>Education</h2>
      {aksa.education.map((e) =>
        <article key={e.degree}><h3>{e.degree}</h3><p>{e.university}</p>
          <small>{e.period}</small></article>)}
    </section>
    <footer><a href={"mailto:" + aksa.email}>Let's talk.</a></footer>
  </main>;
}`;

// Extra facts only the chatbot uses. Fields still in [brackets] are placeholders.
export const chatProfile = {
  ...person,
  languages: "[Languages and levels]",
  hobbies: "[Hobbies]",
  education: [
    "B.Com (Bachelor of Commerce), Model I: Computer Applications, Mahatma Gandhi University, Kerala. Studied 2018 – 2021, passed on 13 October 2021. Key subjects: Computerised Accounting & Business Software Practical, Auditing and Assurance, Management Accounting, Cost Accounting II.",
  ],
  work: [
    "HDFC Bank, insurance, Kochi: 1 year of experience.",
    "Star Union Dai-ichi Life Insurance Co Ltd (SUD Life), Kochi: Deputy Relationship Manager (Bancassurance - Peninsula), 23 October 2025 to 14 July 2026.",
  ],
  projects: [eskf, ...studies].map(({ title, description, stack, metric, details }) => ({ title, description, stack, metric, details })),
  skills: skills.map((s) => ({ group: s.title, items: s.items })),
  socials: activeSocials,
};
