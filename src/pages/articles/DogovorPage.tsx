import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import ChatWidget from '@/components/ChatWidget';

const DogovorPage = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const canonicalUrl = 'https://vernem-kuhni.ru/blog/dogovor';

  const handleWhatsAppClick = () => {
    const phoneNumber = '79059940069';
    const message = encodeURIComponent('Здравствуйте! Хочу получить консультацию по защите прав потребителей.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const article = {
    badge: "Договор",
    title: "На что обратить внимание при заказе кухни",
    fullText: `# 📋 На что обратить внимание при заказе кухни

Заказ кухонного гарнитура — серьёзное вложение. Чтобы избежать проблем, важно внимательно изучить договор перед подписанием. Вот 5 ключевых пунктов:

## ⏰ 1. Точные сроки изготовления и установки

Договор должен содержать конкретную дату готовности, а не размытые формулировки вроде "около 2 месяцев". Проверьте:
- Дата начала изготовления
- Дата готовности
- Дата установки
- Ответственность за просрочку

**Важно:** Если срок не указан точно, по закону он считается "разумным" — обычно 2-3 месяца. Но лучше всё зафиксировать письменно.

## 🔍 2. Детальное описание материалов

В договоре должны быть указаны:
- Материал корпуса (ЛДСП, МДФ, массив)
- Толщина материалов
- Производитель фурнитуры (Blum, Hettich и т.д.)
- Материал столешницы
- Цвет и артикул фасадов

**Совет:** Требуйте приложить к договору образцы материалов или фото с артикулами.

## 💰 3. Условия возврата и расторжения

Обязательно проверьте:
- Можно ли вернуть аванс при расторжении
- Размер неустойки за просрочку (по закону — 3% в день)
- Порядок приёмки и рекламаций
- Гарантийные обязательства

**Помните:** По закону о защите прав потребителей вы имеете право расторгнуть договор в любой момент, даже если там написано иное.

## 💵 4. Цена и порядок оплаты

Уточните:
- Полная стоимость с установкой и доставкой
- Размер предоплаты (обычно 50-70%)
- Условия окончательного расчёта
- Возможность изменения цены

**Внимание:** Если в договоре цена "ориентировочная" — требуйте зафиксировать окончательную сумму.

## ✍️ 5. Реквизиты и подписи

В договоре должны быть:
- Полное название организации (ИП, ООО)
- ИНН, ОГРН
- Юридический адрес
- Контактные телефоны
- Подпись и печать (если есть)

**Проверьте:** Существует ли компания в реестре на сайте ФНС nalog.gov.ru.

---

## ⚠️ Что делать, если что-то пошло не так?

Если производитель нарушил условия договора:
1. Составьте письменную претензию
2. Зафиксируйте все дефекты (фото, видео)
3. Обратитесь к юристу по защите прав потребителей

Мы поможем взыскать неустойку, вернуть деньги и компенсировать моральный вред. Звоните: **8 (905) 994-00-69**`
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Договор на изготовление кухни: 5 пунктов, которые защитят вас 2025</title>
        <meta name="description" content="Проверка договора на изготовление кухни на заказ: что должно быть в договоре, как прописать сроки, материалы, неустойку. Защита от недобросовестных производителей. Образец и чек-лист." />
        <meta name="keywords" content="договор на изготовление кухни, заказ кухни на заказ, проверка договора, пункты договора на кухню, сроки изготовления, материалы кухни, неустойка в договоре, образец договора" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Договор на кухню: 5 пунктов защиты" />
        <meta property="og:description" content="Что проверить в договоре на изготовление кухни: сроки, материалы, неустойка, цена. Защита от мошенников." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "На что обратить внимание при заказе кухни",
            "description": "5 ключевых пунктов договора на изготовление кухни: сроки, материалы, условия возврата, цена и реквизиты. Как защитить себя от недобросовестных производителей.",
            "author": {
              "@type": "Organization",
              "name": "ЮК Вернём кухню"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ЮК Вернём кухню",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cdn.poehali.dev/projects/45e8ce2f-3239-4080-877c-91b46ab54c94/files/favicon-1762792088542.svg"
              }
            },
            "datePublished": "2025-11-11",
            "dateModified": "2025-11-11",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "articleSection": "Договор",
            "keywords": "договор на кухню, заказ кухни, права потребителей, проверка договора, материалы кухни"
          })}
        </script>
      </Helmet>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Icon name="Scale" className="text-primary" size={32} />
              <div className="text-left">
                <div className="text-2xl font-bold text-primary">ЮК "Вернём кухню"</div>
                <div className="text-xs text-primary/70 font-medium">Ваш юрист по мебельным спорам</div>
              </div>
            </button>
            <Button onClick={() => navigate('/#contacts')} className="bg-gradient-to-r from-primary to-blue-700">
              Бесплатная консультация
            </Button>
          </div>
        </div>
      </nav>

      <article className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button onClick={() => navigate('/#blog')} variant="ghost" className="mb-6">
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Вернуться к блогу
          </Button>

          <Badge className="mb-4">{article.badge}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">{article.title}</h1>

          <div className="prose prose-lg max-w-none">
            {article.fullText.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h2 key={i} className="text-3xl font-bold mt-8 mb-6">{line.replace('# ', '')}</h2>;
              if (line.startsWith('## ')) return <h3 key={i} className="text-2xl font-bold mt-6 mb-4">{line.replace('## ', '')}</h3>;
              if (line.startsWith('### ')) return <h4 key={i} className="text-xl font-bold mt-5 mb-3">{line.replace('### ', '')}</h4>;
              if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
              if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-2 list-disc">{line.replace('- ', '')}</li>;
              if (line.startsWith('---')) return <hr key={i} className="my-8 border-t-2" />;
              if (line.trim() === '') return <br key={i} />;
              
              const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return <p key={i} className="mb-4 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: processedLine }} />;
            })}
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Нужна консультация?</h3>
              <p className="text-lg mb-6">Мы поможем защитить ваши права и взыскать компенсацию</p>
              <Button onClick={handleWhatsAppClick} size="lg" className="bg-green-600 hover:bg-green-700">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Написать в WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </article>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-primary/70 hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-110 animate-fade-in backdrop-blur-sm"
          aria-label="Наверх"
        >
          <Icon name="ArrowUp" size={18} />
        </button>
      )}
      
      <ChatWidget />
    </div>
  );
};

export default DogovorPage;