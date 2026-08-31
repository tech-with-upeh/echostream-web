"use client";

import { useState } from "react";

const faqs = [
  ["What is EchoStream?", "EchoStream is a text-to-speech platform built for creators who want their communities to be heard. Connect your audience, choose a voice, and turn messages into natural speech."],
  ["Which platforms does EchoStream support?", "EchoStream is built around live creator workflows, starting with the platforms supported by the EchoStream product. Platform support can grow without changing your experience."],
  ["Can I choose different voices?", "Yes. EchoStream gives creators access to multiple voice options so the audio personality can match the stream, community, and brand."],
  ["Do I need special equipment?", "No. EchoStream is designed to fit into your existing creator setup with a simple, creator-friendly workflow."],
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main>
      <section className="hero" id="home">
        <nav className="nav container">
          <a className="brand" href="#home"><span className="brand-mark">E</span><span>Echo<span>Stream</span></span></a>
          <div className="nav-links"><a href="#about">About</a><a href="#features">Features</a><a href="#how-it-works">How it works</a></div>
          <a className="nav-cta" href="#contact">Get started <span>↗</span></a>
        </nav>

        <div className="hero-inner container">
          <div className="hero-copy">
            <p className="eyebrow"><i /> YOUR CHAT. YOUR VOICE. YOUR STREAM.</p>
            <h1>Let your <em>community</em><br />be heard.</h1>
            <p className="hero-text">EchoStream turns audience messages into expressive speech, helping creators build a more interactive and alive stream.</p>
            <div className="hero-actions"><a className="button primary" href="#contact">Explore EchoStream <span>→</span></a><a className="text-link" href="#features">See what it does <span>↓</span></a></div>
          </div>
          <div className="hero-art" aria-label="Animated audio waveform illustration">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="audio-card">
              <div className="live-dot" /> <span>LIVE AUDIO</span><b>00:18</b>
              <div className="wave">{Array.from({ length: 26 }).map((_, i) => <i key={i} style={{ height: `${22 + ((i * 17) % 58)}%` }} />)}</div>
              <p>Chat message received</p><strong>“That play was actually insane!”</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="intro container" id="about">
        <div><p className="section-kicker">BUILT FOR CREATORS</p><h2>More than text.<br /><em>A real stream moment.</em></h2></div>
        <p>EchoStream gives every message a presence. Make your audience part of the experience with voices, smart message controls, and a workflow designed around live communities.</p>
      </section>

      <section className="feature-band" id="features">
        <div className="container feature-layout">
          <div className="feature-copy"><p className="section-kicker">WHY ECHOSTREAM</p><h2>Everything your<br />community says,<br /><em>comes alive.</em></h2><p>Built to make audience interaction feel immediate, personal, and effortless.</p></div>
          <div className="feature-grid">
            <article><span>01</span><div className="feature-icon">◌</div><h3>Natural voices</h3><p>Give messages a personality with expressive text-to-speech voices.</p></article>
            <article><span>02</span><div className="feature-icon">⌁</div><h3>Message control</h3><p>Shape what gets read with filters, permissions, and creator settings.</p></article>
            <article><span>03</span><div className="feature-icon">↗</div><h3>Built for live</h3><p>A focused experience designed around fast-moving creator communities.</p></article>
            <article><span>04</span><div className="feature-icon">✦</div><h3>Your sound</h3><p>Choose settings that make the experience feel like your own brand.</p></article>
          </div>
        </div>
      </section>

      <section className="process container" id="how-it-works">
        <div className="process-head"><div><p className="section-kicker">SIMPLE BY DESIGN</p><h2>From message to <em>moment.</em></h2></div><p>Set up your experience once, then let EchoStream help your audience become part of the conversation.</p></div>
        <div className="steps">
          <article><div className="step-number">01</div><div className="step-icon">⌕</div><h3>Choose your setup</h3><p>Pick the voice and settings that match your community.</p></article>
          <article><div className="step-number">02</div><div className="step-icon">⌁</div><h3>Audience engages</h3><p>Messages arrive as your community reacts in real time.</p></article>
          <article><div className="step-number">03</div><div className="step-icon">◖</div><h3>EchoStream speaks</h3><p>Turn selected messages into a shared audio moment.</p></article>
        </div>
      </section>

      <section className="showcase">
        <div className="container showcase-inner">
          <div className="showcase-copy"><p className="section-kicker">MADE TO FIT IN</p><h2>One more layer<br />of <em>connection.</em></h2><p>Your content is already live. EchoStream simply helps your audience feel closer to it.</p><a className="button outline" href="#contact">Discover EchoStream <span>→</span></a></div>
          <div className="creator-cards"><div className="creator-card large"><div className="avatar avatar-one">ES</div><div><small>NOW PLAYING</small><h3>Creator voice</h3><div className="mini-wave">▂▅▇▃▆▂▇▅</div></div></div><div className="creator-card small"><div className="avatar avatar-two">♪</div><p>Every chat can become part of the show.</p></div></div>
        </div>
      </section>

      <section className="faq container"><p className="section-kicker">FAQ</p><h2>Questions, <em>answered.</em></h2><div className="faq-list">{faqs.map(([question, answer], index) => <button className={`faq-item ${openFaq === index ? "active" : ""}`} key={question} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span className="faq-question"><b>{String(index + 1).padStart(2, "0")}</b>{question}<i>{openFaq === index ? "−" : "+"}</i></span>{openFaq === index && <span className="faq-answer">{answer}</span>}</button>)}</div></section>

      <section className="contact" id="contact"><div className="container contact-inner"><div><p className="section-kicker">READY WHEN YOU ARE</p><h2>Let&apos;s make your<br />stream <em>echo.</em></h2><p>Discover how EchoStream can make your community a bigger part of every live moment.</p></div><form onSubmit={(e) => e.preventDefault()}><label>Name<input placeholder="Your name" /></label><label>Email<input type="email" placeholder="you@example.com" /></label><label>Message<textarea placeholder="Tell us about your community" /></label><button className="button primary" type="submit">Send a message <span>→</span></button></form></div></section>

      <footer><div className="container footer-inner"><div><a className="brand" href="#home"><span className="brand-mark">E</span><span>Echo<span>Stream</span></span></a><p>Give your community a voice.</p></div><div className="footer-links"><a href="#about">About</a><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#contact">Contact</a></div></div><div className="container copyright">© {new Date().getFullYear()} EchoStream. All rights reserved.</div></footer>
    </main>
  );
}
