import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/template/Nav';
import Landpage from './components/template/Landpage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UniversityList from './components/auth/UniversityList';
import './App.css';




const App = () => (
  <Router>
    <Fragment>
      <Nav />

      <section className="container">
        <Switch>
          <Route exact path="/" component={Landpage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/test" component={UniversityList} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);


export default App;
