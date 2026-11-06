import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import ErrorToast from './ErrorToast';

import { logger } from '../utils/logger';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const DOMAIN_OPTIONS = [
  'MERN',
  'MEAN',
  'Python Django',
  'Dot Net',
  'Golang',
  'Datascience',
  'Machine Learning',
  'Software Testing',
  'Game Development',
  'Java Spring Boot',
  'Flutter',
  'Android Kotlin',
  'Devops',
  'Cyber Security',
  'Swift IOS',
];

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      isBrototypeStudent: 'no',
      domain: '',
    },
  });
  const [sent, setSent] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isBrototypeStudent = watch('isBrototypeStudent');
  const selectedDomain = watch('domain');

  useEffect(() => {
    if (isBrototypeStudent !== 'yes') {
      unregister('batchNumber');
      unregister('domain');
      setDropdownOpen(false);
    }
  }, [isBrototypeStudent, unregister]);

  // Handle click outside and Escape key to close custom dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const handleSelectDomain = (domainValue) => {
    setValue('domain', domainValue, { shouldValidate: true, shouldDirty: true });
    setDropdownOpen(false);
  };

  const onSubmit = async data => {
    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      isBrototypeStudent: data.isBrototypeStudent,
      ...(data.isBrototypeStudent === 'yes' && {
        batchNumber: data.batchNumber,
        domain: data.domain,
      }),
      ...(data.message && { message: data.message }),
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 400) {
        const firstError = result.errors
          ? Object.values(result.errors)[0]
          : result.message || 'Submission failed. Please check your details.';
        toast.custom((t) => <ErrorToast t={t} message={firstError} />, { duration: 3000 });
        logger.error('Contact Form validation error', null, {
          context: 'ContactForm.onSubmit',
          errors: result.errors,
        });
        return;
      }

      if (!response.ok) {
        throw new Error(`Submission failed with HTTP ${response.status}: ${response.statusText}`);
      }

      logger.info('Contact Form submission succeeded', {
        studentType: data?.isBrototypeStudent,
        hasPhone: Boolean(data?.phone),
        duplicate: Boolean(result.duplicate),
        domain: data?.domain,
      });

      if (result.duplicate) {
        setIsDuplicate(true);
      }
      setSent(true);
    } catch (error) {
      logger.error('Contact Form submission failed', error, {
        context: 'ContactForm.onSubmit',
        studentType: data?.isBrototypeStudent,
        hasBatch: Boolean(data?.batchNumber),
        hasDomain: Boolean(data?.domain),
      });
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
        <motion.h2 variants={revealVariant} className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary mb-6 md:mb-10 pb-3 md:pb-4 border-b border-outline-variant">
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
              <span className="material-symbols-outlined text-primary text-3xl">
                {isDuplicate ? 'info' : 'check_circle'}
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                {isDuplicate ? 'Already Received' : 'Enquiry Submitted'}
              </span>
            </motion.div>
            <motion.h3
              variants={revealVariant}
              className="font-headline-lg text-headline-lg-mobile text-primary mb-4 leading-tight"
            >
              {isDuplicate ? (
                <>We already have you on file.</>
              ) : (
                <>Message received. <br /><span className="text-on-surface-variant">We'll be in touch.</span></>
              )}
            </motion.h3>
            <motion.p
              variants={revealVariant}
              className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed"
            >
              {isDuplicate
                ? 'It looks like we already received an enquiry from you. Our team is actively reviewing it and will be in touch very soon.'
                : 'Our team will review your enquiry and get back to you as soon as possible.'}
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
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-base text-on-surface transition-colors rounded-none placeholder:text-outline placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base outline-none"
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
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-base text-on-surface transition-colors rounded-none placeholder:text-outline placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                {...register('phone', {
                  required: 'Phone number is required',
                  setValueAs: v => (v ? v.trim().replace(/\s+/g, '') : v),
                  validate: value => {
                    if (!value) return 'Phone number is required';
                    if (!/^\d{10,15}$/.test(value)) return 'Must be 10–15 digits (no spaces or symbols)';
                    return true;
                  }
                })}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-base text-on-surface transition-colors rounded-none placeholder:text-outline placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base outline-none"
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
                  className={`space-y-8 ${dropdownOpen ? 'overflow-visible' : 'overflow-hidden'}`}
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
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-base text-on-surface transition-colors rounded-none placeholder:text-outline placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base outline-none uppercase"
                    />
                    {errors.batchNumber && <p className="text-red-500 text-sm mt-1">{errors.batchNumber.message}</p>}
                  </div>

                  <div className="relative group" ref={dropdownRef}>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="domain-select">
                      Domain
                    </label>

                    {/* Hidden input to maintain react-hook-form registration and validation */}
                    <input
                      type="hidden"
                      {...register('domain', {
                        required: 'Domain is required',
                      })}
                    />

                    <button
                      id="domain-select"
                      type="button"
                      onClick={() => setDropdownOpen(prev => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                      className={`w-full bg-transparent border-0 border-b py-3 font-body-md text-base transition-colors rounded-none outline-none flex items-center justify-between cursor-pointer select-none text-left ${
                        dropdownOpen
                          ? 'border-primary'
                          : 'border-outline-variant hover:border-outline'
                      } ${selectedDomain ? 'text-on-surface' : 'text-outline'}`}
                    >
                      <span className="truncate">
                        {selectedDomain || 'Select your domain'}
                      </span>
                      <svg
                        className={`w-4 h-4 text-on-surface-variant shrink-0 ml-2 transition-transform duration-200 ease-out ${
                          dropdownOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.99 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 right-0 mt-2 z-30 bg-surface-container-lowest border border-outline-variant shadow-[0_12px_32px_rgba(0,44,95,0.08)] max-h-60 overflow-y-auto"
                          role="listbox"
                        >
                          {DOMAIN_OPTIONS.map(option => {
                            const isSelected = selectedDomain === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleSelectDomain(option)}
                                className={`w-full text-left px-4 py-3 font-body-md text-sm sm:text-base flex items-center justify-between transition-colors border-b border-outline-variant/30 last:border-b-0 ${
                                  isSelected
                                    ? 'bg-primary-soft text-primary font-medium'
                                    : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                                }`}
                              >
                                <span>{option}</span>
                                {isSelected && (
                                  <svg
                                    className="w-4 h-4 text-primary shrink-0 ml-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain.message}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2" htmlFor="message">Your Message (Optional)</label>
              <textarea
                id="message"
                rows={4}
                placeholder="How can we assist you?"
                {...register('message', {
                  setValueAs: v => (v ? v.trim() : v),
                  maxLength: { value: 2000, message: 'Message cannot exceed 2000 characters' },
                })}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 font-body-md text-base text-on-surface transition-colors rounded-none placeholder:text-outline placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base resize-none outline-none"
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
