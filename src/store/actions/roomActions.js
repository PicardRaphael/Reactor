// ----------------------- ROOM ACTIONS -----------------------
export const GENERATE_LAYERS_ROOM_START = 'actions/GENERATE_LAYERS_ROOM_START';
export const GENERATE_LAYERS_ROOM_BOSS = 'actions/GENERATE_LAYERS_ROOM_BOSS';
export const GENERATE_LAYERS_ROOM_CHEST = 'actions/GENERATE_LAYERS_ROOM_CHEST';
export const GENERATE_LAYERS_ROOM_HOSTILE1 = 'actions/GENERATE_LAYERS_ROOM_HOSTILE1';
export const GENERATE_LAYERS_ROOM_HOSTILE2 = 'actions/GENERATE_LAYERS_ROOM_HOSTILE2';
export const GENERATE_LAYERS_ROOM = 'actions/GENERATE_LAYERS_ROOM';
export const CHANGE_ROOM = 'actions/CHANGE_ROOM';
export const GENERATE_ROOM = 'actions/GENERATE_ROOM';

export const generateLocalRoom = () => ({
  type: GENERATE_ROOM
});

export const generateLayersRoomStart = (layersP) => ({
  type: GENERATE_LAYERS_ROOM_START,
  room: {
    roomStart: {
      layersP
    }
  }
});

export const generateLayersRoomBoss = (layersB) => ({
  type: GENERATE_LAYERS_ROOM_BOSS,
  room: {
    roomBoss: {
      layersB
    }
  }
});

export const generateLayersRoomChest = (layersC) => ({
  type: GENERATE_LAYERS_ROOM_CHEST,
  room: {
    roomChest: {
      layersC
    }
  }
});

export const generateLayersRoomHostile1 = (layersH) => ({
  type: GENERATE_LAYERS_ROOM_HOSTILE1,
  room: {
    roomHostile1: {
      layersH
    }
  }
});

export const generateLayersRoomHostile2 = (layersH) => ({
  type: GENERATE_LAYERS_ROOM_HOSTILE2,
  room: {
    roomHostile2: {
      layersH
    }
  }
});

export const changeRoom = (enteredDoor) => ({
  type: CHANGE_ROOM,
  enteredDoor
});
