import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App';
import Loading from 'containers/UI/Loading/Loading'
import './index.scss';
import * as serviceWorker from './serviceWorker';

const Home = lazy(() => import('components/Home/Home'))
const Pokemons = lazy(() => import('containers/Pokemons/Pokemons'))
const Pokemon = lazy(() => import('containers/Pokemon/Pokemon'))
const Types = lazy(() => import('containers/Types/Types'))
const Type = lazy(() => import('containers/Type/Type'))
const Color = lazy(() => import('containers/Color/Color'))
const Habitat = lazy(() => import('containers/Habitat/Habitat'))
const Generation = lazy(() => import('containers/Generation/Generation'))
const Shape = lazy(() => import('containers/Shape/Shape'))
const Contact = lazy(() => import('containers/Contact/Contact'))
const SavedPokemons = lazy(() => import('containers/SavedPokemons/SavedPokemons'))
const Page404 = lazy(() => import('components/Page404/Page404'))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Suspense fallback={ <Loading /> }>
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/pokemons" exact component={ Pokemons } />
            <Route path="/pokemon/:name" exact component={ Pokemon } />
            <Route path="/types" exact component={ Types } />
            <Route path="/type/:name" exact component={ Type } />
            <Route path="/color/:name" exact component={ Color } />
            <Route path="/habitat/:name" exact component={ Habitat } />
            <Route path="/generation/:name" exact component={ Generation } />
            <Route path="/shape/:name" exact component={ Shape } />
            <Route path="/contact" exact component={ Contact } />
            <Route path="/saved-pokemons" exact component={ SavedPokemons } />
            <Route path="*" component={ Page404 } />
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
