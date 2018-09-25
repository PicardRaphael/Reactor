// TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
// casser le reducer en 3 reducers a passer en combine : MAP / ROOM / PLAYER
// il faudra rennom TOUTES les refferences aux reduces et les props qu'ils contiennent en rajoutant un .lereducer.laprop au lieu de .laprop

// MAP actions
import {
  CREATE_MAP,
  PLACE_ROOM_START,
  GENERATE_MAX_ROOMS
} from 'src/store/actions/mapActions';

// ROOM actions
import { 
  CHANGE_ROOM,
  GENERATE_LAYERS_ROOM_START,
  GENERATE_LAYERS_ROOM_BOSS,
  GENERATE_LAYERS_ROOM_CHEST,
  GENERATE_LAYERS_ROOM_HOSTILE1,
  GENERATE_LAYERS_ROOM_HOSTILE2
} from 'src/store/actions/roomActions';

// MAP actions
import {
  SET_STAGE
} from 'src/store/actions/mapActions';

const initialState = {
  // ----------------------- MAP STATE -----------------------
  globalmapProps: {
    globalmap: [],
    MAP_HEIGHT: 11,
    MAP_WIDTH: 11,
    MAX_ROOMS: 5,
    room: {
      roomX: [5],
      roomY: [5],
      /*layerB: [
        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 7,
        3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8
      ],*/
      roomStart: {
        id: 1,
        layers: 0
      },
      roomBoss: {
        id: 5,
        layers: 0
      },
      roomChest: {
        id: 3,
        layers: 0
      },
      roomHostile1: {
        id: 2,
        layers: 0
      },
      roomHostile2: {
        id: 4,
        layers: 0
      }
    },
    // stageX: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // stageY: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    count: 0
  },

  //  ----------------------- ROOM STATE -----------------------
  currentRoom: {
    id: 1,
    roomX: 5,
    roomY: 5,
    layers: 0
  },
  enteredDoor: null,
  roomLocked: false
};

/**
 * An action arrives. It must be *transformed* in a state mutation, that is,
 * the reducer *must* return an edited copy of the current state.
 */
const mapRooms = (state = initialState, action = {}) => {
  switch (action.type) {
    // ----------------------- MAP ACTIONS -----------------------
    /**
     * Change state globalmapProps when component globalmap  this building
    */
    case CREATE_MAP:
    case PLACE_ROOM_START:
    case GENERATE_MAX_ROOMS:
    {
      const globalmapProps = {
        ...state.globalmapProps,
        globalmap: action.globalmap,
        room: {
          roomX: [...state.globalmapProps.room.roomX, action.roomX],
          roomY: [...state.globalmapProps.room.roomY, action.roomY]
        },
        count: action.count
      };
      return { ...state, globalmapProps };
    }

    case SET_STAGE:
    {
      const globalmapProps = {
        ...state.globalmapProps,
        stageX: action.stageX,
        stageY: action.stageY
      };
      return {...state, globalmapProps};
    }
    // ----------------------- ROOM ACTIONS -----------------------
    /**
     * Change state currentRoom when Main character change room
    */
    case CHANGE_ROOM: {
      return {
        ...state,
        currentRoom: action.currentRoom
      };
    }
    /**
     * Change state roomStart when component globalmap this building
     * is called once
    */
    case GENERATE_LAYERS_ROOM_START:
    {
      const globalmapProps = {
        ...state.globalmapProps,
        room: {
          ...state.globalmapProps.room,
          roomStart: {
            layers: action.newcallLayer
          }
        }
      };
      return { ...state, globalmapProps };
    }
    /**
     * Change state roomBoss when component globalmap this building
     * is called once
    */
    case GENERATE_LAYERS_ROOM_BOSS:
    {
      const globalmapProps = {
        ...state.globalmapProps,
        room: {
          ...state.globalmapProps.room,
          roomBoss: {
            layers: action.newcallLayer
            // layers: action.layersB
          }
        }
      };
      return { ...state, globalmapProps };
    }
    /**
     * Change state roomChest when component globalmap this building
     * is called once
    */
    case GENERATE_LAYERS_ROOM_CHEST:
    {
      const globalmapProps = {
        ...state.globalmapProps,
        room: {
          ...state.globalmapProps.room,
          roomChest: {
            layers: action.newcallLayer
            // layers: action.layersC
          }
        }
      };
      return { ...state, globalmapProps };
    }
    /**
     * Change state roomHostile1 when component globalmap this building
     * is called once
    */
    case GENERATE_LAYERS_ROOM_HOSTILE1: {
      const globalmapProps = {
        ...state.globalmapProps,
        room: {
          ...state.globalmapProps.room,
          roomHostile1: {
            layers: action.newcallLayer
            // layers: action.layersH
          }
        }
      };
      return { ...state,
        globalmapProps
      };
    }
    /**
     * Change state roomHostile2 when component globalmap this building
     * is called once
    */
    case GENERATE_LAYERS_ROOM_HOSTILE2: {
      const globalmapProps = {
        ...state.globalmapProps,
        room: {
          ...state.globalmapProps.room,
          roomHostile2: {
            layers: action.newcallLayer
            // layers: action.layersH
          }
        }
      };
      return { ...state,
        globalmapProps
      };
    }

    default:
      return state;
  }
};

export default mapRooms;
