import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const WorkProcess = () => {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как мы работаем</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Простой и понятный процесс от консультации до получения денег
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageSquare" className="text-primary" size={32} />
              </div>
              <Badge className="mb-3">Шаг 1</Badge>
              <h3 className="font-semibold mb-2">Консультация</h3>
              <p className="text-sm text-muted-foreground">
                Связываетесь с нами, рассказываете ситуацию. Оцениваем перспективы дела бесплатно.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileText" className="text-primary" size={32} />
              </div>
              <Badge className="mb-3">Шаг 2</Badge>
              <h3 className="font-semibold mb-2">Документы</h3>
              <p className="text-sm text-muted-foreground">
                Собираем необходимые документы, готовим претензию и исковое заявление.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Scale" className="text-primary" size={32} />
              </div>
              <Badge className="mb-3">Шаг 3</Badge>
              <h3 className="font-semibold mb-2">Суд</h3>
              <p className="text-sm text-muted-foreground">
                Представляем ваши интересы в суде. Вам не нужно никуда ходить.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Banknote" className="text-primary" size={32} />
              </div>
              <Badge className="mb-3">Шаг 4</Badge>
              <h3 className="font-semibold mb-2">Получение денег</h3>
              <p className="text-sm text-muted-foreground">
                Взыскиваем деньги с производителя. Только после этого получаем оплату.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="text-5xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">выигранных дел</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="text-5xl font-bold text-primary mb-2">2-4</div>
            <div className="text-sm text-muted-foreground">месяца средний срок</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="text-5xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-muted-foreground">довольных клиентов</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
