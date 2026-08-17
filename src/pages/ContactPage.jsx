import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const FAQS = [
  {
    q: 'What is ACE?',
    a: 'ACE (Advanced Curriculum for Excellence) is an advanced technical and career-development program designed for high performing students to become more technically capable, consistent, and industry-ready.',
  },
  {
    q: 'How is ACE different from the regular curriculum?',
    a: 'ACE goes beyond regular learning by combining daily technical practice, weekly assessments, technical reviews, professional development, leadership, and placement preparation.',
  },
  {
    q: 'Who can join ACE?',
    a: 'Students who demonstrate the required technical foundation, commitment, and potential can be considered for ACE through the program\'s selection and evaluation process.',
  },
  {
    q: 'What does the ACE selection process involve?',
    a: 'Selection may include technical questions, problem-solving, foundation-level concepts, communication, and domain-specific evaluations to assess a candidate\'s readiness for the program.',
  },
  {
    q: 'What happens inside ACE?',
    a: 'Students work on regular technical tasks, maintain Daily Logs, participate in assessments and interview-style reviews, attend technical discussions, and continuously work on their professional and placement readiness.',
  },
  {
    q: 'How is ACE exam differ from normal exams?',
    a: 'ACE exams are conducted in an interview-style format, covering technical knowledge from fundamentals to advanced concepts while also evaluating communication, attitude, presentation, and professionalism.',
  },
  {
    q: 'What is the ACE credit system?',
    a: 'Credits track a student\'s technical performance, consistency, documentation, attitude, participation, and review performance. Credits contribute to leaderboard rankings and can affect program continuation.',
  },
  {
    q: 'What is the ACE leaderboard?',
    a: 'The leaderboard tracks student performance based on credit scores. ACE maintains monthly and overall rankings to encourage healthy competition and recognize strong performers.',
  },
  {
    q: 'What is the average package for ACE students?',
    a: 'The average package reported for ACE students is ₹9.5 LPA. However, individual placement outcomes may vary based on skills, performance, experience, and hiring opportunities.',
  },
  {
    q: 'What skills will I develop through ACE?',
    a: 'ACE helps develop technical depth, problem-solving, communication, consistency, professionalism, leadership, interview skills, and industry awareness.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-outline-variant">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-headline-md text-headline-md text-primary group-hover:text-on-surface-variant transition-colors">
          {q}
        </span>
        <span className={`material-symbols-outlined text-on-surface-variant transform transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          add
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-6 font-body-md text-body-md text-on-surface-variant">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      <main className="flex-grow">

        {/* Page Header */}
        <motion.header
          className="pt-32 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
          initial="hidden" animate="visible" variants={stagger}
        >
          <motion.h1 variants={revealVariant} className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-8 leading-tight tracking-tighter">
            Inquiries & Answers.
          </motion.h1>
          <motion.p variants={revealVariant} className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Everything you need to know about joining the ACE ecosystem, all in one place. Have a specific question? Reach out to our Handlers directly.
          </motion.p>
        </motion.header>

        {/* Core Split: Form + FAQ */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter">

          {/* Left: Contact Form */}
          <motion.div
            className="md:col-span-5 md:col-start-1 mb-16 md:mb-0 md:pr-12"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            <motion.h2 variants={revealVariant} className="font-headline-lg text-headline-lg text-primary mb-10 pb-4 border-b border-outline-variant">
              Send a Message
            </motion.h2>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center"
              >
                <span className="material-symbols-outlined text-primary text-5xl block mb-4">check_circle</span>
                <p className="font-headline-md text-headline-md text-primary">Message received.</p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <motion.form variants={revealVariant} onSubmit={handleSubmit} className="space-y-8">
                {[
                  { id: 'name', label: 'Full Name', type: 'text', ph: 'John Doe' },
                  { id: 'email', label: 'Email Address', type: 'email', ph: 'john@example.com' },
                  { id: 'phone', label: 'Phone Number (Optional)', type: 'tel', ph: '+91 98765 43210' },
                ].map(f => (
                  <div key={f.id}>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor={f.id}>{f.label}</label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required={f.id !== 'phone'}
                      placeholder={f.ph}
                      value={form[f.id]}
                      onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-on-surface transition-colors rounded-none placeholder:text-outline outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="How can we assist you?"
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-on-surface transition-colors rounded-none placeholder:text-outline resize-none outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-primary text-on-primary font-body-md py-4 px-8 flex items-center justify-center md:justify-start gap-2 hover:bg-primary/80 transition-colors duration-200 group"
                >
                  Submit Request
                  <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </motion.form>
            )}
          </motion.div>

          {/* Right: FAQ */}
          <motion.div
            className="md:col-span-6 md:col-start-7"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            <motion.h2 variants={revealVariant} className="font-headline-lg text-headline-lg text-primary mb-10 pb-4 border-b border-outline-variant">
              Frequently Asked Questions
            </motion.h2>
            <div className="border-t border-outline-variant">
              {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
