import {BaseBlock} from '../utils/base-block'

export interface BaseComponetProps {
  className?: string
  name?: string
  components?: { [key: string]: BaseBlock }
}
