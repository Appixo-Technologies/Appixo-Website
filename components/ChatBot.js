'use client';

import React, { useState, useRef, useEffect } from 'react';
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

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! 👋 I am Appixo’s AI assistant. How can I help you with your project today?'
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

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
          history: newHistory.slice(-6) // Keeps last 6 turns for context
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
            content: data.error || 'Sorry, I ran into an error connecting to AI. Please try again or reach out at /enquiry.'
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
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 999,
        fontFamily: "'Sora', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '14px 22px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(217, 119, 6, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(217, 119, 6, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.4)';
          }}
          aria-label="Open AI Chat Assistant"
        >
          <span style={{ fontSize: '18px' }}>💬</span>
          <span>Chat with Us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: 'min(360px, calc(100vw - 32px))',
            height: 'min(520px, calc(100vh - 100px))',
            maxHeight: 'min(520px, calc(100dvh - 100px))',
            background: '#0f172a',
            color: '#f8fafc',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            border: '1px solid #334155',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              background: '#1e293b',
              borderBottom: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                }}
              />
              <strong style={{ fontSize: '15px', color: '#f8fafc' }}>Appixo AI Assistant</strong>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '22px',
                lineHeight: 1,
                cursor: 'pointer',
                padding: '4px 8px',
              }}
              aria-label="Close Chat"
            >
              ×
            </button>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? '#f59e0b' : '#1e293b',
                  color: m.role === 'user' ? '#0f172a' : '#f8fafc',
                  fontWeight: m.role === 'user' ? '500' : '400',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '84%',
                  fontSize: '14px',
                  lineHeight: '1.45',
                  whiteSpace: 'pre-wrap',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  color: '#94a3b8',
                  fontSize: '13px',
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
              padding: '8px 12px',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              background: '#0b1120',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                disabled={loading}
                style={{
                  background: '#1e293b',
                  color: '#cbd5e1',
                  border: '1px solid #475569',
                  borderRadius: '14px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s, border-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#334155';
                    e.currentTarget.style.borderColor = '#f59e0b';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#1e293b';
                    e.currentTarget.style.borderColor = '#475569';
                  }
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            style={{
              padding: '12px',
              borderTop: '1px solid #334155',
              display: 'flex',
              gap: '8px',
              background: '#0f172a',
            }}
          >
            <input
              type="text"
              value={input}
              placeholder="Ask about apps, web, AI..."
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #475569',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: '#f59e0b',
                color: '#0f172a',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 14px',
                fontWeight: '600',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.6 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
