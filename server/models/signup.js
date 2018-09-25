const connection = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Signup {
  static create(user, email, password, done) {
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) {
        return done(error);
      }
      connection.query('INSERT INTO users SET user = ?, email = ?, password = ?', [user, email, hash], (error, result) => {
        if (error) {
          return done(error);
        }
        connection.query('SELECT LAST_INSERT_ID() as id', (error, result) => {
          if (error) {
            return done(error);
          }
          const { id } = result[0];
          done({ user, id });
        });
      });
    });
  }
};

module.exports = Signup;
