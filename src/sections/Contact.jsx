import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import Magnet from "../components/reactbits/Magnet";

gsap.registerPlugin(ScrollTrigger);

// ── Split-word title (top/bottom halves join together) ───────────────────────
const SplitWordTitle = ({ words }) => {
  return (
    <div className="overflow-hidden">
      {words.map((word, wi) => (
        <div
          key={wi}
          className="split-word-wrap overflow-hidden inline-block mr-4"
        >
          <span
            className="split-word block font-semibold md:text-5xl text-3xl"
            style={{ transform: "translateY(110%)", opacity: 0 }}
          >
            {word}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const Contact = () => {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/m4n1kya2005@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (response.ok) {
        alert("Message sent successfully! I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("FormSubmit Error:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Split-word title animation: each word rises into place
      gsap.to(".split-word", {
        y: "0%",
        opacity: 1,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".split-word",
          start: "top 85%",
          once: true,
        },
      });

      // Hero badge fade-in
      gsap.fromTo(
        ".contact-badge",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-badge", start: "top 88%", once: true },
        }
      );

      // Form fields: stagger fade-in from right
      gsap.fromTo(
        ".contact-form-field",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact-form-field",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Contact image: scale up from small
      gsap.fromTo(
        ".contact-image",
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-image",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="flex-center section-padding" ref={sectionRef}>
      <div className="w-full h-full md:px-10 px-5">
        {/* Title */}
        <div className="flex flex-col items-center gap-5 mb-16">
          <div className="hero-badge contact-badge">
            <p>Have questions or ideas? Let's talk!</p>
          </div>
          <SplitWordTitle words={["Get in Touch", "—", "Let's Connect"]} />
        </div>

        <div className="grid-12-cols mt-16 gap-10">
          {/* Form */}
          <div className="xl:col-span-6">
            <SpotlightCard
              className="bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-10 h-full"
              spotlightColor="rgba(217, 236, 255, 0.07)"
              borderColor="rgba(217, 236, 255, 0.25)"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
                <div className="contact-form-field">
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>
                <div className="w-full contact-form-field">
                  <Magnet padding={30} magnetStrength={3} className="w-full">
                    <button type="submit" className="w-full">
                      <div className="cta-button group w-full">
                        <div className="bg-circle" />
                        <p className="text">{loading ? "Sending..." : "Send Message"}</p>
                        <div className="arrow-wrapper">
                          <img src="/images/arrow-down.svg" alt="arrow" />
                        </div>
                      </div>
                    </button>
                  </Magnet>
                </div>
              </form>
            </SpotlightCard>
          </div>

          {/* Image */}
          <div className="xl:col-span-6 min-h-96 w-full h-full flex justify-center items-center">
            <img
              src="/images/contact-office.jpg"
              alt="Minimalist Office Setup"
              className="contact-image relative z-10 w-full h-full object-cover rounded-3xl shadow-xl border border-white/10 bg-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
