"use client";

import { useState } from "react";
import "./FaqSection.css";

const faqs = [
  {
    question: "What is EchoStream?",
    answer:
      "EchoStream is an AI-powered text-to-speech experience built for live creators. It helps turn audience interactions into natural, expressive voices that fit the flow and personality of your stream.",
  },
  {
    question: "Can I choose the voice used on my stream?",
    answer:
      "Yes. You can select a voice that fits your stream and fine-tune the experience around your preferences so the way messages are spoken feels consistent with your content and community.",
  },
  {
    question: "Can I control which messages are read aloud?",
    answer:
      "Yes. EchoStream is designed around stream preferences and audience controls, giving you the ability to decide how interactions are handled before they are spoken on your stream.",
  },
  {
    question: "Is EchoStream only for large streamers?",
    answer:
      "No. EchoStream is built to make live interactions more engaging whether you are just getting started or already have an established community.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <h2>FAQ&apos;s</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <button className="faq-question" type="button" onClick={() => setOpenIndex(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span className="faq-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  <span>{faq.question}</span>
                </button>
                {isOpen && <div className="faq-answer-wrap"><div className="faq-answer"><p>{faq.answer}</p></div></div>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
