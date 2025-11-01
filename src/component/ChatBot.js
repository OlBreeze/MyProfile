import React, {useState, useRef, useEffect} from 'react';
import {Send, Bot, User, AlertCircle, X, MessageCircle} from 'lucide-react';
import {userProfile} from "../utils/constants";

export default function ChatBot() {

    // 💬 Варианты:
    // Hi! I'm an AI assistant. How can I help you?
    // I'm the free version — not super fast, but worth the wait 😉
    // I’m running on the free plan, so please be patient — quality takes time 😅
    // Free version mode activated! 🐢 Please be gentle, I’m doing my best.
    // I’m on the free tier, so I move at “coffee break” speed ☕ — thanks for your patience!
    // I'm not slow... I'm just thinking really, really carefully 😌
    // Free version here! Processing your request at a comfortable, scenic pace 🐌

    const [isOpen, setIsOpen] = useState(false);
    const sayHello = 'Free version mode activated! 🐢 Please be gentle, I’m doing my best 😉 How can I help you?';
    const [messages, setMessages] = useState([
        {id: 1, text: sayHello, sender: 'bot', timestamp: new Date()}
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState('');
    // const [backendUrl] = useState('http://localhost:3001');
    const [backendUrl] = useState(
        // process.env.REACT_APP_BACKEND_URL
        'https://chatbot-backend-1707.onrender.com'||
         'http://localhost:3001'
    );
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        checkBackendHealth();
    }, []);

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
            setError('⚠️ Backend connection error');
            console.error('Backend connection error:', err);
        }
    };

    const callBackendAPI = async (userMessage) => {
        try {
            // Формируем историю в формате, который ожидает бэкенд с Gemini
            const chatHistory = [];

            // 🔍 Добавляем системный контекст только для первого запроса пользователя
            // (когда в messages только приветственное сообщение бота)
            if (messages.length === 1) {
                console.log('✅ Adding system prompt - first user message');
                chatHistory.push({
                    sender: 'system',
                    text: userProfile
                });
            } else {
                console.log('ℹ️ Skipping system prompt - not first message');
            }

            // Добавляем историю сообщений
            messages.forEach(msg => {
                // Пропускаем приветственное сообщение из истории для бэкенда
                if (msg.id !== 1) {
                    chatHistory.push({
                        sender: msg.sender,
                        text: msg.text
                    });
                }
            });

            // Добавляем текущее сообщение пользователя
            chatHistory.push({
                sender: 'user',
                text: userMessage
            });

            console.log('📤 Sending to backend:', chatHistory.length, 'messages');

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
                throw new Error(errorData.error || 'Server error');
            }

            const data = await response.json();
            return data.message;

        } catch (err) {
            console.error('Backend API Error:', err);
            throw new Error(err.message || 'Failed to get response from server');
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
                text: `Sorry, an error occurred: ${err.message}`,
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
            {id: 1, text: sayHello, sender: 'bot', timestamp: new Date()}
        ]);
        setError('');
    };

    return (
        <div style={{
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
        }}>
            {/* Кнопка открытия чата */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                    }}
                >
                    <MessageCircle size={30}/>
                    {unreadCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-4px',
                            right: '-4px',
                            background: '#ef4444',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid white'
                        }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
                    )}
                </button>
            )}

            {/* Окно чата */}
            {isOpen && (
                <div style={{
                    width: '380px',
                    height: '580px',
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                }}>
                    <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>

                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '20px',
                        color: 'white'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Bot size={24}/>
                                </div>
                                <div>
                                    <div style={{fontWeight: '600', fontSize: '16px'}}>Hi! I'm Olga’s AI Assistant — a passionate Full Stack Developer. Ask me anything about her experience!👩‍💻</div>
                                    <div style={{fontSize: '12px', opacity: 0.9}}>
                                        {error ? '🔴 Offline' : '🟢 Online'}
                                    </div>
                                </div>
                            </div>
                            <div style={{display: 'flex', gap: '8px'}}>
                                <button
                                    onClick={clearChat}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                                >
                                    <X size={18}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div style={{
                            background: '#fee2e2',
                            borderBottom: '1px solid #fecaca',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <AlertCircle size={16} style={{color: '#dc2626', flexShrink: 0}}/>
                            <span style={{color: '#991b1b', fontSize: '13px'}}>{error}</span>
                        </div>
                    )}

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '20px',
                        background: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    animation: 'fadeIn 0.3s ease'
                                }}
                            >
                                <style>{`
                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
                                <div style={{
                                    display: 'flex',
                                    gap: '10px',
                                    maxWidth: '85%',
                                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: message.sender === 'user'
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : message.isError ? '#ef4444' : '#e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {message.sender === 'user' ? (
                                            <User size={16} color="white"/>
                                        ) : message.isError ? (
                                            <AlertCircle size={16} color="white"/>
                                        ) : (
                                            <Bot size={16} color="#64748b"/>
                                        )}
                                    </div>
                                    <div>
                                        <div style={{
                                            padding: '12px 16px',
                                            borderRadius: '16px',
                                            background: message.sender === 'user'
                                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                : message.isError
                                                    ? '#fee2e2'
                                                    : 'white',
                                            color: message.sender === 'user' ? 'white' : message.isError ? '#991b1b' : '#1e293b',
                                            fontSize: '14px',
                                            lineHeight: '1.5',
                                            boxShadow: message.sender === 'user' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                                            wordBreak: 'break-word'
                                        }}>
                                            {message.text}
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: '#94a3b8',
                                            marginTop: '4px',
                                            paddingLeft: message.sender === 'user' ? '0' : '4px',
                                            textAlign: message.sender === 'user' ? 'right' : 'left'
                                        }}>
                                            {message.timestamp.toLocaleTimeString('ru-RU', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div style={{display: 'flex', gap: '10px'}}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: '#e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Bot size={16} color="#64748b"/>
                                </div>
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: '16px',
                                    background: 'white',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                    display: 'flex',
                                    gap: '4px'
                                }}>
                                    {[0, 150, 300].map((delay, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: '#cbd5e1',
                                                animation: `bounce 1.4s ease-in-out ${delay}ms infinite`
                                            }}
                                        />
                                    ))}
                                    <style>{`
                    @keyframes bounce {
                      0%, 60%, 100% { transform: translateY(0); }
                      30% { transform: translateY(-10px); }
                    }
                  `}</style>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef}/>
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: '16px',
                        background: 'white',
                        borderTop: '1px solid #e2e8f0'
                    }}>
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Write a message..."
                                disabled={isTyping}
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    background: isTyping ? '#f1f5f9' : 'white'
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                            />
                            <button
                                onClick={handleSend}
                                disabled={input.trim() === '' || isTyping}
                                style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: input.trim() && !isTyping
                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        : '#e2e8f0',
                                    color: 'white',
                                    cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                    if (input.trim() && !isTyping) {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                <Send size={18}/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}