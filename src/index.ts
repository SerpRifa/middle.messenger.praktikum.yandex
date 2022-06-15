import 'normalize.css';
import {
  Intro,
  propsIntro,
  Login,
  loginProps,
  Profile,
  propsProfile,
  Register,
  registerProp,
  Page500,
  propsPage500,
  Page404,
  propsPage404,
  Main,
  mainProps
} from './pages';
import { Router } from './utils/router';

const router = new Router();

router.use('/login', Login, loginProps)
  .use('/', Intro, propsIntro)
  .use('/main', Main, mainProps)
  .use('/profile', Profile, propsProfile)
  .use('/register', Register, registerProp)
  .use('/500', Page500, propsPage500)
  .use('/404', Page404, propsPage404)
  .start()

