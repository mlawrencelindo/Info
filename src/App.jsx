import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Calendar, ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    variants={fadeUp}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-between py-8 border-b border-black/5 hover:bg-black/[0.01] transition-all duration-500 px-2"
  >
    <div className="flex items-center gap-6">
      <span className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold group-hover:text-black transition-colors">
        {label}
      </span>
      <span className="text-xl font-light tracking-tight text-black/80 group-hover:text-black transition-colors italic font-serif">
        {label === 'Email' ? 'Reach Out' : label}
      </span>
    </div>
    <div className="relative overflow-hidden w-5 h-5">
      <ArrowUpRight 
        size={20} 
        className="absolute transition-transform duration-500 transform group-hover:-translate-y-full group-hover:translate-x-full" 
      />
      <ArrowUpRight 
        size={20} 
        className="absolute transition-transform duration-500 transform translate-y-full -translate-x-full group-hover:translate-y-0 group-hover:translate-x-0" 
      />
    </div>
  </motion.a>
);

function App() {
  const name = "Mark Lawrence Lindo";
  const bio = "System Engineer";
  const email = "mlawrencelindo@gmail.com";
  const linkedin = "https://www.linkedin.com/in/mlawrencelindo/";
  const github = "https://github.com/mlawrencelindo";
  const whatsapp = "https://wa.me/639468796618";
  const bookingLink = "https://calendar.notion.so/meet/marklawrenceperezlindo/jpd814oup";

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#121212] selection:bg-[#121212] selection:text-white">
      {/* Navigation - Minimal */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold pointer-events-auto">M.L. Lindo</span>
        <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.5em] font-bold border-b border-white/30 pb-1 pointer-events-auto hover:border-white transition-colors">Book</a>
      </nav>

      <main className="px-8 md:px-24 pt-48 pb-24 max-w-screen-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-64">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-10">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
              >
                <motion.span variants={fadeUp} className="text-[10px] uppercase tracking-[0.6em] text-black/40 font-bold mb-8 block">
                  Available for Collaboration
                </motion.span>
                <motion.h1 variants={fadeUp} className="text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-tighter mb-16 font-serif italic">
                  Designing resilient systems for a digital world.
                </motion.h1>
              </motion.div>
            </div>
            
            <div className="lg:col-span-2 flex lg:justify-end items-end">
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="w-px h-32 bg-black/10 hidden lg:block"
               />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-24">
            <div className="lg:col-start-5 lg:col-span-7">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-2xl md:text-3xl font-light leading-snug text-black/60 max-w-2xl"
              >
                I am <span className="text-black font-medium">{name}</span>, a <span className="italic font-serif text-black">{bio}</span> focusing on the intersection of architecture, performance, and reliability.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact & Booking Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-12 mb-64">
          <div className="lg:col-span-5">
            <div className="sticky top-48">
              <span className="text-[10px] uppercase tracking-[0.5em] text-black/40 font-bold mb-12 block">Direct Access</span>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={stagger}
                className="flex flex-col"
              >
                <SocialLink href={`mailto:${email}`} icon={Mail} label="Email" />
                <SocialLink href={linkedin} icon={Linkedin} label="LinkedIn" />
                <SocialLink href={github} icon={Github} label="GitHub" />
                <SocialLink href={whatsapp} icon={MessageSquare} label="WhatsApp" />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-start-7 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] bg-white border border-black/[0.03] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.02)] rounded-sm overflow-hidden p-12 flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-px bg-black/20 group-hover:w-24 transition-all duration-700" />
                <Calendar size={24} strokeWidth={1} className="text-black/20" />
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight">Start a conversation.</h2>
                <p className="text-black/50 text-lg font-light mb-12 max-w-xs leading-relaxed">
                  Book a strategic session or a brief introductory call via Notion Calendar.
                </p>
                <a 
                  href={bookingLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-6 group/btn"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-black/10 pb-2 group-hover/btn:border-black transition-all duration-500">
                    Reserve a Slot
                  </span>
                  <div className="w-10 h-10 border border-black/5 rounded-full flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-all duration-500">
                    <ArrowUpRight size={16} />
                  </div>
                </a>
              </div>
              
              <div className="absolute top-1/2 -right-12 text-[15rem] font-serif italic text-black/[0.01] pointer-events-none select-none">
                Schedule
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 border-t border-black/5 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
          <div className="flex flex-col gap-4">
             <span className="text-[10px] uppercase tracking-[0.5em] font-bold">© 2026</span>
             <span className="text-black/40 text-xs font-light tracking-wide uppercase">All rights reserved</span>
          </div>
          
          <div className="flex flex-col items-end gap-4 text-right">
             <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-black/30">Location</span>
             <span className="text-sm font-light italic font-serif">Manila, Philippines</span>
          </div>
        </footer>
      </main>
      
      {/* Decorative grain/noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] contrast-150 brightness-100 z-[9999]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
}

export default App;
