

export default function About() {
    return (
    <section id="about">
        <p className="section-label">About me</p>
        <p> I'm a <strong>developer</strong> passionate about building reliable, well-crafted systems. Whether it's a backend service, a data pipeline, or a polished interface, I care about the details that make software feel solid.</p>
        <p> I work comfortably across the stack — from <strong>database design</strong> and query optimization to writing clean application logic in Java and Python. I enjoy problems where precision matters.</p>
        <p> When I'm not coding, I'm probably tinkering with side projects, exploring business ideas, or hiking some steep trails.</p>

        <div style={{ marginTop: '2rem' }}>
            <p className="section-label">Stack</p>
            <div className="skills-grid">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">R</span>
                <span className="skill-tag">Typescript</span>
                <span className="skill-tag">Javascript</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">Vite</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">REST APIs</span>
            </div>
        </div>
    </section>
    )
}