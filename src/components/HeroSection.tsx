import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onWhatsAppClick: () => void;
  onCallbackClick: () => void;
  onScrollToSection: (id: string) => void;
}

const HeroSection = ({ onWhatsAppClick, onCallbackClick, onScrollToSection }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-12 relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <Icon name="Shield" className="text-primary" size={20} />
          <span className="text-sm font-medium">Специализация: кухни на заказ</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
          Защитим права покупателей кухонь
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Взыщем до 100% стоимости за просрочку изготовления. Вернём деньги при браке. 
          <span className="text-primary font-semibold"> Оплата только по результату.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={onWhatsAppClick}
          >
            <Icon name="MessageCircle" className="mr-2" size={24} />
            Написать в WhatsApp
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 hover:bg-primary/5 transition-all duration-300"
            onClick={onCallbackClick}
          >
            <Icon name="Phone" className="mr-2" size={24} />
            Заказать звонок
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="text-4xl font-bold text-primary mb-2">3%</div>
            <div className="text-sm text-muted-foreground">неустойка за каждый день просрочки</div>
          </div>
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">возврат средств при браке</div>
          </div>
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="text-4xl font-bold text-primary mb-2">0₽</div>
            <div className="text-sm text-muted-foreground">до победы в суде</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onScrollToSection('calculator')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Прокрутить вниз"
      >
        <Icon name="ChevronDown" size={32} className="text-primary" />
      </button>
    </section>
  );
};

export default HeroSection;
