// ----------------------- MODAL ACTIONS -----------------------
export const INIT_QUIZZ = 'actions/INIT_QUIZZ';
export const initQuizz = () => ({
  type: INIT_QUIZZ
});
export const RESOLVE_QUIZZ = 'actions/RESOLVE_QUIZZ';
export const resolveQuizz = () => ({
  type: RESOLVE_QUIZZ
});
export const SET_ANSWERS_QUIZZ = 'actions/SET_ANSWERS_QUIZZ';
export const answerQuizz = (id, title, question, answer1, answer2) => ({
  type: SET_ANSWERS_QUIZZ,
  id,
  title,
  question,
  answer1,
  answer2
});
