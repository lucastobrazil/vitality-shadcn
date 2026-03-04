import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { cn } from '@/lib/utils';

import { badgeVariants, type ZardBadgeVariantVariants } from './badge.variants';

@Component({
  selector: 'z-badge',
  template: `
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
  },
  exportAs: 'zBadge',
})
export class ZardBadgeComponent {
  readonly zVariant = input<ZardBadgeVariantVariants>('default');

  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(badgeVariants({ zVariant: this.zVariant() }), this.class()),
  );
}
