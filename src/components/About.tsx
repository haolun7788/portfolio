

export default function About() {
    return (
    <section id="about">
        <p className="section-label">About me</p>
        <p> I'm a <b>second year</b> Computer Science student at the <b>University of British Columbia</b> with a passion for computers and anything tech related.</p>
        <p> Right now I'm playing around with all sorts of ideas and projects to expose myself to new technologies and concepts.</p>
        <p> When I'm not coding, I'm probably tinkering with side projects, hiking trails in the mountains, or travelling the world. Make sure to check back later, more projects are in the works and on the way.</p>

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
                <span className="skill-tag">Amazon Web Services (AWS)</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">Expo.io</span>
                <span className="skill-tag">REST APIs</span>
            </div>
        </div>
    </section>
    )
}