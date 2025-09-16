import { useState, useRef } from "react";
import Button from "../Elements/atoms/Button";
import { motion, useInView } from "framer-motion";

// Add interfaces for type safety
interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
  gradient: string;
}

interface SocialMediaItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  hoverColor: string;
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  
  // Refs for scroll animations
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  // Check if sections are in view
  const isContactInView = useInView(contactRef, { once: true, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.2 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xpwaalpo", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: "", email: "", message: "" });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        // Clear error message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo: ContactInfoItem[] = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "baa7uaajii@gmail.com",
      link: "mailto:baa7uaajii@gmail.com",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      value: "+62 812 3456 7890",
      link: "tel:+6281234567890",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      value: "Bogor, Indonesia",
      link: "https://goo.gl/maps/vC8PKkLiio7zLn8S6",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const socialMedia: SocialMediaItem[] = [
    {
      name: "GitHub",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
        </svg>
      ),
      href: "https://github.com/M-Bayu-Aji",
      color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
      hoverColor: "hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
        </svg>
      ),
      href: "https://linkedin.com/in/baayuaaji",
      color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
      hoverColor: "hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700"
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
        </svg>
      ),
      href: "https://instagram.com/baayuaajii",
      color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
      hoverColor: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white"
    }
  ];

  return (
    <motion.section 
      ref={contactRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800" 
      id="contact"
    >
      {/* Enhanced background decorations for both light and dark modes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isContactInView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-0 bg-blue-100 rounded-full left-1/4 w-72 h-72 dark:bg-blue-900/20 mix-blend-multiply dark:mix-blend-soft-light blur-3xl opacity-70 dark:opacity-30 animate-blob"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isContactInView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute top-0 bg-purple-100 rounded-full right-1/4 w-72 h-72 dark:bg-purple-900/20 mix-blend-multiply dark:mix-blend-soft-light blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isContactInView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="absolute bottom-0 bg-pink-100 rounded-full left-1/3 w-72 h-72 dark:bg-pink-900/20 mix-blend-multiply dark:mix-blend-soft-light blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"
        ></motion.div>
      </div>
      
      <div className="container relative px-4 mx-auto max-w-7xl">
        {/* Enhanced section header with better dark mode support */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center px-6 py-3 mb-6 text-sm font-medium text-blue-700 border rounded-full bg-blue-50/80 backdrop-blur-sm border-blue-200/50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Mari Terhubung
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white font-bricolage"
          >
            Ayo{" "}
            <span className="relative inline-block font-bricolage">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                Berkolaborasi
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={isContactInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400"
              ></motion.span>
            </span>
          </motion.h2>
          
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Siap membantu mewujudkan visi digital Anda. Mari ciptakan sesuatu yang luar biasa bersama-sama.
          </p>
        </motion.div>
        
        {/* Redesigned main content grid with swapped column positions */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left column - Contact form (now on the left) */}
          <div ref={formRef} className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden bg-white shadow-xl rounded-2xl dark:bg-gray-800 dark:shadow-gray-900/30"
            >
              <div className="relative">
                {/* Form header with gradient bar on top */}
                <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                <div className="p-8 sm:p-10">
                  <div className="mb-8">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                      Kirim Pesan
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Punya proyek menarik? Mari kita diskusikan bersama.
                    </p>
                  </div>
                  
                  {/* Status messages with improved styling */}
                  {submitStatus === 'success' && (
                    <div className="p-4 mb-8 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800" role="alert" aria-live="polite">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Pesan Terkirim!</h3>
                          <p className="text-sm text-green-700 dark:text-green-400">Terima kasih atas pesan Anda. Saya akan segera menghubungi Anda.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 mb-8 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800" role="alert" aria-live="polite">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Pengiriman Gagal</h3>
                          <p className="text-sm text-red-700 dark:text-red-400">Maaf, pesan Anda tidak dapat dikirim. Silakan coba lagi nanti.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Enhanced contact form */}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Form container with subtle background for better organization */}
                    <div className="p-6 bg-gray-50 rounded-xl dark:bg-gray-800/50">
                      <div className="grid gap-8 sm:grid-cols-2">
                        {/* Name field with improved styling */}
                        <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nama Lengkap <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              placeholder="Masukkan nama Anda"
                              required
                              aria-describedby="name-error"
                              className="block w-full py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                            />
                          </div>
                        </div>
                        
                        {/* Email field with improved styling */}
                        <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formState.email}
                              onChange={handleChange}
                              placeholder="nama@email.com"
                              required
                              aria-describedby="email-error"
                              className="block w-full py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Message field with improved styling */}
                      <div className="mt-8">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Pesan Anda <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-3.5 left-3.5 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                            </svg>
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Ceritakan tentang proyek atau ide Anda..."
                            required
                            aria-describedby="message-error"
                            className="block w-full py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow resize-none dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit button container */}
                    <div className="flex items-center justify-end pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3.5 font-medium text-white transition-all duration-200 rounded-lg shadow-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed dark:shadow-blue-900/30"
                      >
                        <span className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span className="font-medium">Mengirim Pesan...</span>
                            </>
                          ) : (
                            <>
                              <span className="font-medium">Kirim Pesan</span>
                              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </>
                          )}
                        </span>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Contact info (now on the right) */}
          <div ref={infoRef} className="space-y-8 lg:col-span-5 lg:pl-8">
            {/* Contact cards with improved design */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Informasi Kontak
              </h3>
              
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-80"></div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300 z-0`}></div>
                  
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 flex items-center gap-6 p-6"
                  >
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-white dark:bg-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {item.title}
                      </h4>
                      <p className="text-xs font-medium text-gray-900 transition-colors duration-300 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.value}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              ))}
            </motion.div>
            
            {/* Social media with improved styling */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 bg-white shadow-lg rounded-2xl dark:bg-gray-800 dark:shadow-gray-900/20"
            >
              <h4 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
                Temukan Saya di
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialMedia.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-sm transition-all duration-300 ${platform.color} ${platform.hoverColor} hover:scale-110 hover:shadow-md`}
                    title={platform.name}
                    aria-label={platform.name}
                  >
                    {platform.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
