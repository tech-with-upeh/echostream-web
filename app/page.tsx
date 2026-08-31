export default function Home() {
  return (
    <main id="home">
      <header className="site-header">
        <nav className="navbar">
          <a className="logo" href="#home">EchoStream</a>
          <div className="nav-right">
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#contact">Contact</a>
            </div>
            <a className="get-started" href="#get-started">Get Started</a>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-wave" aria-hidden="true">
          <img src="/wave.gif" alt="" />
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-eyebrow">LIVE STREAM INTERACTION</p>
            <h1>EchoStream</h1>
            <p className="hero-description">
              Turn your audience&apos;s messages into a voice your stream can hear. Make every live moment more interactive, expressive, and alive.
            </p>
            <a className="hero-cta" href="#get-started">
              Get Started <span>↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
