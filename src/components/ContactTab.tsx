import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, Terminal, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const ContactTab: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const smtpScript = [
    "[MAILER] Instantiating JavaMailSenderImpl session...",
    "[MAILER] Server: smtp.gmail.com | Port: 587 | Authentication: TRUE",
    "[MAILER] Connecting to SMTP server at smtp.gmail.com:587...",
    "[SMTP-TRANSP] Connection established. Reading greeting banner...",
    "[SMTP-TRANSP] Server response: 220 mx.google.com ESMTP v12sm12304pgb.8 - gsmtp",
    "[SMTP-TRANSP] Sending EHLO cytan-portfolio-app...",
    "[SMTP-TRANSP] Server response: 250-mx.google.com Hello, 250-STARTTLS, 250-AUTH LOGIN PLAIN",
    "[SMTP-TRANSP] Initiating TLS negotiation (STARTTLS command)...",
    "[SMTP-TRANSP] TLS Handshake complete. Cipher Suite: TLS_AES_256_GCM_SHA384",
    "[SMTP-TRANSP] Authenticating user: cytanbrain2003@gmail.com...",
    "[SMTP-TRANSP] AUTH LOGIN PLAIN verification SUCCESSFUL.",
    "[MAILER] Formatting MimeMessage (Encoding: UTF-8)...",
    "[MAILER] Headers added: From=USER_EMAIL, To=cytanbrain2003@gmail.com, Subject='Portfolio Inquiry'",
    "[SMTP-TRANSP] Sending message payload headers and body...",
    "[KAFKA] Emitting background notification event topic 'contact-notifications'...",
    "[SMTP-TRANSP] Server response: 250 2.0.0 OK 1787992485 v12sm12304pgb.8 - gsmtp",
    "[MAILER] Connection closed. SMTP transport stream terminated.",
    "[STATUS] Send SUCCESS: Message delivered successfully!"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || isSending) return;

    setIsSending(true);
    setIsSuccess(false);
    setLogs([]);

    // Replace template strings in script
    const customScript = smtpScript.map(log => 
      log.replace('USER_EMAIL', email)
    );

    let line = 0;
    const interval = setInterval(() => {
      if (line < customScript.length) {
        setLogs((prev) => [...prev, customScript[line]]);
        line++;
      } else {
        clearInterval(interval);
        setIsSending(false);
        setIsSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      }
    }, 450);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '2.5rem',
      flexGrow: 1,
      width: '100%'
    }} className="contact-grid">
      
      {/* Left Column: Traditional Form & Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }} className="contact-info-col">
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Get in Touch</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Have a project or opportunity? Send me a message to trigger our SMTP mail delivery simulation.
          </p>
        </div>

        {/* Contact info list */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: 'var(--accent-purple)' }}><Mail size={18} /></div>
            <span>cytanbrain2003@gmail.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: 'var(--accent-cyan)' }}><Phone size={18} /></div>
            <span>+66 945 505 977</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: 'var(--accent-emerald)' }}><MapPin size={18} /></div>
            <span>Bangkok, Thailand (Requires Visa Sponsorship / Myanmar National)</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="glass-input"
              disabled={isSending}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="glass-input"
              disabled={isSending}
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ height: '120px', resize: 'none' }}
              className="glass-input"
              disabled={isSending}
            />
          </div>

          <button
            type="submit"
            disabled={isSending || !name || !email || !message}
            className="glass-btn glass-btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.75rem',
              borderRadius: 'var(--border-radius-sm)',
              fontWeight: '600'
            }}
          >
            <Send size={16} />
            <span>{isSending ? 'Sending via SMTP...' : 'Send Message'}</span>
          </button>
        </form>

        {isSuccess && (
          <div className="glass-card-subtle" style={{
            padding: '0.75rem 1rem',
            border: '1px solid rgba(52, 211, 153, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--accent-emerald)',
            fontSize: '0.85rem'
          }}>
            <CheckCircle2 size={16} />
            <span>Success! Message delivered successfully to my inbox.</span>
          </div>
        )}
      </div>

      {/* Right Column: Simulated JavaMail SMTP Protocol Logger */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        minHeight: '300px'
      }} className="contact-console-col">
        <h4 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1rem',
          color: 'var(--text-primary)'
        }}>
          <Terminal size={18} style={{ color: 'var(--accent-purple)' }} />
          <span>JavaMail SMTP Protocol logs</span>
        </h4>

        <div className="terminal-window" style={{ flexGrow: 1 }}>
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
            </div>
            <div className="terminal-title">JAVAMAIL_SMTP_TRANSPORT</div>
          </div>
          <div className="terminal-content" style={{ maxHeight: '320px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
                Console idle. Fill out and submit the contact form on the left to trace SMTP transport sockets.
              </div>
            ) : (
              logs.map((log, index) => {
                const isMailer = log.includes('[MAILER]');
                const isTransp = log.includes('[SMTP-TRANSP]');
                const isKafka = log.includes('[KAFKA]');
                const isSuccess = log.includes('SUCCESS') || log.includes('delivered');
                
                let levelClass = 'log-level-info';
                if (isTransp) levelClass = 'log-level-debug';
                if (isKafka) levelClass = 'log-level-warn';
                if (isSuccess) levelClass = 'log-level-emerald';

                return (
                  <div key={index} className="log-line" style={{ display: 'flex', fontSize: '0.75rem' }}>
                    <span className="log-time" style={{ flexShrink: 0 }}>15:33:14.{index * 3}</span>
                    <span className={levelClass} style={{ marginRight: '0.5rem', flexShrink: 0, fontWeight: 'bold' }}>
                      {isMailer ? 'MAILER' : isTransp ? 'SMTP' : isKafka ? 'KAFKA' : 'SUCCESS'}
                    </span>
                    <span className="log-message" style={{ color: isSuccess ? 'var(--accent-emerald)' : '#e2e8f0' }}>
                      {log.substring(log.indexOf(']') + 2)}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>
      </div>
      
    </div>
  );
};
