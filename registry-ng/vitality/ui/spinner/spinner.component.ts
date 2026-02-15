import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { spinnerVariants, type ZardSpinnerVariants } from './spinner.variants';
import { ZardIconComponent } from '@/ui/icon/icon.component';

import { cn } from '@/lib/utils';

@Component({
  selector: 'z-spinner',
  standalone: true,
  imports: [ZardIconComponent],
  template: `
    <span z-icon zType="loader-circle" [class]="classes()" style="stroke-linecap: round"></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zSpinner',
})
export class ZardSpinnerComponent {
  readonly class = input<ClassValue>('');
  readonly zSize = input<ZardSpinnerVariants['zSize']>('default');
  readonly zColor = input<ZardSpinnerVariants['zColor']>('default');

  protected readonly classes = computed(() =>
    cn(spinnerVariants({ zSize: this.zSize(), zColor: this.zColor() }), this.class()),
  );
}
