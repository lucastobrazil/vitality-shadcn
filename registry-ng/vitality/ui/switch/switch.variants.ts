import { cva } from 'class-variance-authority';

export const switchRootVariants = cva(
  "peer inline-flex h-[1.25rem] w-9 relative px-0.5 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-foreground/50 dark:data-[state=unchecked]:bg-foreground/30 data-[state=checked]:justify-start data-[state=unchecked]:justify-end [&_svg:not([class*='size-'])]:size-3 [&_svg:not([class*='text-'])]:text-primary-foreground",
);

export const switchThumbVariants = cva(
  'bg-background pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%+1px)] data-[state=unchecked]:translate-x-0 absolute left-[1px]',
);
