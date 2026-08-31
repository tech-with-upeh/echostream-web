"use client";

import { useState } from "react";

const faqs = [
  ["What is EchoStream?", "EchoStream is a text-to-speech experience for creators that turns audience interaction into natural, expressive audio."],
  ["Can I use EchoStream on my phone?", "Yes. EchoStream is designed around a simple creator experience, with a dedicated mobile app at the center of the product."],
  ["Which platforms does EchoStream support?", "EchoStream is built for live creator communities and starts with the platforms supported by the core product."],
  ["How do message controls work?", "Creators can shape their experience with voice settings, audience permissions, message filters, and other controls."],
  ["When will EchoStream launch?", "Follow EchoStream and join the community for product news, availability, and launch updates."],
];

const Wave = () => <div className="waveform" aria-hidden>{Array.from({ length: 52 }).map((_, i) => <i key={i} style={{ height: `${22 + ((i * 31 + (i % 7) * 11) % 72)}%` }} />)}</div>;

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <main>
      <section className="hero" id="home">
        <nav className="nav wrap">
          <a className="brand" href="#home"><span className="head-logo">◖</span> EchoStream</a>
          <div className="nav-links"><a href="#home">Home</a><a href="#about">About</a><a href="#features">Features</a><a href="#process">Process</a></div>
          <a className="small-nav-cta" href="#contact">Get Started</a>
        </nav>
        <div className="hero-grid wrap">
          <div className="hero-copy">
            <h1>EchoStream</h1>
            <p className="hero-sub">Give your <span>community a voice</span> on every stream.</p>
            <p className="hero-body">Turn audience messages into expressive text-to-speech and make every live moment feel more interactive.</p>
            <a className="glow-btn" href="#features">Explore More</a>
          </div>
          <div className="hero-sound"><div className="sound-blob" /><Wave /></div>
        </div>
      </section>

      <section className="about-panel" id="about"><div className="wrap about-grid">
        <div><p className="mini-title">Elevate Your Stream With Immersive</p><h2><span>AI Voices</span></h2><div className="accent-line" /></div>
        <div className="about-text"><p>EchoStream brings your chat to life with natural, expressive voices.</p><p>We make it easy to create memorable live moments through audio that feels personal to your community.</p></div>
      </div><div className="feature-video wrap"><div className="video-visual"><div className="video-person" /><div className="video-mic" /><button className="play">▷</button></div></div><div className="below-video wrap"><span>Interested In What We Can Do For You?</span><a className="outline-btn" href="#features">Find Out More</a></div></section>

      <section className="process-section" id="process"><div className="wrap"><div className="section-label"><i /> <h2>The Process</h2></div><div className="process-row">
        <article className="process-card"><div className="process-icon">♙</div><div className="big-num">01</div><h3>Choose Your AI Voice</h3><p>Select a voice and fine-tune the settings that match your community and creator style.</p></article>
        <article className="process-card offset"><div className="process-icon">◖</div><div className="big-num">02</div><h3>Text to Speech Generation</h3><p>Audience messages are transformed into clear, natural speech for your live experience.</p></article>
        <article className="process-card"><div className="process-icon">◯</div><div className="big-num">03</div><h3>Speech Synthesis</h3><p>EchoStream delivers a polished audio moment that keeps your audience engaged.</p></article>
      </div></div></section>

      <section className="voices" id="features"><div className="wrap voice-layout"><div className="voice-card left"><div className="avatar one">ES</div><div><h3>Creator Voice</h3><p>Warm, expressive and ready for the stream.</p><div className="player"><span>▶</span><span>▁▃▆▅▂▇▃▅</span><small>0:32</small></div></div></div><div className="voice-card right"><div><h3>Audience Energy</h3><p>Give every message a sound that belongs in the moment.</p><div className="player"><span>▶</span><span>▂▅▃▇▂▆▃</span><small>0:28</small></div></div><div className="avatar two">♫</div></div><a className="glow-btn voice-cta" href="#contact">Find Out More</a></div></section>

      <section className="contact-section" id="contact"><div className="wrap contact-grid"><div className="contact-form"><div className="section-label"><h2>Contact <span>Us</span></h2><div className="accent-line" /></div><form onSubmit={(e) => e.preventDefault()}><label>Name<input /></label><label>Phone<input /></label><label>Email<input /></label><label>Message<textarea /></label><button className="glow-btn" type="submit">Submit</button></form></div><div className="contact-art"><div className="desk" /><div className="screen screen-one" /><div className="screen screen-two" /><div className="person-shape" /><div className="speech">...</div></div></div></section>

      <section className="faq-section"><div className="wrap"><div className="section-label"><h2>FAQ&apos;s</h2><div className="accent-line" /></div><div className="faq-list">{faqs.map(([q,a],i)=><button className={`faq-item ${openFaq===i?"active":""}`} key={q} onClick={()=>setOpenFaq(openFaq===i?-1:i)}><span className="faq-top"><b>{openFaq===i?"−":"+"}</b>{q}</span>{openFaq===i&&<span className="faq-answer">{a}</span>}</button>)}</div></div></section>

      <footer><div className="footer-wave"><i /><i /><i /></div><div className="wrap footer-grid"><div><a className="brand footer-brand" href="#home"><span className="head-logo">◖</span> EchoStream</a><p className="footer-tag">Every message deserves to be heard.</p></div><div><small>Email</small><a href="mailto:hello@echostream.app">hello@echostream.app</a><small>Phone</small><p>+234 800 000 0000</p></div><div><small>Follow Us</small><a href="#home">𝕏 &nbsp; Twitter</a><a href="#home">◔ &nbsp; LinkedIn</a><a href="#home">▷ &nbsp; YouTube</a></div></div><div className="wrap copyright">© {new Date().getFullYear()} EchoStream. All rights reserved.</div></footer>
    </main>
  );
}
