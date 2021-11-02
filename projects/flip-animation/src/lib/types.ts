import {
  FlipperProps as FTFlipperProps,
  FlippedProps as FTFlippedProps,
} from 'flip-toolkit/lib/types';
export {
  FlipId,
  StaggerConfig,
  HandleEnterUpdateDelete,
  OnFlipperComplete,
} from 'flip-toolkit/lib/types';
export { SpringOption } from 'flip-toolkit/lib/springSettings/types';

export type FlipperProps = Omit<FTFlipperProps, 'children'>;
export type FlippedProps = Omit<FTFlippedProps, 'children'>;

export type InverseFlippedProps = {
  opacity: boolean;
  translate: boolean;
  scale: boolean;
  transformOrigin: string;
};
