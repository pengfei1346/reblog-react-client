// import loadable from '@loadable/component'
import home from '../components/home'
import about from '../components/about'
import archive from '../components/archive'
import articles from '../components/articles'
import collections from '../components/collections'
import leavingMessage from '../components/leavingMessage'

// const loadingComponent = ({ error, pastDelay }) => {
//   if (error) {
//     return <div>Error!</div>;
//   } else if (pastDelay) {
//     // return <div>Loading...</div>;
//     return <div />;
//   } else {
//     return null;
//   }
// };

const routes = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: home
  },
  {
    name: '/about',
    path: '/about',
    exact: true,
    component: about
  },
  {
    name: '/archive',
    path: '/archive',
    exact: true,
    component: archive
  },
  {
    name: '/articles',
    path: '/articles',
    exact: true,
    component: articles
  },
  {
    name: '/collections',
    path: '/collections',
    exact: true,
    component: collections
  },
  {
    name: '/leavingMessage',
    path: '/leavingMessage',
    exact: true,
    component: leavingMessage
    // component: loadable(() => import(`./src/components/archive`),300)
  },
]

export default routes;
