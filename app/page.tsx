export default function Home() {
  return (
    <main>
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

            <a className="get-started" href="#get-started">
              Get Started
            </a>
          </div>
        </nav>
      </header>
    </main>
  );
}
