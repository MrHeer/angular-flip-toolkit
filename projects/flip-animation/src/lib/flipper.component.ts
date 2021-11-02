import {
  AfterViewChecked,
  ChangeDetectionStrategy,
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
import { FlipperProps } from './types';

@Component({
  selector: 'flipper',
  template: '<ng-content *ngIf="ready"></ng-content>',
  providers: [FlipperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipperComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewChecked
{
  @Input() flipperProps?: FlipperProps | null;

  ready = false;
  afterViewChecked$: Subject<boolean> = new Subject();

  constructor(private el: ElementRef, private flipperService: FlipperService) {}

  ngOnInit(): void {
    this.flipperService.init({
      element: this.el.nativeElement,
      ...this.flipperProps,
    });
    this.ready = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.flipperProps) {
      const { previousValue, currentValue } = changes.flipperProps;
      if (previousValue) {
        const { flipKey: previousFlipKey, decisionData: previousDecisionData } =
          previousValue;
        const { flipKey: currentFlipKey, decisionData: currentDecisionData } =
          currentValue;
        if (previousFlipKey !== currentFlipKey) {
          this.flipperService.recordBeforeUpdate();
          this.afterViewChecked$.pipe(take(1)).subscribe(() => {
            this.flipperService.update(
              previousDecisionData ?? previousFlipKey,
              currentDecisionData ?? currentFlipKey
            );
          });
        }
      }
    }
  }

  ngAfterViewChecked(): void {
    this.afterViewChecked$.next(true);
  }

  ngOnDestroy(): void {
    this.afterViewChecked$.unsubscribe();
  }
}
