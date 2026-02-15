import { cva, type VariantProps } from 'class-variance-authority';

export const toggleGroupVariants = cva('flex w-fit items-center rounded-md', {
  variants: {
    zVariant: {
      default: '',
      outline: 'shadow-sm',
    },
    zSize: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    zVariant: 'default',
    zSize: 'default',
  },
});

export const toggleGroupItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-none gap-2 text-sm font-medium transition-[color,box-shadow] hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      zVariant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      zSize: {
        sm: 'h-8 px-2.5 text-xs',
        default: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-sm',
      },
    },
    defaultVariants: {
      zVariant: 'default',
      zSize: 'default',
    },
  },
);

export type ZardToggleGroupVariants = VariantProps<typeof toggleGroupVariants>;
export type ZardToggleGroupItemVariants = VariantProps<typeof toggleGroupItemVariants>;
