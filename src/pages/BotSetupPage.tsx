import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Check, ExternalLink } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const BotSetupPage = () => {
  const [botToken, setBotToken] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const webhookUrl = 'https://functions.poehali.dev/5a5a0ebe-63c5-46a7-8403-ebefbf5fd687';
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Скопировано!',
      description: 'URL webhook скопирован в буфер обмена',
    });
  };
  
  const setupWebhook = () => {
    if (!botToken) {
      toast({
        title: 'Ошибка',
        description: 'Введите токен бота',
        variant: 'destructive',
      });
      return;
    }
    
    const url = `https://api.telegram.org/bot${botToken}/setWebhook?url=${webhookUrl}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Настройка Telegram-бота | Кухни на заказ</title>
        <meta name="description" content="Пошаговая инструкция по настройке Telegram-бота для юридических консультаций" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Icon name="Bot" size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Настройка Telegram-бота
            </h1>
            <p className="text-lg text-neutral-600">
              Подключите YandexGPT к вашему боту за 3 простых шага
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                    Создайте бота в Telegram
                  </h2>
                  <p className="text-neutral-600 mb-4">
                    Если у вас еще нет бота, создайте его через @BotFather
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm">1</span>
                      </div>
                      <p className="text-neutral-700">
                        Откройте Telegram и найдите <a href="https://t.me/botfather" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                          @BotFather <Icon name="ExternalLink" size={14} />
                        </a>
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm">2</span>
                      </div>
                      <p className="text-neutral-700">
                        Отправьте команду <code className="bg-neutral-100 px-2 py-1 rounded text-sm">/newbot</code>
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm">3</span>
                      </div>
                      <p className="text-neutral-700">
                        Следуйте инструкциям и сохраните полученный токен
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                    Добавьте токен бота
                  </h2>
                  <p className="text-neutral-600 mb-4">
                    Вставьте токен, который вы получили от @BotFather
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="bot-token" className="block text-sm font-medium text-neutral-700 mb-2">
                        Токен бота
                      </label>
                      <Input
                        id="bot-token"
                        type="text"
                        placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                        value={botToken}
                        onChange={(e) => setBotToken(e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <Icon name="AlertCircle" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">
                          Токен нужно добавить в секреты проекта как <code className="bg-amber-100 px-1.5 py-0.5 rounded">TELEGRAM_BOT_TOKEN</code>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                    Подключите webhook
                  </h2>
                  <p className="text-neutral-600 mb-4">
                    Свяжите вашего бота с сервером YandexGPT
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        URL webhook
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={webhookUrl}
                          readOnly
                          className="font-mono text-sm flex-1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(webhookUrl)}
                        >
                          {copied ? (
                            <Icon name="Check" size={18} className="text-green-600" />
                          ) : (
                            <Icon name="Copy" size={18} />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      onClick={setupWebhook}
                      className="w-full"
                      size="lg"
                      disabled={!botToken}
                    >
                      <Icon name="ExternalLink" size={20} className="mr-2" />
                      Подключить webhook автоматически
                    </Button>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Или настройте вручную:</p>
                          <code className="block bg-blue-100 p-2 rounded text-xs overflow-x-auto mt-2">
                            curl -X POST "https://api.telegram.org/bot{'{'}YOUR_TOKEN{'}'}/setWebhook" -d "url={webhookUrl}"
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                <Icon name="CheckCircle" size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                Готово! 🎉
              </h3>
              <p className="text-neutral-600 mb-6">
                Ваш бот готов отвечать на вопросы через YandexGPT
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="default" size="lg" asChild>
                  <a href="/" className="inline-flex items-center gap-2">
                    <Icon name="Home" size={20} />
                    Вернуться на главную
                  </a>
                </Button>
              </div>
            </div>

          </div>

          {/* Help Section */}
          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-4">Нужна помощь с настройкой?</p>
            <a 
              href="https://t.me/+QgiLIa1gFRY4Y2Iy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <Icon name="MessageCircle" size={20} />
              Написать в поддержку
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default BotSetupPage;
