// Actions for change BOSS Character state
// import {

// } from '../actions';

/* ----------------------- BOSS character STATE ----------------------- */
const initialState = {

  stats: {
    pv: 2000,
    damage: 30,
    armor: 0
  }

};

/**
 * An action arrives. It must be *transformed* in a state mutation, that is,
 * the reducer *must* return an edited copy of the current state.
 */
const boss = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default boss;
