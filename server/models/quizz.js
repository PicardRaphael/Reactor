const connection = require('../config/db');

class Quizz {
  static findAllQuestionsLevel1ByQuizId(id, done) {
    connection.query(`SELECT * FROM questions_level_1 
                      INNER JOIN quizzes 
                      ON questions_level_1.id = quizzes.id 
                      WHERE quizzes_id = ? 
                      LIMIT 1`, [id], (error, result) => {
      if (error) {
        return done(error);
      }
      if (result.length === 0) {
        return done(false);
      }
      if (result.length !== 0) {
        return done(result);
      }
    }
    );
  };

  static findAllQuestionsLevel2ByQuizId(id, done) {
    connection.query(`SELECT * FROM questions_level_2
                      INNER JOIN quizzes 
                      ON questions_level_2.id = quizzes.id 
                      WHERE quizzes_id = ?
                      LIMIT 1`, [id], (error, result) => {
      if (error) {
        return done(error);
      }
      if (result.length === 0) {
        return done(false);
      }
      if (result.length !== 0) {
        return done(result);
      }
    }
    );
  };

  static findAllQuestionsLevel3ByQuizId(id, done) {
    connection.query(`SELECT * FROM questions_level_3
                      INNER JOIN quizzes 
                      ON questions_level_3.id = quizzes.id 
                      WHERE quizzes_id = ?
                      LIMIT 1`, [id], (error, result) => {
      if (error) {
        return done(error);
      }
      if (result.length === 0) {
        return done(false);
      }
      if (result.length !== 0) {
        return done(result);
      }
    }
    );
  };
};

module.exports = Quizz;
