import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import {
  statusBadgeVariants,
  type ZardStatusBadgeColorVariants,
  type ZardStatusBadgeSeverityVariants,
} from './status-badge.variants';
import { cn } from '@/lib/utils';

@Component({
  selector: 'z-status-badge',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
  },
  exportAs: 'zStatusBadge',
})
export class ZardStatusBadgeComponent {
  readonly zColor = input<ZardStatusBadgeColorVariants>('default');
  readonly zSeverity = input<ZardStatusBadgeSeverityVariants>('muted');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(statusBadgeVariants({ zColor: this.zColor(), zSeverity: this.zSeverity() }), this.class()),
  );
}
