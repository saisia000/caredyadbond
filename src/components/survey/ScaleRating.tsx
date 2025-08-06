import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ScaleRatingProps {
  value?: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  name: string;
}

export const ScaleRating = ({ 
  value, 
  onChange, 
  min, 
  max, 
  minLabel, 
  maxLabel, 
  name 
}: ScaleRatingProps) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-2">
        {numbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={cn(
              "w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center font-medium",
              value === num
                ? "bg-primary border-primary text-primary-foreground shadow-soft scale-110"
                : "border-border bg-background hover:border-primary hover:scale-105 text-foreground"
            )}
          >
            {num}
          </button>
        ))}
      </div>
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
};