import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FlipperService } from './flipper.service';
import { FlipId, StaggerConfig, SpringOption } from './types';

@Component({
  selector: 'flipper',
  template: '<ng-content *ngIf="ready"></ng-content>',
  providers: [FlipperService],
})
export class FlipperComponent
  implements OnInit, OnChanges, AfterContentChecked
{
  @Input() flipId?: FlipId;
  @Input() staggerConfig?: StaggerConfig;
  @Input() spring: SpringOption = 'noWobble';

  ready: boolean = false;

  constructor(private el: ElementRef, private flipperService: FlipperService) {}

  ngOnInit(): void {
    this.flipperService.init({
      element: this.el.nativeElement,
      staggerConfig: this.staggerConfig,
      spring: this.spring,
    });
    this.ready = true;
  }

  ngAfterContentChecked(): void {
    this.flipperService.recordBeforeUpdate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.flipId) {
      const { currentValue, previousValue } = changes.flipId;
      this.flipperService.update(previousValue, currentValue);
    }
    if (changes.staggerConfig) {
      const { previousValue, currentValue } = changes.staggerConfig;
      this.flipperService.update(previousValue, currentValue);
    }
  }
}
