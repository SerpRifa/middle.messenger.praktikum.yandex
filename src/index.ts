import 'normalize.css';
import { renderIntro,  renderLogin, renderRegister, renderProfile, renderMain } from './pages'
import { registerPartials } from './utils/register-partials'

registerPartials()

const pathname = window.location.pathname
const rootSelector = '#root'

switch (pathname) {
  case '/':
     renderIntro(rootSelector)
    break;
  case '/login':
     renderLogin(rootSelector)
    break;
   case '/register':
     renderRegister(rootSelector)
    break;
  case '/main':
    renderMain(rootSelector)
    break;
  case '/profile':
    renderProfile(rootSelector)
    break;
  // case '/404':
  //   content = render404()
  //   break;
  // case '/500':
  //   content = render500()
  //   break;
  default: renderLogin('#root')
}
