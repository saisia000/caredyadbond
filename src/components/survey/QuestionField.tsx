import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuestionFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  description?: string;
  className?: string;
}

export const QuestionField = ({ label, children, required, description, className }: QuestionFieldProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <Label className="text-base font-medium text-foreground leading-relaxed">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
};