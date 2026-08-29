import { CheckCircle2, Cpu, Terminal } from 'lucide-react';

interface Project {
  title: string;
  category: 'Backend Core' | 'Fullstack' | 'Desktop App';
  description: string;
  highlights: string[];
  tech: string[];
  icon: React.ComponentType<any>;
}

export const ProjectsTab: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Crabonic Event Registration Platform',
      category: 'Fullstack',
      icon: Cpu,
      description: 'An enterprise event registration platform featuring dedicated portals for organisers and participants. Designed to support heavy registration traffic under strict consistency constraints.',
      tech: ['Java', 'Spring Boot', 'React.js', 'Oracle DB', 'Spring Security', 'Hibernate'],
      highlights: [
        'Architected core REST API endpoints and back-end logic using Java Spring Boot.',
        'Developed frontend components using React.js to improve responsiveness and user engagement.',
        'Integrated JPA/Hibernate object-relational mapping structures for clean database CRUD loops.'
      ]
    },
    {
      title: 'Clinic Booking System (F.F.S.S.)',
      category: 'Desktop App',
      icon: Terminal,
      description: 'A desktop booking application custom-built and donated to the F.F.S.S. non-profit clinic. Created a highly intuitive workflow for non-technical staff to schedule patient appointments.',
      tech: ['Java', 'JavaFX', 'Desktop UI', 'SQLite', 'Local Deployment'],
      highlights: [
        'Designed a streamlined scheduler interface focused on usability and accessibility.',
        'Successfully donated and deployed the system locally for real-world clinic medical use.',
        'Provided local database backups and database recovery documentation.'
      ]
    },
    {
      title: 'Dance Studio Booking Web Application',
      category: 'Fullstack',
      icon: Cpu,
      description: 'A responsive web-based scheduling and booking reservation platform designed for fitness classes and dance studios.',
      tech: ['Java Spring', 'Angular', 'REST APIs', 'Spring Security', 'Real-time Booking'],
      highlights: [
        'Developed the frontend elements using Angular with component-level state bindings.',
        'Implemented core backend business logic, validation rules, and schedule slots using Java Spring.',
        'Integrated real-time database locks preventing double-booking of classes.'
      ]
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      width: '100%'
    }}>
      <div>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Selected Project Work</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Explore key systems, web apps, and databases built during my developer journey.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div 
              key={proj.title}
              className="glass-card glass-card-hover"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(10, 8, 22, 0.35)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <span className="glass-badge glass-badge-cyan" style={{ fontSize: '0.65rem' }}>{proj.category}</span>
                  <div style={{ color: 'var(--accent-purple)' }}><Icon size={20} /></div>
                </div>

                {/* Info */}
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '600' }}>{proj.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.4' }}>
                    {proj.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div style={{ marginTop: '0.25rem' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {proj.highlights.map((hl, i) => (
                      <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'start', gap: '6px' }}>
                        <CheckCircle2 size={12} style={{ color: 'var(--accent-emerald)', marginTop: '3px', flexShrink: 0 }} />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Footer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {proj.tech.map((t) => (
                    <span 
                      key={t}
                      style={{ 
                        fontSize: '0.65rem', 
                        padding: '2px 6px', 
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
