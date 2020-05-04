import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/template/Nav';
import Landpage from './components/template/Landpage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/template/Alert';
//Redux imports
import { Provider } from 'react-redux';
import store from './store';
import { fetchUni } from './actions/university';
import './App.css';




const App = () => {
  //Runs university fetch on app initialisation
  //Prevents the request being made repeatedly due to other state changes within Landpage
  useEffect(() => { store.dispatch(fetchUni()); console.log('run') }, []);
  return (<Provider store={store}>
    <Router>
      <Fragment>
        <Nav />
        <section className="container">
          <Alert />

          <Switch>
            <Route exact path="/" component={Landpage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>);
};


export default App;
