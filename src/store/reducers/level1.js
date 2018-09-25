import { SET_ANSWERS_QUIZZ } from 'src/store/actions/modalActions';

const initialState = {
  id: '',
  title: '',
  question: '',
  answer1: '',
  answer2: ''
};

const level1Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWERS_QUIZZ:
      return {
        ...state,
        id: action.id,
        title: action.title,
        question: action.question,
        answer1: action.answer1,
        answer2: action.answer2
      };

    default:
      return state;
  }
};

export default level1Reducer;
