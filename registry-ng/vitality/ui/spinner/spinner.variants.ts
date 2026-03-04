import { cva, type VariantProps } from 'class-variance-authority';

export const spinnerVariants = cva('animate-spin', {
  variants: {
    zSize: {
      sm: 'size-4',
      default: 'size-6',
      lg: 'size-8',
      xl: 'size-12',
    },
    zColor: {
      default: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
    },
  },
  defaultVariants: {
    zSize: 'default',
    zColor: 'default',
  },
});

export type ZardSpinnerVariants = VariantProps<typeof spinnerVariants>;
