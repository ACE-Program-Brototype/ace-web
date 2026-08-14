import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const revealVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const FAQS = [
  {
    q: 'Who is eligible for the ACE track?',
    a: 'Eligibility is reserved for candidates who demonstrate exceptional aptitude and a documented history of high performance in their respective fields. Specific prerequisites vary by cohort, but generally require prior foundational experience.',
  },
  {
    q: 'What does the selection process look like?',
    a: 'The process is multi-staged, beginning with an initial dossier review, followed by technical assessments, and concluding with a series of interviews with our senior Handlers to ensure cultural and academic alignment.',
  },
  {
    q: 'How are monthly reviews conducted?',
    a: 'Monthly reviews are comprehensive evaluations of project deliverables, conceptual grasp, and peer collaboration. They are conducted in a board-style format where candidates defend their methodologies to a panel.',
  },
  {
    q: 'Can I apply if I am in a different batch?',
    a: 'Cross-batch transfers are considered on a case-by-case basis and require endorsement from your current primary Handler along with a formal portfolio submission.',
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
                  { id: 'name',    label: 'Full Name',               type: 'text',  ph: 'John Doe'          },
                  { id: 'email',   label: 'Email Address',            type: 'email', ph: 'john@example.com'  },
                  { id: 'phone',   label: 'Phone Number (Optional)',   type: 'tel',   ph: '+91 98765 43210'   },
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

        {/* Direct Departments */}
        <motion.section
          className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-section-gap"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <div className="border-t border-outline-variant pt-16">
            <motion.h3 variants={revealVariant} className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-8 tracking-widest">
              Direct Departments
            </motion.h3>
            <motion.div variants={revealVariant} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'General Inquiries', email: 'hello@ace.brototype.com' },
                { title: 'Partnerships',      email: 'partners@ace.brototype.com' },
              ].map(d => (
                <div key={d.title} className="p-8 border border-outline-variant bg-surface hover:bg-surface-container-low transition-colors">
                  <h4 className="font-headline-md text-headline-md text-primary mb-2">{d.title}</h4>
                  <a
                    className="font-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
                    href={`mailto:${d.email}`}
                  >
                    {d.email}
                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
