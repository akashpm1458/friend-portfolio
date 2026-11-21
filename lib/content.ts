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
  email: "aksa.biju@example.com", // TODO replace with Aksa's real email
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
  eyebrow: "AKSA BIJU",
  lines: ["BANKING &", "INSURANCE"],
  ariaLabel: "Aksa Biju, Banking and Insurance",
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
    "HDFC Bank and SUD Life",
    " in Kochi. [Add one line about what you do best.]",
  ],
};

export const skills = [
  {
    id: "skills-banking",
    title: "Banking & Insurance",
    note: "[Short summary of this skill group]",
    items: ["[Skill]", "[Skill]", "[Skill]", "[Skill]", "[Skill]", "[Skill]"],
  },
  {
    id: "skills-commerce",
    title: "Commerce & Accounting",
    note: "[Short summary of this skill group]",
    items: ["[Skill]", "[Skill]", "[Skill]", "[Skill]", "[Skill]", "[Skill]"],
  },
  {
    id: "skills-tools",
    title: "Computer Applications & Tools",
    note: "[Short summary of this skill group]",
    items: ["[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]"],
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
    id: "sud", cls: "journey-thesis", pill: "1 year", date: "[MM/YYYY] – [MM/YYYY]",
    title: ["[Job title]"], place: "SUD Life", sub: "Kochi, India",
    description: "**[One line on your main responsibility.]** [Add key duties and achievements.]",
  },
  {
    id: "hdfc", cls: "journey-work", pill: "1 year", date: "[MM/YYYY] – [MM/YYYY]",
    title: ["[Job title]"], place: "HDFC Bank · Insurance", sub: "Kochi, India",
    description: "**[One line on your main responsibility.]** [Add key duties and achievements.]",
  },
  {
    id: "bachelor", cls: "journey-bachelor", pill: "", date: "Passed 13 Oct 2021",
    title: ["B.Com", "Computer Applications"], place: "Mahatma Gandhi University", sub: "Kerala, India",
    description: "**Bachelor of Commerce, Model I: Computer Applications.** [Add key subjects or achievements.]",
  },
];

export const contact = {
  blurb: "Open to roles in banking, insurance and finance. [Edit this line.] My inbox is open.",
  messagePlaceholder: "A little about the role or opportunity…",
};

// Source for the faint code wall behind the hero (also good context for the chatbot)
export const heroCode = `const aksa = {
  name: "${person.name}",
  role: "${person.role}",
  focus: ["Banking", "Insurance", "Commerce"],
  education: [
    { degree: "B.Com, Model I: Computer Applications",
      university: "Mahatma Gandhi University, Kerala", passed: "13 Oct 2021" }
  ],
  experience: [
    { company: "HDFC Bank (Insurance)", city: "Kochi", duration: "1 year" },
    { company: "SUD Life", city: "Kochi", duration: "1 year" }
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
          <small>Passed {e.passed}</small></article>)}
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
    "B.Com (Bachelor of Commerce), Model I: Computer Applications, Mahatma Gandhi University, Kerala. Passed on 13 October 2021.",
  ],
  work: [
    "HDFC Bank, insurance, Kochi: 1 year of experience.",
    "SUD Life, Kochi: 1 year of experience.",
  ],
  projects: [eskf, ...studies].map(({ title, description, stack, metric, details }) => ({ title, description, stack, metric, details })),
  skills: skills.map((s) => ({ group: s.title, items: s.items })),
  socials: activeSocials,
};
