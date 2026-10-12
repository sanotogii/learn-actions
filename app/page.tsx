import Link from "next/link";

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="nav-bar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="DevCloud home">
          <span className="brand-mark">✦</span>
          <span>
            devcloud<span className="brand-dot">.</span>
          </span>
        </Link>

        <div className="nav-links">
          <a href="#about">About us</a>
          <a href="#stack">Our stack</a>
          <a href="#community">Our class</a>
        </div>

        <a className="nav-cta" href="#community">
          Meet the class <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot" />
            FPL Larache · DevOps & Cloud Computing
          </div>

          <h1>
            We build.
            <span className="gradient-text"> We automate. We deploy.</span>
          </h1>

          <p className="hero-description">
            A class of future DevOps engineers and cloud architects at Faculté
            Polydisciplinaire de Larache. We turn ideas into reliable
            applications through automation, collaboration, and cloud-native
            technologies.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#stack">
              Explore our world <span aria-hidden="true">→</span>
            </a>

            <a className="text-button" href="#about">
              Discover our class <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="social-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar-one">D</span>
              <span className="avatar avatar-two">C</span>
              <span className="avatar avatar-three">O</span>
              <span className="avatar avatar-four">+</span>
            </div>
            <p>
              <strong>One class.</strong> Infinite possibilities.
            </p>
          </div>
        </div>

        <div
          className="hero-art"
          aria-label="Abstract cloud computing and connected infrastructure illustration"
        >
          <div className="art-glow" />
          <div className="orbit orbit-large" />
          <div className="orbit orbit-small" />
          <div className="orbit orbit-tilted" />

          <div className="planet">
            <span className="planet-shine" />
          </div>

          <div className="satellite satellite-top">⌘</div>
          <div className="satellite satellite-right">✧</div>
          <div className="satellite satellite-bottom">↗</div>

          <div className="art-label label-top">automation</div>
          <div className="art-label label-bottom">cloud native</div>
        </div>
      </section>

      <section className="feature-strip" id="about">
        <article>
          <span className="feature-number">01</span>
          <h2>Think in systems.</h2>
          <p>
            Understand infrastructure, Linux, networking, and the foundations
            that keep modern applications running.
          </p>
        </article>

        <article id="stack">
          <span className="feature-number">02</span>
          <h2>Automate everything.</h2>
          <p>
            Explore Docker, Kubernetes, CI/CD, Git, Jenkins, and infrastructure
            automation to ship software faster.
          </p>
        </article>

        <article id="community">
          <span className="feature-number">03</span>
          <h2>Build together.</h2>
          <p>
            Share projects, solve real-world problems, learn from each other,
            and grow into the next generation of cloud and DevOps engineers.
          </p>
        </article>
      </section>

      <section className="join-banner" id="join">
        <div>
          <span className="eyebrow">Faculté Polydisciplinaire de Larache</span>
          <h2>From localhost to the cloud.</h2>
        </div>

        <a className="primary-button light-button" href="#community">
          Join our journey <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
