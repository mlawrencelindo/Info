import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Calendar, ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.08
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
    className="group relative p-5 border border-black/5 hover:border-black/10 rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 flex items-center justify-center"
  >
    <Icon size={20} strokeWidth={1.5} className="text-black/40 group-hover:text-black transition-colors" />
    <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all text-[10px] uppercase tracking-[0.2em] font-extrabold text-black bg-white px-3 py-1 rounded-full border border-black/5 shadow-sm whitespace-nowrap pointer-events-none">
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
    <div className="min-h-screen bg-[#f9f9f9] text-[#121212] selection:bg-[#121212] selection:text-white flex flex-col items-center font-sans">
      {/* Navigation - Ultra Minimal */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center pointer-events-none">
        <span className="text-[11px] uppercase tracking-[0.4em] font-black pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 shadow-sm">M.L. Lindo</span>
        <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.4em] font-black pointer-events-auto bg-black text-white px-6 py-2 rounded-full hover:bg-black/80 transition-all shadow-lg shadow-black/10">Book</a>
      </nav>

      <main className="px-8 md:px-24 pt-48 pb-24 max-w-screen-xl mx-auto flex flex-col items-center text-center w-full">
        {/* Hero Section - Clean Sans */}
        <section className="mb-48 w-full max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex flex-col items-center w-full"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
              <span className="w-8 h-[2px] bg-black/10"></span>
              <span className="text-[11px] uppercase tracking-[0.5em] text-black/40 font-black">
                Available 2026
              </span>
              <span className="w-8 h-[2px] bg-black/10"></span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.95] tracking-[-0.05em] mb-12 font-extrabold uppercase">
              {name.split(' ')[0]}<br />
              <span className="text-black/20">{name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl font-medium leading-relaxed text-black/40 max-w-2xl mb-16 uppercase tracking-[0.05em]"
            >
              Expert <span className="text-black">{bio}</span> bridging the gap between <br className="hidden md:block" /> complex architecture and seamless performance.
            </motion.p>

            {/* Icon Row - Modern Grid */}
            <motion.div 
              variants={stagger}
              className="flex flex-wrap justify-center gap-4 mb-24"
            >
              <IconLink href={`mailto:${email}`} icon={Mail} label="Email" />
              <IconLink href={linkedin} icon={Linkedin} label="LinkedIn" />
              <IconLink href={github} icon={Github} label="GitHub" />
              <IconLink href={whatsapp} icon={MessageSquare} label="WhatsApp" />
            </motion.div>
          </motion.div>
        </section>

        {/* Booking Section - Bold & Modern */}
        <section className="w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative bg-white border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] rounded-[2.5rem] overflow-hidden p-12 md:p-24 flex flex-col items-center group"
          >
            <div className="mb-10 p-4 bg-black/[0.02] rounded-2xl border border-black/5">
              <Calendar size={28} strokeWidth={1.5} className="text-black" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-8 leading-[1.1]">
              Work <span className="text-black/10">Together.</span>
            </h2>
            <p className="text-black/40 text-lg font-medium mb-14 max-w-md leading-relaxed uppercase tracking-wider text-sm">
              Ready to architect your next high-performance system? Let's connect.
            </p>
            
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={bookingLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-black text-white px-12 py-6 rounded-2xl text-[12px] uppercase tracking-[0.4em] font-black hover:bg-black/90 transition-all shadow-2xl shadow-black/20 flex items-center gap-4"
            >
              Schedule Now <ArrowUpRight size={16} />
            </motion.a>

            {/* Background Text Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-black text-black/[0.01] pointer-events-none select-none uppercase tracking-tighter">
              Meet
            </div>
          </motion.div>
        </section>

        {/* Footer - Tech Minimal */}
        <footer className="mt-64 w-full pt-16 border-t border-black/5 flex flex-col items-center gap-10">
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-black/30">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub</a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">WhatsApp</a>
          </div>

          <div className="flex flex-col gap-3 items-center">
             <span className="text-[11px] uppercase tracking-[0.5em] font-black">© 2026 {name}</span>
             <span className="text-black/20 text-[10px] font-bold tracking-[0.3em] uppercase">Built for Performance</span>
          </div>
        </footer>
      </main>
      
      {/* Subtle background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-[9999] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
}

export default App;
