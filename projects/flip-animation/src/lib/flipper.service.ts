import { Injectable } from '@angular/core';
import { Flipper } from 'flip-toolkit';
import {
  FlippedProps,
  HandleEnterUpdateDelete,
  InverseFlippedProps,
  OnFlipperComplete,
  SpringOption,
  StaggerConfig,
} from './types';

interface Options {
  element: HTMLElement;
  staggerConfig?: StaggerConfig;
  spring?: SpringOption;
  applyTransformOrigin?: boolean;
  handleEnterUpdateDelete?: HandleEnterUpdateDelete;
  debug?: boolean;
  onComplete?: OnFlipperComplete;
}

@Injectable()
export class FlipperService {
  private flipInstance?: Flipper;

  init(options: Options) {
    this.flipInstance = new Flipper(options);
  }

  recordBeforeUpdate() {
    this.flipInstance?.recordBeforeUpdate();
  }

  update(prevDecisionData: any, currentDecisionData: any) {
    this.flipInstance?.update(prevDecisionData, currentDecisionData);
  }

  addFlippedElement(options: FlippedProps & { element: HTMLElement }) {
    this.flipInstance?.addFlipped(options as any);
  }

  addInvertedElement(
    options: InverseFlippedProps & {
      element: HTMLElement;
      parent: HTMLElement;
    }
  ) {
    this.flipInstance?.addInverted(options);
  }
}
