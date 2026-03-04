import { cva, type VariantProps } from 'class-variance-authority';

export const alertVariants = cva(
  "relative w-full rounded-lg grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>z-icon]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 has-[>z-icon]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current [&>z-icon]:size-4 [&>z-icon]:translate-y-0.5 [&>z-icon]:text-current",
  {
    variants: {
      zSeverity: {
        muted: 'text-foreground bg-muted [&>svg]:text-foreground',
        destructive: 'text-destructive bg-destructive/10 [&>svg]:text-destructive',
        warning: 'text-warning bg-warning/10 [&>svg]:text-warning',
        success: 'text-success bg-success/10 [&>svg]:text-success',
        info: 'text-info bg-info/10 [&>svg]:text-info',
        brand: 'text-brand bg-brand/10 [&>svg]:text-brand',
      },
      zSize: {
        default: 'px-4 py-3 text-sm',
        compact:
          'px-0 py-0 bg-transparent! border-transparent! text-xs flex items-center gap-1 [&>svg]:translate-y-0 [&>svg]:shrink-0 [&>z-icon]:translate-y-0 [&>z-icon]:shrink-0',
        blockCompact: 'px-3 py-2 text-sm flex! gap-x-1!',
      },
    },
    defaultVariants: {
      zSeverity: 'muted',
      zSize: 'default',
    },
  },
);

export const alertTitleVariants = cva('col-start-2 min-h-4 font-semibold');

export const alertDescriptionVariants = cva(
  'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed [[data-size=blockCompact]_&]:col-auto [[data-size=blockCompact]_&]:inline',
);

export const alertActionVariants = cva('absolute top-2 right-2');

export type ZardAlertSeverityVariants = NonNullable<VariantProps<typeof alertVariants>['zSeverity']>;
export type ZardAlertSizeVariants = NonNullable<VariantProps<typeof alertVariants>['zSize']>;
