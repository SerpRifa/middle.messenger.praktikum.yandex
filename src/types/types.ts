import {BaseBlock} from '../utils/base-block'

export interface IChildComponents {
  [key: string]: BaseBlock | BaseBlock[]
}

export interface BaseComponetProps {
  className?: string
  name?: string
  components?: IChildComponents
}
