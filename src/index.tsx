import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Container} from 'reactstrap';
import {RouterProvider} from 'react-router5';
import routes from './routes';
import browserPlugin from 'router5-plugin-browser';
import loggerPlugin from 'router5-plugin-logger';
import createRouter from 'router5';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown,
  faCaretUp,
  faEdit,
  faExternalLinkAlt,
  faHome,
  faPlusCircle,
  faSignOutAlt,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import './config/i18n';

import './index.scss';

const router = createRouter(routes, {
  defaultRoute: 'root'
});
router.usePlugin(loggerPlugin);
router.usePlugin(
  browserPlugin({
    useHash: true
  })
);

library.add(faHome, faPlusCircle, faSpinner, faSignOutAlt, faExternalLinkAlt, faEdit, faCaretUp, faCaretDown);

router.start(() => {
  ReactDOM.render((
    // <React.StrictMode>  -- Can't use this yet :(
      <Container>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Container>
    // </React.StrictMode>
    ), document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
