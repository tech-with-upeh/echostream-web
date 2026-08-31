export default function Home() {
  return (
    <main id="home" className="site-shell">
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

        <svg className="wire-wave" viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-40 505 C 100 220, 250 760, 410 425 S 700 130, 820 450 S 1070 700, 1190 330 S 1370 180, 1510 510" />
          <path d="M-40 555 C 110 290, 250 710, 420 480 S 690 210, 820 500 S 1060 640, 1190 390 S 1370 250, 1510 555" />
          <path d="M-40 610 C 120 370, 270 650, 440 535 S 700 290, 830 555 S 1050 590, 1190 450 S 1380 320, 1510 610" />
          <path d="M-40 450 C 100 150, 240 810, 400 370 S 700 70, 820 390 S 1080 760, 1200 260 S 1380 110, 1510 450" />
        </svg>

        <svg className="hero-bg-circles" viewBox="0 0 1005.84 502.92" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <filter id="hero-bg-blur"><feGaussianBlur in="SourceGraphic" stdDeviation="0" /></filter>
          </defs>
          <rect className="hero-bg-base" x="0" y="0" width="1005.84" height="502.92" />
          <g filter="url(#hero-bg-blur)">
            <circle cx="112.5" cy="135.5" r="109" fill="#e5f54a" opacity="0.035" />
            <circle cx="1063.5" cy="266.5" r="125" fill="#6ee7e5" opacity="0.01" />
            <circle cx="180.4325" cy="282.8925" r="62.865" fill="#6ee7e5" opacity="0.025" />
            <circle cx="534.3525" cy="284.4325" r="62.865" fill="#e5f54a" opacity="0.01" />
            <circle cx="99" cy="223" r="66" fill="#e5f54a" opacity="0.0225" />
          </g>
        </svg>

        <div className="hero-wave" aria-hidden="true">
          <img src="/wave.gif" alt="" />
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <h1>EchoStream</h1>
            <p>Turn your audience&apos;s messages into a voice your stream can hear. Make every live moment more interactive, expressive, and alive.</p>
            <a className="hero-cta" href="#get-started">Get Started <span>↗</span></a>
          </div>

          <div className="hero-audio" aria-hidden="true">
            <div className="audio-orb" />
          </div>
        </div>
      </section>
    </main>
  );
}
