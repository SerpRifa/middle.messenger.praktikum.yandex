import {EventBus} from "./event-bus"
import {BaseComponetProps} from "../types/types"
import { v4 as uuidv4 } from 'uuid'

export class BaseBlock<TProps = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_CAR: 'flow: component-after-render',
  };

  _element:  HTMLElement | null = null;
  _meta = null;
  props: TProps;
  eventBus = null;
  id: string = '';

  constructor(props: TProps, tagName = "div") {
    const eventBus = new EventBus()
    this._meta  = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props)
    this.id = uuidv4()
    this.eventBus = () => eventBus

    this._element = this._createDocumentElement(tagName)

    this._registerEvents(eventBus);
    eventBus.emit(BaseBlock.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(BaseBlock.EVENTS.INIT, this.init.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    console.log('init')
    this._createResources();
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDM);
  }

  componentDidMount(oldProps = {}) {

  }

  dispatchComponentDidMount() {
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  compile(template: any, props: TProps) {
    console.log('compile')
    const { components = {}, ...restProps }  = (props as BaseComponetProps)
    let propsWithCompile: any = {...restProps}
    Object.entries(components).forEach(([componentName, component]) => {
      component.element?.setAttribute('data-id', component.id)
      propsWithCompile[componentName] = component?.element?.outerHTML;
    })
    console.log('propsWithCompile', propsWithCompile)
    return template({...propsWithCompile, ...this.props})

  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
    this.props = Object.assign(this.props, nextProps);
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  _render() {
    console.log('_render')
    const block = this.render();

    this._element.innerHTML = block;
  }

  render() {}

  getContent(): any {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;
    props = new Proxy(props,{})
    return props;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
