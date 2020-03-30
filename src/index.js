import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App';
import Loading from 'components/Loading/Loading'
import './index.scss';
import * as serviceWorker from './serviceWorker';

const Home = lazy(() => import('components/Home/Home'))
const Pokemons = lazy(() => import('containers/Pokemons/Pokemons'))
const Pokemon = lazy(() => import('containers/Pokemon/Pokemon'))
const Types = lazy(() => import('containers/Types/Types'))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Suspense fallback={ <Loading /> }>
          <Switch>
            <Route path="/" component={ Home } exact />
            <Route path="/pokemons" component={ Pokemons } />
            <Route path="/pokemon/:name" component={ Pokemon } />
            <Route path="/types" component={ Types } />
          </Switch>
        </Suspense>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
