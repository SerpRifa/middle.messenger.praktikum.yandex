import { BaseBlock } from '../utils/base-block';

export interface IChildComponents {
  [key: string]: BaseBlock | BaseBlock[]
}

export interface EventProps {
  [key: string]: (a: Event) => void;
}

export interface BaseComponetProps {
  className?: string
  name?: string
  components?: IChildComponents
  events?: EventProps
}
