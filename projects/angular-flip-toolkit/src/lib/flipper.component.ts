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
  implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  @Input()
  get flipperProps(): FlipperProps {
    if (this._flipperProps) {
      return this._flipperProps;
    }
    throw new TypeError("'flipperProps' is required.");
  }
  set flipperProps(flipperProps: FlipperProps | null) {
    if (flipperProps) {
      this._flipperProps = flipperProps;
    }
  }
  private _flipperProps?: FlipperProps;

  ready = false;
  afterViewChecked$: Subject<boolean> = new Subject();

  constructor(private el: ElementRef, private flipperService: FlipperService) { }

  ngOnInit(): void {
    this.flipperService.init({
      element: this.el.nativeElement,
      ...this.flipperProps,
    });
    this.ready = true;
  }

  private getFlipperPropsChange(changes: SimpleChanges) {
    if (changes.flipperProps) {
      const { previousValue, currentValue } = changes.flipperProps;
      if (previousValue && currentValue) {
        return { previousValue, currentValue } as { previousValue: FlipperProps, currentValue: FlipperProps }
      }
    }
    return undefined
  }

  private getFlipperUpdateValue(previous: FlipperProps, current: FlipperProps) {
    const { flipKey: previousFlipKey, decisionData: previousDecisionData } =
      previous;
    const { flipKey: currentFlipKey, decisionData: currentDecisionData } =
      current;
    if (previousFlipKey !== currentFlipKey) {
      return { previousDecisionData: previousDecisionData ?? previousFlipKey, currentDecisionData: currentDecisionData ?? currentFlipKey };
    }
    return undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const flipperPropsChange = this.getFlipperPropsChange(changes);
    if (flipperPropsChange) {
      const { previousValue, currentValue } = flipperPropsChange;
      const updateValue = this.getFlipperUpdateValue(previousValue, currentValue)
      if (updateValue) {
        const { previousDecisionData, currentDecisionData } = updateValue
        this.flipperService.recordBeforeUpdate();
        this.afterViewChecked$.pipe(take(1)).subscribe(() => {
          this.flipperService.update(
            previousDecisionData,
            currentDecisionData
          );
        });
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
