import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  FlippedProps,
  FlipperProps,
} from 'dist/angular-flip-toolkit/lib/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnDestroy {
  private shortText = 'Short Text';
  private longText = 'Long Long Long Text';
  buttonText$: BehaviorSubject<string> = new BehaviorSubject(this.shortText);
  flipperProps$: Observable<FlipperProps> = this.buttonText$.pipe(
    map((buttonText) => ({
      flipKey: buttonText,
    }))
  );
  buttonFlippedProps: FlippedProps = {
    flipId: 'button',
  };
  textFlippedProps: FlippedProps = {
    inverseFlipId: 'text',
  };

  ngOnDestroy(): void {
    this.buttonText$.unsubscribe();
  }

  toggleText() {
    const currentText = this.buttonText$.getValue();
    if (currentText === this.shortText) {
      this.buttonText$.next(this.longText);
    } else {
      this.buttonText$.next(this.shortText);
    }
  }
}
