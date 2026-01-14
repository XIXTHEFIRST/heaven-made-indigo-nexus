import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Send, X, MessageSquare, Trash2, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIntelligenceStore } from '@/stores/intelligenceStore';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export const CoachChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const { messages, sendMessage, clearChat } = useIntelligenceStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const msg = inputValue;
        setInputValue("");
        setIsTyping(true);
        await sendMessage(msg);
        setIsTyping(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[400px] h-[600px] glass-premium border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-intelligence-primary/20 to-intelligence-accent/10 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-intelligence-primary/20 text-intelligence-primary">
                                    <BrainCircuit className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Intelligence Coach</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Active Insight</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={clearChat}
                                    className="h-8 w-8 text-muted-foreground hover:text-white"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8 text-muted-foreground hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex flex-col max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-intelligence-primary text-black font-medium rounded-tr-none"
                                            : "glass-dark border border-white/5 text-white rounded-tl-none"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[9px] text-muted-foreground mt-1 px-1">
                                        {format(msg.timestamp, 'HH:mm')}
                                    </span>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="p-2 rounded-xl glass-dark border border-white/5">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-widest animate-pulse">Analyzing...</span>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/5 border-t border-white/5">
                            <div className="relative">
                                <Input
                                    placeholder="Ask for fashion intel..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    className="pr-12 bg-black/40 border-white/10 h-12 rounded-xl focus:ring-intelligence-primary/50"
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSend}
                                    className="absolute right-1.5 top-1.5 h-9 w-9 bg-intelligence-primary hover:bg-intelligence-primary-dark text-black rounded-lg"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-[9px] text-muted-foreground uppercase font-bold tracking-tighter overflow-hidden">
                                <span className="flex items-center gap-1 shrink-0"><Sparkles className="w-3 h-3 text-intelligence-primary" /> Gemini Powered</span>
                                <span className="flex items-center gap-1 shrink-0"><Bot className="w-3 h-3 text-intelligence-accent" /> Real-time Research</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                size="lg"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-16 w-16 rounded-full shadow-2xl transition-all duration-300 group",
                    isOpen
                        ? "bg-white text-black scale-90"
                        : "bg-intelligence-primary text-black hover:scale-110"
                )}
            >
                {isOpen ? <X className="w-8 h-8" /> : (
                    <div className="relative">
                        <MessageSquare className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
                    </div>
                )}
            </Button>
        </div>
    );
};
