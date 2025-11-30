import React, { useEffect, useRef, useState } from 'react';
import Cursor from './Cursor';
import Particles from './Particles';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [title, setTitle] = useState('murasaki portfolio');

  const sections = {
    home: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      Object.entries(sections).forEach(([key, ref]) => {
        const element = ref.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const newTitle = prompt('enter new title:', title);
        if (newTitle) setTitle(newTitle);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [title]);

  const scrollTo = (section) => {
    sections[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const AudioVisualizer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 glass rounded-full p-4 hover-lift"
        data-cursor="pointer"
      >
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-accent rounded-full transition-all duration-300"
              style={{
                height: isPlaying ? `${Math.random() * 20 + 10}px` : '15px',
              }}
            />
          ))}
        </div>
      </button>
    );
  };

  return (
    <>
      <Cursor />
      <Particles />

      {loading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
            <p className="animate-pulse">initializing...</p>
          </div>
        </div>
      )}

      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent to-pink-400 z-40 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="fixed top-0 w-full glass z-30 transition-all duration-300 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">{title}</h1>
          <div className="flex gap-6">
            {['home', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`capitalize transition-all duration-300 hover:text-accent ${
                  activeSection === section ? 'text-accent font-semibold' : ''
                }`}
                data-cursor="pointer"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section ref={sections.home} className="min-h-screen flex items-center justify-center relative px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="blob-bg top-10 left-10" />
          <div className="blob-bg bottom-10 right-10" />
        </div>
        <div className="text-center z-10">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 gradient-text animate-pulse">murasaki</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-80">designing roblox experiences that feel alive</p>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed mb-12">
            hiya, i’m murasaki, a roblox "dev" (totally NOT a skid) who does random shit<br />
            username: <em>murasakiwastaken</em>.
          </p>
          <button
            onClick={() => scrollTo('projects')}
            className="glass glow px-8 py-4 rounded-full text-lg font-semibold hover-lift"
            data-cursor="pointer"
          >
            see my children
          </button>
          <div className="mt-20 animate-bounce">
            <div className="w-6 h-10 border-2 border-accent rounded-full mx-auto flex justify-center pt-2">
              <div className="w-1 h-3 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section ref={sections.projects} className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 gradient-text">projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "UNLEASHED", desc: "a quality-over-quantity roblox battlegrounds focused on standing out from the rest of that boring shit" },
            ].map((project, i) => (
              <div
                key={i}
                className="glass rounded-xl p-6 hover-lift glow cursor-pointer group"
                data-cursor="pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) rotateY(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotateY(0deg)';
                }}
              >
                <div className="h-40 bg-gradient-to-br from-accent/20 to-purple-400/20 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-tr from-transparent via-accent/10 to-transparent transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-neutral-300">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={sections.skills} className="min-h-screen py-20 px-6 bg-gradient-to-b from-transparent to-accent/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 gradient-text">skills</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-neutral-300">
            {[
              "lua",
              "ui design",
              "animation",
              "framework logic",
              "systems scripting",
              "sfx design",
              "a bit of vfx",
            ].map((skill, i) => (
              <li key={i} className="tag">{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={sections.contact} className="min-h-screen py-20 px-6 bg-gradient-to-t from-accent/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 gradient-text">contact</h2>
          <div className="glass rounded-2xl p-8 mb-8">
            <p className="text-xl mb-8">want to collaborate or chat? reach out anytime.</p>
            <a
              href="mailto:murawastaken@gmail.com"
              className="glass glow px-6 py-3 rounded-lg font-semibold hover-lift"
              data-cursor="pointer"
            >
              send an email
            </a>
          </div>
        </div>
      </section>

      <AudioVisualizer />
    </>
  );
}
