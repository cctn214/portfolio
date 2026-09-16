import React, { useState } from 'react';
import { Menu, X, BookOpen, FolderGit2, Mail, Home } from 'lucide-react';

interface GlassFrameProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export const GlassFrame: React.FC<GlassFrameProps> = ({ activeTab, setActiveTab, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="glass-card" style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Glossy top border light glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid var(--glass-border)',
        zIndex: 20,
        position: 'relative',
        background: 'rgba(10, 8, 24, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>CYTAN</span>
          <span style={{ color: 'var(--accent-purple)' }}>.</span>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none' }} className="desktop-nav-container">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '0.5rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: isActive ? 'var(--glass-bg-active)' : 'transparent',
                      border: '1px solid',
                      borderColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--border-radius-sm)',
                      cursor: 'pointer',
                      fontWeight: isActive ? '600' : '500',
                      fontSize: '0.9rem',
                      transition: 'all var(--transition-fast)',
                      backdropFilter: isActive ? 'blur(4px)' : 'none'
                    }}
                    className="nav-btn"
                  >
                    <Icon size={16} style={{ color: isActive ? 'var(--accent-purple)' : 'inherit' }} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'block'
          }}
          className="mobile-toggle-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '64px',
          left: 0,
          right: 0,
          background: 'rgba(10, 8, 24, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderBottom: '1px solid var(--glass-border)',
          zIndex: 15,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }} className="mobile-nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: isActive ? 'var(--glass-bg-active)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--border-radius-sm)',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: isActive ? '600' : '500'
                }}
              >
                <Icon size={18} style={{ color: isActive ? 'var(--accent-purple)' : 'inherit' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Frame content container */}
      <main style={{
        flexGrow: 1,
        padding: '1.75rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 5
      }} className="frame-content">
        {children}
      </main>

      {/* Extra style block to handle CSS media queries for layout */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-container {
            display: block !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .frame-content {
            padding: 1.25rem !important;
          }
        }
        .nav-btn:hover {
          color: var(--text-primary) !important;
          background: rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>
    </div>
  );
};
