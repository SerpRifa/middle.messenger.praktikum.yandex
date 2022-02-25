import 'normalize.css';
import { renderRegister, renderLogin, renderMain, renderProfile, render404, renderIntro, render500 } from './pages'
import { registerPartials } from './utils/register-partials'

registerPartials()

const root = document.querySelector('#root')
const pathname = window.location.pathname
let content = ''

switch (pathname) {
  case '/':
    content = renderIntro()
    break;
  case '/login':
    content = renderLogin()
    break;
  case '/register':
    content = renderRegister()
    break;
  case '/main':
    content = renderMain()
    break;
  case '/profile':
    content = renderProfile()
    break;
  case '/404':
    content = render404()
    break;
  case '/500':
    content = render500()
    break;
  default: content = render404()
}
root.innerHTML = content
