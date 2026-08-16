import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sent, setSent] = useState(false);

  const onSubmit = data => {
    console.log('Form data:', data);
    setSent(true);
  };

  return (
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
        <motion.form variants={revealVariant} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name', {
                required: 'Full Name is required',
                minLength: { value: 2, message: 'Must be at least 2 characters' },
                pattern: { value: /^[a-zA-Z\s]+$/, message: 'Name cannot contain digits or special characters' },
                validate: value => value.trim().length >= 2 || 'Name cannot be empty spaces'
              })}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-on-surface transition-colors rounded-none placeholder:text-outline outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address'
                }
              })}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-on-surface transition-colors rounded-none placeholder:text-outline outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="phone">Phone Number (Optional)</label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              {...register('phone', {
                setValueAs: v => (v ? v.trim() : v),
                validate: value => {
                  if (!value) return true;
                  if (/\s/.test(value)) return 'No spaces allowed';
                  if (!/^[6-9]\d{9}$/.test(value)) return 'Must be 10 digits starting with 6, 7, 8, or 9';
                  return true;
                }
              })}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-on-surface transition-colors rounded-none placeholder:text-outline outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={4}
              placeholder="How can we assist you?"
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' },
                validate: {
                  notEmpty: value => value.trim().length > 0 || 'Message cannot be empty',
                  notOnlyNumbers: value => /[^\d\s]/.test(value) || 'Message cannot contain only numbers',
                  notOnlySpecialChars: value => /[a-zA-Z0-9]/.test(value) || 'Message cannot contain only special characters'
                }
              })}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-on-surface transition-colors rounded-none placeholder:text-outline resize-none outline-none"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
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
  );
}
