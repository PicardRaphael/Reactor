import React from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';

import TextField from 'material-ui/TextField';
import validate from 'src/components/Home/Forgotpassword/validate';

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
  const { email } = values;
  axios.post(`${URL}/forgotpassword`,
    { email },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      // TODO if response success, server must confirmed the user email (request SQL) and send link to this mail
      console.log(response, 'email sent');
    })
    .catch(function({ response }) {
      console.log(response.data, 'Error Axios');
    });
};

class Forgotpassword extends React.Component {

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/user');
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <Field
            name="email"
            type='email'
            component={renderTextField}
            label="Email"
          />
        </div>
        <div>
          <button disabled={submitting}>
          Send me a link :) !
          </button>
        </div>
      </form>
    );
  }
};

export default reduxForm({
  form: 'submitForgotpassword', // a unique identifier for this form
  validate
})(Forgotpassword);
