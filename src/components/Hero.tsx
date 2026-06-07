import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Developer · Vancouver, BC</p>
        <h1 className={styles.name}>
          Hao Lun Li<br />
          <em className={styles.em}>@haolun7788</em>
        </h1>
        <p className={styles.desc}>
          I <strong>design</strong> and <strong>build</strong> software with a focus on clean architecture,
          data-driven systems, and thoughtful user experiences.
        </p>
        <div className={styles.actions}>
            <a href="#projects" className="btn btn-primary">Projects</a>
        </div>
      </div>
    </section>
  )
}