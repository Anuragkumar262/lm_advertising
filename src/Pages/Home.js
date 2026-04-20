import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, PhoneCall, MonitorPlay, Target, 
  MapPin, Send, ShieldCheck, Clock, CheckCircle, 
  Printer, TrendingUp, Presentation, Image as ImageIcon,
  Quote, Building
} from "lucide-react";

const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Home = () => {
  const [stats, setStats] = useState({ projects: 0, experience: 0, retention: 0 });

  useEffect(() => {
    // Simple count-up animation for stats
    const interval = setInterval(() => {
      setStats(prev => ({
        projects: prev.projects < 200 ? prev.projects + 5 : 200,
        experience: prev.experience < 10 ? prev.experience + 1 : 10,
        retention: prev.retention < 95 ? prev.retention + 2 : 95
      }));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden text-[var(--text-primary)]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-6 lg:px-20">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#FF3B3B] opacity-10 blur-[100px] sm:blur-[120px] rounded-full"></div>
        </div>

        <div className="z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
          >
            <motion.div variants={fadeInUp} className="inline-block">
                <span className="px-4 py-1.5 rounded-full border border-[#FF3B3B]/30 bg-[#FF3B3B]/10 text-[#FF3B3B] text-sm font-semibold backdrop-blur-md">
                    Premium OOH Advertising
                </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Creative Strategy That Builds <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B3B] to-[#ff7b7b]">Powerful Brands</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-lg">
              We bring ideas to life through creativity, strategy & smart design. Experts in branding, printing & outdoor advertising solutions.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button className="px-8 py-4 bg-[#FF3B3B] text-white rounded-xl font-bold hover:bg-[#e03131] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,59,59,0.4)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                Explore Services <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-[var(--text-primary)] text-[var(--text-primary)] rounded-xl font-bold hover:bg-[var(--text-primary)] hover:text-[var(--app-bg)] transition-all duration-300 cursor-pointer">
                Contact Us
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center w-full"
          >
            <div className="relative w-full aspect-square max-w-lg">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#FF3B3B]/20 to-transparent blur-3xl"></div>
                <div className="absolute inset-4 border border-[var(--app-card-border)] bg-[var(--app-card-bg)] backdrop-blur-xl rounded-[2rem] shadow-2xl flex items-center justify-center overflow-hidden group">
                    <img src="/images/ceo-Imadvertising.jpg" alt="Advertising Graphic" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--app-bg)] via-transparent to-transparent"></div>
                    <MonitorPlay className="absolute w-24 h-24 text-[var(--text-primary)] opacity-40 group-hover:scale-110 transition-transform duration-700" />
                </div>
                {/* Floating UI Elements */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-10 -right-8 p-4 rounded-2xl glass-card shadow-xl z-20 flex items-center gap-3"
                >
                    <Target className="w-8 h-8 text-[#FF3B3B]" />
                    <div className="text-left">
                        <div className="text-sm font-bold">Targeted</div>
                        <div className="text-xs text-[var(--text-secondary)]">Campaigns</div>
                    </div>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-12 -left-8 p-5 rounded-2xl glass-card shadow-xl z-20"
                >
                    <div className="text-3xl font-extrabold">10M+</div>
                    <div className="text-sm font-medium text-[var(--text-secondary)]">Daily Reach</div>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="w-full max-w-7xl px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: "Projects Delivered", value: `${stats.projects}+` },
                { label: "Years Experience", value: `${stats.experience}+` },
                { label: "Client Retention", value: `${stats.retention}%` }
            ].map((stat, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,59,59,0.1)] transition-all duration-300"
                >
                    <h3 className="text-4xl md:text-5xl font-extrabold text-[#FF3B3B] mb-2">{stat.value}</h3>
                    <p className="text-lg font-medium text-[var(--text-secondary)]">{stat.label}</p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="w-full max-w-7xl px-6 lg:px-20 py-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Premium <span className="text-[#FF3B3B]">Services</span></h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">Comprehensive outdoor advertising and branding solutions to maximize your visibility.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
                { icon: <Presentation />, title: "Hoardings", desc: "High-impact billboards in prime locations." },
                { icon: <ImageIcon />, title: "Wall Wraps", desc: "Transform empty walls into brand canvases." },
                { icon: <Target />, title: "Unipoles", desc: "Strategic singular pillars for clear visibility." },
                { icon: <Building />, title: "Gantries", desc: "Overhead highway signage for mass reach." },
                { icon: <TrendingUp />, title: "Railway Branding", desc: "Capture commuter attention effectively." },
                { icon: <MonitorPlay />, title: "Kiosks", desc: "Street-level engagement points." },
                { icon: <Printer />, title: "Printing", desc: "High-quality large format printing." },
                { icon: <ShieldCheck />, title: "Brand Identity", desc: "Complete visual identity design." },
            ].map((service, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-6 rounded-2xl group hover:border-[#FF3B3B]/50 hover:shadow-[0_0_20px_rgba(255,59,59,0.15)] transition-all duration-300 cursor-pointer"
                >
                    <div className="w-12 h-12 bg-[#FF3B3B]/10 text-[#FF3B3B] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm">{service.desc}</p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* 4. ABOUT / STORY SECTION */}
      <section className="relative w-full py-24 overflow-hidden bg-[var(--text-primary)] text-[var(--app-bg)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
            >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#FF3B3B]/20 mix-blend-overlay z-10"></div>
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Team Planning" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-8 -right-8 glass-card !bg-[var(--app-bg)] text-[var(--text-primary)] p-6 rounded-2xl shadow-2xl max-w-xs border-l-4 border-l-[#FF3B3B]">
                    <p className="font-bold text-lg">"We build brand identities, not just ads."</p>
                </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6"
            >
                <h2 className="text-3xl md:text-5xl font-bold">The <span className="text-[#FF3B3B]">LM Advertising</span> Story</h2>
                <p className="text-lg opacity-80 leading-relaxed">
                    At LM Advertising, we don’t just create ads — we build brand identities. Born out of a passion for impactful communication, we have grown into Prayagraj's premier OOH and branding agency. 
                </p>
                <p className="text-lg opacity-80 leading-relaxed">
                    Our approach combines strategic locations, bold design, and flawless execution to ensure your message doesn't just reach the masses, it resonates with them.
                </p>
                <div className="pt-4">
                    <button className="flex items-center gap-2 font-bold text-[#FF3B3B] hover:text-white transition-colors cursor-pointer">
                        Read Our Full Story <ArrowRight size={20} />
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 5. USP SECTION */}
      <section className="w-full max-w-7xl px-6 lg:px-20 py-24">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {[
                { icon: <MapPin />, title: "Prime Locations" },
                { icon: <ShieldCheck />, title: "Quality Maintenance" },
                { icon: <Clock />, title: "Fast Execution" },
                { icon: <MonitorPlay />, title: "Creative Designs" },
                { icon: <Target />, title: "Budget Friendly" },
                { icon: <CheckCircle />, title: "Responsive Team" },
            ].map((usp, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center gap-4 group"
                >
                    <div className="w-16 h-16 rounded-full bg-[var(--app-bg)] border border-[var(--app-card-border)] shadow-lg flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#FF3B3B] group-hover:border-[#FF3B3B] transition-all duration-300">
                        {usp.icon}
                    </div>
                    <h3 className="font-bold text-lg">{usp.title}</h3>
                </motion.div>
            ))}
        </div>
      </section>

      {/* 6. CEO MESSAGE */}
      <section className="w-full py-24 bg-gradient-to-b from-transparent to-[var(--app-card-border)] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-10 md:p-16 rounded-3xl relative"
            >
                <Quote className="absolute top-8 left-8 w-12 h-12 text-[#FF3B3B]/20 rotate-180" />
                <Quote className="absolute bottom-8 right-8 w-12 h-12 text-[#FF3B3B]/20" />
                
                <img src="/images/ceo-Imadvertising.jpg" alt="CEO" className="w-24 h-24 rounded-full object-cover border-4 border-[#FF3B3B] mx-auto mb-8 shadow-xl" />
                
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic mb-8">
                    "Creativity backed by purpose can change how businesses communicate. Our vision is to elevate local and national brands through unmissable outdoor presence."
                </p>
                
                <div>
                    <h4 className="font-bold text-lg">Director / CEO</h4>
                    <p className="text-[var(--text-secondary)] text-sm">LM Advertising</p>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 7. LOCATIONS SECTION */}
      <section className="w-full max-w-7xl px-6 lg:px-20 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Prime <span className="text-[#FF3B3B]">Locations</span></h2>
        <div className="flex flex-wrap justify-center gap-6">
            {["Prayagraj", "Kanpur", "Varanasi", "Lucknow", "Ayodhya"].map((city, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card px-8 py-4 rounded-full flex items-center gap-3 hover:border-[#FF3B3B] transition-colors cursor-default"
                >
                    <MapPin className="text-[#FF3B3B] w-5 h-5" />
                    <span className="font-bold text-lg">{city}</span>
                </motion.div>
            ))}
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="w-full py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FF3B3B]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent blur-2xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-extrabold mb-8"
            >
                Let’s Make Your Brand <br className="hidden md:block"/> Impossible to Ignore
            </motion.h2>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6"
            >
                <button className="px-10 py-5 bg-white text-[#FF3B3B] rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl cursor-pointer">
                    Get Started
                </button>
                <button className="px-10 py-5 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer">
                    <PhoneCall size={20} /> Call Now
                </button>
            </motion.div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="w-full bg-[var(--text-primary)] text-[var(--app-bg)] py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[var(--app-bg)]/10 pb-12">
            <div>
                <h3 className="text-2xl font-black text-[#FF3B3B] mb-6">LM ADVERTISING</h3>
                <p className="opacity-70 max-w-sm mb-6">
                    Premium outdoor advertising, branding, and printing solutions based in Prayagraj, UP.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-[var(--app-bg)]/10 flex items-center justify-center hover:bg-[#FF3B3B] transition-colors"><InstagramIcon /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[var(--app-bg)]/10 flex items-center justify-center hover:bg-[#FF3B3B] transition-colors"><FacebookIcon /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[var(--app-bg)]/10 flex items-center justify-center hover:bg-[#FF3B3B] transition-colors"><TwitterIcon /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[var(--app-bg)]/10 flex items-center justify-center hover:bg-[#FF3B3B] transition-colors"><LinkedinIcon /></a>
                </div>
            </div>
            
            <div>
                <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                <div className="flex flex-col gap-4 opacity-80">
                    <div className="flex items-center gap-3"><PhoneCall size={18} className="text-[#FF3B3B]" /> +91 98765 43210</div>
                    <div className="flex items-center gap-3"><Send size={18} className="text-[#FF3B3B]" /> hello@lmadvertising.com</div>
                    <div className="flex items-center gap-3"><MapPin size={18} className="text-[#FF3B3B]" /> Civil Lines, Prayagraj, UP</div>
                </div>
            </div>
            
            <div>
                <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                <div className="flex flex-col gap-3 opacity-80">
                    <a href="#" className="hover:text-[#FF3B3B] transition-colors">Home</a>
                    <a href="#" className="hover:text-[#FF3B3B] transition-colors">About Us</a>
                    <a href="#" className="hover:text-[#FF3B3B] transition-colors">Our Services</a>
                    <a href="#" className="hover:text-[#FF3B3B] transition-colors">Portfolio</a>
                    <a href="#" className="hover:text-[#FF3B3B] transition-colors">Reach Us</a>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between opacity-50 text-sm">
            <p>&copy; {new Date().getFullYear()} LM Advertising. All rights reserved.</p>
            <p>Designed with <span className="text-[#FF3B3B]">♥</span></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;