// ----------------------- PLAYER ACTIONS -----------------------
export const CHECK_KEYS = 'actions/CHECK_KEYS';
export const MOVE = 'actions/MOVE';
export const STOP = 'actions/STOP';
export const ATTACK = 'actions/ATTACK';
export const RETURN_IDLE = 'actions/RETURN_IDLE';
export const CHARACTER_POSITION = 'actions/CHARACTER_POSITION';
export const SET_POSITION = 'actions/SET_POSITION';

export const move = (speedX, speedY, characterState, repeat) => ({
  type: MOVE,
  speedX,
  speedY,
  characterState,
  repeat
});

export const stopBody = () => ({
  type: STOP
});

export const setPosition = (x, y) => ({
  type: SET_POSITION,
  x,
  y
});

export const attack = () => ({
  type: ATTACK
});

export const checkKeys = (keys) => ({
  type: CHECK_KEYS,
  keys
});

export const returnIdle = () => ({
  type: RETURN_IDLE
});
