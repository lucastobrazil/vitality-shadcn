import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { skeletonVariants } from './skeleton.variants';

import { cn } from '@/lib/utils';

@Component({
  selector: 'z-skeleton',
  template: `
    <div data-slot="skeleton" [class]="classes()"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'block',
  },
  exportAs: 'zSkeleton',
})
export class ZardSkeletonComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => cn(skeletonVariants(), this.class()));
}
