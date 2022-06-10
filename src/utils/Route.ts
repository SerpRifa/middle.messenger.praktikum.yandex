import {BaseBlock} from "./base-block";
import { render } from "./render";
import {BaseComponetProps} from "../types/types";

export interface IRouterProps {
  rootQuery: string;
}

class Route {
  public pathname: string;

  private _blockClass: typeof BaseBlock;

  private _block: BaseBlock;

  private _props: IRouterProps;

  private _componentProps: BaseComponetProps;


  constructor(pathname: string, view: typeof BaseBlock, props: IRouterProps, componentProps: BaseComponetProps) {
    this.pathname = pathname;
    this._blockClass = view;
    this._props = props;
    this._componentProps = componentProps;
  }

  navigate(pathname: string): void {
    if (pathname === this.pathname) {
      this.pathname = pathname;
      this.render();
    }
  }



  leave(): void {
    this._block.hide();
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass({...this._componentProps});
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }

  match(pathname: string) {
    return pathname == this.pathname;
  }
}

export default Route
