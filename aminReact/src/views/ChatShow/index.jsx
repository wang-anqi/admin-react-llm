import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, List, Avatar } from 'antd';
import './index.css';

const ChatShow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket('ws://localhost:3600/question');
    
    ws.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (!response.isEnd) {
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages.length > 0 && !newMessages[newMessages.length - 1].isUser) {
            newMessages[newMessages.length - 1].content += response.data;
          } else {
            newMessages.push({
              content: response.data,
              isUser: false,
              timestamp: new Date().toLocaleTimeString()
            });
          }
          return newMessages;
        });
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      content: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    }]);

    // Send message to server
    if (ws.current) {
      ws.current.send(inputValue);
    }

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <Card title="AI Chat Assistant" className="chat-card">
        <div className="messages-container">
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message) => (
              <List.Item className={`message-item ${message.isUser ? 'user-message' : 'ai-message'}`}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={message.isUser ? '/user-avatar.png' : '/ai-avatar.png'}
                      alt={message.isUser ? 'User' : 'AI'}
                    />
                  }
                  title={message.isUser ? 'You' : 'AI Assistant'}
                  description={
                    <div>
                      <div className="message-content">{message.content}</div>
                      <div className="message-timestamp">{message.timestamp}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            autoSize={{ minRows: 1, maxRows: 4 }}
          />
          <Button type="primary" onClick={handleSend}>
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatShow;
