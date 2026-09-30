import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import ErrorToast from './ErrorToast';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      isBrototypeStudent: 'no',
    },
  });
  const [sent, setSent] = useState(false);

  const isBrototypeStudent = watch('isBrototypeStudent');

  useEffect(() => {
    if (isBrototypeStudent !== 'yes') {
      unregister('batchNumber');
      unregister('counsellorName');
    }
  }, [isBrototypeStudent, unregister]);

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data.isBrototypeStudent !== 'yes' && ['batchNumber', 'counsellorName'].includes(key)) {
          return;
        }
        formData.append(key, data[key]);
      });
      // throw new Error("Message sent failed!!!!");
      await fetch(import.meta.env.VITE_CONTACT_FORM_WEB_APP_URL, {
        method: 'POST',
        body: formData,
      });
      setSent(true);
    } catch (error) {
      console.error('Submission failed:', error);
      toast.custom((t) => <ErrorToast t={t} />, { duration: 3000 });
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <motion.div
        className="md:col-span-5 md:col-start-1 mb-16 md:mb-0 md:pr-12"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
      >
        <motion.h2 variants={revealVariant} className="font-headline-lg text-headline-lg text-primary mb-10 pb-4 border-b border-outline-variant">
          Send a Message
        </motion.h2>

        {sent ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="py-16"
          >
            <motion.div
              variants={revealVariant}
              className="w-12 h-px bg-primary mb-10"
            />
            <motion.div variants={revealVariant} className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Enquiry Submitted</span>
            </motion.div>
            <motion.h3
              variants={revealVariant}
              className="font-headline-lg text-headline-lg-mobile text-primary mb-4 leading-tight"
            >
              Message received. <br />
              <span className="text-on-surface-variant">We'll be in touch.</span>
            </motion.h3>
            <motion.p
              variants={revealVariant}
              className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed"
            >
              Our team will review your enquiry and get back to you as soon as possible.
            </motion.p>
            <motion.div
              variants={revealVariant}
              className="w-full h-px bg-outline-variant mt-12"
            />
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
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-3">
                Are you a Brototype student?
              </label>
              <div className="flex items-center gap-8 py-1">
                <label className="inline-flex items-center gap-2.5 cursor-pointer font-body-md text-on-surface select-none group">
                  <input
                    type="radio"
                    value="yes"
                    {...register('isBrototypeStudent')}
                    className="w-4 h-4 accent-primary text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="group-hover:text-primary transition-colors">Yes</span>
                </label>
                <label className="inline-flex items-center gap-2.5 cursor-pointer font-body-md text-on-surface select-none group">
                  <input
                    type="radio"
                    value="no"
                    {...register('isBrototypeStudent')}
                    className="w-4 h-4 accent-primary text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="group-hover:text-primary transition-colors">No</span>
                </label>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {isBrototypeStudent === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8 overflow-hidden"
                >
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="batchNumber">
                      Batch Number
                    </label>
                    <input
                      id="batchNumber"
                      type="text"
                      placeholder="e.g. BCE319, BC312"
                      {...register('batchNumber', {
                        required: 'Batch number is required',
                        validate: {
                          notEmpty: value => (value && value.trim().length >= 2) || 'Batch number must be at least 2 characters',
                          validBatch: value => /^BC[a-zA-Z0-9\s-]*$/i.test(value?.trim()) || 'Batch number should start with BC (e.g. BCE319, BC312)'
                        }
                      })}
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-on-surface transition-colors rounded-none placeholder:text-outline outline-none uppercase"
                    />
                    {errors.batchNumber && <p className="text-red-500 text-sm mt-1">{errors.batchNumber.message}</p>}
                  </div>

                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="counsellorName">
                      Counsellor Name
                    </label>
                    <input
                      id="counsellorName"
                      type="text"
                      placeholder="What is the name of your counsellor?"
                      {...register('counsellorName', {
                        required: 'Counsellor name is required',
                        minLength: { value: 2, message: 'Must be at least 2 characters' },
                        pattern: { value: /^[a-zA-Z\s.]+$/, message: 'Counsellor name cannot contain digits or special characters' },
                        validate: value => (value && value.trim().length >= 2) || 'Counsellor name cannot be empty spaces'
                      })}
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-on-surface transition-colors rounded-none placeholder:text-outline outline-none"
                    />
                    {errors.counsellorName && <p className="text-red-500 text-sm mt-1">{errors.counsellorName.message}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="message">Your Message</label>
              <textarea
                id="message"
                rows={4}
                placeholder="How can we assist you?"
                {...register('message', {
                  setValueAs: v => (v ? v.trim() : v),
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' },
                  validate: {
                    notEmpty: value => value.length > 0 || 'Message cannot be empty',
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
              disabled={isSubmitting}
              className="w-full md:w-auto bg-primary text-on-primary font-body-md py-4 px-8 flex items-center justify-center md:justify-start gap-2 border border-transparent hover:border-accent hover:shadow-[0_4px_20px_rgba(252,172,4,0.25)] hover:bg-primary-dark transition-all duration-200 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
              {!isSubmitting && <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>}
            </button>
          </motion.form>
        )}
      </motion.div>
    </>
  );
}
