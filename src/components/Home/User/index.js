import React from 'react';
import { NavLink } from 'react-router-dom';
import { logoutUser } from 'src/auth/setUser';

class User extends React.Component {

  onLogout(evt) {
    evt.preventDefault();
    logoutUser();
  }

  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { id, user } = this.props.user;
    return (
      <React.Fragment>
        <p>Logout ?
          <button onClick={this.onLogout}>Logout</button>
        </p>
        <div>
          Hello {user} vous êtes enregistré avec l'id : {id}
        </div>
        <NavLink to="/game"><button>New Game</button></NavLink>
      </React.Fragment>
    );
  };
}

export default User;
