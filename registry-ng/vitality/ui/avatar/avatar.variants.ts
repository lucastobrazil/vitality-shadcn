import { cva, type VariantProps } from 'class-variance-authority';

export const avatarVariants = cva(
  'group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none',
  {
    variants: {
      zSize: {
        sm: 'size-6',
        default: 'size-8',
        lg: 'size-10',
      },
      zVariant: {
        neutral: 'bg-muted text-foreground',
        primary: 'bg-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      zSize: 'default',
      zVariant: 'neutral',
    },
  },
);

export const imageVariants = cva('relative object-cover object-center w-full h-full z-10 rounded-full');

export const avatarFallbackVariants = cva(
  'flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs',
  {
    variants: {
      zVariant: {
        neutral: 'bg-muted text-foreground',
        primary: 'bg-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      zVariant: 'neutral',
    },
  },
);

export const avatarGroupVariants = cva('flex items-center [&_img]:ring-2 [&_img]:ring-background', {
  variants: {
    zOrientation: {
      horizontal: 'flex-row -space-x-3',
      vertical: 'flex-col -space-y-3',
    },
  },
  defaultVariants: {
    zOrientation: 'horizontal',
  },
});

export type ZardAvatarVariants = VariantProps<typeof avatarVariants>;
export type ZardAvatarGroupVariants = VariantProps<typeof avatarGroupVariants>;
export type ZardAvatarVariantVariants = NonNullable<VariantProps<typeof avatarVariants>['zVariant']>;
