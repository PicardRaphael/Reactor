import store from 'src/store';

import {
  RESOLVE_QUIZZ
} from 'src/store/actions/modalActions';

export const resolveQuizz = () => {
  store.dispatch({type: RESOLVE_QUIZZ});
}
