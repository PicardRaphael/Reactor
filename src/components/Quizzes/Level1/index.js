import axios from 'axios';
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { resolveQuizz } from 'src/store/middlewares/level1M';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const submit = (values) => {
  const URL = 'http://localhost:3001';
  const { answerlevel1 } = values;
  console.log(answerlevel1);
  axios.post(`${URL}/quizz/level1/1`,
    { answerlevel1 },
    { withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      // TODO check answer with server return succes true or false
      console.log(response.data);
      return resolveQuizz();
    })
    .catch(function({ response }) {
      // TODO catch error
      return resolveQuizz();
    });
};

class Level1 extends React.Component {

  componentDidMount() {
    const URL = 'http://localhost:3001';
    // Axios call to the server to get quizz
    // TODO set a dynamique id to get quizzes and level
    // here, get quizz Level 1 at the id 1
    axios.get(`${URL}/quizz/level1/1`,
      { withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response =>
      {
        // console.log(response.data.result[0]);
        const { id, title, question, answer1, answer2 } = response.data.result[0];
        this.props.answerQuizz(id, title, question, answer1, answer2);
      })
      .catch(response =>
      {
      // TODO catch error
        console.log(response.data.message);
      });
  };

  render() {
    const { handleSubmit, pristine, submitting, open } = this.props;
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        type="submit"
        disabled={pristine || submitting}
        onClick={handleSubmit(submit)}
      />
    ];

    return (
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <Dialog
            actions={actions}
            modal={false}
            open={open}
          >

            <div>
              <p>{this.props.level1.title}</p>
              <p>{this.props.level1.question}</p>
              <Field name="answerlevel1" component={renderRadioGroup}>
                <RadioButton value={this.props.level1.answer1} label={this.props.level1.answer1} />
                <RadioButton value={this.props.level1.answer2} label={this.props.level1.answer2} />
              </Field>
            </div>
          </Dialog>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'submitLevel1' // a unique identifier for this form
})(Level1);
