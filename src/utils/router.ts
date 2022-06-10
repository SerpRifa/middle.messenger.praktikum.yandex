import Route from './Route';
import {BaseBlock} from "./base-block";
import {BaseComponetProps} from "../types/types";

export class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;
  private currentRoute: Route | undefined = undefined;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, block: typeof BaseBlock, props: BaseComponetProps) {
    const route = new Route(pathname, block, {rootQuery: '#root'}, props);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      route = this.getRoute('/404')
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route?.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}

export function withRouter(Component: typeof BaseBlock) {
  return class WithRouter extends Component {
    constructor(props: any) {
      const router = new Router()

      super({...props, router: router});
    }
  }
}
