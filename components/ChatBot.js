'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FiMessageSquare,
  FiSend,
  FiExternalLink,
  FiArrowRight,
  FiX,
  FiHome,
  FiChevronLeft,
} from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { API_BASE_URL } from '@/lib/apiClient';

// Backend endpoint configuration uses the base URL
const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  API_BASE_URL ||
  'https://appixo-backend.onrender.com';

const API_URL = `${BASE_URL.replace(/\/$/, '')}/api/chat`;

const QUICK_PROMPTS = [
  'What services do you offer?',
  'How can I get a project quote?',
  'What tech stack do you use?',
  'Where are your offices located?'
];

const LINKEDIN_URL = 'https://www.linkedin.com/company/appixotech/';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'messages'
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello! 👋 I am Appixo’s AI assistant. How can I help you with your project today?'
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && activeTab === 'messages') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  const sendMessage = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const newHistory = [...messages, { role: 'user', content: text }];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newHistory.slice(-6)
        })
      });

      const data = await response.json();
      const replyText = data.reply || data.response || data.message;

      if (response.ok && replyText) {
        setMessages((prev) => [...prev, { role: 'assistant', content: replyText }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              data.error ||
              'Sorry, I ran into an error connecting to AI. Please try again or reach out at /enquiry.'
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Unable to reach the server. Please ensure the backend is running.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ax-chatbot-root">
      {/* Floating Circular Toggle Button - Enhanced Chat Icon in Appixo Gold */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ax-chatbot-btn"
          aria-label="Open Appixo Support & AI Assistant"
        >
          <FiMessageSquare size={25} strokeWidth={2.3} />

          {/* Active Status Pulse Dot */}
          <span
            style={{
              position: 'absolute',
              top: '1px',
              right: '1px',
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #070B14',
              boxShadow: '0 0 6px #22c55e',
            }}
          />
        </button>
      )}

      {/* Main Enhanced Widget Window */}
      {isOpen && (
        <div className="ax-chatbot-window">
          {/* ===================== VIEW 1: HOME TAB ===================== */}
          {activeTab === 'home' && (
            <div
              className="ax-chatbot-scroll"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                background: 'linear-gradient(180deg, #101E38 0%, #0C1527 50%, #090F1C 100%)',
              }}
            >
              {/* Home Header: Avatar & Close */}
              <div
                style={{
                  padding: '20px 22px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Appixo Brand Avatar with Online Dot */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(16,26,43,0.9) 100%)',
                      border: '1.5px solid #D4AF37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(212, 175, 55, 0.25)',
                    }}
                  >
                    <img
                      src="/logo-transparent.png"
                      alt="Appixo"
                      style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                    />
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#22c55e',
                      border: '2px solid #101E38',
                      boxShadow: '0 0 6px #22c55e',
                    }}
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#94A3B8';
                  }}
                  aria-label="Close widget"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Welcome Typography Banner */}
              <div style={{ padding: '10px 22px 24px' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#D4AF37',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Appixo Technologies
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '25px',
                    fontWeight: 800,
                    lineHeight: 1.25,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Welcome to Appixo!
                  <span
                    style={{
                      display: 'block',
                      marginTop: '4px',
                      fontSize: '22px',
                      fontWeight: 700,
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #D4AF37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    How can we Help you?
                  </span>
                </h2>
              </div>

              {/* Action Cards Section */}
              <div
                style={{
                  padding: '0 20px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {/* SECTION 1: Send us a message / Chat with us */}
                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'linear-gradient(145deg, rgba(22, 33, 58, 0.95) 0%, rgba(13, 21, 38, 0.95) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 28px rgba(0, 0, 0, 0.45), 0 0 20px rgba(212, 175, 55, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.35)';
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>Send us a message</span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: '10px',
                          background: 'rgba(212, 175, 55, 0.15)',
                          color: '#EBCE74',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          textTransform: 'uppercase',
                        }}
                      >
                        AI Active
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.4 }}>
                      We typically reply in under a minute
                    </div>
                  </div>

                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.12)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#D4AF37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FiSend size={16} />
                  </div>
                </button>

                {/* SECTION 2: LinkedIn Profile Link */}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    textDecoration: 'none',
                    textAlign: 'left',
                    background: 'linear-gradient(145deg, rgba(22, 33, 58, 0.95) 0%, rgba(13, 21, 38, 0.95) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0A66C2';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow =
                      '0 12px 28px rgba(0, 0, 0, 0.45), 0 0 20px rgba(10, 102, 194, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.35)';
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <FaLinkedin size={18} color="#0A66C2" />
                      <span>Appixo on LinkedIn</span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.4 }}>
                      Company news, leadership &amp; career opportunities
                    </div>
                  </div>

                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(10, 102, 194, 0.14)',
                      border: '1px solid rgba(10, 102, 194, 0.35)',
                      color: '#38BDF8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FiExternalLink size={16} />
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* ===================== VIEW 2: MESSAGES TAB ===================== */}
          {activeTab === 'messages' && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: '#090F1C',
              }}
            >
              {/* Messages Header */}
              <div
                style={{
                  padding: '14px 18px',
                  background: 'linear-gradient(180deg, #101E38 0%, #0D1627 100%)',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => setActiveTab('home')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#D4AF37',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="Back to Home"
                  >
                    <FiChevronLeft size={22} />
                  </button>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid #D4AF37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src="/logo-transparent.png"
                      alt="Appixo"
                      style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                      Appixo AI Assistant
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#22c55e',
                          boxShadow: '0 0 6px #22c55e',
                        }}
                      />
                      Online
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94A3B8',
                    fontSize: '22px',
                    lineHeight: 1,
                    cursor: 'pointer',
                    padding: '4px 8px',
                  }}
                  aria-label="Close Chat"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div
                className="ax-chatbot-scroll"
                style={{
                  flex: 1,
                  padding: '16px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                      background:
                        m.role === 'user'
                          ? 'linear-gradient(135deg, #D4AF37 0%, #B78B18 100%)'
                          : 'rgba(22, 33, 58, 0.85)',
                      color: m.role === 'user' ? '#070B14' : '#F8FAFC',
                      fontWeight: m.role === 'user' ? '600' : '400',
                      padding: '11px 15px',
                      borderRadius: m.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      maxWidth: '85%',
                      fontSize: '13.5px',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      border:
                        m.role === 'user'
                          ? 'none'
                          : '1px solid rgba(212, 175, 55, 0.15)',
                    }}
                  >
                    {m.content}
                  </div>
                ))}
                {loading && (
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      color: '#D4AF37',
                      fontSize: '12.5px',
                      fontStyle: 'italic',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 8px',
                    }}
                  >
                    <span>⚡</span> Appixo AI is typing...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div
                style={{
                  padding: '8px 14px',
                  display: 'flex',
                  gap: '6px',
                  overflowX: 'auto',
                  background: 'rgba(10, 16, 28, 0.95)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    disabled={loading}
                    style={{
                      background: 'rgba(22, 33, 58, 0.8)',
                      color: '#CBD5E1',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '14px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = 'rgba(32, 48, 82, 0.95)';
                        e.currentTarget.style.borderColor = '#D4AF37';
                        e.currentTarget.style.color = '#FFFFFF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = 'rgba(22, 33, 58, 0.8)';
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                        e.currentTarget.style.color = '#CBD5E1';
                      }
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Form Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                style={{
                  padding: '12px 14px',
                  borderTop: '1px solid rgba(212, 175, 55, 0.16)',
                  display: 'flex',
                  gap: '8px',
                  background: '#090F1C',
                }}
              >
                <input
                  type="text"
                  className="ax-chatbot-input"
                  value={input}
                  placeholder="Ask about apps, web, AI..."
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(22, 33, 58, 0.8)',
                    color: '#F8FAFC',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '10px',
                    padding: '9px 14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B78B18 100%)',
                    color: '#070B14',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '9px 16px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                    opacity: loading || !input.trim() ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>Send</span>
                  <FiSend size={13} />
                </button>
              </form>
            </div>
          )}

          {/* ===================== BOTTOM NAVIGATION BAR ===================== */}
          <div
            className="ax-chatbot-bottom-bar"
            style={{
              height: '58px',
              background: '#070B14',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            {/* Tab 1: Home */}
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              style={{
                background: 'transparent',
                border: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                cursor: 'pointer',
                color: activeTab === 'home' ? '#D4AF37' : '#94A3B8',
                transition: 'color 0.2s ease',
              }}
            >
              <FiHome size={19} />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: activeTab === 'home' ? 700 : 500,
                  letterSpacing: '0.02em',
                }}
              >
                Home
              </span>
            </button>

            {/* Tab 2: Messages */}
            <button
              type="button"
              onClick={() => setActiveTab('messages')}
              style={{
                background: 'transparent',
                border: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                cursor: 'pointer',
                color: activeTab === 'messages' ? '#D4AF37' : '#94A3B8',
                transition: 'color 0.2s ease',
              }}
            >
              <FiMessageSquare size={19} />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: activeTab === 'messages' ? 700 : 500,
                  letterSpacing: '0.02em',
                }}
              >
                Messages
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
