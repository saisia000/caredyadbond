import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  name: string;
}

export const CheckboxGroup = ({ options, values, onChange, name }: CheckboxGroupProps) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...values, optionValue]);
    } else {
      onChange(values.filter(v => v !== optionValue));
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-warm/20 transition-colors">
          <Checkbox
            id={`${name}-${option.value}`}
            checked={values.includes(option.value)}
            onCheckedChange={(checked) => handleChange(option.value, checked as boolean)}
            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <Label 
            htmlFor={`${name}-${option.value}`}
            className="text-foreground cursor-pointer flex-1 leading-relaxed"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};