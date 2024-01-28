import { cn, displayValue } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface TaskFieldProps {
  label: string;
  value: string | undefined | null;
  labelClassNames?: string;
  valueClassNames?: string;
}

export const TaskField = ({ label, value, labelClassNames, valueClassNames }: TaskFieldProps) => (
  <div className="space-y-2">
    <Label className={cn('text-muted-foreground', labelClassNames)}>{label}</Label>
    <p
      className={cn('w-full px-3 py-2 text-sm text-white min-h-10 bg-neutral-800', valueClassNames)}
    >
      {displayValue(value)}
    </p>
  </div>
);
