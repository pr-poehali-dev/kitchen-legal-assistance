import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BotStatus {
  success: boolean;
  bot_username?: string;
  bot_name?: string;
  webhook_url?: string;
  webhook_set?: boolean;
  pending_updates?: number;
  error?: string;
}

const BotSetupPage = () => {
  const [botToken, setBotToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [botStatus, setBotStatus] = useState<BotStatus | null>(null);
  const { toast } = useToast();
  
  const webhookUrl = 'https://functions.poehali.dev/5a5a0ebe-63c5-46a7-8403-ebefbf5fd687';
  const apiUrl = 'https://functions.poehali.dev/ec8d7807-d0df-4b29-be64-1a8e7adb870c';
  
  const checkBotStatus = async () => {
    if (!botToken) {
      toast({
        title: 'Ошибка',
        description: 'Введите токен бота',
        variant: 'destructive',
      });
      return;
    }
    
    setChecking(true);
    setBotStatus(null);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'check_status',
          bot_token: botToken,
        }),
      });
      
      const data = await response.json();
      setBotStatus(data);
      
      if (data.success) {
        toast({
          title: '✅ Бот найден!',
          description: `@${data.bot_username} готов к настройке`,
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось проверить статус бота',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    } finally {
      setChecking(false);
    }
  };
  
  const setupWebhook = async () => {
    if (!botToken) {
      toast({
        title: 'Ошибка',
        description: 'Введите токен бота',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'setup_webhook',
          bot_token: botToken,
          webhook_url: webhookUrl,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: '🎉 Готово!',
          description: data.message,
        });
        
        // Refresh status
        await checkBotStatus();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось подключить webhook',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Настройка Telegram-бота | Кухни на заказ</title>
        <meta name="description" content="Интерактивная панель управления Telegram-ботом с YandexGPT" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Icon name="Bot" size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Панель управления ботом
            </h1>
            <p className="text-lg text-neutral-600">
              Проверьте статус и подключите YandexGPT к вашему Telegram-боту
            </p>
          </div>

          {/* Main Panel */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={24} />
                Настройка бота
              </CardTitle>
              <CardDescription>
                Введите токен вашего Telegram-бота для начала настройки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Token Input */}
              <div>
                <label htmlFor="bot-token" className="block text-sm font-medium text-neutral-700 mb-2">
                  Токен бота
                </label>
                <div className="flex gap-2">
                  <Input
                    id="bot-token"
                    type="text"
                    placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    className="font-mono text-sm flex-1"
                  />
                  <Button
                    onClick={checkBotStatus}
                    disabled={checking || !botToken}
                    variant="outline"
                  >
                    {checking ? (
                      <>
                        <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                        Проверяю...
                      </>
                    ) : (
                      <>
                        <Icon name="Search" size={18} className="mr-2" />
                        Проверить
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-neutral-500 mt-2">
                  Получите токен у <a href="https://t.me/botfather" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@BotFather</a> командой /newbot
                </p>
              </div>

              {/* Bot Status */}
              {botStatus && botStatus.success && (
                <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="CheckCircle" size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {botStatus.bot_name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        @{botStatus.bot_username}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Webhook статус:</span>
                      {botStatus.webhook_set ? (
                        <span className="flex items-center gap-1.5 text-green-600 font-medium">
                          <Icon name="CheckCircle" size={16} />
                          Подключен
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                          <Icon name="AlertCircle" size={16} />
                          Не подключен
                        </span>
                      )}
                    </div>
                    
                    {botStatus.webhook_url && (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-neutral-600">URL:</span>
                        <span className="text-xs font-mono text-neutral-900 break-all text-right">
                          {botStatus.webhook_url}
                        </span>
                      </div>
                    )}
                    
                    {botStatus.pending_updates !== undefined && botStatus.pending_updates > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Ожидающие сообщения:</span>
                        <span className="font-medium text-neutral-900">
                          {botStatus.pending_updates}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Status */}
              {botStatus && !botStatus.success && (
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start gap-3">
                    <Icon name="XCircle" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900 mb-1">
                        Ошибка проверки
                      </h3>
                      <p className="text-sm text-red-700">
                        {botStatus.error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Webhook Setup */}
              {botStatus && botStatus.success && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">
                    Подключение webhook
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        URL webhook для YandexGPT
                      </label>
                      <Input
                        type="text"
                        value={webhookUrl}
                        readOnly
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <Button
                      onClick={setupWebhook}
                      disabled={loading || botStatus.webhook_set}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                          Подключаю...
                        </>
                      ) : botStatus.webhook_set ? (
                        <>
                          <Icon name="CheckCircle" size={20} className="mr-2" />
                          Webhook уже подключен
                        </>
                      ) : (
                        <>
                          <Icon name="Zap" size={20} className="mr-2" />
                          Подключить webhook
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>

          {/* Success Message */}
          {botStatus && botStatus.success && botStatus.webhook_set && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                    <Icon name="CheckCircle" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                    Бот готов к работе! 🎉
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Напишите боту @{botStatus.bot_username} любое сообщение, и он ответит через YandexGPT
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="default" size="lg" asChild>
                      <a 
                        href={`https://t.me/${botStatus.bot_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <Icon name="MessageCircle" size={20} />
                        Открыть бота
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="/" className="inline-flex items-center gap-2">
                        <Icon name="Home" size={20} />
                        На главную
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Important Notice */}
          <div className="mt-12 space-y-6">
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2 text-lg">
                      ⚠️ Требуется обновить YANDEX_FOLDER_ID
                    </h4>
                    <p className="text-sm text-amber-800 mb-4">
                      Текущий ID каталога в секретах не совпадает с ID каталога вашего сервисного аккаунта.
                    </p>
                    
                    <div className="bg-white border border-amber-200 rounded-lg p-4 mb-4">
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">
                            Правильный Folder ID (скопируйте это значение):
                          </span>
                          <div className="mt-1.5 flex items-center gap-2 bg-amber-100 p-3 rounded-md">
                            <code className="flex-1 font-mono text-sm text-amber-900 font-semibold">
                              b1gmmu8hvnaqo83kkhpb
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText('b1gmmu8hvnaqo83kkhpb');
                                toast({
                                  title: 'Скопировано!',
                                  description: 'ID каталога скопирован в буфер обмена',
                                });
                              }}
                            >
                              <Icon name="Copy" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-amber-800">
                      <p className="font-semibold">Как обновить секрет:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Найдите секрет YANDEX_FOLDER_ID в настройках проекта</li>
                        <li>Удалите старое значение</li>
                        <li>Вставьте новое значение: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">b1gmmu8hvnaqo83kkhpb</code></li>
                        <li>Сохраните изменения</li>
                        <li>Вернитесь на эту страницу и проверьте бота заново</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 inline-block">
                <div className="flex items-start gap-3 text-left">
                  <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Нужна помощь?
                    </h4>
                    <p className="text-sm text-blue-800 mb-3">
                      После обновления секрета бот сможет подключиться к YandexGPT
                    </p>
                    <a 
                      href="https://t.me/+QgiLIa1gFRY4Y2Iy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium text-sm"
                    >
                      <Icon name="MessageCircle" size={18} />
                      Написать в поддержку
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BotSetupPage;