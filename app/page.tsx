const bars = [38, 62, 28, 78, 45, 92, 58, 34, 70, 100, 54, 82, 36, 68, 94, 48, 76, 32, 64, 88, 42, 72, 30, 58, 84, 46, 66, 96, 52, 74, 40, 86, 60, 35, 80, 50, 69, 31, 91, 55];

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
          <defs>
            <linearGradient id="meshStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e5f54a" stopOpacity=".06" />
              <stop offset=".45" stopColor="#a8caca" stopOpacity=".15" />
              <stop offset="1" stopColor="#6ee7e5" stopOpacity=".035" />
            </linearGradient>
            <filter id="meshGlow" x="-20%" y="-30%" width="140%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g className="mesh-surface" filter="url(#meshGlow)">
            <path d="M-80 570 C 160 230, 260 770, 470 430 S 760 160, 930 470 S 1200 690, 1530 270" />
            <path d="M-80 600 C 160 260, 270 790, 480 460 S 770 190, 940 500 S 1210 720, 1530 300" />
            <path d="M-80 630 C 170 290, 280 810, 490 490 S 780 220, 950 530 S 1220 750, 1530 330" />
            <path d="M-80 660 C 180 320, 290 830, 500 520 S 790 250, 960 560 S 1230 780, 1530 360" />
            <path d="M-80 690 C 190 350, 300 850, 510 550 S 800 280, 970 590 S 1240 810, 1530 390" />
            <path d="M-80 720 C 200 380, 310 870, 520 580 S 810 310, 980 620 S 1250 840, 1530 420" />

            <path d="M90 140 C 170 250, 190 470, 120 780" />
            <path d="M180 110 C 260 250, 280 480, 210 800" />
            <path d="M270 100 C 350 260, 370 500, 300 820" />
            <path d="M360 100 C 440 280, 460 520, 390 840" />
            <path d="M450 110 C 530 290, 550 540, 480 850" />
            <path d="M540 120 C 620 300, 640 550, 570 860" />
            <path d="M630 130 C 710 310, 730 560, 660 870" />
            <path d="M720 140 C 800 320, 820 570, 750 880" />
            <path d="M810 150 C 890 330, 910 580, 840 890" />
            <path d="M900 160 C 980 340, 1000 590, 930 900" />
            <path d="M990 170 C 1070 350, 1090 600, 1020 910" />
            <path d="M1080 180 C 1160 360, 1180 610, 1110 920" />
            <path d="M1170 190 C 1250 370, 1270 620, 1200 930" />
            <path d="M1260 200 C 1340 380, 1360 630, 1290 940" />
            <path d="M1350 210 C 1430 390, 1450 640, 1380 950" />
          </g>
          <g className="mesh-highlight">
            <path d="M-80 570 C 160 230, 260 770, 470 430 S 760 160, 930 470 S 1200 690, 1530 270" />
            <path d="M360 100 C 440 280, 460 520, 390 840" />
            <path d="M810 150 C 890 330, 910 580, 840 890" />
            <path d="M1260 200 C 1340 380, 1360 630, 1290 940" />
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
            <div className="wave-bars">
              {bars.map((height, index) => <i key={index} style={{ height: `${height}%`, animationDelay: `${index * -0.045}s` }} />)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
