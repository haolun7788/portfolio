export type Tab = 'projects' | 'about' | 'contact'

export const TABS: Tab[] = ['projects', 'about', 'contact']

// Optional image or video shown at the top of a card. Put files in
// public/media/ and reference them as "/media/<file>".
export interface Media {
    src: string
    alt: string
    kind?: 'image' | 'video'
}

export interface Project {
    title: string
    date: string
    stack: string[]
    desc: string
    link: string
    // Private repos link to email instead of GitHub
    onRequest?: boolean
    media?: Media
}

export const projects: Project[] = [
    {
        title: "actually",
        date: "Apr 2026",
        stack: ["TypeScript", "React Native", "Expo", "Supabase", "Vercel"],
        desc: "A mobile and web app that helps keep track of small debts and IOUs between friends. Created in React Native on Expo with a Supabase backend and web hosted on Vercel.",
        link: "https://actually.haolun.li/",
        media: {
            src: "/media/Actually.mp4",
            alt: "The actually app's screens scrolling past: tracking who owes what, logging an item, settling up, guest links, trends and friends.",
            kind: "video",
        }
    },
    {
        title: "calcli",
        date: "Sep 2026",
        stack: ["C++", "Catch2", "GitHub Actions"],
        desc: "A C++ command-line tool that creates Google Calendar events from natural-language input (e.g. calcli add 'Exam' Friday 2:30 1 hour), with a unit-tested parser for weekdays, clock times, and durations.",
        link: "https://github.com/haolun7788/calcli",
        media: {
            src: "/media/CalcliExample.gif",
            alt: "A GIF showing calcli being used to add an event to Google Calendar.",
            kind: "image",
        }
    },
    {
        title: "Amazon Robotics Hackathon 2026 @ UBC",
        date: "Sep 2026",
        stack: ["Python", "Git"],
        desc: "Designed and implemented a Dijkstra-based dynamic routing algorithm in Python for warehouse drive units in a team of 4.",
        link: "https://github.com/haolun7788/AmazonArHackathon2026",
        media: {
            src: "/media/AmazonRobotics.mp4",
            alt: "A video of our algorithm working on a warehouse map, showing the drive units moving along the optimal paths.",
            kind: "video",
        }
    },
    {
        title: "Brezi",
        date: "Apr 2026",
        stack: ["TypeScript", "React Native", "Expo", "PostgreSQL"],
        desc: "An app that promotes mental wellness by encouraging users to take time to enjoy life in the moment. Built with React Native with Expo and a Supabase database in PostgreSQL.",
        link: "mailto:haolun7788@gmail.com?subject=Brezi%20access",
        onRequest: true,
        media: {
            src: "/media/Brezi.png",
            alt: "Three Brezi screens: the welcome screen, the home screen with today's missions and score, and a profile.",
        }
    },
    {
        title: "WiDS ASA DataFest @ UBC 2026",
        date: "Apr 2026",
        stack: ["R"],
        desc: "A 48-hour datathon from the American Statistical Association hosted by WiDS at UBC, where we analyzed patient medical data provided by Stormont Vail Health to uncover insights and build predictive models.",
        link: "https://canva.link/z7lkf13tuzcor14",
        media: {
            src: "/media/AsaDatathon.png",
            alt: "A screenshot of our team's datathon presentation, showing a summary of our analysis and predictive models.",
            kind: "image",
        }
    },
    {
        title: "NeXt-List",
        date: "Jan 2026",
        stack: ["Java", "JUnit 5", "TDD"],
        desc: "A task list application written in Java and built through test driven development with JUnit 5. Achieved 100% code coverage and implemented over 6 user stories. The project was part of the CPSC 210 course at UBC.",
        link: "mailto:haolun7788@gmail.com?subject=NeXt-List%20access",
        onRequest: true,
        media: {
            src: "/media/CPSC210.png",
            alt: "CPSC 210, the class I took where this project was part of the coursework.",
            kind: "image",
        }
    },
    {
        title: "HackCamp 2025",
        date: "2025",
        stack: ["C#", "JavaScript", "Razor Pages"],
        desc: "Designed a cross-platform statistical engine by embedding an ASP.NET Core Razor Pages backend inside an Electron.NET shell that computes Pearson R-values across unrelated datasets and automatically notes pairings.",
        link: "https://github.com/neondev1/correlation",
        media: {
            src: "/media/HackCamp2025.png",
            alt: "HackCamp 2025, the hackathon where this project was created.",
            kind: "image",
        }
    },
]

export const stack: Record<string, string[]> = {
    Languages: ["Java", "Python", "TypeScript", "JavaScript", "C++", "C#", "R", "HTML/CSS"],
    Frameworks: ["React", "React Native", "Expo", "Vite", "JUnit 5", "Catch2"],
    "Infra & Data": ["AWS", "PostgreSQL", "REST APIs", "GitHub Actions"],
}

// Shown in the About card; leave null for the placeholder
export const portrait: Media = {
    src: "/media/Selfie.jpg",
    alt: "A selfie of me during the Amazon Robotics Hackathon at UBC.",
    kind: "image",
}

export const links = {
    email: "haolun7788@gmail.com",
    github: "https://github.com/haolun7788",
    resume: "/Resume2026.pdf",
}
