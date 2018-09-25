import { connect } from 'react-redux';

import Level1 from 'src/components/Quizzes/Level1';

// MODAL actions
import { SET_ANSWERS_QUIZZ } from 'src/store/actions/modalActions';

const mapStateToProps = state => ({
  level1: state.level1,
  // REACTOR props
  open: state.reactor.open,
  quizzState: state.reactor.quizzState
});

const mapDispatchToProps = dispatch => ({
  answerQuizz: (id, title, question, answer1, answer2) => {
    dispatch({
      type: SET_ANSWERS_QUIZZ,
      id,
      title,
      question,
      answer1,
      answer2
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level1);
