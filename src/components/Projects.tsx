import ProjectItem from "./Project-Item"
import styles from "./Projects.module.css"

export default function Projects() {
    return (
        <section id="projects">
            <h2 className="section-label">Projects</h2>
            <div className={styles.list}>
                <ProjectItem 
                    title="Portfolio Website"
                    meta="HTML/CSS - Typescript - React - Vite - 2025"
                    desc="My Portfolio Website built with React and Vite. Showcases my projects, skills, and experience in a clean and modern design."
                    link="https://github.com/haolun7788/portfolio"
                />
                <ProjectItem 
                    title="Brezi [Access by Request]"
                    meta="Java - React Native - Expo.io- PostgreSQL - Apr 2026"
                    desc="An app that promotes mental wellness by encouraging users to take time to enjoy life in the moment. Built with React Native with Expo.io and Supabase database in PostgreSQL."
                    link="mailto:haolun7788@gmail.com"
                />
                <ProjectItem 
                    title="NeXt-List [Access by Request]"
                    meta="Java - JUnit 5 - Test Driven Development - Jan 2026"
                    desc="An app that promotes mental wellness by encouraging users to take time to enjoy life in the moment. Built with React Native with Expo.io and Supabase database in PostgreSQL."
                    link="mailto:haolun7788@gmail.com"
                />
                <ProjectItem 
                    title="WiDS ASA DataFest @ UBC 2026"
                    meta="R - Apr 2026"
                    desc="A 48 Hour datathon from the American Statistical Association hosted by WiDS at UBC where we analyzed patient medical data provided by Stormont Vail Health to uncover insights and build predictive models."
                    link="https://canva.link/z7lkf13tuzcor14"
                />
                <ProjectItem 
                    title="HackCamp 2025"
                    meta="C# - JavaScript - Razor Pages - 2025"
                    desc="Designed a cross-platform statistical engine by embedding an ASP.NET Core Razor Pages backend inside an Electron.NET shell that computes Pearson R-values across unrelated datasets and automatically notes pairings."
                    link="https://github.com/neondev1/correlation"
                />
            </div>
        </section>
    )
}