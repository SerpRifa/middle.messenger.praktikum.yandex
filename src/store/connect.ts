import {BaseBlock} from "../utils/base-block";
import {store, StoreEvents} from "./shitstore";
import {isEqual} from "../utils/is-equal";

export function connect(Component: typeof BaseBlock, mapStateToProps: (state: Record<string, any>) => Record<string, any>) {

  return class extends Component {
    constructor(props: any) {
      let state = mapStateToProps(store.getState());

      // @ts-ignore
      super({...props, ...state});

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        if (!isEqual(state, newState)) {
          console.log('newState', newState);
          this.setProps({...mapStateToProps(store.getState())});
          state = newState;
        }

      });


    }
  }
}
