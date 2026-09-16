import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, Terminal, Phone, MapPin, CheckCircle2, RotateCcw, Activity } from 'lucide-react';

interface SentMessageData {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export const ContactTab: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'streaming_logs' | 'typing_cls' | 'message_box'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [typingClsText, setTypingClsText] = useState('');
  const [sentData, setSentData] = useState<SentMessageData | null>(null);
  const [cliInput, setCliInput] = useState('');
  const [cliResponses, setCliResponses] = useState<{ command: string; output: string[] }[]>([]);

  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ONLY inside the terminal box, never touching the window scroll
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [logs, typingClsText, phase, cliResponses]);

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

    const currentMsgData: SentMessageData = {
      name,
      email,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setIsSending(true);
    setPhase('streaming_logs');
    setLogs([]);
    setTypingClsText('');
    setCliResponses([]);

    const customScript = smtpScript.map(log =>
      log.replace('USER_EMAIL', email)
    );

    let line = 0;
    const logInterval = setInterval(() => {
      if (line < customScript.length) {
        setLogs((prev) => [...prev, customScript[line]]);
        line++;
      } else {
        clearInterval(logInterval);
        
        // Stage 2: Simulate typing `cls`
        setPhase('typing_cls');
        let charIndex = 0;
        const clsCmd = "cls";
        
        const typingInterval = setInterval(() => {
          if (charIndex <= clsCmd.length) {
            setTypingClsText(clsCmd.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typingInterval);
            
            // Stage 3: Clear screen and transition to Message Box Prompt
            setTimeout(() => {
              setLogs([]);
              setTypingClsText('');
              setSentData(currentMsgData);
              setPhase('message_box');
              setIsSending(false);
              setName('');
              setEmail('');
              setMessage('');
            }, 500);
          }
        }, 100);
      }
    }, 220);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let res: string[] = [];

    if (lower === 'cls' || lower === 'clear') {
      setCliResponses([]);
      setCliInput('');
      return;
    } else if (lower === 'status') {
      res = [
        `[STATUS] Link active. Recipient: cytanbrain2003@gmail.com`,
        `[STATUS] Queue position: #1 (Immediate Dispatch)`,
        `[STATUS] Waiting response from CYTAN...`
      ];
    } else if (lower === 'ping') {
      res = [
        `[PING] PONG 64 bytes from smtp.gmail.com: icmp_seq=1 ttl=118 time=18.4 ms`,
        `[PING] Socket: OPEN • Port: 587 • TLS Handshake: VERIFIED`
      ];
    } else if (lower === 'help') {
      res = [
        `Available Commands:`,
        `  status  - Check delivery and queue status`,
        `  ping    - Test simulated socket latency`,
        `  whoami  - Show your guest session details`,
        `  cls     - Clear screen command output`,
        `  reset   - Reset form & send a new message`
      ];
    } else if (lower === 'whoami') {
      res = [
        `[SESSION USER] ${sentData?.name || 'Guest'} (${sentData?.email || 'guest@client.local'})`,
        `[TERMINAL] Direct TCP/TLS Guest Channel`
      ];
    } else if (lower === 'reset' || lower === 'new') {
      handleReset();
      return;
    } else {
      res = [
        `Command not recognized: '${cmd}'. Type 'help' for available commands.`
      ];
    }

    setCliResponses(prev => [...prev, { command: cmd, output: res }]);
    setCliInput('');
  };

  const executeQuickCmd = (cmd: string) => {
    if (cmd === 'reset') {
      handleReset();
      return;
    }
    setCliInput(cmd);
    let res: string[] = [];
    if (cmd === 'ping') {
      res = [
        `[PING] PONG 64 bytes from smtp.gmail.com: icmp_seq=1 ttl=118 time=18.4 ms`,
        `[PING] Socket: OPEN • Port: 587 • TLS Handshake: VERIFIED`
      ];
    } else if (cmd === 'status') {
      res = [
        `[STATUS] Link active. Recipient: cytanbrain2003@gmail.com`,
        `[STATUS] Queue position: #1 (Immediate Dispatch)`,
        `[STATUS] Waiting response from CYTAN...`
      ];
    } else if (cmd === 'help') {
      res = [
        `Available Commands:`,
        `  status  - Check delivery and queue status`,
        `  ping    - Test simulated socket latency`,
        `  whoami  - Show your guest session details`,
        `  cls     - Clear screen command output`,
        `  reset   - Reset form & send a new message`
      ];
    }
    setCliResponses(prev => [...prev, { command: cmd, output: res }]);
    setCliInput('');
  };

  const handleReset = () => {
    setPhase('idle');
    setLogs([]);
    setTypingClsText('');
    setSentData(null);
    setCliResponses([]);
    setCliInput('');
  };

  return (
    <div style={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="contact-grid">
        
        {/* Left Column: Form & Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }} className="contact-info-col">
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Get in Touch</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Have a project or opportunity? Send a message to dispatch live through our JavaMail SMTP simulator.
            </p>
          </div>

          {/* Contact info list */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            fontSize: '0.88rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ color: 'var(--accent-purple)' }}><Mail size={17} /></div>
              <span>cytanbrain2003@gmail.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ color: 'var(--accent-cyan)' }}><Phone size={17} /></div>
              <span>+66 945 505 977</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ color: 'var(--accent-emerald)' }}><MapPin size={17} /></div>
              <span>Bangkok, Thailand (Requires Visa Sponsorship / Myanmar National)</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
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
                style={{ height: '110px', resize: 'none' }}
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
              <span>{isSending ? 'Transmitting via SMTP...' : 'Send Message'}</span>
            </button>
          </form>

          {phase === 'message_box' && (
            <div className="glass-card-subtle" style={{
              padding: '0.75rem 1rem',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              background: 'rgba(16, 185, 129, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              color: 'var(--accent-emerald)',
              fontSize: '0.82rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} />
                <span>Message dispatched! Terminal session active.</span>
              </div>
              <button
                onClick={handleReset}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  opacity: 0.85
                }}
                title="Reset Form"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Command Prompt & Protocol Console */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          height: '100%',
          minHeight: '440px'
        }} className="contact-console-col">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              color: 'var(--text-primary)'
            }}>
              <Terminal size={17} style={{ color: 'var(--accent-purple)' }} />
              <span>{phase === 'message_box' ? 'CYTAN Command Prompt [SESSION]' : 'JavaMail SMTP Protocol logs'}</span>
            </h4>

            {phase === 'message_box' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>
                <span className="led-indicator led-green" />
                <span>LIVE_CHANNEL</span>
              </div>
            )}
          </div>

          <div className="terminal-window" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '420px'
          }}>
            {/* Terminal Window Header */}
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <div className="terminal-title">
                {phase === 'message_box' ? 'CYTAN_INTERACTIVE_CONSOLE' : 'JAVAMAIL_SMTP_TRANSPORT'}
              </div>
            </div>

            {/* Terminal Content Area */}
            <div
              ref={terminalContentRef}
              className="terminal-content"
              style={{
                flexGrow: 1,
                height: '320px',
                maxHeight: '320px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                background: 'rgba(5, 4, 12, 0.95)'
              }}
            >
              {/* 1. Idle State */}
              {phase === 'idle' && (
                <div style={{
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  gap: '0.75rem'
                }}>
                  <Terminal size={30} style={{ opacity: 0.3, color: 'var(--accent-purple)' }} />
                  <span style={{ fontSize: '0.82rem', maxWidth: '320px', lineHeight: '1.4' }}>
                    Console idle. Fill out the contact form on the left and submit to stream the SMTP transport socket trace.
                  </span>
                </div>
              )}

              {/* 2. Streaming Protocol Logs */}
              {(phase === 'streaming_logs' || phase === 'typing_cls') && (
                <>
                  {logs.map((log, index) => {
                    const isMailer = log.includes('[MAILER]');
                    const isTransp = log.includes('[SMTP-TRANSP]');
                    const isKafka = log.includes('[KAFKA]');
                    const isSuccess = log.includes('SUCCESS') || log.includes('delivered');
                    
                    let levelClass = 'log-level-info';
                    if (isTransp) levelClass = 'log-level-debug';
                    if (isKafka) levelClass = 'log-level-warn';
                    if (isSuccess) levelClass = 'log-level-emerald';

                    return (
                      <div key={index} className="log-line" style={{ display: 'flex', fontSize: '0.74rem' }}>
                        <span className="log-time" style={{ flexShrink: 0 }}>15:33:14.{index * 3}</span>
                        <span className={levelClass} style={{ marginRight: '0.5rem', flexShrink: 0, fontWeight: 'bold' }}>
                          {isMailer ? 'MAILER' : isTransp ? 'SMTP' : isKafka ? 'KAFKA' : 'SUCCESS'}
                        </span>
                        <span className="log-message" style={{ color: isSuccess ? 'var(--accent-emerald)' : '#e2e8f0' }}>
                          {log.substring(log.indexOf(']') + 2)}
                        </span>
                      </div>
                    );
                  })}

                  {/* Simulated typing of `cls` command */}
                  {phase === 'typing_cls' && (
                    <div style={{ marginTop: '0.5rem', color: '#38bdf8', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: 'var(--accent-purple)', marginRight: '0.5rem' }}>cytan@smtp:~$</span>
                      <span>{typingClsText}</span>
                      <span style={{ animation: 'flash-led 0.8s infinite', marginLeft: '2px' }}>_</span>
                    </div>
                  )}
                </>
              )}

              {/* 3. Cleared & Formatted Message Box Session */}
              {phase === 'message_box' && sentData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <div className="terminal-divider-purple" />
                  <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Activity size={14} style={{ color: 'var(--accent-emerald)' }} />
                    <span>CYTAN COMM-LINK v2.4 [SESSION ACTIVE]</span>
                  </div>
                  <div className="terminal-divider-purple" />

                  <div style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <div><strong style={{ color: '#e2e8f0' }}>[TIMESTAMP]</strong> : {sentData.timestamp} UTC</div>
                    <div><strong style={{ color: '#e2e8f0' }}>[SENDER]   </strong> : {sentData.name} &lt;{sentData.email}&gt;</div>
                    <div><strong style={{ color: '#e2e8f0' }}>[RECIPIENT]</strong> : CYTAN &lt;cytanbrain2003@gmail.com&gt;</div>
                    <div><strong style={{ color: '#e2e8f0' }}>[TRANSPORT]</strong> : JavaMailSenderImpl (TLS 1.3 / Port 587)</div>
                    <div><strong style={{ color: '#e2e8f0' }}>[STATUS]   </strong> : <span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>🟢 DISPATCHED • AWAITING RESPONSE</span></div>
                  </div>

                  <div className="terminal-divider" />

                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', marginBottom: '0.2rem', fontWeight: 'bold' }}>
                      [TRANSMITTED MESSAGE]:
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '4px',
                      borderLeft: '3px solid var(--accent-purple)',
                      color: '#f8fafc',
                      fontSize: '0.8rem',
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.4'
                    }}>
                      "{sentData.message}"
                    </div>
                  </div>

                  <div className="terminal-divider" />

                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                    <div style={{ color: 'var(--accent-emerald)', marginBottom: '0.15rem' }}>
                      [SYSTEM] Message stored in queue. Pushed to cytanbrain2003@gmail.com.
                    </div>
                    <div style={{ color: '#fbbf24', fontStyle: 'italic' }}>
                      &gt;&gt; Waiting for response from CYTAN...
                    </div>
                  </div>

                  {/* CLI Command Outputs */}
                  {cliResponses.map((item, idx) => (
                    <div key={idx} style={{ marginTop: '0.35rem', fontSize: '0.76rem' }}>
                      <div style={{ color: 'var(--accent-purple)' }}>
                        guest@cytan:~$ <span style={{ color: '#f8fafc' }}>{item.command}</span>
                      </div>
                      {item.output.map((outLine, lineIdx) => (
                        <div key={lineIdx} style={{ color: '#94a3b8', paddingLeft: '0.65rem' }}>
                          {outLine}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Command Pills for mobile/easy clicking */}
            {phase === 'message_box' && (
              <div style={{
                display: 'flex',
                gap: '0.35rem',
                padding: '0.35rem 0.65rem',
                background: 'rgba(0, 0, 0, 0.3)',
                borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                overflowX: 'auto'
              }}>
                <button
                  onClick={() => executeQuickCmd('status')}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  $ status
                </button>
                <button
                  onClick={() => executeQuickCmd('ping')}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  $ ping
                </button>
                <button
                  onClick={() => executeQuickCmd('help')}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  $ help
                </button>
                <button
                  onClick={() => executeQuickCmd('reset')}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(192, 132, 252, 0.12)',
                    border: '1px solid rgba(192, 132, 252, 0.25)',
                    borderRadius: '4px',
                    color: '#d8b4fe',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  $ new-msg
                </button>
              </div>
            )}

            {/* Interactive Command Prompt Line */}
            {phase === 'message_box' && (
              <form
                onSubmit={handleCliSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  gap: '0.4rem'
                }}
              >
                <span style={{ color: 'var(--accent-purple)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                  guest@cytan:~$
                </span>
                <input
                  type="text"
                  placeholder="type 'status', 'ping', 'help', or 'cls'..."
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#38bdf8',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    flexGrow: 1
                  }}
                />
              </form>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};
