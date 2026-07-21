import type { Metadata } from "next";
import { COMPANY } from "@/lib/content";
import HeroBackground from "@/components/HeroBackground";

export const metadata: Metadata = {
  title: "Contact | PrimeCore Power Solutions",
  description: "Get in touch with PrimeCore Power Solutions.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <HeroBackground />
        <div className="wrap">
          <h1>Contact</h1>
          <p>Tell us about your project — we&apos;ll get back to you.</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-panel">
              <h3>Reach us directly</h3>
              <span className="contact-line">
                <span>Phone</span>
                <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a>
              </span>
              <span className="contact-line">
                <span>Email</span>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </span>
              <span className="contact-line">
                <span>Service Area</span>
                {COMPANY.serviceArea}
              </span>
            </div>
            <div className="contact-panel">
              <h3>Send a message</h3>
              <form
                className="contact-form"
                action={`mailto:${COMPANY.email}`}
                method="post"
                encType="text/plain"
              >
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="Name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="Email" type="email" required />
                </div>
                <div className="field">
                  <label htmlFor="message">Project details</label>
                  <textarea id="message" name="Message" required />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
