/**
 * Middleware qui permet un affichage de la Date à la seconde avec un format 2018/08/30 10:01:28
 */

const logger = store => next => (action) => {

  const timer = new Date();
  let dateString =
    timer.getUTCFullYear() + '/' +
    ('0' + (timer.getUTCMonth() + 1)).slice(-2) + '/' +
    ('0' + timer.getUTCDate()).slice(-2) + ' ' +
    ('0' + timer.getUTCHours()).slice(-2) + ':' +
    ('0' + timer.getUTCMinutes()).slice(-2) + ':' +
    ('0' + timer.getUTCSeconds()).slice(-2);

  action.dateString = dateString;

  next(action);
};

export default logger;
