/*
* REQUIRE NODE & MODULE
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const l10n = require('./locales/l10n');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// const MySQLStore = require('express-mysql-session')(session);
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

/*
* EXPRESS CONFIG DEFAULTS
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Allow Connection from origin and set options for methods and credentials
app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
  }
));

/*
* MIDDLEWARE
*/

// pour le stockage de la session de manière persistante en bdd
// const options = {
//   host: 'localhost',
//   user: 'reactor',
//   password: 'reactor',
//   database: 'reactor'
// };

// const sessionStore = new MySQLStore(options);

// Session User from Express Session (useless if use JWT) - TEST SESSION
// app.use(session({
//   secret: 'clésecretedechiffragedelamort',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false }
//   // store: sessionStore
// }));

// passport initialisation - session definition is replaced by JWT here
app.use(passport.initialize());

/*
* ROUTE
*/

// Input verification methods issued from express-validator
const { check, validationResult } = require('express-validator/check');

// Signup Form insert into Database
app.post('/signup',

  // Data validation from form input
  [check('user').isLength({ min: 4 }).withMessage(l10n.errors.user),
    check('email').isEmail().withMessage(l10n.errors.emailSignup),
    check('password').isLength({ min: 5 }).withMessage(l10n.errors.password),
    // Checking of the equality between password and confirmPassword (only works if req is past as parameter due to interaction express validator and bodyparser)
    check('password', 'invalid password').custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error(l10n.errors.confirmPassword);
      } else {
        return value;
      }
    })
  ],

  // Data insertion in DB with error handling
  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log(errors.array(), 'Sign up validation check');
      return response.status(401).send({ success: false, errors: errors.array(), message: l10n.errors.accountSignupFailed }).end();
    }
    const Signup = require('./models/signup');
    const { user, email, password } = request.body;
    Signup.create(user, email, password, (result) => {
      if (result.lenght !== 0) {
        console.log(result, 'id du dernier enregistrement de la bdd');
        const payload = {
          id: result.id,
          user: result.user
        };
        jwt.sign(payload, 'JWTzob', {
          expiresIn: 3600
        },
        (error, token) => {
          if (error) {
            console.error(error, 'there is a problem with JWT ZOB');
          } else {
            response.status(201).send(
              {
                success: true,
                token: token,
                message: l10n.success.messageSignup
              }
            ).end();
          }
        });
      } else {
        response.status(401).send({ success: false, message: l10n.errors.accountSignupFailed }).end();
      }
    });
  });

// Login Form select into Database
app.post('/login',

  // Data validation from form input
  [check('user').isLength({ min: 4 }).withMessage(l10n.errors.user),
    check('password').isLength({ min: 5 }).withMessage(l10n.errors.password)],

  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log(errors.array(), 'Log in validation check');
      return response.status(401).send({ success: false, errors: errors.array(), message: l10n.errors.accountLoginFailed }).end();
    }
    const Login = require('./models/login');
    const { user, password } = request.body;
    // Result (array of object) sent by the model and select the first entry of the array
    Login.find(user, password, (result) => {
      console.error(result, 'objet avant la réponse');
      if (user === result.user) {
        const payload = {
          id: result.id,
          user: result.user
        };
        jwt.sign(payload, 'JWTzob', {
          expiresIn: 3600
        },
        (error, token) => {
          if (error) {
            console.error(error, 'there is a problem with JWT ZOB');
          } else {
            response.status(201).send(
              {
                success: true,
                token: token,
                message: l10n.success.messageLogin
              }
            ).end();
          }
        });
        // Usefull for TEST SESSION
        /* request.session.user = result.user;
           const { user } = request.session;
           response.status(201).send({ success: true, user, message: 'Login Success' }).end(); */
      } else {
        response.status(401).send({ success: false, message: l10n.errors.accountLoginFailed }).end();
      }
    });
  });

// Forgotpassword Form send a email
app.post('/forgotpassword',
  // Data validation from form input
  [check('email').isEmail().withMessage(l10n.errors.emailNotFound)],
  // TODO a valid response with a link to reset the password and request to BDD to find the user
  (request, response) => {
    response.status(200).send({ success: true, message: l10n.success.messageForgotpassword });
  });

app.get('/quizz/level1/:id', (request, response) => {
  const Quizz = require('./models/quizz');
  // TODO where we get the id ?
  console.log(request.params, 'Id passé en params');
  // exemple de route avec params /quizz/:id'
  // const { id } = request.query;
  // exemple de route avec query /quizz/?id=1
  // console.log(request.query, 'Id passé en query (get)');
  const { id } = request.params;
  Quizz.findAllQuestionsLevel1ByQuizId(id, (result) => {
    if (result !== false) {
      response.status(200).send({ success: true, result });
    } else {
      // TODO message en l10n
      response.status(500).send({ success: false, message: 'La requête pour le quizz n\'a pas abouti' }).end();
    }
  });
});

app.get('/quizz/level2/:id', (request, response) => {
  const Quizz = require('./models/quizz');
  const { id } = request.params;
  Quizz.findAllQuestionsLevel2ByQuizId(id, (result) => {
    if (result !== false) {
      response.status(200).send({ success: true, result });
    } else {
      // TODO message en l10n
      response.status(500).send({ success: false, message: 'La requête pour le quizz n\'a pas abouti' }).end();
    }
  });
});

app.get('/quizz/level3/:id', (request, response) => {
  const Quizz = require('./models/quizz');
  const { id } = request.params;
  Quizz.findAllQuestionsLevel3ByQuizId(id, (result) => {
    if (result !== false) {
      response.status(200).send({ success: true, result });
    } else {
      // TODO message en l10n
      response.status(500).send({ success: false, message: 'La requête pour le quizz n\'a pas abouti' }).end();
    }
  });
});

/*
* SERVER NODE LISTEN ON PORT 3001 (localhost:3001)
*/

app.listen(3001, () => {
  console.log('Server listen on the port 3001');
});
