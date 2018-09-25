// Actions for change Main character state
import {
  MOVE,
  STOP,
  RETURN_IDLE,
  ATTACK,
  SET_POSITION
} from 'src/store/actions/reactorActions';

import {
  CHANGE_ROOM,
  GENERATE_ROOM
} from 'src/store/actions/roomActions';
// MODAL actions
import {
  INIT_QUIZZ,
  RESOLVE_QUIZZ
} from 'src/store/actions/modalActions';
/* ----------------------- MAIN CHARACTER STATE ----------------------- */
const initialState = {
  // TODO test de modal à modifier
  quizzState: false,
  open: true,
  characterState: 0,
  loop: false,
  spritePlaying: true,
  isAttacking: false,
  isAnimated: false,
  isLeaving: false,
  repeat: false,
  projectileDirection: 'lol',
  characterPosition: {
    x: 544,
    y: 414
  },
  characterSpeed: {
    speedX: 0,
    speedY: 0
  },
  stats: {
    pv: 2000,
    damage: 20,
    armor: 0
  }

};

/**
 * An action arrives. It must be *transformed* in a state mutation, that is,
 * the reducer *must* return an edited copy of the current state.
 */
const reactor = (state = initialState, action = {}) => {
  switch (action.type) {
    // TODO CHANGE MODAL
    case INIT_QUIZZ:
    {
      const quizzState = true;
      return { ...state, quizzState };
    }
    case RESOLVE_QUIZZ:
    {
      return {
        ...state,
        quizzState: false,
        open: false
      };
    }
    // ----------------------- PLAYER ACTIONS -----------------------
    case GENERATE_ROOM: {
      return {
        ...state,
        isLeaving: action.isLeaving
      };
    }
    /**
     * Change state when main character entered a door
    */
    case CHANGE_ROOM:
    {
      return {
        ...state,
        isLeaving: true
      };
    }
    /**
     * Change state when main character move
    */
    case MOVE:
    {
      return {
        ...state,
        characterState: action.characterState,
        isAnimated: true,
        repeat: action.repeat,
        characterSpeed:
        {
          speedX: action.speedX,
          speedY: action.speedY
        }
      };
    }
    /**
     * Change state when main character stop move
    */
    case STOP:
    {
      return {
        ...state,
        characterSpeed:
        {
          speedX: 0,
          speedY: 0
        }
      };
    }
    /**
     * Change state position of the main character
    */
    case SET_POSITION:
    {
      return {
        ...state,
        characterPosition:
        {
          x: action.x,
          y: action.y
        }
      };
    }
    /**
     * Change state when main character attack
    */
    case ATTACK:
    {
      return {
        ...state,
        characterState: action.characterState,
        isAnimated: true,
        isAttacking: true,
        repeat: action.repeat
      };
    }
    /**
     * Change state for main character no move
    */
    case RETURN_IDLE:
    {
      return {
        ...state,
        characterState: 0,
        isAnimated: false,
        isAttacking: false,
        repeat: false
      };
    }
    default:
      return state;
  }
};

export default reactor;
