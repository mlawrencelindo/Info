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

const IconLink = ({ href, icon: Icon, label }) => (
  <motion.a
    variants={fadeUp}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group relative p-4 border border-black/5 hover:border-black/20 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 flex items-center justify-center"
  >
    <Icon size={22} strokeWidth={1.2} className="text-black/60 group-hover:text-black transition-colors" />
    <span className="absolute -bottom-8 scale-0 group-hover:scale-100 transition-transform text-[10px] uppercase tracking-widest font-bold text-black/40 whitespace-nowrap">
      {label}
    </span>
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
    <div className="min-h-screen bg-[#f9f9f9] text-[#121212] selection:bg-[#121212] selection:text-white flex flex-col items-center">
      {/* Navigation - Minimal */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold pointer-events-auto">M.L. Lindo</span>
        <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.5em] font-bold border-b border-white/30 pb-1 pointer-events-auto hover:border-white transition-colors">Book</a>
      </nav>

      <main className="px-8 md:px-24 pt-48 pb-24 max-w-screen-xl mx-auto flex flex-col items-center text-center">
        {/* Hero Section - Centered */}
        <section className="mb-48 w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex flex-col items-center"
          >
            <motion.span variants={fadeUp} className="text-[10px] uppercase tracking-[0.6em] text-black/40 font-bold mb-10 block underline decoration-black/10 underline-offset-8">
              Available for Collaboration
            </motion.span>
            
            <motion.h1 variants={fadeUp} className="text-[clamp(3rem,8vw,6rem)] leading-[1.1] tracking-tighter mb-12 font-serif italic max-w-3xl">
              {name}
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-xl md:text-2xl font-light leading-snug text-black/50 max-w-xl mb-16"
            >
              Expert <span className="text-black font-medium">{bio}</span> focusing on the intersection of architecture, performance, and reliability.
            </motion.p>

            {/* Icon Row */}
            <motion.div 
              variants={stagger}
              className="flex gap-6 mb-24"
            >
              <IconLink href={`mailto:${email}`} icon={Mail} label="Email" />
              <IconLink href={linkedin} icon={Linkedin} label="LinkedIn" />
              <IconLink href={github} icon={Github} label="GitHub" />
              <IconLink href={whatsapp} icon={MessageSquare} label="WhatsApp" />
            </motion.div>
          </motion.div>
        </section>

        {/* Booking Card - Minimal & Focused */}
        <section className="w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative bg-white border border-black/[0.03] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.02)] rounded-3xl overflow-hidden p-12 md:p-20 flex flex-col items-center group"
          >
            <Calendar size={32} strokeWidth={1} className="text-black/20 mb-10" />
            
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">Start a conversation.</h2>
            <p className="text-black/40 text-lg font-light mb-12 max-w-sm leading-relaxed">
              Book a strategic session or a brief introductory call via Notion Calendar.
            </p>
            
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={bookingLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-black text-white px-10 py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black/90 transition-all shadow-xl shadow-black/10 flex items-center gap-4"
            >
              Reserve a Slot <ArrowUpRight size={14} />
            </motion.a>

            <div className="absolute -bottom-10 -right-10 text-[10rem] font-serif italic text-black/[0.01] pointer-events-none select-none">
              Meet
            </div>
          </motion.div>
        </section>

        {/* Footer - Minimal */}
        <footer className="mt-64 w-full pt-12 border-t border-black/5 flex flex-col items-center gap-6">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-black/20 italic">Designed with precision</span>
          <div className="flex flex-col gap-2 items-center">
             <span className="text-[10px] uppercase tracking-[0.5em] font-bold">© 2026 {name}</span>
             <span className="text-black/30 text-[9px] font-light tracking-widest uppercase">Manila, Philippines</span>
          </div>
        </footer>
      </main>
      
      {/* Decorative grain/noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.012] contrast-150 brightness-100 z-[9999]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
}

export default App;
