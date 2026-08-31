"use client";

import {
  menuOutline,
  play,
  micOutline,
  optionsOutline,
  rocketOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

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
  return (
    <main id="home" className="site-shell">
      <header className="site-header">
        <nav className="navbar">
          <a className="logo" href="#home">
            EchoStream
          </a>
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
            <button
              className="mobile-menu"
              type="button"
              aria-label="Open navigation menu"
            >
              <IonIcon icon={menuOutline} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>
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
            <a className="hero-cta" href="#get-started">
              Get Started{" "}
            </a>
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
           <svg xmlns="http://www.w3.org/2000/svg" width="960" height="676.854" viewBox="0 0 960 676.854"><g transform="translate(-537.662 -242.369)"><circle cx="52.28" cy="52.28" r="52.28" transform="translate(975.673 812.908)" fill="#6ee7e5"/><path d="M1340.283 914.532c29.248-8.784 60.343-17.943 83.539-38.825 20.728-18.66 34.721-47.154 26.134-75.138-8.569-27.927-34.237-46.548-60.738-55.81-15.031-5.253-30.755-8.167-46.474-10.456-17.088-2.489-34.251-4.528-51.406-6.49q-104.197-11.917-209.175-14.56c-34.533-.87-69.06-.849-103.6-.347-30.845.448-63.33.437-91.944-12.673-22.252-10.194-42.447-28.742-48.647-53.114-7.157-28.134 6.044-56.785 24.981-77.161 9.982-10.74 21.648-19.78 33.682-28.092 13.056-9.017 26.567-17.4 40.371-25.217a562 562 0 0 1 84.977-39.176c14.485-5.267 29.186-9.811 44.015-14 12.521-3.54 25.081-7.085 37.183-11.908 23.394-9.324 45.644-25.117 51.592-51.009 5.638-24.539-3.868-51.179-20.531-69.409-19.279-21.091-48.347-30.336-76.216-31.832-31.287-1.679-61.853 6.151-91.26 16.089-31.365 10.6-62.053 22.787-94.08 31.372a633 633 0 0 1-96.828 18c-16 1.7-32.494 3.629-48.594 2.324-13.493-1.093-26.918-5.062-36.862-14.638-8.527-8.211-13.606-19.5-11.86-31.405.317-2.163 3.6-1.243 3.288.906-2.126 14.5 7.728 27.855 19.871 34.7 14.034 7.908 31.112 7.919 46.736 7.015a611 611 0 0 0 100.6-14.543c32.5-7.422 63.832-18.033 95.132-29.367 29.727-10.765 60.119-21.271 91.877-23.6 27.556-2.023 56.544 1.991 80.551 16.392 21.1 12.656 36.613 33.763 41.557 57.984 4.831 23.668-1.86 47.49-19.776 64.006-18.55 17.1-43.985 24.412-67.688 31.145-30.064 8.54-59.483 18.523-87.959 31.485a552 552 0 0 0-82.739 46.516c-25.284 17.278-50.236 39.018-58.232 69.841-3.725 14.358-3.037 29.586 3.2 43.148 5.542 12.059 14.669 22.2 25.3 30.025 25.368 18.667 57.341 22.5 87.984 22.881 34.416.428 68.833-.733 103.26-.168q105.242 1.727 210.052 12.812 26.263 2.78 52.46 6.145c15.709 2.018 31.47 4.024 46.914 7.609 27.461 6.374 54.183 18.63 71.251 41.913a69.7 69.7 0 0 1 13.578 34.6c1.195 13.1-2.011 26.219-7.933 37.87-13.107 25.788-37.657 42.191-63.729 52.968-13.964 5.772-28.449 10.145-42.906 14.486-2.106.632-3.006-2.657-.906-3.288Z" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(653.466 294.081)" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(842.699 345.794)" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(1002.95 242.369)" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(1102.964 358.295)" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(967.717 492.406)" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(796.101 557.188)" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(977.946 658.34)" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(1173.429 715.166)" fill="#e6e6e6"/><circle cx="27.277" cy="27.277" r="27.277" transform="translate(1401.872 702.664)" fill="#e6e6e6"/><path d="M1022.353 319.657c-81.707.577-148.608 66.976-149.769 148.677-.011.754-.016 6.058-.015 13a38.355 38.355 0 0 0 38.349 38.35 38.377 38.377 0 0 0 38.371-38.4c0-4.727-.006-7.994-.006-8.194a72.738 72.738 0 1 1 111.972 61.236l.013.016s-54.585 35.136-71.226 83.342h.014a106.8 106.8 0 0 0-4.4 30.423c0 4.234.249 41.28.73 71.349a39.536 39.536 0 0 0 39.54 38.895 39.547 39.547 0 0 0 39.544-39.791c-.167-27.537-.258-59.6-.258-61.929 0-29.6 28.556-59.094 52.012-78.327 27.011-22.148 46.448-52.329 54.255-86.375a98.6 98.6 0 0 0 2.841-21.4 150.874 150.874 0 0 0-151.967-150.872" fill="#6ee7e5"/><path d="M1496.309 918.903H539.016a1.353 1.353 0 1 1 0-2.706h957.293a1.353 1.353 0 1 1 0 2.706m-574.56-417.362a38.355 38.355 0 0 1-38.351-38.349c0-6.941 0-12.245.015-13a149.46 149.46 0 0 1 17.455-68.087 149.8 149.8 0 0 0-28.821 86.273c-.011.754-.016 6.058-.015 13a38.355 38.355 0 0 0 38.349 38.353 38.384 38.384 0 0 0 36.923-27.948 38.2 38.2 0 0 1-25.555 9.758m103.204-101.07a72.742 72.742 0 0 1 63.258 101.621 72.735 72.735 0 1 0-122.093-76.131 72.59 72.59 0 0 1 58.834-25.49Zm11.8 339.742a39.54 39.54 0 0 1-39.54-38.9c-.481-30.06-.73-67.106-.73-71.34a106.8 106.8 0 0 1 4.4-30.423h-.014a108 108 0 0 1 6.244-14.435 125 125 0 0 0-17.609 32.62h.014a106.8 106.8 0 0 0-4.4 30.423c0 4.234.249 41.28.73 71.349a39.536 39.536 0 0 0 39.54 38.895 39.55 39.55 0 0 0 37.96-28.462 39.4 39.4 0 0 1-26.595 10.273" fill="#e5f54a"/><path d="M1016.435 904.717a52.273 52.273 0 0 1-19.4-81.249 52.277 52.277 0 1 0 71.111 75.539 52.25 52.25 0 0 1-51.711 5.711Z" fill="#e5f54a"/><g transform="translate(1135.87 516.267)"><path d="m67.035 59.035-18.867 6.2V38.084h17.12Z" fill="#f8a8ab"/><circle cx="18.799" cy="18.799" transform="translate(31.706 8.004)" fill="#f8a8ab" r="18.799"/><path d="M55.668 24.936c-3.147-.093-5.215-3.274-6.434-6.176s-2.48-6.236-5.4-7.433c-2.388-.979-6.6 5.645-8.479 3.881-1.966-1.84-.05-11.283 2.034-12.977S42.325.206 45.009.08a78 78 0 0 1 19.559 1.569c3.974.827 8.058 2.076 10.926 4.942 3.628 3.645 4.556 9.139 4.818 14.277.27 5.257-.034 10.757-2.591 15.357s-7.906 7.991-13.036 6.818c-.515-2.784.008-5.645.211-8.479s-.008-5.881-1.738-8.133-5.417-3.147-7.425-1.148" fill="#2f2e43"/><path d="M78.796 31.452c1.882-1.375 4.135-2.531 6.446-2.245a6.5 6.5 0 0 1 5.257 4.8 8.35 8.35 0 0 1-1.628 7.113 11.8 11.8 0 0 1-6.278 3.962 6.62 6.62 0 0 1-4.3-.034 4.373 4.373 0 0 1-2.27-5.383" fill="#2f2e43"/><path fill="#f8a8ab" d="M43.138 361.184h17.668v25.068H43.138z"/><path d="M25.926 401.423c-1.857 0-3.51-.042-4.756-.16-4.691-.43-9.171-3.9-11.424-5.923a3.2 3.2 0 0 1-.81-3.612 3.17 3.17 0 0 1 2.067-1.832l12.4-3.543 20.078-13.55.228.4a36 36 0 0 1 2.717 6.1 2.72 2.72 0 0 1-.194 2.261 2.16 2.16 0 0 1-.933.776c.363.379 1.5 1.156 5.012 1.713 5.121.81 6.2-4.5 6.248-4.717l.034-.177.152-.1c2.439-1.569 3.941-2.286 4.455-2.134.321.093.861.262 2.32 14.715a14.86 14.86 0 0 1 .473 6.961c-.751 3.46-15.871 2.27-18.9 2-.084.008-11.407.819-19.161.819h-.008Z" fill="#2f2e43"/><path fill="#f8a8ab" d="m96.126 350.822 14.991-9.35 13.266 21.271-14.992 9.35z"/><path d="M91.197 397.988a31.6 31.6 0 0 1-5.34-.49 3.21 3.21 0 0 1-2.6-2.633 3.17 3.17 0 0 1 .784-2.649l8.656-9.568 9.872-22.123.4.219a36 36 0 0 1 5.535 3.738 2.69 2.69 0 0 1 1.026 2.025 2.13 2.13 0 0 1-.379 1.156c.506.135 1.882.187 5.155-1.2 4.775-2.017 2.885-7.1 2.8-7.307l-.067-.169.076-.16c1.24-2.624 2.126-4.025 2.649-4.168.329-.093.869-.236 9.754 11.264a14.8 14.8 0 0 1 4.083 5.653c1.19 3.333-12.268 10.328-14.977 11.695-.084.067-14.167 10.3-19.956 13.213a16.85 16.85 0 0 1-7.484 1.511ZM73.818 151.553h-49.47l-4.489 46.02 19.642 170.034h25.253l-10.1-98.205 40.964 88.662 22.444-15.711-31.982-82.775s11.424-72.108 2.447-90.071-14.707-17.956-14.707-17.956Z" fill="#2f2e43"/><path d="M98.423 154.353H19.86L43.425 52.782h34.233Z" fill="#2f2e43"/><path d="M.343 50.784c-1.257-6.176 1.046-11.821 5.129-12.606s8.412 3.595 9.661 9.771a15.3 15.3 0 0 1-.244 7.441l4.969 26.249-12.842 2.034-3.535-26.089a15.5 15.5 0 0 1-3.139-6.8Z" fill="#f8a8ab"/><path d="M76.821 52.782H46.636l-20.351 40.7-7.678-30.5-16.866 1.789s3.991 59.594 21.431 57.578 58.118-55.7 53.646-69.576h.008Z" fill="#2f2e43"/><path d="M110.53 207.57c1.257 6.176-1.046 11.822-5.129 12.606s-8.412-3.595-9.661-9.771a15.3 15.3 0 0 1 .244-7.442l-4.969-26.249 12.842-2.034 3.535 26.089a15.5 15.5 0 0 1 3.139 6.8Z" fill="#f8a8ab"/><path d="M59.609 52.783s17.154-.725 18.048 0c4.683 3.823 32.148 141.785 32.148 141.785h-17.4Z" fill="#2f2e43"/></g><g transform="translate(606.503 502.092)"><path d="m56.488 132.775 17.819 35.274 53.267 24.218c5.689 9.615 23.768 10.351 25.083 4.136 1.476-6.975-21.955-18.2-21.955-18.2l-44.559-30.139-3.9-25.946Zm2.103 236.707-3.286 26.286 19.058 1.315 1.969-27.6Z" fill="#ed9da0"/><path d="M61.218 391.826a51.6 51.6 0 0 1-4.7-5.751c-2.728-3.78-5.152 15.608-5.152 15.608s-2.629 7.886-1.969 11.829 15.771 3.943 18.4 3.288 15.771 0 15.771 0h19.715c17.087-7.886 0-13.143 0-13.143-5.258-.657-23-17.087-23-17.087l-3.943-7.229c-2.628-.657-5.258 9.2-5.258 9.2Z" fill="#2f2e43"/><path d="m9.302 369.811-3.288 26.285 19.059 1.315 1.969-27.6Z" fill="#ed9da0"/><path d="M11.932 392.156a52 52 0 0 1-4.7-5.751c-2.731-3.78-5.154 15.608-5.154 15.608S-.55 409.242.109 413.185s15.771 3.939 18.4 3.288 15.771.657 15.771.657h19.715c17.087-7.886 0-13.144 0-13.144-5.258-.658-23-17.087-23-17.087l-3.943-7.229c-2.628-.657-5.258 9.2-5.258 9.2ZM30.99 200.263c-2.629 3.288-1.314 14.458-1.314 14.458s-4.6 36.144-2.628 39.43-1.314 5.914-3.288 10.515-3.944 15.771-3.944 15.771c-11.172 9.2-10.515 51.259-10.515 51.259l-3.939 37.458c1.314 3.943 19.715 4.6 22.345 3.943s10.515-59.8 10.515-59.8l17.743-33.516s-1.314 89.374-1.314 93.32 17.743 1.969 21.686 1.969 3.943-65.717 3.943-65.717l3.943-17.085 21.03-78.2v-9.2l-3.288-4.6s-68.347-3.291-70.975-.005" fill="#2f2e43"/><path d="M70.091 40.243c-4.129 9.2-1.685 22.042 6.576 36.144l-33.516-15.77 5.258-4.6-1.311-13.141Z" fill="#ed9da0"/><circle cx="20.373" cy="20.373" transform="translate(39.531 10.343)" fill="#ed9da0" r="20.373"/><path d="M70.091 61.272c4.389 2.609 7.014 7.4 8.521 12.282a116.4 116.4 0 0 1 5 27.807l1.591 28.253 19.715 74.918c-17.085 14.458-26.94 11.172-49.944-.657s-25.63 3.946-25.63 3.946-1.969-.657 0-2.628 0 0-1.969-1.969 0 0 .657-1.969 0-.658-.657-1.314 2.628-6.576 2.628-6.576l-5.255-49.29-6.576-69.659c7.886-9.858 30.228-18.4 30.228-18.4l20.376 14.458c6.576 2.628 1.314-7.886 1.314-7.886Z" fill="#e5f54a"/><path d="m7.332 116.146-2.628 39.43 33.519 47.973c0 11.172 5.914 13.8 5.914 13.8a87 87 0 0 0 5.914-11.172c3.288-7.229-1.969-13.143-1.969-13.143l-23-48.629 9.858-24.315Z" fill="#ed9da0"/><path d="M18.498 74.745c-11.172 3.943-13.143 46.66-13.143 46.66 13.143-7.229 28.915 4.6 28.915 4.6s3.288-11.172 7.229-25.629a25.12 25.12 0 0 0-5.258-23.659s-6.565-5.914-17.743-1.972" fill="#e5f54a"/><path d="M54.267 31.062c2.266.295 3.975-2.023 4.766-4.167s1.4-4.637 3.366-5.795c2.692-1.581 6.134.321 9.211-.2 3.475-.589 5.734-4.272 5.913-7.792s-1.224-6.9-2.6-10.15l-.48 4.033A8 8 0 0 0 70.948 0l.616 5.918A6.28 6.28 0 0 0 64.343.721l.1 3.526a58.4 58.4 0 0 0-12.1-.593 19.54 19.54 0 0 0-11.125 4.289c-4.563 3.967-6.23 10.496-5.675 16.516s3.048 11.676 5.639 17.141c.651 1.374 1.553 2.925 3.064 3.1a3.09 3.09 0 0 0 3.022-2.279 8.25 8.25 0 0 0-.037-4.055 17.2 17.2 0 0 1-.5-6.136c.358-2.033 1.822-4.043 3.871-4.291s4.147 2.094 3.162 3.911Z" fill="#2f2e43"/><path d="m125.037 217.912 33.429-64.009a5.247 5.247 0 0 1 7.072-2.219l48.523 25.342a5.247 5.247 0 0 1 2.219 7.072l-33.429 64.009a5.247 5.247 0 0 1-7.072 2.219l-48.523-25.343a5.247 5.247 0 0 1-2.219-7.071" fill="#e6e6e6"/></g></g></svg>
          </div>
        </div>
      </section>
    </main>
  );
}
