import { cn } from '@/lib/utils';

export function SerifSectionLabel({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-8 flex items-center gap-4', className)}>
      <span className="serif-rule flex-1" />
      <span className="serif-label">{label}</span>
      <span className="serif-rule flex-1" />
    </div>
  );
}
