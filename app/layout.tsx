import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { activeSocials, person } from "@/lib/content";
import "@/styles/base.css";
import "@/styles/nav.css";
import "@/styles/hero.css";
import "@/styles/skills.css";
import "@/styles/projects.css";
import "@/styles/experience.css";
import "@/styles/contact.css";
import "@/styles/chat.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://friend-portfolio-seven.vercel.app";
const TITLE = `${person.name} | Banking & Insurance`;
const DESCRIPTION =
  "Aksa Biju, commerce graduate (B.Com, Computer Applications) with two years of experience in banking and insurance at HDFC Bank and SUD Life in Kochi.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: person.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/bg.jpg", width: 1280, height: 1280, alt: person.name }],
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, images: ["/bg.jpg"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#11151c" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: person.name,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/bg.jpg`,
      jobTitle: person.role,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Mahatma Gandhi University, Kerala" },
      email: `mailto:${person.email}`,
      knowsAbout: ["Banking", "Insurance", "Commerce", "Computer applications"],
      sameAs: activeSocials.map((s) => s.url),
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: person.name, publisher: { "@id": `${SITE_URL}/#person` } },
  ],
};

const themeScript = `(function(){try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable} data-theme="light" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
