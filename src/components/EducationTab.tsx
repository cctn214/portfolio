import React, { useState } from 'react';
import { Award, BookOpen, Calendar, MapPin, X } from 'lucide-react';
import degreeImg from '../assets/degree_sunderland.png';
import javaImg from '../assets/cert_java.png';
import aiImg from '../assets/cert_ai.png';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
}

export const EducationTab: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');

  const certs: Certificate[] = [
    {
      title: 'Bachelor of Science (Hons) in Computer Systems Engineering',
      issuer: 'University of Sunderland',
      date: 'September 2025',
      description: 'Second Class Honours (Second Division) degree program in Computer Systems Engineering, completed via Gusto University.',
      image: degreeImg
    },
    {
      title: 'One Stop Java Course',
      issuer: 'Java Developer Class (Zaw Min Lwin)',
      date: 'June 30, 2022',
      description: 'Comprehensive training program requirement covering Java Standard Edition, Spring Framework, and Angular Framework.',
      image: javaImg
    },
    {
      title: 'Future Youth with AI Ready',
      issuer: 'ASEAN Youth Organization',
      date: 'July 6, 2026',
      description: 'Active participation certificate recognizing AI enablement, training, and youth-focused development modules.',
      image: aiImg
    }
  ];

  const openLightbox = (image: string, title: string) => {
    setLightboxImage(image);
    setLightboxTitle(title);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle('');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      width: '100%',
      flexGrow: 1
    }}>
      {/* Page Header */}
      <div>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={22} style={{ color: 'var(--accent-purple)' }} />
          <span>Education & Credentials</span>
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          My academic foundation and professional certifications in software engineering.
        </p>
      </div>

      {/* Main Grid: Info & Certificate items */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
        alignItems: 'start'
      }} className="edu-grid">
        
        {/* Education Timeline / Overview */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
            Academic History
          </h4>

          <div className="glass-card-subtle" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h5 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>BSc (Hons) Computer Systems Engineering</h5>
                <div style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: '500', marginTop: '0.25rem' }}>
                  University of Sunderland (via Gusto University)
                </div>
              </div>
              <span className="glass-badge glass-badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                <span>Graduated 2025</span>
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Studied core systems architecture, hardware/software integrations, database models, and algorithm design. Awarded Bachelor of Science with **Second Class Honours (Second Division)**.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
              borderTop: '1px solid rgba(255,255,255,0.03)',
              paddingTop: '0.75rem'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} />
                <span>Yangon, Myanmar (Hybrid Study Program)</span>
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={12} style={{ color: 'var(--accent-purple)' }} />
                <span>Honours Division II</span>
              </span>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
            Certifications & Degree Documents
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.75rem' }}>
            Click on any certificate to view it in full size.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {certs.map((cert) => (
              <div 
                key={cert.title}
                className="glass-card glass-card-hover"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  cursor: 'pointer',
                  background: 'rgba(10, 8, 22, 0.35)'
                }}
                onClick={() => openLightbox(cert.image, cert.title)}
              >
                {/* Certificate Thumbnail Area */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '160px',
                  borderRadius: 'var(--border-radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform var(--transition-normal)'
                    }}
                    className="cert-thumb-img"
                  />
                  {/* Hover Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 15, 30, 0.4)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    transition: 'opacity var(--transition-fast)'
                  }} className="cert-hover-overlay">
                    <span>Click to Zoom</span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{cert.issuer}</span>
                    <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>{cert.date}</span>
                  </div>
                  <h5 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600', lineHeight: '1.3', marginTop: '0.25rem' }}>
                    {cert.title}
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.4' }}>
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 5, 10, 0.9)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
        >
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <X size={20} />
          </button>

          {/* Expanded Image */}
          <div 
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking image container
            style={{
              maxWidth: '90%',
              maxHeight: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <img 
              src={lightboxImage} 
              alt={lightboxTitle} 
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            />
            <div style={{
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: '600',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.4)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              {lightboxTitle}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .edu-grid {
            grid-template-columns: 1fr 1.8fr !important;
          }
        }
        .glass-card-hover:hover .cert-hover-overlay {
          opacity: 1 !important;
        }
        .glass-card-hover:hover .cert-thumb-img {
          transform: scale(1.05) !important;
        }
      `}</style>
    </div>
  );
};
