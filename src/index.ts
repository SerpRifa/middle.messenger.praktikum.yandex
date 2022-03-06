import 'normalize.css';
import { renderIntro,  renderLogin } from './pages'
import { registerPartials } from './utils/register-partials'

registerPartials()

const pathname = window.location.pathname

switch (pathname) {
  case '/':
     renderIntro()
    break;
  case '/login':
     renderLogin('#root')
    break;
  // case '/register':
  //   content = renderRegister()
  //   break;
  // case '/main':
  //   content = renderMain()
  //   break;
  // case '/profile':
  //   content = renderProfile()
  //   break;
  // case '/404':
  //   content = render404()
  //   break;
  // case '/500':
  //   content = render500()
  //   break;
  default: renderLogin('#root')
}
