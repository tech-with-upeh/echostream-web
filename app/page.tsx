"use client";

import { useState } from "react";
import {
  menuOutline,
  closeOutline,
  play,
  logoApple,
  logoGooglePlaystore,
  micOutline,
  optionsOutline,
  rocketOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const processSteps = [
  {
    number: "01",
    title: "Choose your voice",
    description:
      "Pick a voice that fits your stream or create an experience that feels uniquely yours. EchoStream turns audience messages into natural, expressive speech in the style you choose.",
    icon: micOutline,
    position: "process-step-top",
  },
  {
    number: "02",
    title: "Set your preferences",
    description:
      "Fine-tune how EchoStream behaves on your stream. Adjust voice settings, message filters, audience permissions, and interaction settings so everything feels right for your community.",
    icon: optionsOutline,
    position: "process-step-bottom",
  },
  {
    number: "03",
    title: "Go live & let it flow",
    description:
      "Connect your stream, start EchoStream, and let your audience become part of the broadcast. Messages are transformed into voice automatically while you stay focused on the stream.",
    icon: rocketOutline,
    position: "process-step-top",
  },
];
const testimonials = [
  {
    name: "Alex Morgan",
    text: "EchoStream completely changed how my community interacts with my streams. The voices feel natural, and the whole experience stays out of the way while making every message feel noticed.",
  },
  {
    name: "Jordan Lee",
    text: "It makes the chat feel alive. My viewers love hearing their messages come through, and setting everything up was surprisingly simple.",
  },
];
const waveform = [
  18, 31, 23, 44, 62, 38, 54, 72, 48, 31, 58, 78, 49, 65, 37, 52, 70, 45, 29,
  56, 39, 68, 51, 33, 60, 76, 42, 25, 48, 64, 35, 55, 73, 46, 28, 42, 61, 34,
  51, 69,
];

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <main id="home" className="site-shell">
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <svg
          className="wire-wave wire-wave-lg"
          viewBox="0 0 1440 760"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-40 505 C 100 220, 250 760, 410 425 S 700 130, 820 450 S 1070 700, 1190 330 S 1370 180, 1510 510" />
          <path d="M-40 555 C 110 290, 250 710, 420 480 S 690 210, 820 500 S 1060 640, 1190 390 S 1370 250, 1510 555" />
          <path d="M-40 610 C 120 370, 270 650, 440 535 S 700 290, 830 555 S 1050 590, 1190 450 S 1380 320, 1510 610" />
          <path d="M-40 450 C 100 150, 240 810, 400 370 S 700 70, 820 390 S 1080 760, 1200 260 S 1380 110, 1510 450" />
        </svg>
        <svg
          className="wire-wave wire-wave-md"
          viewBox="0 0 430 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-120 900 C 20 760, 30 620, 125 560 S 260 390, 210 280 S 330 110, 520 -40" />
          <path d="M-120 950 C 30 800, 45 670, 145 600 S 280 430, 230 320 S 350 150, 540 -20" />
          <path d="M-120 1000 C 40 850, 60 720, 165 645 S 300 470, 250 360 S 370 190, 560 30" />
          <path d="M-100 840 C 15 700, 20 570, 105 505 S 235 340, 190 230 S 300 80, 480 -80" />
        </svg>
        <svg
          className="hero-bg-circles"
          viewBox="0 0 1005.84 502.92"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="hero-bg-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
            </filter>
          </defs>
          <rect
            className="hero-bg-base"
            x="0"
            y="0"
            width="1005.84"
            height="502.92"
          />
          <g filter="url(#hero-bg-blur)">
            <circle
              cx="112.5"
              cy="135.5"
              r="109"
              fill="#e5f54a"
              opacity="0.035"
            />
            <circle
              cx="1063.5"
              cy="266.5"
              r="125"
              fill="#6ee7e5"
              opacity="0.01"
            />
            <circle
              cx="180.4325"
              cy="282.8925"
              r="62.865"
              fill="#6ee7e5"
              opacity="0.025"
            />
            <circle
              cx="534.3525"
              cy="284.4325"
              r="62.865"
              fill="#e5f54a"
              opacity="0.01"
            />
            <circle cx="99" cy="223" r="66" fill="#e5f54a" opacity="0.0225" />
          </g>
        </svg>
        <div className="hero-wave" aria-hidden="true">
          <img src="/wave.gif" alt="" />
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <h1>EchoStream</h1>
            <p>
              Turn your audience&apos;s messages into a voice your stream can
              hear. Make every live moment more interactive, expressive, and
              alive.
            </p>
            <div className="hero-actions">
              <a className="hero-cta" href="/login">
                Get Started
              </a>
              <div className="hero-downloads">
                <a
                  className="hero-download-button "
                  href="#app-store"
                  aria-label="Download EchoStream on the App Store"
                >
                  <IonIcon
                    icon={logoApple}
                    aria-hidden="true"
                    className="h-[21px] w-[21px] shrink-0"
                  />
                  <span className="whitespace-nowrap">
                    Download on App Store
                  </span>
                </a>
                <a
                  className="hero-download-button"
                  href="#play-store"
                  aria-label="Download EchoStream on the Play Store"
                >
                  <IonIcon
                    icon={logoGooglePlaystore}
                    aria-hidden="true"
                    className="h-[21px] w-[21px] shrink-0"
                  />
                  <span className="whitespace-nowrap">
                    Download on Play Store
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-audio" aria-hidden="true">
            <div className="audio-orb" />
          </div>
        </div>
      </section>
      <section id="about" className="stream-section">
        <svg
          className="stream-section-wave"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-120 830 C 120 620, 260 760, 430 545 S 710 210, 860 405 S 1080 690, 1220 400 S 1390 180, 1560 40" />
          <path d="M-120 890 C 110 680, 270 810, 445 600 S 720 270, 875 465 S 1090 750, 1240 455 S 1410 230, 1560 90" />
          <path d="M-100 950 C 100 740, 280 860, 465 655 S 740 330, 895 520 S 1100 810, 1260 515 S 1430 280, 1570 150" />
        </svg>
        <div className="stream-inner">
          <div className="stream-intro">
            <h2>
              Elevate your Stream with individually Tailored{" "}
              <span>AI Voices</span>
            </h2>
            <div className="stream-description">
              <p>
                EchoStream gives your audience a voice that feels like part of
                the stream. Turn live messages into natural, expressive speech
                without breaking the flow of your content.
              </p>
              <p>
                Choose voices that match your style, keep your community
                engaged, and make every interaction feel more personal from the
                first message to the last.
              </p>
            </div>
          </div>
          <div className="stream-video-wrap">
            <div className="stream-video">
              <img
                src="/streamer.jpg"
                alt="Streamer speaking into a microphone while wearing a headset"
              />
              <div className="stream-video-overlay" />
              <button
                className="stream-play"
                type="button"
                aria-label="Play EchoStream introduction"
              >
                <IonIcon icon={play} aria-hidden="true" />
              </button>
            </div>
            <div className="stream-video-footer">
              <p>Interested to see more?</p>
              <a href="#features" className="find-out-more">
                Find out more <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="process-section">
        <div className="process-inner">
          <div className="process-heading">
            <h2>The Process</h2>
          </div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div
                className={`process-step ${step.position}`}
                key={step.number}
              >
                <div className="process-step-card">
                  <div className="process-step-copy">
                    <span className="process-number">{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <div className="process-step-icon" aria-hidden="true">
                    <IonIcon icon={step.icon} />
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="process-connector" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="testimonials" className="testimonials-section">
        <div className="testimonials-inner">
          {testimonials.map((testimonial, index) => (
            <article
              className={`testimonial testimonial-${index === 0 ? "one" : "two"}`}
              key={testimonial.name}
            >
              <span className="testimonial-name">{testimonial.name}</span>
              <p>“{testimonial.text}”</p>
              <div className="testimonial-audio">
                <button
                  className="testimonial-play"
                  type="button"
                  aria-label={`Play ${testimonial.name} testimonial`}
                >
                  <IonIcon icon={play} aria-hidden="true" />
                </button>
                <div className="testimonial-waveform" aria-hidden="true">
                  {waveform.map((height, barIndex) => (
                    <span
                      key={`${testimonial.name}-${barIndex}`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <span className="testimonial-duration">0:18</span>
              </div>
            </article>
          ))}
          <a className="testimonials-more" href="#features">
            Find out more <span>↗</span>
          </a>
        </div>
      </section>
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div className="contact-form-wrap">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                />
              </label>
              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell us how we can help..."
                />
              </label>
              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          </div>
          <div className="contact-illustration" aria-hidden="true">
            <img src="/contactus.svg" />
          </div>
        </div>
      </section>
      <FaqSection />
      <Footer />
    </main>
  );
}
