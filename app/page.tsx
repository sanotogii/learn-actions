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
          <a href="#about">Why pipelines</a>
          <a href="#stack">Pipeline stages</a>
          <a href="#community">Our workflow</a>
        </div>

        <a className="nav-cta" href="#join">
          Start building <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot" />
            FPL Larache · CI/CD with GitHub Actions
          </div>

          <h1>
            Push code.
            <span className="gradient-text"> We build. We test. We deploy.</span>
          </h1>

          <p className="hero-description">
            A class of future DevOps engineers at Faculté Polydisciplinaire de
            Larache, building CI/CD pipelines with GitHub Actions. Every commit
            triggers a workflow that builds, tests, packages, and ships our
            applications automatically.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#stack">
              See the pipeline <span aria-hidden="true">→</span>
            </a>

            <a className="text-button" href="#about">
              Why automate <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="social-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar-one">C</span>
              <span className="avatar avatar-two">I</span>
              <span className="avatar avatar-three">C</span>
              <span className="avatar avatar-four">D</span>
            </div>
            <p>
              <strong>One commit.</strong> One automated release.
            </p>
          </div>
        </div>

        <div
          className="hero-art"
          aria-label="Abstract illustration of a CI/CD pipeline moving code from commit to cloud"
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

          <div className="art-label label-top">on: push</div>
          <div className="art-label label-bottom">deploy: prod</div>
        </div>
      </section>

      <section className="feature-strip" id="about">
        <article>
          <span className="feature-number">01</span>
          <h2>Trigger on every change.</h2>
          <p>
            Define workflows in YAML under .github/workflows and run them on
            push, pull request, schedule, or manual dispatch. Every change gets
            checked before it reaches the main branch.
          </p>
        </article>

        <article id="stack">
          <span className="feature-number">02</span>
          <h2>Build, test, ship.</h2>
          <p>
            Chain jobs for linting, unit tests, Docker image builds, and
            deployment. Use caching, matrix builds, and reusable actions to
            keep runs fast and reliable.
          </p>
        </article>

        <article id="community">
          <span className="feature-number">03</span>
          <h2>Protect and release together.</h2>
          <p>
            Store credentials in GitHub Secrets, require passing checks and
            reviews before merging, and promote releases through environments
            with approvals.
          </p>
        </article>
      </section>

      <section className="join-banner" id="join">
        <div>
          <span className="eyebrow">Faculté Polydisciplinaire de Larache</span>
          <h2>From git push to production.</h2>
        </div>

        <a className="primary-button light-button" href="#stack">
          Build your first workflow <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}