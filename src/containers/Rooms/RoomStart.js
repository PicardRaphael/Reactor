import { connect } from 'react-redux';

import RoomStart from 'src/components/Room/RoomStart';
import { GENERATE_ROOM } from 'src/store/actions/roomActions';

const mapStateToProps = state => ({
  // MAP props
  globalmapProps: state.mapRooms.globalmapProps,

  // ROOMS props
  roomStart: state.mapRooms.globalmapProps.room.roomStart,
  roomBoss: state.mapRooms.globalmapProps.room.roomBoss,
  roomChest: state.mapRooms.globalmapProps.room.roomChest,
  currentRoom: state.mapRooms.currentRoom,

  // REACTOR props
  reactor: state.mapRooms.reactor
});

const mapDispatchToProps = dispatch => ({
  // Callback when Main character enter collision with doors for change currentRoom
  generateLocalRoom: (currentRoom) => {
    dispatch({
      type: GENERATE_ROOM,
      currentRoom
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomStart);
