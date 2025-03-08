import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, variant = 'default', ...props }, ref) => {
    const percentage = (value / max) * 100;

    return (
      <div
        ref={ref}
        className={cn('relative h-4 w-full overflow-hidden rounded-full bg-gray-100', className)}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 transition-all',
            {
              'bg-blue-600': variant === 'default',
              'bg-green-600': variant === 'success',
              'bg-yellow-600': variant === 'warning',
              'bg-red-600': variant === 'danger',
            }
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);