import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Brain, Image as ImageIcon, Loader2, Trash2, 
  FileText, Headphones, Mic, Video, Layout, List, HelpCircle, FileBarChart, PieChart, PenTool, Globe, UploadCloud
} from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ExtendedChatMessage extends ChatMessage {
  image?: string;
  isThinking?: boolean;
  audioData?: string; 
  videoUri?: string;
}

// Helper to decode base64 PCM and play it
const playPCMAudio = async (base64PCM: string) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const binaryString = atob(base64PCM);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const int16Data = new Int16Array(bytes.buffer);
    const float32Data = new Float32Array(int16Data.length);
    for (let i = 0; i < int16Data.length; i++) {
      float32Data[i] = int16Data[i] / 32768.0;
    }
    const buffer = audioContext.createBuffer(1, float32Data.length, 24000);
    buffer.copyToChannel(float32Data, 0);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    return source;
  } catch (e) {
    console.error("Audio playback error:", e);
  }
};

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'sources' | 'studio'>('chat');
  
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    { role: 'model', text: 'Hello! 👋 I\'m **Ajmal\'s personal AI assistant**.\n\nWelcome to the **Notebook Studio**! I can transform documents into **Audio Podcasts**, **Video Summaries**, and **Study Aids**. Upload a file to get started, or just ask me anything about Ajmal!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Feature States
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ data: string, mimeType: string } | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<{ name: string, data: string, mimeType: string } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, activeTab]);

  useEffect(() => {
    // Auto-switch to studio when doc is uploaded
    if (selectedDoc && activeTab === 'sources') {
        setActiveTab('studio');
    }
  }, [selectedDoc]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'doc') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const matches = base64String.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          if (type === 'image') {
            setSelectedImage({ mimeType: matches[1], data: matches[2] });
            setSelectedDoc(null);
            setActiveTab('chat'); // Images go to chat
          } else {
            setSelectedDoc({ 
              name: file.name, 
              mimeType: matches[1], 
              data: matches[2] 
            });
            setSelectedImage(null);
            setActiveTab('studio'); // Docs go to studio
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStudioAction = async (action: string) => {
    if (!selectedDoc) return;
    setActiveTab('chat');
    
    let mode: any = 'studio';
    let studioType = action;
    let displayText = `Generating ${action}...`;

    if (action === 'Audio Overview') {
        mode = 'audio_overview';
        displayText = "Generating Audio Overview...";
    } else if (action === 'Video Overview') {
        mode = 'video_overview';
        displayText = "Generating Video Overview...";
    }

    const userMessage: ExtendedChatMessage = { 
        role: 'user', 
        text: `Create ${action} for ${selectedDoc.name}`
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
        const stream = sendMessageToGemini(action === 'Video Overview' ? `Create a video about ${selectedDoc.name}` : '', {
            document: selectedDoc ? { data: selectedDoc.data, mimeType: selectedDoc.mimeType } : undefined,
            mode: mode,
            studioType: mode === 'studio' ? action.toLowerCase().replace(' ', '_') : undefined
        });

        setMessages(prev => [...prev, { role: 'model', text: '' }]);
        let fullText = '';

        for await (const chunk of stream) {
            if (typeof chunk === 'string') {
                fullText += chunk;
                setMessages(prev => {
                    const newArr = [...prev];
                    newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], text: fullText };
                    return newArr;
                });
            } else if (typeof chunk === 'object') {
                if (chunk.audio) {
                    setMessages(prev => {
                        const newArr = [...prev];
                        newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], audioData: chunk.audio };
                        return newArr;
                    });
                    playPCMAudio(chunk.audio);
                }
                if (chunk.video) {
                    setMessages(prev => {
                        const newArr = [...prev];
                        // Append key for secure fetch if needed, but for Veo preview uri it usually works or needs key param
                        const videoUrlWithKey = `${chunk.video}&key=${process.env.API_KEY}`;
                        newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], videoUri: videoUrlWithKey };
                        return newArr;
                    });
                }
                if (chunk.text) {
                     fullText += chunk.text;
                     setMessages(prev => {
                        const newArr = [...prev];
                        newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], text: fullText };
                        return newArr;
                    });
                }
            }
        }

    } catch (e) {
        setMessages(prev => [...prev, { role: 'model', text: "Error generating content." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if ((!inputValue.trim() && !selectedImage && !selectedDoc) || isLoading) return;

    const userMessage: ExtendedChatMessage = { 
      role: 'user', 
      text: inputValue || (selectedImage ? 'Analyze image' : 'Analyze document'),
      image: selectedImage ? `data:${selectedImage.mimeType};base64,${selectedImage.data}` : undefined,
      isThinking: isThinkingMode
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const stream = sendMessageToGemini(userMessage.text, { 
        useThinking: isThinkingMode,
        image: selectedImage || undefined,
        document: selectedDoc ? { data: selectedDoc.data, mimeType: selectedDoc.mimeType } : undefined,
        mode: 'chat'
      });
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      let fullText = '';
      
      for await (const chunk of stream) {
        if (typeof chunk === 'string') {
          fullText += chunk;
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = { role: 'model', text: fullText };
            return newArr;
          });
        } else if (typeof chunk === 'object' && chunk.image) {
             setMessages(prev => {
              const newArr = [...prev];
              newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], image: chunk.image };
              return newArr;
            });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-bold text-ocean dark:text-emerald">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      if (line.trim().startsWith('###')) {
        return <h3 key={lineIdx} className="font-bold text-base mt-3 mb-1 text-ocean dark:text-emerald border-b border-gray-200 dark:border-gray-700 pb-1">{parseInlineStyles(line.replace(/^#+\s*/, ''))}</h3>;
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
         return <div key={lineIdx} className="flex items-start mb-1 pl-1"><span className="mr-2 text-coral text-xs mt-1.5">•</span><span className="flex-1">{parseInlineStyles(line.trim().replace(/^[-*]\s+/, ''))}</span></div>;
      }
      if (!line.trim()) return <div key={lineIdx} className="h-2" />;
      return <p key={lineIdx} className="mb-1 leading-relaxed">{parseInlineStyles(line)}</p>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-96 md:w-[450px] bg-white dark:bg-charcoal rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[650px] animate-slide-up">
          
          {/* Header & Tabs */}
          <div className="bg-ocean dark:bg-gray-900 text-white">
            <div className="p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center">
                 <div className="bg-emerald p-1.5 rounded-lg mr-3">
                   <Sparkles size={16} className="text-white" />
                 </div>
                 <div>
                   <h3 className="font-bold text-sm">Notebook Studio</h3>
                   <p className="text-[10px] text-white/60">Powered by Gemini 3</p>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white"><X size={20} /></button>
            </div>
            
            {/* Tabs */}
            <div className="flex px-4 gap-6 text-sm font-medium">
               <button 
                 onClick={() => setActiveTab('sources')} 
                 className={`pb-3 border-b-2 transition-colors ${activeTab === 'sources' ? 'border-emerald text-white' : 'border-transparent text-white/50 hover:text-white'}`}
               >
                 Sources
               </button>
               <button 
                 onClick={() => setActiveTab('chat')} 
                 className={`pb-3 border-b-2 transition-colors ${activeTab === 'chat' ? 'border-emerald text-white' : 'border-transparent text-white/50 hover:text-white'}`}
               >
                 Chat
               </button>
               <button 
                 onClick={() => setActiveTab('studio')} 
                 className={`pb-3 border-b-2 transition-colors ${activeTab === 'studio' ? 'border-emerald text-white' : 'border-transparent text-white/50 hover:text-white'}`}
               >
                 Studio
               </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 bg-cream dark:bg-[#121212] relative overflow-hidden flex flex-col">
            
            {/* --- SOURCES TAB --- */}
            {activeTab === 'sources' && (
              <div className="absolute inset-0 p-6 overflow-y-auto animate-fade-in">
                <h2 className="text-xl font-display font-bold text-charcoal dark:text-white mb-2">Add Sources</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Upload content to generate overviews, quizzes, and more.</p>
                
                <div className="space-y-4">
                  <div onClick={() => docInputRef.current?.click()} className="group border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-ocean dark:hover:border-emerald rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white dark:bg-gray-800/50">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="text-gray-500 dark:text-gray-300" />
                    </div>
                    <span className="font-semibold text-charcoal dark:text-white">Upload PDF/Text</span>
                    <span className="text-xs text-gray-500 mt-1">Drag & drop or click to browse</span>
                  </div>

                  <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-1 border border-gray-200 dark:border-gray-700 flex items-center">
                    <div className="p-3"><Globe size={20} className="text-gray-400" /></div>
                    <input type="text" placeholder="Paste website link..." className="bg-transparent flex-1 text-sm outline-none dark:text-white" />
                    <button className="p-2 mr-1 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-ocean"><Send size={16} /></button>
                  </div>

                  {selectedDoc && (
                     <div className="mt-6 p-4 bg-emerald/10 border border-emerald/20 rounded-xl flex justify-between items-center">
                        <div className="flex items-center overflow-hidden">
                          <FileText className="text-emerald mr-3 shrink-0" />
                          <div className="truncate">
                             <p className="text-sm font-bold text-charcoal dark:text-white truncate">{selectedDoc.name}</p>
                             <p className="text-xs text-emerald">Ready for Studio</p>
                          </div>
                        </div>
                        <button onClick={() => { setSelectedDoc(null); }} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                  )}
                </div>
              </div>
            )}

            {/* --- STUDIO TAB --- */}
            {activeTab === 'studio' && (
              <div className="absolute inset-0 p-6 overflow-y-auto animate-fade-in bg-gradient-to-b from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#121212]">
                {!selectedDoc ? (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                     <FileText size={48} className="mb-4 text-gray-300" />
                     <p className="text-charcoal dark:text-white font-medium">No source selected</p>
                     <button onClick={() => setActiveTab('sources')} className="mt-2 text-ocean dark:text-emerald text-sm underline">Upload a source first</button>
                   </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-charcoal dark:text-white">Create Overview</h2>
                      <p className="text-xs text-gray-500">Generate content from {selectedDoc.name}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Audio Overview', icon: Headphones, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300' },
                        { name: 'Video Overview', icon: Video, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300' },
                        { name: 'Mind Map', icon: Layout, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300' },
                        { name: 'Reports', icon: FileBarChart, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300' },
                        { name: 'Flashcards', icon: Layout, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300' },
                        { name: 'Quiz', icon: HelpCircle, color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300' },
                        { name: 'Infographic', icon: PieChart, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300' },
                        { name: 'Slides', icon: Layout, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300' },
                      ].map((item) => (
                        <button 
                          key={item.name}
                          onClick={() => handleStudioAction(item.name)}
                          className="flex flex-col items-start p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:border-ocean/30 dark:hover:border-emerald/30 transition-all text-left group"
                        >
                          <div className={`p-2 rounded-lg mb-3 ${item.color} group-hover:scale-110 transition-transform`}>
                            <item.icon size={20} />
                          </div>
                          <span className="font-semibold text-sm text-charcoal dark:text-gray-200">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* --- CHAT TAB --- */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      {msg.image && (
                         <div className="mb-2 max-w-[85%] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                           <img src={msg.image} alt="Uploaded" className="w-full" />
                         </div>
                      )}

                      {msg.audioData && (
                        <div className="mb-2 w-full max-w-[85%] bg-ocean/5 dark:bg-emerald/5 p-3 rounded-xl border border-ocean/10 dark:border-emerald/10 flex items-center space-x-3">
                          <div className="p-2.5 bg-gradient-to-br from-ocean to-purple-600 text-white rounded-full animate-pulse shadow-lg">
                            <Headphones size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-ocean dark:text-emerald uppercase tracking-wide">Audio Overview</p>
                            <button onClick={() => playPCMAudio(msg.audioData!)} className="text-xs underline text-gray-500 hover:text-ocean">Play Again</button>
                          </div>
                        </div>
                      )}

                      {msg.videoUri && (
                        <div className="mb-2 w-full max-w-[85%] bg-black/5 dark:bg-black/40 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                          <video controls src={msg.videoUri} className="w-full rounded-lg bg-black" />
                          <div className="p-2 flex items-center gap-2">
                             <Video size={14} className="text-pink-500" />
                             <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Veo Video Generated</span>
                          </div>
                        </div>
                      )}

                      {msg.text && (
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-ocean text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-charcoal dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none shadow-sm'}`}>
                           <div className="break-words">{msg.role === 'user' ? msg.text : renderMessageContent(msg.text)}</div>
                        </div>
                      )}

                      {msg.role === 'user' && msg.isThinking && <div className="text-[10px] text-gray-500 flex items-center mt-1"><Brain size={10} className="mr-1" /> Deep Thinking</div>}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start"><div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-100 dark:border-gray-700 shadow-sm flex items-center space-x-2"><div className="w-1.5 h-1.5 bg-ocean/50 dark:bg-emerald/50 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-ocean/50 dark:bg-emerald/50 rounded-full animate-bounce delay-75"></div><div className="w-1.5 h-1.5 bg-ocean/50 dark:bg-emerald/50 rounded-full animate-bounce delay-150"></div></div></div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'image')} />
                    <input type="file" ref={docInputRef} className="hidden" accept=".pdf,.txt,.md" onChange={(e) => handleFileSelect(e, 'doc')} />
                    
                    <div className="flex gap-1">
                      <button onClick={() => docInputRef.current?.click()} className={`p-2 rounded-full transition-colors ${selectedDoc ? 'bg-emerald/10 text-emerald' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-ocean dark:hover:text-emerald'}`} title="Upload Source"><FileText size={18} /></button>
                      <button onClick={() => fileInputRef.current?.click()} className={`p-2 rounded-full transition-colors ${selectedImage ? 'bg-ocean text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-ocean dark:hover:text-emerald'}`} title="Upload Image"><ImageIcon size={18} /></button>
                      <button onClick={() => setIsThinkingMode(!isThinkingMode)} className={`p-2 rounded-full transition-colors ${isThinkingMode ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-purple-600'}`} title="Deep Thinking"><Brain size={18} /></button>
                    </div>

                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder="Ask Notebook..."
                      className="flex-1 bg-gray-100 dark:bg-gray-800 text-charcoal dark:text-cream rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ocean dark:focus:ring-emerald text-sm transition-all"
                    />
                    
                    <button onClick={handleSend} disabled={isLoading} className="p-2 bg-ocean dark:bg-emerald text-white rounded-full hover:opacity-90 disabled:opacity-50 transition-all"><Send size={18} /></button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="group p-4 bg-ocean dark:bg-emerald text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center relative">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-coral"></span></span>}
      </button>
    </div>
  );
};

export default ChatAssistant;