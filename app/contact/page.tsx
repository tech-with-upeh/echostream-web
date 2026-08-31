"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="marketing-page">
      <section className="marketing-hero">
        <div>
          <span className="marketing-eyebrow">GET IN TOUCH</span>
          <h1>Contact Us</h1>
          <p>Have a question, feedback, or want to talk about EchoStream? Send us a message and we&apos;ll get back to you.</p>
        </div>
      </section>
      <section className="marketing-content">
        <form className="marketing-contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <label><span>Name</span><input required name="name" placeholder="Your name" /></label>
          <label><span>Email</span><input required type="email" name="email" placeholder="you@example.com" /></label>
          <label><span>Message</span><textarea required name="message" rows={7} placeholder="Tell us how we can help..." /></label>
          <button type="submit">{sent ? "Message Ready" : "Send Message"}</button>
        </form>
      </section>
    </main>
  );
}
