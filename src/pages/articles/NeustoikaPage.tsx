import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import ChatWidget from '@/components/ChatWidget';

const NeustoikaPage = () => {
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
  const canonicalUrl = 'https://vernem-kuhni.ru/blog/neustoika';

  const handleMaxClick = () => {
    const phoneNumber = '89236095502';
    window.open(`https://max.ru/${phoneNumber}`, '_blank');
  };

  const article = {
    badge: "Права потребителя",
    title: "Как рассчитать неустойку за просрочку",
    fullText: `# 💰 Как рассчитать неустойку за просрочку

Просрочка изготовления кухни — одно из самых частых нарушений. По закону вам положена неустойка 3% от стоимости за каждый день задержки. Разберём, как правильно рассчитать сумму.

## ⚖️ Правовое основание

Согласно **статье 23.1 Закона о защите прав потребителей**, за нарушение срока выполнения работы (изготовления товара) потребитель вправе потребовать неустойку в размере **3% от цены работы за каждый день просрочки**.

## 🧮 Формула расчёта

**Неустойка = Цена договора × 3% × Количество дней просрочки**

### Пример 1: Простая ситуация

**Условия:**
- Стоимость кухни: 500 000 ₽
- Срок по договору: 60 дней (до 1 июня)
- Фактическая готовность: 1 августа
- Просрочка: 61 день

**Расчёт:**
500 000 ₽ × 3% × 61 день = **915 000 ₽**

### Пример 2: С частичной оплатой

Если вы внесли только предоплату, неустойка считается от полной стоимости договора, а не от суммы аванса.

**Условия:**
- Стоимость кухни: 800 000 ₽
- Внесена предоплата: 400 000 ₽
- Просрочка: 45 дней

**Расчёт:**
800 000 ₽ × 3% × 45 дней = **1 080 000 ₽**

## 🚫 Ограничение неустойки

По закону, неустойка не может превышать стоимость работы (статья 394 ГК РФ). То есть максимум — это 100% от цены договора.

**Например:** Если кухня стоит 500 000 ₽, максимальная неустойка = 500 000 ₽ (достигается через 33 дня просрочки).

## 💸 Что ещё можно взыскать?

Помимо неустойки, вы имеете право требовать:

1. **Возврат предоплаты** (если решите расторгнуть договор)
2. **Компенсацию морального вреда** (обычно 10-30 тыс. ₽)
3. **Штраф 50%** (если дело дошло до суда)
4. **Расходы на юриста, экспертизу, госпошлину**

## 📊 Калькулятор неустойки

Быстро рассчитать неустойку можно по формуле:

| Цена кухни | 30 дней | 60 дней | 90 дней |
|------------|---------|---------|---------|
| 300 000 ₽  | 270 000 ₽ | 500 000 ₽ (макс) | 500 000 ₽ |
| 500 000 ₽  | 450 000 ₽ | 500 000 ₽ (макс) | 500 000 ₽ |
| 700 000 ₽  | 630 000 ₽ | 700 000 ₽ (макс) | 700 000 ₽ |

## 📝 Пошаговая инструкция

**Шаг 1:** Определите точную дату окончания срока по договору

**Шаг 2:** Зафиксируйте дату фактической готовности (или текущую дату, если работа не выполнена)

**Шаг 3:** Посчитайте количество дней просрочки

**Шаг 4:** Умножьте цену договора на 3% и на количество дней

**Шаг 5:** Составьте письменную претензию с расчётом

---

## 📞 Нужна помощь с расчётом?

Позвоните нам — мы бесплатно рассчитаем вашу неустойку и составим претензию: **8 (923) 609-55-02**`
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Неустойка за просрочку кухни 3% в день - калькулятор и примеры расчёта 2025</title>
        <meta name="description" content="Расчёт неустойки за просрочку изготовления кухни по закону: формула 3% в день, примеры, ограничения. Максимальная неустойка, штраф 50%, моральный вред. Калькулятор онлайн." />
        <meta name="keywords" content="неустойка за просрочку кухни, расчет неустойки 3 процента, калькулятор неустойки, просрочка изготовления кухни, закон о защите прав потребителей, максимальная неустойка, штраф 50 процентов" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Неустойка 3% в день - калькулятор и примеры" />
        <meta property="og:description" content="Рассчитайте неустойку за просрочку кухни по формуле 3% в день. Примеры, ограничения, штраф 50%." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Как рассчитать неустойку за просрочку",
            "description": "Формула расчета неустойки 3% в день за просрочку изготовления кухни. Примеры расчетов, ограничения неустойки, что еще можно взыскать с производителя.",
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
            "articleSection": "Права потребителя",
            "keywords": "неустойка за просрочку, расчет неустойки, просрочка кухни, 3% в день, защита прав потребителей"
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
              if (line.startsWith('|')) return <p key={i} className="font-mono text-sm mb-1">{line}</p>;
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
              <Button onClick={handleMaxClick} size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Написать в Max
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

export default NeustoikaPage;