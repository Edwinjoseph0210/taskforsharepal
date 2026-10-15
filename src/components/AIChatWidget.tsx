import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi there! I am Pal, your AI gaming assistant. Looking to rent a PS5, Xbox, VR headset, or gaming laptop in Bangalore? Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
      
      if (!apiKey) {
        // Fallback intelligent response if API key is not present
        setTimeout(() => {
          const lower = userMessage.toLowerCase();
          let reply = "I'm Pal from SharePal! We offer PlayStation 5, Xbox Series X, Meta Quest 3 VR, and gaming laptops on rent across Bangalore with free delivery & pickup. How can I help you today?";
          
          if (lower.includes('ps5') || lower.includes('playstation')) {
            reply = "Our PlayStation 5 bundle includes 2 DualSense wireless controllers and top physical game discs (FC25, Spider-Man 2, God of War) starting at ₹2,299/month with free delivery in Bangalore!";
          } else if (lower.includes('deposit') || lower.includes('security')) {
            reply = "Security deposits are 100% refundable and range from ₹1,000 to ₹2,500 depending on the gadget. They are refunded within 2-3 working days after return inspection.";
          } else if (lower.includes('delivery') || lower.includes('bangalore') || lower.includes('time')) {
            reply = "We offer express 24-hour doorstep delivery across Bangalore including Indiranagar, Koramangala, HSR Layout, Whitefield, and Jayanagar!";
          } else if (lower.includes('xbox') || lower.includes('series x')) {
            reply = "The Xbox Series X 1TB console is available starting at ₹2,199/month with Game Pass access included!";
          }

          setMessages((prev) => [...prev, { role: 'model', text: reply }]);
          setIsLoading(false);
        }, 800);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = 'gemini-2.5-flash';
      
      const chat = ai.chats.create({
        model,
        history: messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: 'You are Pal, the friendly AI gaming rental assistant for SharePal in Bangalore. You help users find gaming consoles (PS5, Xbox Series X/S, Nintendo Switch, Handhelds like Steam Deck, ASUS ROG Ally), VR headsets (Meta Quest 3), racing wheels (Logitech G29/G923), high-end gaming laptops, and projectors on rent. SharePal offers free 24-hr doorstep delivery, free pickup, refundable security deposits, and multi-month discounts across Bangalore (Indiranagar, Koramangala, HSR Layout, Whitefield, Jayanagar, etc.). Be helpful, concise, and enthusiastic about gaming!',
        }
      });

      const response = await chat.sendMessage({ message: userMessage });
      const replyText = response?.text || 'Thanks for asking! How else can I help you with your gaming rental?';
      setMessages((prev) => [...prev, { role: 'model', text: replyText }]);
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      // Fallback response on error
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Thanks for asking! SharePal provides top-tier gaming consoles (PS5, Xbox, VR, Racing Wheels) on rent in Bangalore with free delivery, zero maintenance hassle, and fully refundable security deposits. Let me know which console you would like to rent!' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-3.5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 group font-bold text-sm cursor-pointer border border-orange-400/30"
          title="Chat with AI Gaming Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white animate-bounce" />
          </div>
          <span>Chat with AI Pal</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 flex flex-col h-[500px] overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <span>Pal AI Assistant</span>
                  <span className="text-[10px] bg-orange-500 text-white font-bold px-1.5 py-0.5 rounded-full">Online</span>
                </h3>
                <p className="text-[11px] text-slate-300">Ask about rentals in Bangalore</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-orange-500 text-white rounded-br-xs shadow-md'
                      : 'bg-white text-slate-800 rounded-bl-xs shadow-xs border border-slate-200/80'
                  }`}
                >
                  {m.text}
                </div>
                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 text-slate-500 text-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                  <span>Pal is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about PS5, deposit, delivery..."
              className="flex-1 px-3.5 py-2 bg-slate-100 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 border border-slate-200"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
