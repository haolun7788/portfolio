import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Developer · Vancouver, BC</p>
        <h1 className={styles.name}>
          Hao Lun Li<br />
          <em className={styles.em}>@haolun7788</em>
        </h1>
        <p className={styles.desc}>
          Aspiring software engineer / AI researcher.
        </p>
        <div className={styles.actions}>
            <a href="#projects" className="btn btn-primary">Projects</a>
            <a href="https://github.com/haolun7788" className="btn btn-primary">GitHub</a>
            <a href="/Resume2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Resume</a>
        </div>
      </div>
    </section>
  )
}