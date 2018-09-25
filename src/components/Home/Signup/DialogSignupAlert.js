import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { signupError } from 'src/auth/setUser';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
class DialogSignupAlert extends React.Component {

  handleClose = () => {
    signupError();
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
        >
          <p>{this.props.message}</p>
        </Dialog>
      </div>
    );
  }
}

export default DialogSignupAlert;
