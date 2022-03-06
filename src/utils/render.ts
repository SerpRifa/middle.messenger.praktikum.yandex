import { BaseBlock } from './base-block'

export const render = (rootSelector: string, component: BaseBlock): Element | null => {
  const root = document.querySelector(rootSelector)

  console.log('root', root)
  if (root != null) {
    root.appendChild(component.getContent() as Node)
    component.dispatchComponentDidMount()
  }

  return root
}
