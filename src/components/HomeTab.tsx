import React from 'react';
import { Mail, Cpu, Database, Layout, GraduationCap, Code2, Users, Flame, Heart, FileText } from 'lucide-react';
import avatarTransparent from '../assets/avatar_transparent.png';
import resumePdf from '../assets/resume.pdf';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ setActiveTab }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4.5rem',
      width: '100%'
    }}>

      {/* ================= HERO SECTION (Layered 3-Column Minimal Visual) ================= */}
      <section className="hero-layered-section" style={{
        position: 'relative',
        width: '100%',
        minHeight: '480px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2.5rem',
        alignItems: 'stretch',
        overflow: 'hidden',
        padding: '1rem 0'
      }}>

        {/* Left Column: Hello text & Vertical Socials */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
          position: 'relative',
          padding: '1.5rem 0'
        }} className="hero-left-col">

          {/* Main Title Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }} className="hero-left-title-block">
            <span style={{
              fontSize: '1.1rem',
              color: 'var(--accent-purple)',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}>
              Hello, I'm
            </span>
            <h1 className="hero-title" style={{
              fontWeight: '800',
              lineHeight: '1.1',
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}>
              Soe Bala<br />Win
            </h1>
          </div>

          {/* Lower Left: Vertical Social Stack */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start'
          }} className="vertical-socials">
            <a
              href="https://linkedin.com/in/soebala"
              target="_blank"
              rel="noreferrer"
              className="glass-btn"
              style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
              title="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://github.com/cctn214"
              target="_blank"
              rel="noreferrer"
              className="glass-btn"
              style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
              title="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <button
              onClick={() => setActiveTab('contact')}
              className="glass-btn"
              style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
              title="Contact Me"
            >
              <Mail size={18} />
            </button>
          </div>

        </div>

        {/* Center Column: Portrait Cutout + Backdrop Glow */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          position: 'relative',
          width: '100%',
          gridRow: '1' // Forced to center in mobile grid
        }} className="hero-center-col">

          {/* Soft circular radial glow backing - aligned and amplified */}
          <div className="hero-radial-glow" style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.45) 0%, rgba(34, 211, 238, 0.15) 50%, transparent 75%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          {/* Floating portrait cutout */}
          <div className="hero-portrait-frame">
            {/* 1. White Circle Border Frame - glowing neon ring with Studio Backdrop */}
            <div className="hero-bg-circle" />

            {/* 2. Transparent Photo (Foreground, unclipped, overlapping the border) */}
            <img 
              src={avatarTransparent} 
              alt="Soe Bala Win" 
              className="hero-foreground-img"
            />
          </div>
        </div>

        {/* Right Column: Creative Fullstack Developer & Resume Link */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
          position: 'relative',
          padding: '1.5rem 0'
        }} className="hero-right-col">

          {/* Skill Title Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }} className="right-title-block">
            <span style={{
              fontSize: '1.1rem',
              color: 'var(--accent-purple)',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}>
              Creative
            </span>
            <h2 className="hero-right-title" style={{
              fontWeight: '800',
              lineHeight: '1.1',
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Fullstack
              </span><br />
              Developer
            </h2>
          </div>

          {/* Lower Right: Resume Link */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: '2rem'
          }} className="resume-download-btn">
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.01)',
                transition: 'all var(--transition-fast)'
              }}
              className="glass-btn"
            >
              <span>RESUME</span>
              <FileText size={16} style={{ color: 'var(--accent-purple)' }} />
            </a>
          </div>

        </div>

      </section>

      {/* ================= SECTION A: DEVELOPER PHILOSOPHY ================= */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '3rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: '600', letterSpacing: '0.1em' }}>
            01 / WHO I AM
          </span>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            Developer Philosophy
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          alignItems: 'start'
        }} className="about-split-row">

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1rem' }}>
              Having graduated in 2025 with a degree in **Computer Systems Engineering**, I approach software design through a structural lens. I believe backend programming is not just about writing syntax—it is about data integrity, resource efficiency, and eliminating friction in business pipelines.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1rem' }}>
              During my hands-on developer experience, I have focused heavily on **Spring Boot**. I enjoy digging into execution logs, optimizing SQL queries, building robust REST APIs, and UI creation.
            </p>
          </div>

          <div className="glass-card-subtle" style={{
            padding: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem' }}><GraduationCap size={20} /></div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '600' }}>Academic Core</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                BSc (Hons) Computer Systems Engineering
              </p>
            </div>
            <div>
              <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}><Code2 size={20} /></div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '600' }}>Tech Focus</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                Java Spring Boot, REST APIs, Database Optimization
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION B: TECHNICAL PILLARS (Toolkit & Languages) ================= */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '3rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: '600', letterSpacing: '0.1em' }}>
            02 / TECH TOOLKIT
          </span>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            Technical Pillars
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Card 1: Backend Core */}
          <div className="glass-card-subtle" style={{ padding: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-purple)', flexShrink: 0 }}><Cpu size={22} /></div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '600' }}>Backend Core</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                Specialized in microservices design, object-relational mapping, and dependency injection.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '0.75rem' }}>
                {['Java', 'Spring Boot', 'Spring MVC', '.NET Core', 'C#', 'ASP.NET Core Web MVC'].map(skill => (
                  <span key={skill} style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-secondary)' }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Frontend & UI */}
          <div className="glass-card-subtle" style={{ padding: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-cyan)', flexShrink: 0 }}><Layout size={22} /></div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '600' }}>Frontend & UI</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                Building responsive bindings, client routes, and visual layouts.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '0.75rem' }}>
                {['React.js', 'Angular', 'JavaFX', 'TypeScript', 'JavaScript', 'HTML5/CSS3'].map(skill => (
                  <span key={skill} style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-secondary)' }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Databases & Tools */}
          <div className="glass-card-subtle" style={{ padding: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-emerald)', flexShrink: 0 }}><Database size={22} /></div>
            <div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '600' }}>Databases & Tools</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                Optimizing query latency, event streaming, and code repository versioning.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '0.75rem' }}>
                {['Oracle SQL', 'MySQL', 'PostgreSQL', 'SQL Server', 'Git'].map(skill => (
                  <span key={skill} style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-secondary)' }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION D: PROFESSIONAL VALUES ================= */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '3rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: '600', letterSpacing: '0.1em' }}>
            03 / VALUES & CORE TRAITS
          </span>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            Professional Values
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Trait 1: Problem Solving */}
          <div className="glass-card-subtle" style={{ padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-purple)', flexShrink: 0, marginTop: '2px' }}><Flame size={16} /></div>
            <div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600' }}>Problem Solving</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: '1.4' }}>
                Breaking down complex database synchronization problems into clean code algorithms.
              </p>
            </div>
          </div>

          {/* Trait 2: Teamwork */}
          <div className="glass-card-subtle" style={{ padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }}><Users size={16} /></div>
            <div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600' }}>Team Collaboration</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: '1.4' }}>
                Highly motivated to communicate and contribute within international development teams.
              </p>
            </div>
          </div>

          {/* Trait 3: Attention to Detail */}
          <div className="glass-card-subtle" style={{ padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }}><Heart size={16} /></div>
            <div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600' }}>Attention to Detail</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: '1.4' }}>
                Profiling latency dumps, auditing index query costs, and tracing protocol transport sockets.
              </p>
            </div>
          </div>

          {/* Trait 4: Adaptability */}
          <div className="glass-card-subtle" style={{ padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-rose)', flexShrink: 0, marginTop: '2px' }}><Code2 size={16} /></div>
            <div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600' }}>Quick Learning</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: '1.4' }}>
                Adapting and learning new languages (like TypeScript or C#) and frameworks rapidly based on stack goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive CSS styles */}
      <style>{`
        .hero-portrait-frame {
          position: relative;
          overflow: visible;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .hero-bg-circle {
          position: absolute;
          border-radius: 50%;
          border: 6px solid rgba(255, 255, 255, 0.95);
          background: radial-gradient(circle at 62% 46%, #adc4d8 0%, #8ca4b9 35%, #596f83 75%, #384b5c 100%);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(192, 132, 252, 0.35), 0 0 50px rgba(34, 211, 238, 0.2);
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          pointer-events: none;
        }
        .hero-foreground-img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.5));
          z-index: 3;
          pointer-events: none;
        }

        /* Mobile Layout styles (< 900px) */
        .hero-title {
          font-size: 2.8rem;
        }
        .hero-right-title {
          font-size: 2.5rem;
        }
        .hero-left-title-block {
          margin-top: 1rem;
        }
        .right-title-block {
          margin-top: 1.25rem;
        }
        .vertical-socials {
          flex-direction: row !important;
          margin-top: 1rem;
        }
        .resume-download-btn {
          justify-content: flex-start !important;
          margin-top: 1.25rem;
        }
        .hero-center-col {
          height: 380px;
        }
        .hero-radial-glow {
          width: 320px;
          height: 320px;
          top: 48%;
        }
        .hero-portrait-frame {
          width: 290px;
          height: 360px;
        }
        .hero-bg-circle {
          width: 250px;
          height: 250px;
          top: 48%;
        }

        /* Desktop Layout styles (>= 900px) */
        @media (min-width: 900px) {
          .hero-layered-section {
            grid-template-columns: 1fr 1.2fr 1fr !important;
          }
          .hero-title {
            font-size: 3.6rem;
          }
          .hero-right-title {
            font-size: 3.3rem;
          }
          .hero-left-title-block {
            margin-top: 2.5rem;
          }
          .right-title-block {
            margin-top: 2.5rem;
          }
          .vertical-socials {
            flex-direction: column !important;
            margin-top: 2rem;
          }
          .resume-download-btn {
            justify-content: flex-end !important;
            margin-top: 2rem;
          }
          .hero-center-col {
            height: 560px;
            grid-row: auto !important;
          }
          .hero-radial-glow {
            width: 480px;
            height: 480px;
            top: 48%;
          }
          .hero-portrait-frame {
            width: 450px;
            height: 540px;
          }
          .hero-bg-circle {
            width: 380px;
            height: 380px;
            top: 48%;
          }
          .about-split-row {
            grid-template-columns: 1.5fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
