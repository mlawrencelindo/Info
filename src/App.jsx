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
    className="group relative p-5 border border-white/5 hover:border-white/20 rounded-2xl bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <Icon size={22} strokeWidth={1.5} className="text-white/40 group-hover:text-white transition-colors relative z-10" />
    <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-all text-[10px] uppercase tracking-[0.2em] font-black text-white bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 whitespace-nowrap pointer-events-none z-20">
      {label}
    </span>
  </motion.a>
);

function App() {
  const name = "Mark Lindo";
  const bio = "Building the future of resilient architecture. I'm always open to new ideas—let's connect and create something exceptional together.";
  const email = "mlawrencelindo@gmail.com";
  const linkedin = "https://www.linkedin.com/in/mlawrencelindo/";
  const github = "https://github.com/mlawrencelindo";
  const whatsapp = "https://wa.me/639468796618";
  const bookingLink = "https://calendar.notion.so/meet/marklawrenceperezlindo/jpd814oup";

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
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] selection:bg-white selection:text-black font-sans overflow-hidden flex items-center justify-center">
      
      {/* Interactive Background */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${springX}px ${springY}px, rgba(255,255,255,0.03), transparent)`
        }}
      />
      
      <main className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 md:px-24 py-24 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-12 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex flex-col items-start text-left space-y-12"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <span className="w-12 h-px bg-white/10"></span>
            <span className="text-[11px] uppercase tracking-[0.6em] text-white/30 font-black">
              Systems Engineer
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp} 
            className="text-[clamp(3rem,8vw,6.5rem)] leading-none tracking-[0.25em] font-black uppercase"
          >
            {name}
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl font-medium leading-relaxed text-white/40 max-w-xl uppercase tracking-[0.1em]"
          >
            {bio.split('—').map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br className="hidden md:block" />}
                {i > 0 ? `— ${part}` : part}
              </React.Fragment>
            ))}
          </motion.p>

          <motion.div 
            variants={stagger}
            className="flex flex-wrap gap-4 pt-4"
          >
            <IconLink href={`mailto:${email}`} icon={Mail} label="Email" />
            <IconLink href={linkedin} icon={Linkedin} label="LinkedIn" />
            <IconLink href={github} icon={Github} label="GitHub" />
            <IconLink href={whatsapp} icon={MessageSquare} label="WhatsApp" />
          </motion.div>
        </motion.div>

        {/* Right Side: Booking */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden p-12 md:p-16 flex flex-col items-center group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="mb-8 p-6 bg-white/[0.05] rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors"
            >
              <Calendar size={32} strokeWidth={1.5} className="text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight text-center">
              Work <span className="text-white/10 group-hover:text-white/20 transition-colors">Together.</span>
            </h2>
            
            <p className="text-white/30 text-sm font-medium mb-12 max-w-xs leading-relaxed uppercase tracking-[0.15em] text-center">
              Let's connect and build the next generation of digital architecture.
            </p>
            
            <motion.a 
              whileHover={{ scale: 1.05, shadow: "0 0 40px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              href={bookingLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black px-12 py-6 rounded-2xl text-[11px] uppercase tracking-[0.5em] font-black hover:bg-white/90 transition-all shadow-2xl flex items-center gap-4"
            >
              Schedule <ArrowUpRight size={18} />
            </motion.a>

            <div className="absolute bottom-[-5%] right-[-5%] text-[10rem] font-black text-white/[0.01] pointer-events-none select-none uppercase tracking-tighter group-hover:text-white/[0.02] transition-all duration-1000">
              Meet
            </div>
          </div>

          {/* Decorative elements behind the card */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
      </main>
      
      {/* Footer (Floating/Minimal) */}
      <footer className="fixed bottom-12 left-12 md:left-24 z-20">
        <span className="text-[9px] uppercase tracking-[0.6em] font-black text-white/20 italic">
          © 2026 Mark Lindo — Manila, PH
        </span>
      </footer>

      {/* Depth Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
}

export default App;
