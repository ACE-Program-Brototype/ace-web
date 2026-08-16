import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import Faq from '../components/Faq';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactPage() {
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
          <ContactForm />
          <Faq />
        </section>
      </main>
    </div>
  );
}
