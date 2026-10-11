import Link from "next/link";

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="nav-bar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Orbit home">
          <span className="brand-mark">✦</span>
          <span>orbit<span className="brand-dot">.</span></span>
        </Link>
        <div className="nav-links">
          <a href="#why">Why orbit</a>
          <a href="#signal">The signal</a>
          <a href="#join">Join waitlist</a>
        </div>
        <a className="nav-cta" href="#join">
          Get early access <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot" />
            The internet, in a better orbit
          </div>
          <h1>
            Make room for
            <span className="gradient-text"> better ideas.</span>
          </h1>
          <p className="hero-description">
            Orbit is a calmer, smarter space for the people and projects that
            move culture forward. Find your signal. Follow it further.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#join">
              Start exploring <span aria-hidden="true">→</span>
            </a>
            <a className="text-button" href="#why">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="social-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar-one">M</span>
              <span className="avatar avatar-two">J</span>
              <span className="avatar avatar-three">A</span>
              <span className="avatar avatar-four">+</span>
            </div>
            <p><strong>2,400+</strong> curious minds already orbiting</p>
          </div>
        </div>

        <div className="hero-art" aria-label="Abstract orbit illustration">
          <div className="art-glow" />
          <div className="orbit orbit-large" />
          <div className="orbit orbit-small" />
          <div className="orbit orbit-tilted" />
          <div className="planet">
            <span className="planet-shine" />
          </div>
          <div className="satellite satellite-top">✦</div>
          <div className="satellite satellite-right">✧</div>
          <div className="satellite satellite-bottom">+</div>
          <div className="art-label label-top">curiosity</div>
          <div className="art-label label-bottom">connection</div>
        </div>
      </section>

      <section className="feature-strip" id="why">
        <article>
          <span className="feature-number">01</span>
          <h2>Less noise.</h2>
          <p>A focused place for what matters, without the endless scroll.</p>
        </article>
        <article>
          <span className="feature-number">02</span>
          <h2>More signal.</h2>
          <p>Discover thoughtful work from people worth paying attention to.</p>
        </article>
        <article id="signal">
          <span className="feature-number">03</span>
          <h2>Stay curious.</h2>
          <p>Follow ideas as they evolve and find where they take you next.</p>
        </article>
      </section>

      <section className="join-banner" id="join">
        <div>
          <span className="eyebrow">Your next chapter is out there</span>
          <h2>Come find your orbit.</h2>
        </div>
        <a className="primary-button light-button" href="mailto:hello@orbit.example">
          Join the waitlist <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
