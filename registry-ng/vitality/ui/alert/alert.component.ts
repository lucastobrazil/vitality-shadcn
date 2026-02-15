import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { ZardStringTemplateOutletDirective } from '@/lib/string-template-outlet.directive';
import { cn } from '@/lib/utils';

import {
  alertDescriptionVariants,
  alertTitleVariants,
  alertVariants,
  type ZardAlertSeverityVariants,
  type ZardAlertSizeVariants,
} from './alert.variants';
import { ZardIconComponent } from '@/ui/icon/icon.component';
import type { ZardIcon } from '@/ui/icon/icons';

@Component({
  selector: 'z-alert, [z-alert]',
  imports: [ZardIconComponent, ZardStringTemplateOutletDirective],
  standalone: true,
  template: `
    @if (zIcon() || iconName()) {
      <ng-container *zStringTemplateOutlet="zIcon()">
        <z-icon [zSize]="sm" [zType]="iconName()!" />
      </ng-container>
    }

    @if (zTitle()) {
      <div [class]="titleClasses()" data-slot="alert-title">
        <ng-container *zStringTemplateOutlet="zTitle()">{{ zTitle() }}</ng-container>
      </div>
    }

    @if (zDescription()) {
      <div [class]="descriptionClasses()" data-slot="alert-description">
        <ng-container *zStringTemplateOutlet="zDescription()">{{ zDescription() }}</ng-container>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'alert',
    '[class]': 'classes()',
    '[attr.data-slot]': '"alert"',
    '[attr.data-severity]': 'zSeverity()',
    '[attr.data-size]': 'zSize()',
  },
  exportAs: 'zAlert',
})
export class ZardAlertComponent {
  readonly class = input<ClassValue>('');
  readonly zTitle = input<string | TemplateRef<void>>('');
  readonly zDescription = input<string | TemplateRef<void>>('');
  readonly zIcon = input<ZardIcon | TemplateRef<void>>();
  readonly zSeverity = input<ZardAlertSeverityVariants>('muted');
  readonly zSize = input<ZardAlertSizeVariants>('default');

  protected readonly classes = computed(() =>
    cn(alertVariants({ zSeverity: this.zSeverity(), zSize: this.zSize() }), this.class()),
  );

  protected readonly titleClasses = computed(() => alertTitleVariants());

  protected readonly descriptionClasses = computed(() => alertDescriptionVariants());

  protected readonly iconName = computed((): ZardIcon | null => {
    const customIcon = this.zIcon();
    if (customIcon && !(customIcon instanceof TemplateRef)) {
      return customIcon;
    }

    switch (this.zSeverity()) {
      case 'destructive':
        return 'circle-alert';
      case 'warning':
        return 'triangle-alert';
      case 'success':
        return 'circle-check';
      case 'info':
        return 'info';
      default:
        return null;
    }
  });
}
