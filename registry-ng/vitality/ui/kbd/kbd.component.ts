import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { kbdVariants } from './kbd.variants';

import { cn } from '@/lib/utils';

@Component({
  selector: 'z-kbd, [z-kbd]',
  standalone: true,
  template: `
    <kbd><ng-content /></kbd>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
  },
  exportAs: 'zKbd',
})
export class ZardKbdComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => cn(kbdVariants(), this.class()));
}
