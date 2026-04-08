import { Lock, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeekItemProps {
  weekNumber: number;
  title: string;
  isUnlocked: boolean;
  isCurrent?: boolean;
  onClick: () => void;
}

export default function WeekItem({ weekNumber, title, isUnlocked, isCurrent, onClick }: WeekItemProps) {
  return (
    <Card 
      onClick={onClick}
      className={`p-4 flex items-center justify-between cursor-pointer transition-all duration-200 border-border
        ${isUnlocked ? 'hover:bg-secondary/50 bg-card/50' : 'bg-background/50 opacity-70'}
        ${isCurrent ? 'border-primary/50 bg-primary/5' : ''}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
          ${isCurrent ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}
        `}>
          {weekNumber}
        </div>
        <div>
          <h4 className={`font-medium ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
            {title}
          </h4>
          {isCurrent && (
            <span className="text-xs text-primary flex items-center gap-1 mt-1">
              <PlayCircle size={12} /> En curso
            </span>
          )}
        </div>
      </div>
      
      <div>
        {!isUnlocked && <Lock size={16} className="text-muted-foreground" />}
      </div>
    </Card>
  );
}
