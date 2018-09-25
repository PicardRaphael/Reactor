import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { loginError } from 'src/auth/setUser';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
class DialogLoginAlert extends React.Component {

  handleClose = () => {
    loginError();
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
      <React.Fragment>
        <Dialog
          contentClassName="modal__wrapper"
          paperClassName="modal"
          bodyClassName="modal__content"
          actionsContainerClassName="modal__footer"
          actions={actions}
          modal={false}
          open={this.props.open}
        >
          <p>{this.props.message}</p>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default DialogLoginAlert;
