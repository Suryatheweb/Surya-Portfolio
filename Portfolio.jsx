import React, { useState, useEffect } from 'react';

const translations = {
  en: {
    nav: { about: "About", education: "Education", skills: "Skills" },
    hero: {
      title: "MAKING ROBOTS SEE.",
      subtitle: "Software & Robotics Engineer in Japan. Specializing in AGF/AMR systems, powered by ROS 2 and Computer Vision. Aiming at the frontier of Physical AI.",
      cta1: "View Work",
      cta2: "Contact",
      role: "Robotics and AI",
      vertical: "PHYSICAL AI ENGINEER"
    },
    education: {
      title: "EDUCATION",
      subtitle: "Academic & Certifications",
      jp_label: "/ 学歴・資格 /",
      items: [
        { degree: "NIELIT A Level", school: "Advanced Diploma in Computer Applications", year: "2021 — 2023", desc: "Comprehensive study of computer applications and software development." },
        { degree: "BCOM", school: "Utkal University", year: "2015 — 2018", desc: "Bachelor of Commerce." },
        { degree: "JLPT N2 Certified", school: "Japanese Language Proficiency Test", year: "Certified", desc: "Business-level proficiency in Japanese language." },
        { degree: "AI-901: Microsoft Azure AI Fundamentals", school: "Microsoft", year: "Certified", desc: "Foundational knowledge of AI and ML on Azure." },
        { degree: "AI Bootcamps", school: "OpenCV & PyTorch", year: "Completed", desc: "Specialized training in Computer Vision and Deep Learning." }
      ]
    },
    skills: {
      title: "SKILLS",
      subtitle: "Capabilities",
      jp_label: "/ 技術 /"
    },
    footer: {
      copy: "© 2024 SURYA. BUILT WITH MINIMALISM."
    }
  },
  jp: {
    nav: { about: "概要", education: "学歴", skills: "スキル" },
    hero: {
      title: "ロボットに視覚を。",
      subtitle: "日本を拠点とするソフトウェア＆ロボティクスエンジニア。ROS 2とコンピュータビジョンを活用したAGF/AMRシステムを専門とし、フィジカルAIの最前線を目指しています。",
      cta1: "作品を見る",
      cta2: "連絡する",
      role: "ロボティクス & AI",
      vertical: "フィジカルAIエンジニア"
    },
    education: {
      title: "学歴・資格",
      subtitle: "学歴および認定資格",
      jp_label: "/ EDUCATION /",
      items: [
        { degree: "NIELIT Aレベル", school: "コンピュータアプリケーション上級ディプロマ", year: "2021 — 2023", desc: "コンピュータアプリケーションとソフトウェア開発の包括的な学習。" },
        { degree: "BCOM (商学士)", school: "ウトカル大学", year: "2015 — 2018", desc: "商学士号取得。" },
        { degree: "日本語能力試験 N2 合格", school: "JLPT", year: "認定済み", desc: "ビジネスレベルの日本語能力。" },
        { degree: "AI-901: Microsoft Azure AI Fundamentals", school: "Microsoft", year: "認定済み", desc: "Azure上のAIおよび機械学習の基礎知識。" },
        { degree: "AIブートキャンプ", school: "OpenCV & PyTorch", year: "修了", desc: "コンピュータビジョンとディープラーニングの専門トレーニング。" }
      ]
    },
    skills: {
      title: "スキル",
      subtitle: "能力",
      jp_label: "/ SKILLS /"
    },
    footer: {
      copy: "© 2024 SURYA. ミニマリズムで構築。"
    }
  }
};

const ShinChanLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#f7f5f0] flex flex-col items-center justify-center transition-opacity duration-700 ease-out">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="relative animate-bounce-slow">
          <svg 
            viewBox="0 0 100 100" 
            className="w-24 h-24" 
            fill="#2b2b2b"
          >
            <path 
              d="M20,50 Q20,20 50,20 Q80,20 80,50 Q80,70 60,80 Q50,85 40,80 Q20,70 20,50" 
              fill="#fcd3b4" 
              stroke="#2b2b2b" 
              strokeWidth="2"
            />
            <circle cx="40" cy="45" r="3" fill="#2b2b2b" />
            <circle cx="60" cy="45" r="3" fill="#2b2b2b" />
            <rect x="35" y="38" width="10" height="3" rx="1" fill="#2b2b2b" />
            <rect x="55" y="38" width="10" height="3" rx="1" fill="#2b2b2b" />
            <path d="M45,60 Q50,65 55,60" stroke="#2b2b2b" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <div className="absolute top-1/2 left-1/4 w-3 h-2 bg-red-300 opacity-50 rounded-full blur-[1px]"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-2 bg-red-300 opacity-50 rounded-full blur-[1px]"></div>
        </div>
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
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsRevealed(true), 100);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading) return <ShinChanLoader />;

  return (
    <div className={`min-h-screen bg-[#f7f5f0] text-[#2b2b2b] font-serif selection:bg-[#c93b2b] selection:text-white transition-all duration-1000 ease-out ${isRevealed ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="fixed inset-4 border border-[#2b2b2b]/20 pointer-events-none z-50 hidden md:block"></div>
      <div className="fixed inset-8 border border-[#2b2b2b]/10 pointer-events-none z-50 hidden md:block"></div>

      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-start p-4 md:p-10">
        <div className="text-base md:text-xl font-bold tracking-tighter border-b-2 border-[#c93b2b]">
          SURYA <span className="text-xs md:text-sm font-normal ml-1 opacity-60"> portfolio</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setLang(lang === 'en' ? 'jp' : 'en')}
            className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter border border-[#2b2b2b] px-1.5 md:px-2 py-1 hover:bg-[#2b2b2b] hover:text-white transition-all"
          >
            {lang === 'en' ? 'JP' : 'EN'}
          </button>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
            <a href="#about" className="hover:text-[#c93b2b] transition-colors">{t.nav.about}</a>
            <a href="#education" className="hover:text-[#c93b2b] transition-colors">{t.nav.education}</a>
            <a href="#skills" className="hover:text-[#c93b2b] transition-colors">{t.nav.skills}</a>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden text-sm font-bold uppercase tracking-widest border border-[#2b2b2b] px-3 py-1.5 hover:bg-[#2b2b2b] hover:text-white transition-all"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#f7f5f0] flex flex-col items-center justify-center gap-10 md:hidden animate-fade-in-up">
          <a href="#about" onClick={() => handleNavClick('about')} className="text-4xl font-black tracking-tighter hover:text-[#c93b2b] transition-colors">{t.nav.about}</a>
          <a href="#education" onClick={() => handleNavClick('education')} className="text-4xl font-black tracking-tighter hover:text-[#c93b2b] transition-colors">{t.nav.education}</a>
          <a href="#skills" onClick={() => handleNavClick('skills')} className="text-4xl font-black tracking-tighter hover:text-[#c93b2b] transition-colors">{t.nav.skills}</a>
        </div>
      )}

      <section id="about" className="relative min-h-screen flex items-center justify-center px-4 py-24 md:p-20">
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div 
            className="text-5xl md:text-7xl font-bold opacity-10" 
            style={{ writingMode: 'vertical-rl' }}
          >
            {t.hero.vertical}
          </div>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black leading-[1.05] tracking-tighter break-words">
              {t.hero.title.split(' ').map((word, i) => (
                <span key={i} className="block animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl max-w-md leading-relaxed opacity-80">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-3 bg-[#2b2b2b] text-[#f7f5f0] hover:bg-[#c93b2b] transition-all duration-300 uppercase text-xs tracking-widest font-bold">
                {t.hero.cta1}
              </button>
              <button className="px-8 py-3 border border-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white transition-all duration-300 uppercase text-xs tracking-widest font-bold">
                {t.hero.cta2}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative animate-fade-in-right">
            <div className="aspect-square bg-[#2b2b2b] relative overflow-hidden group cursor-crosshair">
              <div className="absolute inset-0 bg-[#c93b2b] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 text-[#f7f5f0] text-xs font-mono rotate-90 origin-top-right opacity-50">
                EST. 2024
              </div>
              <div className="w-full h-full flex items-center justify-center p-12">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#f7f5f0] opacity-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.2" />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#c93b2b] text-white p-4 text-xs font-bold tracking-tighter uppercase">
              {t.hero.role}
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="py-24 px-6 md:px-20 bg-white/50 border-y border-[#2b2b2b]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="animate-fade-in-up">
              <span className="text-[#c93b2b] font-bold tracking-widest uppercase text-xs">{t.education.subtitle}</span>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter mt-2">{t.education.title}</h2>
            </div>
            <div className="hidden md:block text-right opacity-40 text-sm font-mono">
              {t.education.jp_label}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {t.education.items.map((edu, idx) => (
              <div key={idx} className="group border-l-2 border-[#2b2b2b] pl-6 hover:border-[#c93b2b] transition-all duration-300 translate-y-4 opacity-0 animate-reveal" style={{ animationDelay: `${idx * 0.2}s` }}>
                <span className="text-xs font-mono opacity-60">{edu.year}</span>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-[#c93b2b] transition-colors">{edu.degree}</h3>
                <p className="text-sm font-bold opacity-80 mb-3">{edu.school}</p>
                <p className="text-sm leading-relaxed opacity-60 max-w-md">{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="animate-fade-in-up">
              <span className="text-[#c93b2b] font-bold tracking-widest uppercase text-xs">{t.skills.subtitle}</span>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter mt-2">{t.skills.title}</h2>
            </div>
            <div className="hidden md:block text-right opacity-40 text-sm font-mono">
              {t.skills.jp_label}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#2b2b2b]/10 border border-[#2b2b2b]/10">
            {[
              { name: "ROS2", level: "Beginner", category: "Robotics" },
              { name: "Computer Vision", level: "Intermediate", category: "AI/Vision" },
              { name: "Python", level: "Proficient", category: "Programming" },
              { name: "Adobe Photoshop", level: "Advanced", category: "Design" },
              { name: "Adobe Premiere Pro", level: "Advanced", category: "Design" },
              { name: "Figma", level: "Advanced", category: "Design" },
              { name: "HTML", level: "Advanced", category: "Frontend" },
              { name: "CSS", level: "Advanced", category: "Frontend" },
              { name: "JavaScript", level: "Advanced", category: "Frontend" },
              { name: "C++", level: "Proficient", category: "Programming" },
              { name: "Linux", level: "Proficient", category: "Systems" },
              { name: "MySQL", level: "Proficient", category: "Database" },
            ].map((skill, idx) => (
              <div key={idx} className="bg-[#f7f5f0] p-8 hover:bg-white transition-colors group relative overflow-hidden animate-reveal" style={{ animationDelay: `${(idx % 4) * 0.1}s` }}>
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

      <footer className="py-12 px-6 md:px-20 border-t border-[#2b2b2b]/10 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs opacity-50 font-mono">
            {t.footer.copy}
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="https://github.com/Suryatheweb" target="_blank" rel="noopener noreferrer" className="hover:text-[#c93b2b] transition-colors duration-300">GitHub</a>
            <a href="https://www.linkedin.com/in/surya-kanta-rout-5492a0280/" target="_blank" rel="noopener noreferrer" className="hover:text-[#c93b2b] transition-colors duration-300">LinkedIn</a>
          </div>
        </div>
      </footer>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes reveal {
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; }
        .animate-reveal { animation: reveal 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Portfolio;