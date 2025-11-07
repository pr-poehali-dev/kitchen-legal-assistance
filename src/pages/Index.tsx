import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Scale" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">Закон Кухни</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors">Услуги</button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">О нас</button>
              <button onClick={() => scrollToSection('cases')} className="text-foreground hover:text-primary transition-colors">Кейсы</button>
              <button onClick={() => scrollToSection('blog')} className="text-foreground hover:text-primary transition-colors">Блог</button>
              <button onClick={() => scrollToSection('contacts')} className="text-foreground hover:text-primary transition-colors">Контакты</button>
              <Button onClick={() => scrollToSection('contacts')} className="bg-gradient-to-r from-primary to-blue-700">
                Бесплатная консультация
              </Button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Icon name={isMenuOpen ? "X" : "Menu"} size={28} />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in-up">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 hover:text-primary">Услуги</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 hover:text-primary">О нас</button>
              <button onClick={() => scrollToSection('cases')} className="block w-full text-left py-2 hover:text-primary">Кейсы</button>
              <button onClick={() => scrollToSection('blog')} className="block w-full text-left py-2 hover:text-primary">Блог</button>
              <button onClick={() => scrollToSection('contacts')} className="block w-full text-left py-2 hover:text-primary">Контакты</button>
              <Button onClick={() => scrollToSection('contacts')} className="w-full bg-gradient-to-r from-primary to-blue-700 mt-2">
                Бесплатная консультация
              </Button>
            </div>
          )}
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10"></div>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-secondary text-secondary-foreground font-semibold px-4 py-1">
                Специализация: защита прав потребителей
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Проблемы с кухней на заказ?{' '}
                <span className="text-primary">Вернем деньги</span> и нервы!
              </h1>
              <p className="text-xl text-muted-foreground">
                Юридическая помощь по правам покупателей кухонь и конных гарнитуров. Неустойка до 3% в день, возврат 100% средств.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => scrollToSection('contacts')} size="lg" className="bg-gradient-to-r from-primary to-blue-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Бесплатная консультация
                </Button>
                <Button onClick={() => scrollToSection('services')} size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Узнать больше
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-6">
                <div>
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Выигранных дел</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">15 млн ₽</div>
                  <div className="text-sm text-muted-foreground">Возвращено клиентам</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">3%</div>
                  <div className="text-sm text-muted-foreground">Неустойка в день</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/45e8ce2f-3239-4080-877c-91b46ab54c94/files/076636e1-3a00-49bb-b82c-5b6e0d2d8210.jpg" 
                alt="Идеальная кухня"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="font-bold">Гарантия результата</div>
                    <div className="text-sm text-muted-foreground">или вернём гонорар</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4">Самые частые проблемы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Знакомые ситуации?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы специализируемся на решении проблем с заказными кухнями и конной амуницией
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "Clock",
                title: "Просрочка изготовления",
                description: "Обещали за месяц, тянут уже полгода? Взыщем неустойку 3% от стоимости за каждый день просрочки."
              },
              {
                icon: "AlertTriangle",
                title: "Брак и недостатки",
                description: "Царапины, сколы, кривые фасады? Требуем бесплатное устранение или компенсацию стоимости ремонта."
              },
              {
                icon: "XCircle",
                title: "Хотите расторгнуть договор",
                description: "Потеряли доверие к исполнителю? Вернём 100% предоплаты + неустойку + моральный вред."
              }
            ].map((problem, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6 space-y-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name={problem.icon} className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Как мы решаем ваши проблемы
              </h3>
              <div className="space-y-4 mt-8">
                {[
                  { step: "1", title: "Бесплатная консультация", description: "Анализируем ваш договор и ситуацию за 15 минут" },
                  { step: "2", title: "Досудебная претензия", description: "Составляем требование с расчётом неустойки и отправляем продавцу" },
                  { step: "3", title: "Получение результата", description: "В 70% случаев получаем деньги без суда. Иначе — идём в суд и выигрываем" }
                ].map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xl">
                      {step.step}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{step.title}</div>
                      <div className="text-white/80">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4">Наши услуги</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Что мы взыскиваем для вас
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "TrendingUp",
                title: "Неустойка за просрочку",
                amount: "3% в день",
                description: "От стоимости товара за каждый день задержки. Например, при цене кухни 500 000 ₽ и просрочке 60 дней — это 900 000 ₽ неустойки."
              },
              {
                icon: "Wrench",
                title: "Устранение недостатков",
                description: "Требуем бесплатного ремонта или возмещения стоимости устранения брака + неустойка за каждый день отказа."
              },
              {
                icon: "RotateCcw",
                title: "Расторжение договора",
                description: "Полный возврат предоплаты + неустойка за период просрочки + компенсация морального вреда (обычно 10-30 тыс. ₽)."
              },
              {
                icon: "Scale",
                title: "Штраф 50% + судебные расходы",
                description: "Если дело дошло до суда — взыскиваем штраф 50% от присуждённой суммы + расходы на юриста, экспертизу, госпошлину."
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-yellow-400 rounded-xl flex items-center justify-center">
                      <Icon name={service.icon} className="text-white" size={28} />
                    </div>
                    {service.amount && (
                      <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                        {service.amount}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/projects/45e8ce2f-3239-4080-877c-91b46ab54c94/files/8987fad5-c0d0-485f-8997-30037bde1edd.jpg" 
                alt="Наша команда"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6 animate-fade-in-up">
              <Badge>О нас</Badge>
              <h2 className="text-4xl md:text-5xl font-bold">
                Эксперты по защите прав потребителей
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Специализируемся исключительно на спорах с изготовителями кухонь на заказ и конной амуниции. 
                Это наша узкая ниша — мы знаем все тонкости, типовые уловки продавцов и судебную практику.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Award", text: "8 лет опыта в защите прав потребителей" },
                  { icon: "Users", text: "Более 100 выигранных дел" },
                  { icon: "TrendingUp", text: "95% положительных решений суда" },
                  { icon: "Shield", text: "Работаем по всей России" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={item.icon} className="text-primary" size={20} />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4">Успешные кейсы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Реальные результаты наших клиентов
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                client: "Анна К., г. Кемерово",
                problem: "Просрочка 120 дней",
                result: "Взыскано 1 850 000 ₽",
                description: "Кухня стоимостью 520 000 ₽ не была изготовлена в срок. Взыскали неустойку, штраф, моральный вред и расходы на юриста."
              },
              {
                client: "Михаил Р., г. Новосибирск",
                problem: "Брак фасадов",
                result: "Возврат 680 000 ₽",
                description: "После установки обнаружили царапины и сколы. Расторгли договор, вернули 100% предоплаты + неустойку."
              },
              {
                client: "Елена П., г. Томск",
                problem: "Неправильные размеры",
                result: "Компенсация 450 000 ₽",
                description: "Кухня не подошла по размерам. Взыскали полную стоимость + неустойку + моральный вред."
              }
            ].map((caseItem, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-semibold">
                      {caseItem.problem}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-primary">{caseItem.result}</div>
                  <div className="font-semibold">{caseItem.client}</div>
                  <p className="text-muted-foreground">{caseItem.description}</p>
                  <div className="flex items-center gap-2 text-green-600">
                    <Icon name="CheckCircle" size={20} />
                    <span className="font-semibold">Дело выиграно</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 max-w-3xl mx-auto">
              <CardContent className="pt-6">
                <img 
                  src="https://cdn.poehali.dev/projects/45e8ce2f-3239-4080-877c-91b46ab54c94/files/10eeb745-3665-44e7-ad6d-bfe34168125f.jpg" 
                  alt="Довольный клиент"
                  className="rounded-xl mb-6 w-full"
                />
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={24} />
                  ))}
                </div>
                <p className="text-lg italic mb-4">
                  "Думали, что никогда не вернём свои деньги. Спасибо команде «Закон Кухни» — получили не только предоплату, 
                  но и компенсацию за все нервы и потраченное время!"
                </p>
                <div className="font-semibold">Семья Ивановых, г. Кемерово</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4">Полезные статьи</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Знания — ваше оружие
            </h2>
            <p className="text-xl text-muted-foreground">
              Читайте наш блог, чтобы защитить свои права
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in">
              <CardContent className="pt-6 space-y-4">
                <Badge>Договор</Badge>
                <h3 className="text-2xl font-bold">
                  На что обратить внимание при заказе кухни
                </h3>
                <p className="text-muted-foreground">
                  5 пунктов договора, которые защитят вас от недобросовестных производителей. 
                  Сроки, материалы, условия возврата — всё, что нужно проверить до подписания.
                </p>
                <Button variant="outline" className="w-full">
                  Читать статью
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6 space-y-4">
                <Badge>Права потребителя</Badge>
                <h3 className="text-2xl font-bold">
                  Как рассчитать неустойку за просрочку
                </h3>
                <p className="text-muted-foreground">
                  Пошаговая инструкция с примерами расчёта. Узнайте, сколько вам должны выплатить 
                  за каждый день просрочки изготовления вашей кухни.
                </p>
                <Button variant="outline" className="w-full">
                  Читать статью
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-6 space-y-4">
                <Badge>Инструкция</Badge>
                <h3 className="text-2xl font-bold">
                  Обнаружили брак? Действуйте правильно
                </h3>
                <p className="text-muted-foreground">
                  Что делать сразу после обнаружения дефектов: фото, акт, претензия. 
                  Правильные действия в первые дни помогут взыскать максимум.
                </p>
                <Button variant="outline" className="w-full">
                  Читать статью
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="pt-6 space-y-4">
                <Badge>Судебная практика</Badge>
                <h3 className="text-2xl font-bold">
                  Топ-5 решений суда в пользу покупателей
                </h3>
                <p className="text-muted-foreground">
                  Разбираем реальные судебные решения по спорам о кухнях. 
                  Как суды определяют размер компенсации и на чьей стороне закон.
                </p>
                <Button variant="outline" className="w-full">
                  Читать статью
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              <div className="text-2xl font-bold mb-6">Частые вопросы</div>
              <AccordionItem value="item-1" className="bg-white rounded-lg mb-2 px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Сколько стоят ваши услуги?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Первая консультация бесплатна. Работаем по договору с фиксированной ставкой или процентом от взысканной суммы. 
                  Все расходы на юриста в случае победы взыскиваем с ответчика.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg mb-2 px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Сколько времени займёт дело?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Досудебная претензия — 10-30 дней. Если дело идёт в суд — от 2 до 6 месяцев. 
                  Стараемся решить вопрос на этапе переговоров, это быстрее и выгоднее.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg mb-2 px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Какие документы нужны для начала работы?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Договор на изготовление кухни, чеки об оплате, переписка с продавцом, 
                  фото дефектов (если есть). Всё остальное мы подготовим сами.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  Вы работаете только в Кемерово?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Нет, мы работаем по всей России. Многие вопросы решаем онлайн, 
                  а в суд можем выступать удалённо или привлечём коллег в вашем регионе.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <Badge className="bg-white text-primary">Свяжитесь с нами</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Получите бесплатную консультацию прямо сейчас
            </h2>
            <p className="text-xl text-white/90">
              Расскажем, как вернуть деньги за вашу кухню и взыскать неустойку. Первая консультация бесплатно!
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto">
                    <Icon name="Phone" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Позвоните нам</h3>
                  <a href="tel:89236095502" className="text-3xl font-bold hover:text-secondary transition-colors">
                    8 (923) 609-55-02
                  </a>
                  <p className="text-white/80">Пн-Пт: 9:00 - 19:00, Сб: 10:00 - 16:00</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto">
                    <Icon name="MapPin" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Приезжайте к нам</h3>
                  <p className="text-xl font-bold">г. Кемерово</p>
                  <p className="text-lg font-semibold">ул. Ноградская, 3, офис 38</p>
                  <p className="text-white/80">Работаем по предварительной записи</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-yellow-400 text-lg px-12 py-6 shadow-xl">
                <Icon name="MessageCircle" className="mr-2" size={24} />
                Заказать обратный звонок
              </Button>
            </div>

            <div className="mt-12 pt-8">
              <div className="text-sm text-white/70">
                ИП "Закон Кухни" | ИНН: 1234567890 | ОГРНИП: 1234567890123
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Scale" size={24} />
            <span className="text-xl font-bold">Закон Кухни</span>
          </div>
          <p className="text-background/70">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;