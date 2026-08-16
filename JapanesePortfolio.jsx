import React, { useState, useEffect } from 'react';

/**
 * JapanesePortfolio Component
 * A minimalist, production-ready portfolio featuring Japanese print aesthetics.
 * Colors: 
 * - Background: #f7f5f0 (Traditional Off-White)
 * - Text: #2b2b2b (Sumi-ink Black)
 * - Accent: #c93b2b (Vermilion)
 */

const JapanesePortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading) {
    return <ShinChanLoader />;
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#2b2b2b] font-serif selection:bg-[#c93b2b] selection:text-white transition-opacity duration-1000 ease-in">
      {/* Decorative Border Frame */}
      <div className="fixed inset-4 border border-[#2b2b2b]/20 pointer-events-none z-50 hidden md:block"></div>
      <div className="fixed inset-8 border border-[#2b2b2b]/10 pointer-events-none z-50 hidden md:block"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-start p-6 md:p-10">
        <div className="text-xl font-bold tracking-tighter border-b-2 border-[#c93b2b]">
          SURYA <span className="text-sm font-normal ml-1 opacity-60"> portfolio</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
          <a href="#about" className="hover:text-[#c93b2b] transition-colors">About</a>
          <a href="#education" className="hover:text-[#c93b2b] transition-colors">Education</a>
          <a href="#skills" className="hover:text-[#c93b2b] transition-colors">Skills</a>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          className="md:hidden text-sm font-bold uppercase tracking-widest border border-[#2b2b2b] px-3 py-1.5 hover:bg-[#2b2b2b] hover:text-white transition-all"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#f7f5f0] flex flex-col items-center justify-center gap-10 md:hidden">
          <a href="#about" onClick={() => handleNavClick('about')} className="text-4xl font-black tracking-tighter hover:text-[#c93b2b] transition-colors">About</a>
          <a href="#education" onClick={() => handleNavClick('education')} className="text-4xl font-black tracking-tighter hover:text-[#c93b2b] transition-colors">Education</a>
          <a href="#skills" onClick={() => handleNavClick('skills')} className="text-4xl font-black tracking-tighter hover:text-[#c93b2b] transition-colors">Skills</a>
        </div>
      )}

      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center p-6 md:p-20">
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div 
            className="text-5xl md:text-7xl font-bold opacity-10" 
            style={{ writingMode: 'vertical-rl' }}
          >
            クリエイティブ・エンジニア
          </div>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.05] tracking-tighter break-words">
              DESIGN <br /> 
              <span className="text-[#c93b2b]">MEETS</span> <br />
              CODE.
            </h1>
            <p className="text-lg md:text-xl max-w-md leading-relaxed opacity-80">
              Frontend Engineer specializing in minimalist digital experiences. 
              Blending traditional Japanese aesthetics with modern web technologies.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-3 bg-[#2b2b2b] text-[#f7f5f0] hover:bg-[#c93b2b] transition-all duration-300 uppercase text-xs tracking-widest font-bold">
                View Work
              </button>
              <button className="px-8 py-3 border border-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white transition-all duration-300 uppercase text-xs tracking-widest font-bold">
                Contact
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
             {/* Abstract Minimalist Shape / Image Placeholder */}
             <div className="aspect-square bg-[#2b2b2b] relative overflow-hidden group cursor-crosshair">
                <div className="absolute inset-0 bg-[#c93b2b] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 text-[#f7f5f0] text-xs font-mono rotate-90 origin-top-right opacity-50">
                  EST. 2024
                </div>
                {/* Placeholder for a portrait - using a stylized SVG circle for now */}
                <div className="w-full h-full flex items-center justify-center p-12">
                   <svg viewBox="0 0 100 100" className="w-full h-full text-[#f7f5f0] opacity-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.2" />
                   </svg>
                </div>
             </div>
             <div className="absolute -bottom-6 -left-6 bg-[#c93b2b] text-white p-4 text-xs font-bold tracking-tighter uppercase">
                Creative Developer
             </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 md:px-20 bg-white/50 border-y border-[#2b2b2b]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-[#c93b2b] font-bold tracking-widest uppercase text-xs">Academic History</span>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter mt-2">EDUCATION</h2>
            </div>
            <div className="hidden md:block text-right opacity-40 text-sm font-mono">
              / 学歴 /
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                degree: "Bachelor of Science in Computer Science", 
                school: "University of Tokyo", 
                year: "2018 — 2022", 
                desc: "Focused on Algorithm design and Human-Computer Interaction. Graduated with honors." 
              },
              { 
                degree: "Certification in UI/UX Design", 
                school: "Design Academy Kyoto", 
                year: "2022 — 2023", 
                desc: "Specialized in minimalist interface design and traditional print layout translation to digital." 
              }
            ].map((edu, idx) => (
              <div key={idx} className="group border-l-2 border-[#2b2b2b] pl-6 hover:border-[#c93b2b] transition-colors duration-300">
                <span className="text-xs font-mono opacity-60">{edu.year}</span>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-[#c93b2b] transition-colors">{edu.degree}</h3>
                <p className="text-sm font-bold opacity-80 mb-3">{edu.school}</p>
                <p className="text-sm leading-relaxed opacity-60 max-w-md">{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Inventory Section */}
      <section id="skills" className="py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-[#c93b2b] font-bold tracking-widest uppercase text-xs">Capabilities</span>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter mt-2">SKILLS</h2>
            </div>
            <div className="hidden md:block text-right opacity-40 text-sm font-mono">
              / 技術 /
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#2b2b2b]/10 border border-[#2b2b2b]/10">
            {[
              { name: "React / Next.js", level: "Advanced", category: "Frontend" },
              { name: "Tailwind CSS", level: "Advanced", category: "Styling" },
              { name: "TypeScript", level: "Proficient", category: "Language" },
              { name: "Figma / Adobe", level: "Intermediate", category: "Design" },
              { name: "Node.js", level: "Proficient", category: "Backend" },
              { name: "Three.js", level: "Intermediate", category: "3D" },
              { name: "Git / Docker", level: "Advanced", category: "DevOps" },
              { name: "Python", level: "Intermediate", category: "Scripting" },
            ].map((skill, idx) => (
              <div key={idx} className="bg-[#f7f5f0] p-8 hover:bg-white transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#c93b2b] group-hover:h-full transition-all duration-300"></div>
                <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-2">{skill.category}</span>
                <h4 className="text-lg font-bold mb-1">{skill.name}</h4>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-[#2b2b2b]/20 overflow-hidden">
                    <div 
                      className="h-full bg-[#2b2b2b] group-hover:bg-[#c93b2b] transition-all duration-500" 
                      style={{ width: skill.level === 'Advanced' ? '100%' : skill.level === 'Proficient' ? '70%' : '40%' }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-20 border-t border-[#2b2b2b]/10 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs opacity-50 font-mono">
            © 2024 SURYA. BUILT WITH MINIMALISM.
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-[#c93b2b]">Twitter</a>
            <a href="#" className="hover:text-[#c93b2b]">GitHub</a>
            <a href="#" className="hover:text-[#c93b2b]">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * ShinChanLoader Component
 * A cute animated loading screen featuring a stylized Shin-chan character.
 */
const ShinChanLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#f7f5f0] flex flex-col items-center justify-center transition-opacity duration-700 ease-out">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Animated Shin-chan Stylized Icon */}
        <div className="relative animate-bounce-slow">
          <svg 
            viewBox="0 0 100 100" 
            className="w-24 h-24" 
            fill="#2b2b2b"
          >
            {/* Head/Face Shape - Stylized Shin-chan "Cheek" profile */}
            <path 
              d="M20,50 Q20,20 50,20 Q80,20 80,50 Q80,70 60,80 Q50,85 40,80 Q20,70 20,50" 
              fill="#fcd3b4" 
              stroke="#2b2b2b" 
              strokeWidth="2"
            />
            {/* Eyes */}
            <circle cx="40" cy="45" r="3" fill="#2b2b2b" />
            <circle cx="60" cy="45" r="3" fill="#2b2b2b" />
            {/* Eyebrows - The iconic thick Shin-chan brows */}
            <rect x="35" y="38" width="10" height="3" rx="1" fill="#2b2b2b" />
            <rect x="55" y="38" width="10" height="3" rx="1" fill="#2b2b2b" />
            {/* Smile */}
            <path d="M45,60 Q50,65 55,60" stroke="#2b2b2b" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          
          {/* Blush marks */}
          <div className="absolute top-1/2 left-1/4 w-3 h-2 bg-red-300 opacity-50 rounded-full blur-[1px]"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-2 bg-red-300 opacity-50 rounded-full blur-[1px]"></div>
        </div>
        
        {/* Loading Ring */}
        <div className="absolute inset-0 border-4 border-dashed border-[#c93b2b]/30 rounded-full animate-spin"></div>
      </div>
      
      <div className="mt-8 text-center space-y-2">
        <p className="text-[#2b2b2b] font-bold tracking-[0.2em] text-sm uppercase">
          Loading <span className="text-[#c93b2b]">/</span> 読み込み中...
        </p>
        <div className="flex justify-center gap-1">
          <div className="w-1 h-1 bg-[#c93b2b] animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1 h-1 bg-[#c93b2b] animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1 h-1 bg-[#c93b2b] animate-bounce"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default JapanesePortfolio;