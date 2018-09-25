import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import User from 'src/components/Home/User';

const mapStateToProps = state => ({
  user: state.auth.user,
  url: state.auth.url,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({

});

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default withRouter(UserContainer);
