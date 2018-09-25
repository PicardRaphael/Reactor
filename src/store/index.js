import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

/* REDUCERS */

// Main character reducer
import reactor from 'src/store/reducers/reactor';

// Boss reducer
import boss from 'src/store/reducers/boss';

// Map & Rooms reducer
import mapRooms from 'src/store/reducers/mapRooms';

// Login & Signup reducer
import authReducer from 'src/store/reducers/authReducer';

// Level1
import level1 from 'src/store/reducers/level1';

/* MIDDLEWARES */
import generateMap from './middlewares/generateMap';
import generateRoom from './middlewares/generateRoom';
import reactorM from './middlewares/reactorM';

const generateMapMW = applyMiddleware(generateMap);
const generateRoomMW = applyMiddleware(generateRoom);
const reactorMW = applyMiddleware(reactorM);

const devTools = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
];

const enhancers = compose(generateMapMW, generateRoomMW, reactorMW, ...devTools); // add middleware before ...devtools

const rootReducer = combineReducers({
  // Reducer for main character
  reactor: reactor,
  // Reducer for quizz level1
  level1: level1,
  // Reducer for boss
  boss: boss,
  // Reducer for map & rooms
  mapRooms: mapRooms,
  // Reducer for Sign up
  form: formReducer,
  // Reducer for Sign in
  auth: authReducer
});

const store = createStore(
  rootReducer,
  enhancers // mix of middlewares and extensions
);

export default store;
