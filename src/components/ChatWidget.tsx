import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  showCallbackButton?: boolean;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Здравствуйте! Я юридический помощник компании "Вернём кухню". Чем могу помочь вам сегодня? 🏛️'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCallbackDialog, setShowCallbackDialog] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/14ee5d85-19ce-4071-b20b-e733b8d3ec87', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const hasPhoneNumber = data.reply.includes('8 (905) 994-00-69') || data.reply.includes('89059940069');
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.reply,
          showCallbackButton: hasPhoneNumber
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Извините, произошла ошибка. Позвоните нам по телефону 8 (905) 994-00-69 для консультации.'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Извините, не удалось получить ответ. Попробуйте позвонить нам: 8 (905) 994-00-69'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'Как рассчитать неустойку?',
    'Что делать при браке кухни?',
    'Можно ли расторгнуть договор?',
    'Сколько стоят ваши услуги?'
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleCallbackSubmit = async () => {
    if (!callbackName.trim() || !callbackPhone.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/ab2c3782-b0e3-4574-a807-8d7a2200df0b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: callbackName,
          phone: callbackPhone,
          message: 'Заявка из чата'
        }),
      });

      if (response.ok) {
        setShowCallbackDialog(false);
        setCallbackName('');
        setCallbackPhone('');
        
        const successMessage: Message = {
          role: 'assistant',
          content: '✅ Спасибо! Ваша заявка принята. Мы перезвоним вам в ближайшее время.'
        };
        setMessages(prev => [...prev, successMessage]);
      } else {
        alert('Произошла ошибка. Попробуйте позвонить нам напрямую.');
      }
    } catch (error) {
      alert('Произошла ошибка. Попробуйте позвонить нам напрямую.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-24 left-6 z-50 animate-fade-in">
          {/* Постоянная надпись */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap">
            <div className="bg-white text-gray-800 px-3 py-1.5 rounded-full shadow-lg border border-primary/30 text-xs font-semibold flex items-center gap-1.5 animate-bounce">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              Онлайн чат
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 bg-gradient-to-br from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
            aria-label="Открыть чат"
          >
            <Icon name="MessageCircle" size={28} className="animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            
            {/* Пульсирующие кольца */}
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
          </button>
        </div>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 left-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col animate-scale-in border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary to-blue-700 text-white rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Scale" size={20} />
                </div>
                <div>
                  <CardTitle className="text-lg">Юридический помощник</CardTitle>
                  <div className="text-xs text-white/80 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Онлайн
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white border border-primary/20'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
                
                {message.showCallbackButton && (
                  <div className="flex justify-start">
                    <Button
                      onClick={() => setShowCallbackDialog(true)}
                      size="sm"
                      className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 text-white shadow-md"
                    >
                      <Icon name="Phone" size={16} className="mr-2" />
                      Заказать обратный звонок
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground text-center mb-3">Популярные вопросы:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left text-sm px-4 py-2 rounded-lg bg-white border border-primary/20 hover:bg-primary/5 hover:border-primary transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-primary/20 rounded-2xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t bg-white flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Задайте ваш вопрос..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-primary hover:bg-primary/90 flex-shrink-0"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Для детальной консультации: <a href="tel:89059940069" className="text-primary font-semibold">8 (905) 994-00-69</a>
            </p>
          </div>
        </Card>
      )}

      <Dialog open={showCallbackDialog} onOpenChange={setShowCallbackDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Заказать обратный звонок</DialogTitle>
            <DialogDescription>
              Оставьте свои контакты, и мы перезвоним вам в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="callback-name">Ваше имя</Label>
              <Input
                id="callback-name"
                value={callbackName}
                onChange={(e) => setCallbackName(e.target.value)}
                placeholder="Иван Иванов"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="callback-phone">Телефон</Label>
              <Input
                id="callback-phone"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                disabled={isSubmitting}
              />
            </div>
            <Button
              onClick={handleCallbackSubmit}
              disabled={!callbackName.trim() || !callbackPhone.trim() || isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-blue-700"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatWidget;