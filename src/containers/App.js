import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from 'src/components/App';

const mapStateToProps = state => ({
  user: state.auth.user,
  url: state.auth.url,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({

});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(AppContainer);
