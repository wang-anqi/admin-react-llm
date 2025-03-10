import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, List, Avatar, message } from 'antd';
import './index.css';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: string;
  error?: boolean;
}

const ChatShow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    ws.current = new WebSocket('ws://localhost:3600/question');
    
    ws.current.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
      message.success('已连接到聊天服务器');
    };

    ws.current.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
      message.error('与服务器断开连接，正在尝试重新连接...');
      setTimeout(connectWebSocket, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
      message.error('连接发生错误');
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const response = JSON.parse(event.data);
        console.log('Received message:', response);

        if (response.error) {
          setMessages(prev => [...prev, {
            content: response.data,
            isUser: false,
            timestamp: new Date().toLocaleTimeString(),
            error: true
          }]);
          setIsSending(false);
          return;
        }

        setMessages(prev => {
          const newMessages = [...prev];
          if (!response.isEnd && (newMessages.length === 0 || newMessages[newMessages.length - 1].isUser)) {
            newMessages.push({
              content: response.data,
              isUser: false,
              timestamp: new Date().toLocaleTimeString()
            });
          } else if (!response.isEnd && !newMessages[newMessages.length - 1].isUser) {
            const lastMessage = newMessages[newMessages.length - 1];
            lastMessage.content = lastMessage.content + response.data;
          }
          return newMessages;
        });

        if (response.isEnd) {
          setIsSending(false);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
        message.error('接收消息时发生错误');
      }
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || !isConnected || isSending) return;

    setIsSending(true);

    setMessages(prev => [...prev, {
      content: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    }]);

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(inputValue);
      setInputValue('');
    } else {
      message.error('未连接到服务器，请稍后再试');
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <Card 
        title={
          <span>
            AI Chat Assistant 
            <span style={{ marginLeft: 8, fontSize: '12px', color: isConnected ? '#52c41a' : '#ff4d4f' }}>
              ({isConnected ? '已连接' : '未连接'})
            </span>
          </span>
        } 
        className="chat-card"
      >
        <div className="messages-container">
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message: Message) => (
              <List.Item className={`message-item ${message.isUser ? 'user-message' : 'ai-message'} ${message.error ? 'error-message' : ''}`}>
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
            disabled={!isConnected || isSending}
          />
          <Button 
            type="primary" 
            onClick={handleSend}
            loading={isSending}
            disabled={!isConnected || !inputValue.trim()}
          >
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatShow;
