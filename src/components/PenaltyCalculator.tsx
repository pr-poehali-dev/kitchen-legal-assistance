import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface PenaltyCalculatorProps {
  kitchenPrice: string;
  delayDays: string;
  penalty: number;
  onPriceChange: (value: string) => void;
  onDaysChange: (value: string) => void;
}

const PenaltyCalculator = ({ 
  kitchenPrice, 
  delayDays, 
  penalty, 
  onPriceChange, 
  onDaysChange 
}: PenaltyCalculatorProps) => {
  return (
    <section id="calculator" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Калькулятор неустойки</h2>
          <p className="text-muted-foreground text-lg">
            Рассчитайте, сколько вам должны за просрочку
          </p>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-base">Стоимость кухни (₽)</Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="500 000"
                  value={kitchenPrice}
                  onChange={(e) => onPriceChange(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="days" className="text-base">Дней просрочки</Label>
                <Input
                  id="days"
                  type="text"
                  placeholder="30"
                  value={delayDays}
                  onChange={(e) => onDaysChange(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <div className="text-sm text-muted-foreground mb-2">Размер неустойки</div>
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {penalty.toLocaleString('ru-RU')} ₽
              </div>
              {penalty > 0 && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Расчёт: {kitchenPrice} ₽ × 3% × {delayDays} дней
                </div>
              )}
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Icon name="Info" className="text-primary mt-1 flex-shrink-0" size={20} />
              <p className="text-sm text-muted-foreground">
                По закону о защите прав потребителей неустойка составляет 3% от стоимости работы 
                за каждый день просрочки, но не может превышать 100% стоимости договора.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PenaltyCalculator;
