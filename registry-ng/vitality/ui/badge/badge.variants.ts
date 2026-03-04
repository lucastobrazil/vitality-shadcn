import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center border border-transparent px-1.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden rounded-full h-5 min-w-5',
  {
    variants: {
      zVariant: {
        default: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        neutral: 'bg-foreground/70 text-muted [a&]:hover:bg-foreground/90',
      },
    },
    defaultVariants: {
      zVariant: 'default',
    },
  },
);

export type ZardBadgeVariantVariants = NonNullable<VariantProps<typeof badgeVariants>['zVariant']>;
