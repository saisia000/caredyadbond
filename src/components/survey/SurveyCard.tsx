import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SurveyCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SurveyCard = ({ children, className }: SurveyCardProps) => {
  return (
    <Card className={cn(
      "bg-comfort border-border/50 shadow-soft transition-all duration-300 hover:shadow-warm",
      className
    )}>
      <CardContent className="p-8">
        {children}
      </CardContent>
    </Card>
  );
};