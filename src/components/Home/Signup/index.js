import React from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';
import { loginUser, signupError } from 'src/auth/setUser';
import l10n from 'src/data/l10n';
import DialogSignupAlert from 'src/components/Home/Login/DialogLoginAlert';

import TextField from 'material-ui/TextField';
import validate from 'src/components/Home/Signup/validate';

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom }
) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const submit = (values) => {
  const URL = 'http://localhost:3001';
  const { user, email, password, confirmPassword } = values;
  axios.post(`${URL}/signup`,
    { user, email, password, confirmPassword },
    { withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.data.success === true) {
        loginUser(response);
      }
    })
    .catch(function({ response }) {
      // if response failed (checking error or other error), call the login error and display a modal alert with a message of the error
      const { message } = response.data;
      if (response.data.errors) {
        const { msg } = response.data.errors[0];
        return signupError(msg);
      } else {
        return signupError(message);
      }
    });
};

class Signup extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/user');
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/user');
    }
  }

  render() {
    const { handleSubmit, submitting, message, open } = this.props;
    return (
      <React.Fragment>
        <div className="layout-primary__content">
          <div className="layout-primary__content-border">
            <NavLink
              className="layout-primary__logo-link"
              exact
              to="/"
              title={l10n.global.logoTitle}
            >
              <img
                className="layout-primary__logo-img"
                src="src/images/logo-v1.0-fullsize.png"
                alt={l10n.global.logoTitle}
              />
            </NavLink>
            <div className="layout-primary__wording">
              <p className="sign__redirection sign-up__redirection">
                <NavLink className="sign__link sign-up__link" to="/">
                  {l10n.global.backToHomepage}
                </NavLink>
              </p>
              <h1 className="layout-primary__h2">
                {l10n.signup.createAccount}
              </h1>

              <form className="sign__form sign-up__form" autoComplete="off" onSubmit={handleSubmit(submit)}>
                <div className="sign__field sign__field--material-ui">
                  <Field
                    name="user"
                    component={renderTextField}
                    label="User Name"
                  />
                </div>
                <div className="sign__field sign__field--material-ui">
                  <Field
                    name="email"
                    type="email"
                    autoComplete="off"
                    component={renderTextField}
                    label="Email"
                  />
                </div>
                <div className="sign__field sign__field--material-ui">
                  <Field
                    name="password"
                    type="password"
                    autoComplete="off"
                    component={renderTextField}
                    label="Password"
                  />
                </div>
                <div className="sign__field sign__field--material-ui">
                  <Field
                    name="confirmPassword"
                    type="password"
                    autoComplete="off"
                    component={renderTextField}
                    label="Confirm Password"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <form className="layout-primary__buttons sign__buttons" onSubmit={handleSubmit(submit)}>
          <button className="sign__button" type="submit" disabled={submitting}>{l10n.signup.signUp} (<span className="sign__smiley">:)</span>)</button>
        </form>
        {handleSubmit(submit) && message && <DialogSignupAlert message={message} open={open} />}
      </React.Fragment>
    );
  };
}

export default reduxForm({
  form: 'submitSignup', // a unique identifier for this form
  validate
})(Signup);
