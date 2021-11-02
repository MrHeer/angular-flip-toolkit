import { Component, OnDestroy } from '@angular/core';
import { FlippedProps, FlipperProps } from 'dist/flip-animation/lib/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type SquareClassName = 'big-square' | 'square';

@Component({
  selector: 'app-expanding-div',
  templateUrl: './expanding-div.component.html',
  styleUrls: ['./expanding-div.component.scss'],
})
export class ExpandingDivComponent implements OnDestroy {
  className$: BehaviorSubject<SquareClassName> = new BehaviorSubject(
    'square' as SquareClassName
  );
  flipperProps$: Observable<FlipperProps> = this.className$.pipe(
    map((className) => ({
      flipKey: className,
    }))
  );
  flippedProps: FlippedProps = {
    flipId: 'square',
  };
  textFlippedProps: FlippedProps = {
    inverseFlipId: 'text',
    translate: false,
    scale: false,
    opacity: false,
  };

  toggleFullScreen() {
    this.className$.next(
      this.className$.getValue() === 'big-square' ? 'square' : 'big-square'
    );
  }

  ngOnDestroy(): void {
    this.className$.unsubscribe();
  }
}
