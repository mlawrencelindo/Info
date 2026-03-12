import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Calendar, ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1] 
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
    className="group relative p-6 border border-white/5 hover:border-white/20 rounded-2xl bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <Icon size={24} strokeWidth={1.5} className="text-white/40 group-hover:text-white transition-colors relative z-10" />
    <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-all text-[10px] uppercase tracking-[0.2em] font-black text-white bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 whitespace-nowrap pointer-events-none z-20">
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

  // Interactive Mouse Tracker
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] selection:bg-white selection:text-black flex flex-col items-center font-sans overflow-hidden">
      
      {/* Interactive Background Gradient */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${springX}px ${springY}px, rgba(255,255,255,0.03), transparent)`
        }}
      />
      
      {/* Moving Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0],
          y: [0, 120, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center pointer-events-none">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[11px] uppercase tracking-[0.4em] font-black pointer-events-auto bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl"
        >
          M.L. Lindo
        </motion.span>
        <motion.a 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href={bookingLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group text-[11px] uppercase tracking-[0.4em] font-black pointer-events-auto bg-white text-black px-8 py-3 rounded-full hover:scale-105 transition-all shadow-2xl shadow-white/5 flex items-center gap-2"
        >
          Book <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </nav>

      <main className="relative z-10 px-8 md:px-24 pt-48 pb-24 max-w-screen-xl mx-auto flex flex-col items-center text-center w-full">
        
        {/* Hero Section */}
        <section className="mb-48 w-full max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex flex-col items-center w-full"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
              <span className="w-12 h-px bg-white/10"></span>
              <span className="text-[11px] uppercase tracking-[0.6em] text-white/30 font-black">
                Systems Engineer
              </span>
              <span className="w-12 h-px bg-white/10"></span>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp} 
              className="text-[clamp(3rem,9vw,7rem)] leading-none tracking-[-0.06em] mb-12 font-black uppercase"
            >
              {name}
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl font-medium leading-relaxed text-white/40 max-w-2xl mb-20 uppercase tracking-[0.1em]"
            >
              Architecting high-performance <span className="text-white">resilient systems</span> <br className="hidden md:block" /> with focus on scalability and precision.
            </motion.p>

            {/* Interactive Icon Row */}
            <motion.div 
              variants={stagger}
              className="flex flex-wrap justify-center gap-6 mb-24"
            >
              <IconLink href={`mailto:${email}`} icon={Mail} label="Email" />
              <IconLink href={linkedin} icon={Linkedin} label="LinkedIn" />
              <IconLink href={github} icon={Github} label="GitHub" />
              <IconLink href={whatsapp} icon={MessageSquare} label="WhatsApp" />
            </motion.div>
          </motion.div>
        </section>

        {/* Booking Section */}
        <section className="w-full max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden p-12 md:p-24 flex flex-col items-center group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="mb-12 p-6 bg-white/[0.05] rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors"
            >
              <Calendar size={32} strokeWidth={1.5} className="text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[1.1] relative z-10">
              Work <span className="text-white/10 group-hover:text-white/20 transition-colors">Together.</span>
            </h2>
            <p className="text-white/30 text-lg font-medium mb-16 max-w-sm leading-relaxed uppercase tracking-[0.15em] text-sm relative z-10">
              Let's connect and build the next generation of digital architecture.
            </p>
            
            <motion.a 
              whileHover={{ scale: 1.05, shadow: "0 0 40px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              href={bookingLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 bg-white text-black px-16 py-7 rounded-2xl text-[12px] uppercase tracking-[0.5em] font-black hover:bg-white/90 transition-all shadow-2xl shadow-white/5 flex items-center gap-4"
            >
              Schedule Meeting <ArrowUpRight size={18} />
            </motion.a>

            {/* Dynamic Background Text */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/[0.01] pointer-events-none select-none uppercase tracking-tighter transition-all duration-1000 group-hover:text-white/[0.02] group-hover:translate-y-[-20%]">
              Connect
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="mt-64 w-full pt-20 border-t border-white/5 flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-12 text-[10px] uppercase tracking-[0.5em] font-black text-white/20">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          </div>

          <div className="flex flex-col gap-4 items-center mb-12">
             <span className="text-[11px] uppercase tracking-[0.6em] font-black text-white/40">© 2026 {name}</span>
             <div className="flex items-center gap-3">
               <span className="w-4 h-px bg-white/10"></span>
               <span className="text-white/10 text-[9px] font-bold tracking-[0.4em] uppercase italic">Engineered for Excellence</span>
               <span className="w-4 h-px bg-white/10"></span>
             </div>
          </div>
        </footer>
      </main>
      
      {/* Visual Depth Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
}

export default App;
