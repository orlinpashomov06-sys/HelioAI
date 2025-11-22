import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Eraser, StopCircle } from 'lucide-react';
import { IBusinessProfile, IMessage } from '../types';
import { sendMessageToHelio } from '../services/gemini';
import { Markdown } from './Markdown';

interface ChatProps {
  profile: IBusinessProfile;
}

export const Chat: React.FC<ChatProps> = ({ profile }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check for draft message from Dashboard
  useEffect(() => {
    const draft = localStorage.getItem('helio_draft_msg');
    if (draft) {
      setInput(draft);
      localStorage.removeItem('helio_draft_msg');
      if (textareaRef.current) {
          textareaRef.current.focus();
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    // Reset height of textarea
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
    }

    const newUserMsg: IMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    // Call Gemini Service
    const aiResponseText = await sendMessageToHelio(messages, userText, profile);

    const newAiMsg: IMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: aiResponseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newAiMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if(window.confirm("Are you sure you want to clear the conversation context?")) {
        setMessages([]);
    }
  };

  const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      e.target.style.height = 'auto';
      e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 relative">
      {/* Chat Header (Optional if we want specific controls) */}
      <div className="absolute top-4 right-4 z-10">
        {messages.length > 0 && (
            <button 
                onClick={handleClearChat}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-full bg-slate-900/50 backdrop-blur hover:bg-slate-900"
                title="Clear Conversation"
            >
                <Eraser size={18} />
            </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 opacity-60 select-none">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <Bot size={32} className="text-indigo-500" />
            </div>
            <p>Helio is ready to strategize.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 max-w-4xl mx-auto ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-indigo-400 border border-slate-700'
              }`}
            >
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>

            {/* Bubble */}
            <div
              className={`flex-1 rounded-2xl p-5 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
              }`}
            >
              {msg.role === 'model' ? (
                <Markdown content={msg.content} />
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 max-w-4xl mx-auto">
             <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 text-indigo-400 border border-slate-700 flex items-center justify-center animate-pulse">
                <Bot size={18} />
             </div>
             <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl rounded-tl-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={adjustHeight}
            onKeyDown={handleKeyDown}
            placeholder="Ask Helio for strategy, copy, or creative ideas..."
            disabled={isLoading}
            className="w-full bg-slate-900 text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pl-5 pr-12 py-4 resize-none max-h-48 shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{ minHeight: '60px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs text-slate-600 mt-3">
            Helio is an AI and may make mistakes. Review outputs before publishing.
        </p>
      </div>
    </div>
  );
};