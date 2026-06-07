import ProjectItem from "./Project-Item"
import styles from "./Projects.module.css"

export default function Projects() {
    return (
        <section id="projects">
            <p className="section-label">Projects</p>
            <div className={styles.list}>
                <ProjectItem 
                    title="Portfolio Website"
                    meta="HTML/CSS - React - Vite - 2025"
                    desc="My Portfolio Website built with React and Vite. Showcases my projects, skills, and experience in a clean and modern design."
                    link="https://haolun.developer.li"
                />
                <ProjectItem 
                    title="Eyeso"
                    meta="Java - React Native - PostgreSQL - 2025"
                    desc="An app that promotes mental wellness by encouraging users to take time to enjoy life in the moment. Built with a Java backend, React Native frontend, and PostgreSQL database."
                    link="#"
                />
                <ProjectItem 
                    title="WiDS ASA DataFest @ UBC 2026"
                    meta="R - 2025"
                    desc="A 48 Hour datathon from the American Statistical Association hosted by WiDS at UBC where we analyzed patient medical data provided by Stormont Vail Health to uncover insights and build predictive models."
                    link="#"
                />
            </div>
        </section>
    )
}