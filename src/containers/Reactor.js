import { connect } from 'react-redux';

import Reactor from 'src/components/Reactor';

// REACTOR actions
import {
  CHECK_KEYS,
  RETURN_IDLE,
  SET_POSITION,
  STOP
} from 'src/store/actions/reactorActions';

// ROOM actions
import {
  CHANGE_ROOM
} from 'src/store/actions/roomActions';

// MODAL actions
import {
  INIT_QUIZZ
} from 'src/store/actions/modalActions';

// MAP actions
import {
  SET_STAGE
} from 'src/store/actions/mapActions';

const mapStateToProps = state => ({

  // REACTOR props
  reactor: state.reactor,

  // BOSS props
  boss: state.boss,

  // MAP
  mapRooms: state.mapRooms,
  globalmapProps: state.mapRooms.globalmapProps,

  // ROOMS props
  currentRoom: state.mapRooms.currentRoom,
  roomLocked: state.mapRooms.roomLocked,

  // TODO test de modal a modifier
  quizzState: state.reactor.quizzState
});

const mapDispatchToProps = dispatch => ({
  // Callback when keyboard touch
  checkKeys: (keys) => {
    dispatch({
      type: CHECK_KEYS,
      keys
    });
  },

  // Callback when Main character entered in the door
  changeRoom: (enteredDoor) => {
    dispatch({
      type: CHANGE_ROOM,
      enteredDoor
    });
  },

  // Callback when Main character moove
  setPosition: (x, y) => {
    dispatch({
      type: SET_POSITION,
      x,
      y
    });
  },

  setStage: (stageX, stageY) => {
    dispatch({
      type: SET_STAGE,
      stageX,
      stageY
    });
  },

  // Callback when stop keyboard touch
  stopBody: () => {
    dispatch({
      type: STOP
    });
  },

  // Callback when Main character stop mooving
  returnIdle: () => {
    dispatch({
      type: RETURN_IDLE
    });
  },

  // TODO test de modal à modifier
  initQuizz: () => {
    dispatch({
      type: INIT_QUIZZ
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reactor);
