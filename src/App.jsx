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
    className="group relative p-3 md:p-4 border border-white/5 hover:border-white/20 rounded-xl bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <Icon size={18} strokeWidth={1.5} className="text-white/40 group-hover:text-white transition-colors relative z-10 md:w-5 md:h-5" />
    <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-all text-[11px] uppercase tracking-[0.2em] font-black text-white bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 whitespace-nowrap pointer-events-none z-20">
      {label}
    </span>
  </motion.a>
);

const OptimizedBackground = ({ isMobile }) => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // Performance boost: disable alpha for canvas context
    let animationFrameId;
    let particles = [];
    let width, height;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    class Particle {
      constructor() {
        this.reset();
      }

      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 1 + 0.5;
      }

      reset() {
        this.init();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (!isMobile) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const dist = dx * dx + dy * dy;
          if (dist < 150 * 150) {
            const force = (150 - Math.sqrt(dist)) / 150;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff22';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const density = isMobile ? 20000 : 10000;
      const count = Math.min(Math.floor((width * height) / density), isMobile ? 40 : 100);
      for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.init();
        particles.push(p);
      }
    };

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);
      
      const connectDistSq = (isMobile ? 100 : 150) ** 2;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistSq) {
            const opacity = 1 - Math.sqrt(distSq) / Math.sqrt(connectDistSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

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

  // Lock scroll when modal is open
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setShowFallback(false);
  };

  const showIframe = !isLoading && minLoadComplete;

  // --- CROPPING CONFIGURATION ---
  const cropConfig = isMobile 
    ? { top: '-10px', height: 'calc(100% + 140px)' } // MOBILE SETTINGS
    : { top: '-30px', height: 'calc(100% + 120px)' }; // DESKTOP SETTINGS
  // ------------------------------

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    let lastCall = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastCall < 16) return; // ~60fps throttle
      lastCall = now;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] selection:bg-white selection:text-black overflow-hidden flex items-center justify-center relative">
      {/* Optimized Background */}
      <OptimizedBackground isMobile={isMobile} />
      
      {/* Dynamic Mouse Gradient (Desktop only) */}
      <motion.div 
        className="fixed inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(circle 800px at ${springX}px ${springY}px, rgba(255,255,255,0.03), transparent)`
        }}
      />
      
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-16 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-20 items-center overflow-y-auto max-h-screen lg:max-h-none hide-scrollbar"
      >
        {/* Left Side: Content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8"
        >
          <motion.div variants={fadeUp}>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-white/30 font-black">
              Systems Engineer
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp} 
            className="text-[clamp(2.2rem,8vw,4.5rem)] leading-none tracking-[0.25em] font-black uppercase whitespace-nowrap"
          >
            {name}
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-sm md:text-lg font-medium leading-relaxed text-white/40 max-w-md md:max-w-lg uppercase tracking-[0.1em]"
          >
            {bio}
          </motion.p>

          <motion.div 
            variants={stagger}
            className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 pt-2"
          >
            <IconLink href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} icon={Mail} label="Email" />
            <IconLink href={linkedin} icon={Linkedin} label="LinkedIn" />
            <IconLink href={github} icon={Github} label="GitHub" />
            <IconLink href={whatsapp} icon={MessageSquare} label="WhatsApp" />
          </motion.div>
        </motion.div>

        {/* Minimal Divider (Desktop only) */}
        <div className="hidden lg:block w-px h-100 bg-white/5 self-center"></div>

        {/* Right Side: Booking */}
        <motion.div
          initial={{ opacity: 1, x: 0, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative pt-4 md:pt-8 flex flex-col items-center"
        >
          {/* Calendar Rings */}
          <div className="absolute top-0 left-1/4 w-1.5 md:w-2 h-4 md:h-6 bg-white/10 rounded-full z-20"></div>
          <div className="absolute top-0 right-1/4 w-1.5 md:w-2 h-4 md:h-6 bg-white/10 rounded-full z-20"></div>

          <div className="relative w-full max-w-[340px] md:max-w-none bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden p-10 md:p-16 flex flex-col items-center group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter mb-4 md:mb-6 leading-tight text-center whitespace-nowrap relative z-10">
              Work <span className="text-white/10">Together.</span>
            </h2>
            
            <p className="text-white/30 text-[10px] md:text-xs font-medium mb-8 md:mb-12 max-w-[220px] md:max-w-xs leading-relaxed uppercase tracking-[0.15em] text-center relative z-10">
              Let's connect and build the next generation of digital architecture.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05, shadow: "0 0 40px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-8 md:px-12 py-4 md:py-6 rounded-2xl text-[11px] md:text-[14px] uppercase tracking-[0.5em] font-semibold hover:bg-white/90 transition-all shadow-2xl flex items-center gap-2 md:gap-3 relative z-10 cursor-pointer"
            >
              Schedule <ArrowUpRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </motion.main>

      {/* Modern Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-12 bg-black/95 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl h-full md:h-[85vh] md:max-h-[800px] bg-[#ffffff] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 md:p-6 flex justify-between items-center bg-white border-b border-black/5 z-20">
                <div className="flex items-center gap-2 md:gap-3">
                   <div className="w-6 h-6 md:w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <Calendar size={12} className="text-white md:w-3.5 md:h-3.5" />
                   </div>
                   <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-black text-black">Booking — Notion Calendar</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors group"
                >
                  <X size={18} className="text-black transition-transform group-hover:rotate-90 duration-300 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Iframe Content */}
              <div className="flex-1 w-full relative bg-[#050505] overflow-hidden hide-scrollbar min-h-[400px]">
                {!showIframe && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]">
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                      <motion.div 
                        animate={{ rotate: 45, scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 m-auto w-8 h-8 md:w-10 md:h-10 border-2 border-white"
                      />
                      <motion.div 
                        animate={{ rotate: -45, scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 m-auto w-12 h-12 md:w-16 md:h-16 border border-white/10"
                      />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[2px] md:border-[3px] border-dotted border-white/5 rounded-full"
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
                  className={`w-full border-none hide-scrollbar absolute left-0 transition-all duration-1000 ${showIframe ? 'opacity-100' : 'opacity-0'} grayscale-[0.1] invert-[0.02]`}
                  style={{ 
                    background: '#050505',
                    height: cropConfig.height,
                    top: cropConfig.top
                  }}
                  title="Notion Calendar Booking"
                  allow="payment"
                />

                {/* Smart Fallback Overlay */}
                <AnimatePresence>
                  {showFallback && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-[#050505] z-30"
                    >
                       <p className="text-white/40 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 max-w-xs leading-loose">
                         The calendar is taking longer than expected.
                       </p>
                       <a 
                        href={bookingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white/80 transition-all"
                       >
                         Open Direct Link <ArrowUpRight size={12} className="inline ml-2 md:w-3.5 md:h-3.5" />
                       </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer (Centered) */}
      <footer className="fixed bottom-6 md:bottom-10 left-0 w-full flex justify-center z-20 pointer-events-none px-6 text-center">
        <span className="text-[7px] md:text-[8px] uppercase tracking-[0.6em] font-black text-white/20 italic">
          © 2026 Mark Lindo — Manila, PH
        </span>
      </footer>

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
}

export default App;
