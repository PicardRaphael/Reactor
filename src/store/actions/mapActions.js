// ----------------------- MAP ACTIONS -----------------------
export const CREATE_MAP = 'actions/CREATE_MAP';
export const PLACE_ROOM_START = 'actions/PLACE_ROOM_START';
export const GENERATE_ROOMS = 'actions/GENERATE_ROOMS';
export const GENERATE_MAX_ROOMS = 'actions/GENERATE_MAX_ROOMS';
export const SET_STAGE = 'actions/SET_STAGE';

export const createMap = () => ({
  type: CREATE_MAP
});

export const setStage = (stageX, stageY) => ({
  type: SET_STAGE,
  stageX,
  stageY
});

export const placeOriginRoom = (globalmap) => ({
  type: PLACE_ROOM_START,
  globalmap
});

export const generateRooms = (globalmap, roomX, roomY) => ({
  type: GENERATE_ROOMS,
  globalmap,
  room: {
    roomX,
    roomY
  }
});

export const generateMaxRooms = (globalmap, roomX, roomY, maxRoom, count) => ({
  type: GENERATE_MAX_ROOMS,
  globalmap,
  room: {
    roomX,
    roomY
  },
  maxRoom,
  count
});
