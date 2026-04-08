import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { Link } from "wouter";

interface GateCardProps {
  number: string;
  name: string;
  duration: string;
  subtitle: string;
  description: string;
  price: string;
  statusText: string;
  isLocked?: boolean;
  buttonText?: string;
  buttonLink?: string;
  isSpecial?: boolean;
}

export default function GateCard({
  number,
  name,
  duration,
  subtitle,
  description,
  price,
  statusText,
  isLocked = false,
  buttonText,
  buttonLink,
  isSpecial = false
}: GateCardProps) {
  return (
    <Card className={`p-8 flex flex-col h-full bg-card/50 backdrop-blur-sm border-border ${isSpecial ? 'border-primary/50' : ''}`}>
      <div className="mb-4">
        {isSpecial ? (
          <h3 className="text-2xl font-serif text-primary mb-2">{name}</h3>
        ) : (
          <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground tracking-widest uppercase">
            <span>{number}</span>
            <span>·</span>
            <span>{name}</span>
            <span>·</span>
            <span>{duration}</span>
          </div>
        )}
        {!isSpecial && <h3 className="text-xl font-serif mb-2">{subtitle}</h3>}
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mt-auto pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-semibold">{price}</span>
          {isLocked ? (
            <Badge variant="secondary" className="bg-secondary text-muted-foreground">
              <Lock size={12} className="mr-1" /> Bloqueada
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">{statusText}</span>
          )}
        </div>
        
        {buttonText && buttonLink && (
          <Link href={buttonLink} className="block w-full">
            <Button 
              className={`w-full ${isSpecial ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
