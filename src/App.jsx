import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Calendar, ArrowUpRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } }
};

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    variants={item}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-between p-6 border-b border-black/10 hover:bg-black/5 transition-colors duration-300"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-black/5 rounded-full group-hover:bg-black/10 transition-colors">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <span className="text-lg font-medium tracking-tight uppercase">{label}</span>
    </div>
    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" size={20} />
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
    <div className="min-h-screen selection:bg-black selection:text-white px-6 md:px-12 py-12 md:py-24 max-w-7xl mx-auto bg-[#fdfaf6]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-32"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-black/40 mb-4 block underline decoration-black/10 underline-offset-8">Portfolio 2026</span>
        <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter mb-12 italic text-black/90">
          {name.split(' ')[0]}<br />{name.split(' ').slice(1).join(' ')}
        </h1>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-2xl text-black/60 italic font-serif">
            {bio}
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-6 rounded-full hover:bg-black/90 transition-all font-medium uppercase tracking-widest text-xs shadow-2xl shadow-black/20"
          >
            <Calendar size={18} />
            Book a Schedule
          </motion.a>
        </div>
      </motion.div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="border-t-2 border-black"
        >
          <div className="py-8 border-b border-black/10">
            <h2 className="text-sm uppercase tracking-[0.2em] font-bold">Connect</h2>
          </div>
          <SocialLink href={`mailto:${email}`} icon={Mail} label="Gmail" />
          <SocialLink href={linkedin} icon={Linkedin} label="LinkedIn" />
          <SocialLink href={github} icon={Github} label="GitHub" />
          <SocialLink href={whatsapp} icon={MessageSquare} label="WhatsApp" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="sticky top-12"
        >
          <div className="aspect-[4/5] bg-black rounded-[3rem] overflow-hidden relative group p-12 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-12 text-white/10 group-hover:text-white/20 transition-colors">
              <Calendar size={160} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-white text-5xl font-bold italic mb-6 leading-tight">Let's build<br />something great.</h2>
              <p className="text-white/50 text-xl font-light max-w-xs leading-relaxed">
                Available for consultations, system architecture discussions, and new opportunities.
              </p>
            </div>

            <div className="relative z-10">
              <a 
                href={bookingLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-white group"
              >
                <span className="text-lg font-bold uppercase tracking-widest border-b-2 border-white/30 group-hover:border-white transition-all pb-1">
                  Schedule via Notion
                </span>
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="mt-48 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-black/40 text-xs uppercase tracking-[0.3em] font-bold">
        <span>© 2026 {name}</span>
        <div className="flex gap-8">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LI</a>
          <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GH</a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">WA</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
