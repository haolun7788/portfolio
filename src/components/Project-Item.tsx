import styles from "./Projects.module.css"

interface ProjectItemProps {
    title: string
    meta: string
    desc: string
    link: string
}

export default function ProjectItem({ title, meta, desc, link }: ProjectItemProps) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.item}>
            <div>
                <p className={styles.meta}>{meta}</p>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.desc}>{desc}</p>
            </div>
            <span className={styles.arrow}>↗</span>
        </a>
    )
}