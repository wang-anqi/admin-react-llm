import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, List, Avatar, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CustomBreadcrumb from '../../components/MyBreadcrumb';
import './index.css';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: string;
  error?: boolean;
  loading?: boolean;
  id?: string;
}

// 处理AI响应，移除<think>标签及其内容
const processAIResponse = (text: string): string => {
  return text
    .replace(/<think>[\s\S]*?<\/think>/g, '') // 移除<think>标签及其内容
    .replace(/<\/think>/g, '') // 移除单独的</think>标签
    .trim();
};

// 简单的Markdown转换函数
const simpleMarkdownToHtml = (text: string): string => {
  return text
    // 转义HTML特殊字符
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // 代码块
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 加粗
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // 斜体
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // 换行
    .replace(/\n/g, '<br/>');
};

const MessageContent = ({ message }: { message: Message }) => (
  <div className={`message-content ${message.loading ? 'loading-message' : ''}`}>
    {message.isUser ? (
      <div className="user-text">{message.content}</div>
    ) : (
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ 
          __html: simpleMarkdownToHtml(processAIResponse(message.content))
        }}
      />
    )}
  </div>
);

const ChatShow: React.FC = () => {
  const breadcrumbItems = [
    { key: "chat", label: "AI助手", path: "/chat" }
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);
  const messageIdCounter = useRef(0);
  const contentBuffer = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    setConnectionStatus('connecting');
    ws.current = new WebSocket('ws://localhost:3600/question');
    
    ws.current.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
      setConnectionStatus('connected');
      message.success('已连接到聊天服务器');
    };

    ws.current.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
      setConnectionStatus('disconnected');
      message.warning('与服务器断开连接，正在尝试重新连接...');
      setTimeout(connectWebSocket, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setConnectionStatus('disconnected');
      message.error('连接发生错误');
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const response = JSON.parse(event.data);
        console.log('Received message:', response);

        if (response.error) {
          const messageId = `msg_${++messageIdCounter.current}`;
          setMessages(prev => [...prev, {
            content: response.data,
            isUser: false,
            timestamp: new Date().toLocaleTimeString(),
            error: true,
            id: messageId
          }]);
          setIsSending(false);
          return;
        }

        setMessages(prev => {
          const newMessages = [...prev];
          const timestamp = new Date().toLocaleTimeString();
          
          if (!response.isEnd) {
            if (newMessages.length === 0 || newMessages[newMessages.length - 1].isUser) {
              const messageId = `msg_${++messageIdCounter.current}`;
              const processedContent = processAIResponse(response.data);
              contentBuffer.current.set(messageId, processedContent);
              
              newMessages.push({
                content: processedContent,
                isUser: false,
                timestamp,
                loading: true,
                id: messageId
              });
            } else {
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage && lastMessage.id) {
                const currentContent = contentBuffer.current.get(lastMessage.id) || '';
                const processedContent = processAIResponse(currentContent + response.data);
                contentBuffer.current.set(lastMessage.id, processedContent);
                
                newMessages[newMessages.length - 1] = {
                  ...lastMessage,
                  content: processedContent,
                  loading: true
                };
              }
            }
          } else {
            if (newMessages.length > 0 && !newMessages[newMessages.length - 1].isUser) {
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage && lastMessage.id) {
                contentBuffer.current.delete(lastMessage.id);
                newMessages[newMessages.length - 1] = {
                  ...lastMessage,
                  loading: false
                };
              }
            }
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
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || !isConnected || isSending) return;

    setIsSending(true);
    const timestamp = new Date().toLocaleTimeString();
    const messageId = `msg_${++messageIdCounter.current}`;

    setMessages(prev => [...prev, {
      content: inputValue,
      isUser: true,
      timestamp,
      id: messageId
    }]);

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(inputValue);
      setInputValue('');
    } else {
      message.error('未连接到服务器，请稍后再试');
      setIsSending(false);
    }
  };

  const handleCancel = () => {
    if (ws.current && isSending) {
      ws.current.send(JSON.stringify({ type: 'cancel' }));
      setIsSending(false);
      message.info('已取消当前回答');
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
      <CustomBreadcrumb items={breadcrumbItems} />
      <Card 
        title={
          <span>
            AI Chat Assistant 
            <span style={{ marginLeft: 8, fontSize: '12px', color: 
              connectionStatus === 'connected' ? '#52c41a' : 
              connectionStatus === 'connecting' ? '#faad14' : '#ff4d4f' 
            }}>
              ({connectionStatus === 'connected' ? '已连接' : 
                connectionStatus === 'connecting' ? '连接中...' : '未连接'})
            </span>
          </span>
        } 
        className="chat-card"
      >
        <div className="messages-container" ref={messagesContainerRef}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message: Message) => (
              <List.Item 
                key={message.id}
                className={`message-item ${message.isUser ? 'user-message' : 'ai-message'} ${message.error ? 'error-message' : ''}`}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={message.isUser ? '/user-avatar.png' : '/ai-avatar.png'}
                      alt={message.isUser ? 'User' : 'AI'}
                    />
                  }
                  title={
                    <span>
                      {message.isUser ? 'You' : 'AI Assistant'}
                      {message.loading && (
                        <Spin
                          indicator={
                            <LoadingOutlined style={{ marginLeft: '8px', fontSize: '14px' }} spin />
                          }
                        />
                      )}
                    </span>
                  }
                  description={
                    <div>
                      <MessageContent message={message} />
                      <div className="message-timestamp">{message.timestamp}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <div className="input-container">
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={!isConnected || isSending}
          />
          <div className="button-container">
            {isSending && (
              <Button 
                type="primary" 
                danger
                onClick={handleCancel}
                style={{ marginRight: 8 }}
              >
                取消
              </Button>
            )}
            <Button
              type="primary"
              onClick={handleSend}
              disabled={!isConnected || !inputValue.trim() || isSending}
            >
              发送
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatShow;
