/**
 * Import
 */
import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Local import
 */
// Composants
import Homepage from 'src/containers/Home/Homepage';
import Login from 'src/containers/Home/Login';
import Signup from 'src/containers/Home/Signup';
import Forgotpassword from 'src/containers/Home/Forgotpassword';
import User from 'src/containers/Home/User';
import Game from 'src/containers/Game';

// Styles et assets
import 'src/styles/index.sass';

/**
 * Code
 */
class App extends React.Component {
  render() {
    return (
      <main className="app">
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <div className="layout-primary__wrapper">
            <section className="layout-primary">
              <Route exact path="/" component={Homepage} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgotpassword" component={Forgotpassword} />
              <Route path="/user" component={User} />
            </section>
          </div>
        </Switch>
      </main>
    );
  }
};

/**
 * Export
 */
export default App
