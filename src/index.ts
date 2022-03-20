import 'normalize.css';
import {
  renderIntro, renderLogin, renderRegister, renderProfile, renderMain, render404, render500,
} from './pages';

const { pathname } = window.location;
const rootSelector = '#root';

switch (pathname) {
  case '/':
    renderIntro(rootSelector);
    break;
  case '/login':
    renderLogin(rootSelector);
    break;
  case '/register':
    renderRegister(rootSelector);
    break;
  case '/main':
    renderMain(rootSelector);
    break;
  case '/profile':
    renderProfile(rootSelector);
    break;
  case '/404':
    render404(rootSelector);
    break;
  case '/500':
    render500(rootSelector);
    break;
  default: renderLogin('#root');
}
