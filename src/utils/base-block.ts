import { v4 as uuidv4 } from 'uuid';
import { EventBus } from './event-bus';
import { BaseComponetProps } from '../types/types';

export class BaseBlock<TProps = BaseComponetProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_CAR: 'flow: component-after-render',
  };

  _element: HTMLElement | null = null;

  _meta = null;

  _events = {};

  props: TProps;

  eventBus = null;

  id: string = '';

  constructor(props: TProps, tagName = 'div') {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.id = uuidv4();
    this.eventBus = () => eventBus;

    this._element = this._createDocumentElement(tagName);

    this._registerEvents(eventBus);
    eventBus.emit(BaseBlock.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(BaseBlock.EVENTS.INIT, this.init.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CAR, this._componentAfterRender.bind(this));
  }

  private _componentAfterRender() {
    this.componentAfterRender();
  }

  componentAfterRender() {}

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {

  }

  dispatchComponentDidMount() {
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    return response;
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps): void {
  }

  private _addEvents() {
    const { events = {} } = this.props;
    this._events = events;
    const element = this._element;
    Object.entries(events).forEach(([name, callback]) => {
      if(name == 'click') {
        window.selectedEement = element;
      }
      element?.addEventListener(name, callback);
    });
  }

  private _removeEvents() {
    if (this._events) {
      Object.keys(this._events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, this._events[eventName]);
      });

      this._events = {};
    }
  }

  compile(template: any, props: TProps) {
    const { components = {}, ...restProps } = (props as BaseComponetProps);
    const propsWithCompile = { ...restProps };
    Object.entries(components).forEach(([componentName, component]) => {
      if (Array.isArray(component)) {
        propsWithCompile[componentName] = [];
        component.forEach((item) => {
          propsWithCompile[componentName].push(item?.element?.outerHTML);
        });
      } else {
        component.element?.setAttribute('data-id', component.id);
        propsWithCompile[componentName] = component?.element?.outerHTML;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = template({ ...this.props, ...propsWithCompile });

    Object.entries(components).forEach(([componentName, component]) => {
      if (Array.isArray(component)) {
        component.forEach((item) => {
          propsWithCompile[componentName].push(item?.element?.outerHTML);
        });
      } else {
        const target = fragment.content.querySelector(`[data-id="${component.id}"]`);
        target?.replaceWith(component.getContent());
        component.dispatchComponentDidMount();
      }
    });

    return fragment.content;
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }
    this.props = Object.assign(this.props, nextProps);
    this._makePropsProxy(this.props);
    this._render()
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    const newElement = block.firstChild as HTMLElement;

    this._removeEvents();
    if (this._element) {
      this._element.innerHTML = '';
      this._element.replaceWith(newElement);
      this._element = newElement;

      this._addEvents();
    }
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CAR);
  }

  render() {}

  getContent():  HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: any) {
    props = new Proxy(props, {
      set: (target, propName: string, value) => {
        if (target[propName] !== value) {
          target[propName] = value
          this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU);
        }
        return true
      }
    });
    return props;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.visibility = 'visible';
  }

  hide() {
    this.getContent().style.display = 'hidden';
  }
}
