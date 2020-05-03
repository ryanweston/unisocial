import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/template/Nav';
import Landpage from './components/template/Landpage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/template/Alert';
//Redux imports
import { Provider } from 'react-redux';
import store from './store';


import './App.css';




const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Nav />
        <section className="container">
          <Alert />
          {console.log(store)}
          <Switch>
            <Route exact path="/" component={Landpage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);


export default App;
