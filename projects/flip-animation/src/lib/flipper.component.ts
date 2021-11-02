import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { FlipperService } from './flipper.service';
import { FlipId, StaggerConfig, SpringOption } from './types';

@Component({
  selector: 'flipper',
  template: '<ng-content *ngIf="ready"></ng-content>',
  providers: [FlipperService],
})
export class FlipperComponent
  implements OnInit, OnDestroy, OnChanges, AfterContentChecked
{
  @Input() flipId?: FlipId;
  @Input() staggerConfig?: StaggerConfig;
  @Input() spring: SpringOption = 'noWobble';

  ready = false;
  afterViewChecked$: Subject<boolean> = new Subject();

  constructor(private el: ElementRef, private flipperService: FlipperService) {}

  ngOnInit(): void {
    this.flipperService.init({
      element: this.el.nativeElement,
      staggerConfig: this.staggerConfig,
      spring: this.spring,
    });
    this.ready = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.flipperService.recordBeforeUpdate();
    if (changes.flipId) {
      const { currentValue, previousValue } = changes.flipId;
      this.afterViewChecked$.pipe(take(1)).subscribe(() => {
        this.flipperService.update(previousValue, currentValue);
      });
    }
  }

  ngAfterContentChecked(): void {
    this.afterViewChecked$.next(true);
  }

  ngOnDestroy(): void {
    this.afterViewChecked$.unsubscribe();
  }
}
