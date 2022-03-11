import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FlipperService } from './flipper.service';
import { FlippedProps } from './types';

@Directive({
  selector: '[flipped]',
})
export class FlipperDirective implements OnInit {
  @Input()
  get flippedProps(): FlippedProps {
    if (this._flippedProps) {
      return this._flippedProps;
    }
    throw new TypeError("'flippedProps' is required.");
  }
  set flippedProps(flippedProps: FlippedProps | null) {
    if (flippedProps) {
      this._flippedProps = flippedProps;
    }
  }
  private _flippedProps?: FlippedProps;

  constructor(private el: ElementRef, private flipperService: FlipperService) { }

  ngOnInit(): void {
    const { flipId, inverseFlipId, opacity, translate, scale, transformOrigin } = this.flippedProps;
    if (flipId) {
      this.flipperService.addFlippedElement({
        element: this.el.nativeElement,
        ...this.flippedProps,
      });
    }
    if (inverseFlipId) {
      this.flipperService.addInvertedElement({
        element: this.el.nativeElement,
        parent: this.el.nativeElement.parentElement,
        opacity: opacity ?? true,
        translate: translate ?? true,
        scale: scale ?? true,
        transformOrigin: transformOrigin ?? '',
      });
    }
  }
}
