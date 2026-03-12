import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Calendar, ArrowUpRight, X, Loader2 } from 'lucide-react';

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
    className="group relative p-4 border border-white/5 hover:border-white/20 rounded-xl bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <Icon size={20} strokeWidth={1.5} className="text-white/40 group-hover:text-white transition-colors relative z-10" />
    <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all text-[9px] uppercase tracking-[0.2em] font-black text-white bg-white/10 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10 whitespace-nowrap pointer-events-none z-20">
      {label}
    </span>
  </motion.a>
);

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.radius = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          this.x -= dx * 0.005;
          this.y -= dy * 0.005;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

function App() {
  const name = "Mark Lindo";
  const bio = "Architecting resilient systems. Let's build something exceptional together.";
  const email = "mlawrencelindo@gmail.com";
  const linkedin = "https://www.linkedin.com/in/mlawrencelindo/";
  const github = "https://github.com/mlawrencelindo";
  const whatsapp = "https://wa.me/639468796618";
  const bookingLink = "https://calendar.notion.so/meet/marklawrenceperezlindo/jpd814oup";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [minLoadComplete, setMinLoadComplete] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setMinLoadComplete(false);
      setShowFallback(false);
      
      const minLoadTimer = setTimeout(() => {
        setMinLoadComplete(true);
      }, 1500);

      const fallbackTimer = setTimeout(() => {
        setIsLoading(prevLoading => {
          if (prevLoading) setShowFallback(true);
          return prevLoading;
        });
      }, 10000);
      
      return () => {
        clearTimeout(minLoadTimer);
        clearTimeout(fallbackTimer);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setShowFallback(false);
  };

  const showIframe = !isLoading && minLoadComplete;

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
      <InteractiveBackground />
      <motion.div 
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${springX}px ${springY}px, rgba(255,255,255,0.03), transparent)`
        }}
      />
      
      <main className="relative z-10 w-full max-w-screen-xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-20 items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex flex-col items-start text-left space-y-8"
        >
          <motion.div variants={fadeUp}>
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-black">
              Systems Engineer
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp} 
            className="text-[clamp(2rem,7vw,4.5rem)] leading-none tracking-[0.25em] font-black uppercase whitespace-nowrap"
          >
            {name}
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-base md:text-lg font-medium leading-relaxed text-white/40 max-w-lg uppercase tracking-[0.1em]"
          >
            {bio}
          </motion.p>

          <motion.div 
            variants={stagger}
            className="flex flex-wrap gap-3 pt-2"
          >
            <IconLink href={`mailto:${email}`} icon={Mail} label="Email" />
            <IconLink href={linkedin} icon={Linkedin} label="LinkedIn" />
            <IconLink href={github} icon={Github} label="GitHub" />
            <IconLink href={whatsapp} icon={MessageSquare} label="WhatsApp" />
          </motion.div>
        </motion.div>

        <div className="hidden lg:block w-px h-100 bg-white/5 self-center"></div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-4"
        >
          <div className="absolute top-0 left-1/4 w-2 h-6 bg-white/10 rounded-full z-20"></div>
          <div className="absolute top-0 right-1/4 w-2 h-6 bg-white/10 rounded-full z-20"></div>

          <div className="relative bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden p-12 md:p-16 flex flex-col items-center group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight text-center whitespace-nowrap relative z-10">
              Work <span className="text-white/10">Together.</span>
            </h2>
            <p className="text-white/30 text-xs font-medium mb-12 max-w-xs leading-relaxed uppercase tracking-[0.15em] text-center relative z-10">
              Let's connect and build the next generation of digital architecture.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, shadow: "0 0 40px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-12 py-6 rounded-2xl text-[10px] uppercase tracking-[0.5em] font-black hover:bg-white/90 transition-all shadow-2xl flex items-center gap-3 relative z-10 cursor-pointer"
            >
              Schedule <ArrowUpRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl h-full max-h-[85vh] bg-[#ffffff] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 flex justify-between items-center bg-white border-b border-black/5 z-20">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <Calendar size={14} className="text-white" />
                   </div>
                   <span className="text-[10px] uppercase tracking-[0.3em] font-black text-black">Booking — Notion Calendar</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors group"
                >
                  <X size={20} className="text-black transition-transform group-hover:rotate-90 duration-300" />
                </button>
              </div>

              <div className="flex-1 w-full relative bg-[#050505] overflow-hidden hide-scrollbar">
                {!showIframe && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]">
                    <div className="relative w-32 h-32">
                      <motion.div 
                        animate={{ rotate: 45, scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 m-auto w-10 h-10 border-2 border-white"
                      />
                      <motion.div 
                        animate={{ rotate: -45, scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 m-auto w-16 h-16 border border-white/10"
                      />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[3px] border-dotted border-white/5 rounded-full"
                      />
                      <motion.div 
                        animate={{ scale: [0.5, 1.5], opacity: [0.4, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 border border-white/20 rounded-full"
                      />
                    </div>
                  </div>
                )}
                <iframe
                  src={bookingLink}
                  onLoad={handleIframeLoad}
                  className={`w-full h-[calc(100%+120px)] border-none hide-scrollbar absolute -top-[30px] left-0 transition-all duration-1000 ${showIframe ? 'opacity-100' : 'opacity-0'} grayscale-[0.1] invert-[0.02]`}
                  style={{ background: '#050505' }}
                  title="Notion Calendar Booking"
                  allow="payment"
                />

                <AnimatePresence>
                  {showFallback && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-[#050505] z-30"
                    >
                       <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-8 max-w-xs leading-loose">
                         The calendar is taking longer than expected.
                       </p>
                       <a 
                        href={bookingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-black px-8 py-4 rounded-xl text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white/80 transition-all"
                       >
                         Open Direct Link <ArrowUpRight size={14} className="inline ml-2" />
                       </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="fixed bottom-10 left-0 w-full flex justify-center z-20 pointer-events-none">
        <span className="text-[8px] uppercase tracking-[0.6em] font-black text-white/20 italic">
          © 2026 Mark Lindo — Manila, PH
        </span>
      </footer>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
}

export default App;
