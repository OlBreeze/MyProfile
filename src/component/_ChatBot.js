import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, X, MessageCircle } from 'lucide-react';

export default function _ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Привет! Я AI-ассистент. Чем могу помочь?', sender: 'bot', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState('');
    const [backendUrl] = useState('http://localhost:3001');
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        checkBackendHealth();
    }, []);

    // Счетчик непрочитанных сообщений
    useEffect(() => {
        if (!isOpen && messages.length > 1 && messages[messages.length - 1].sender === 'bot') {
            setUnreadCount(prev => prev + 1);
        }
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
        }
    }, [isOpen]);

    const checkBackendHealth = async () => {
        try {
            const response = await fetch(`${backendUrl}/health`);
            if (response.ok) {
                console.log('✅ Backend connected');
            }
        } catch (err) {
            setError('⚠️ Бэкенд не доступен');
            console.error('Backend connection error:', err);
        }
    };

    const callBackendAPI = async (userMessage) => {
        try {
            const chatHistory = [
                { role: 'system', content: 'Ты дружелюбный AI-помощник, который отвечает на русском языке.' },
                ...messages.slice(-10).map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                })),
                { role: 'user', content: userMessage }
            ];

            const response = await fetch(`${backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: chatHistory
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка сервера');
            }

            const data = await response.json();
            return data.message;

        } catch (err) {
            console.error('Backend API Error:', err);
            throw new Error(err.message || 'Не удалось получить ответ от сервера');
        }
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);
        setError('');

        try {
            const botResponse = await callBackendAPI(currentInput);

            const botMessage = {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            setError(err.message);

            const errorMessage = {
                id: Date.now() + 1,
                text: `Извините, произошла ошибка: ${err.message}`,
                sender: 'bot',
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = () => {
        setMessages([
            { id: 1, text: 'Привет! Я AI-ассистент. Чем могу помочь?', sender: 'bot', timestamp: new Date() }
        ]);
        setError('');
    };

    return (
        <>
            {/* Кнопка открытия чата */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
                    aria-label="Открыть чат"
                >
                    <MessageCircle size={28} />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
                    )}
                </button>
            )}

            {/* Окно чата */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <Bot className="text-indigo-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-white font-semibold">AI Помощник</h2>
                                <p className="text-indigo-200 text-xs">
                                    {error ? '🔴 Оффлайн' : '🟢 Онлайн'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={clearChat}
                                className="p-2 hover:bg-indigo-700 rounded-lg transition-colors text-white text-xs"
                                title="Очистить чат"
                            >
                                Очистить
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
                                aria-label="Закрыть чат"
                            >
                                <X size={20} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="bg-red-50 border-b border-red-200 px-3 py-2 flex items-center gap-2">
                            <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                            <span className="text-red-700 text-xs">{error}</span>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                            >
                                <div className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        message.sender === 'user' ? 'bg-indigo-600' : message.isError ? 'bg-red-400' : 'bg-gray-300'
                                    }`}>
                                        {message.sender === 'user' ? (
                                            <User className="text-white" size={16} />
                                        ) : message.isError ? (
                                            <AlertCircle className="text-white" size={16} />
                                        ) : (
                                            <Bot className="text-gray-700" size={16} />
                                        )}
                                    </div>
                                    <div className={`px-3 py-2 rounded-2xl ${
                                        message.sender === 'user'
                                            ? 'bg-indigo-600 text-white rounded-tr-sm'
                                            : message.isError
                                                ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-sm'
                                                : 'bg-white text-gray-800 shadow-sm rounded-tl-sm'
                                    }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                                        <p className={`text-xs mt-1 ${
                                            message.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'
                                        }`}>
                                            {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start animate-in fade-in duration-200">
                                <div className="flex gap-2">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300">
                                        <Bot className="text-gray-700" size={16} />
                                    </div>
                                    <div className="px-3 py-2 rounded-2xl bg-white shadow-sm rounded-tl-sm">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 p-3 bg-white rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Напишите сообщение..."
                                disabled={isTyping}
                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                            />
                            <button
                                onClick={handleSend}
                                disabled={input.trim() === '' || isTyping}
                                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center w-10 h-10 flex-shrink-0"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// -
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Привет! Я AI-ассистент. Чем могу помочь?', sender: 'bot', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState('');
    const [backendUrl] = useState('http://localhost:3001');
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef(null);

    // Автопрокрутка вниз
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Проверка бэкенда
    useEffect(() => {
        const checkBackendHealth = async () => {
            try {
                const response = await fetch(`${backendUrl}/health`);
                if (!response.ok) setError('⚠️ Бэкенд не отвечает');
            } catch {
                setError('⚠️ Бэкенд не доступен');
            }
        };
        checkBackendHealth();
    }, [backendUrl]);

    // Счётчик непрочитанных сообщений
    useEffect(() => {
        if (!isOpen && messages.length > 1 && messages[messages.length - 1].sender === 'bot') {
            setUnreadCount(prev => prev + 1);
        }
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen) setUnreadCount(0);
    }, [isOpen]);

    // Отправка запроса на сервер
    const callBackendAPI = async (userMessage) => {
        try {
            const chatHistory = messages.map(msg => ({ sender: msg.sender, text: msg.text }));
            chatHistory.push({ sender: 'user', text: userMessage });

            const response = await fetch(`${backendUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatHistory })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка сервера');
            }

            const data = await response.json();
            return data.reply || data.message;
        } catch (err) {
            console.error('Backend API Error:', err);
            throw new Error(err.message || 'Не удалось получить ответ от сервера');
        }
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);
        setError('');

        try {
            const botResponse = await callBackendAPI(currentInput);
            const botMessage = {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            setError(err.message);
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: `Извините, произошла ошибка: ${err.message}`,
                    sender: 'bot',
                    timestamp: new Date(),
                    isError: true
                }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = () => {
        setMessages([{ id: 1, text: 'Привет! Я AI-ассистент. Чем могу помочь?', sender: 'bot', timestamp: new Date() }]);
        setError('');
    };

    return (
        <>
            {/* Кнопка открытия чата */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
                    aria-label="Открыть чат"
                >
                    <MessageCircle size={28} />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>
            )}

            {/* Окно чата с анимацией Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Header */}
                        <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <Bot className="text-indigo-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-white font-semibold">AI Помощник</h2>
                                    <p className="text-indigo-200 text-xs">
                                        {error ? '🔴 Оффлайн' : '🟢 Онлайн'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={clearChat}
                                    className="p-2 hover:bg-indigo-700 rounded-lg transition-colors text-white text-xs"
                                >
                                    Очистить
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
                                    aria-label="Закрыть чат"
                                >
                                    <X size={20} className="text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Ошибка */}
                        {error && (
                            <div className="bg-red-50 border-b border-red-200 px-3 py-2 flex items-center gap-2">
                                <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                                <span className="text-red-700 text-xs">{error}</span>
                            </div>
                        )}

                        {/* Сообщения */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} transition-all`}
                                >
                                    <div
                                        className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                message.sender === 'user'
                                                    ? 'bg-indigo-600'
                                                    : message.isError
                                                        ? 'bg-red-400'
                                                        : 'bg-gray-300'
                                            }`}
                                        >
                                            {message.sender === 'user' ? (
                                                <User className="text-white" size={16} />
                                            ) : message.isError ? (
                                                <AlertCircle className="text-white" size={16} />
                                            ) : (
                                                <Bot className="text-gray-700" size={16} />
                                            )}
                                        </div>
                                        <div
                                            className={`px-3 py-2 rounded-2xl ${
                                                message.sender === 'user'
                                                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                                                    : message.isError
                                                        ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-sm'
                                                        : 'bg-white text-gray-800 shadow-sm rounded-tl-sm'
                                            }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                                                {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Индикатор набора */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300">
                                            <Bot className="text-gray-700" size={16} />
                                        </div>
                                        <div className="px-3 py-2 rounded-2xl bg-white shadow-sm rounded-tl-sm">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Поле ввода */}
                        <div className="border-t border-gray-200 p-3 bg-white rounded-b-2xl">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Напишите сообщение..."
                                    disabled={isTyping}
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={input.trim() === '' || isTyping}
                                    className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors w-10 h-10 flex items-center justify-center"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
