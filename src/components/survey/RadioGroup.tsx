import { RadioGroup as RadixRadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
}

export const RadioGroup = ({ options, value, onChange, name }: RadioGroupProps) => {
  return (
    <RadixRadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-warm/20 transition-colors">
          <RadioGroupItem 
            value={option.value} 
            id={`${name}-${option.value}`}
            className="text-primary border-primary"
          />
          <Label 
            htmlFor={`${name}-${option.value}`}
            className="text-foreground cursor-pointer flex-1 leading-relaxed"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadixRadioGroup>
  );
};