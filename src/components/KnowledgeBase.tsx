import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Article {
  badge: string;
  title: string;
  preview: string;
  fullText: string;
}

interface KnowledgeBaseProps {
  articles: Article[];
}

const KnowledgeBase = ({ articles }: KnowledgeBaseProps) => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  return (
    <section id="knowledge" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">База знаний</h2>
          <p className="text-muted-foreground text-lg">
            Полезные статьи о защите прав потребителей
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedArticle(selectedArticle === index ? null : index)}
            >
              <CardContent className="p-6">
                <Badge className="mb-3">{article.badge}</Badge>
                <h3 className="font-semibold text-lg mb-3">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {article.preview}
                </p>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArticle(selectedArticle === index ? null : index);
                  }}
                >
                  <span>{selectedArticle === index ? 'Свернуть' : 'Читать далее'}</span>
                  <Icon 
                    name={selectedArticle === index ? "ChevronUp" : "ChevronDown"} 
                    className="group-hover:translate-x-1 transition-transform" 
                    size={20} 
                  />
                </Button>
                
                {selectedArticle === index && (
                  <div className="mt-6 pt-6 border-t prose prose-sm max-w-none dark:prose-invert text-left whitespace-pre-wrap">
                    {article.fullText}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;