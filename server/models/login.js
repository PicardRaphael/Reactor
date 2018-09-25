const connection = require('../config/db');
const bcrypt = require('bcrypt');

class Login {
  static find(user, password, done) {
    connection.query('SELECT password, id FROM users WHERE user = ?', [user], (error, result) => {
      if (error) {
        return done(error);
      }
      if (result.length === 0) {
        return done(false);
      }
      const hash = result[0].password.toString();
      const id = result[0].id;
      bcrypt.compare(password, hash, (error, result) => {
        if (error) {
          return done(error);
        }
        if (result === true) {
          return done({ user, id });
        } else {
          return done(false);
        }
      });
      if (error) {
        return done(error);
      }
    });
  }
};

module.exports = Login;
