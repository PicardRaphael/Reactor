import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Minimap from 'src/components/Minimap';

const mapStateToProps = state => ({

  // MAP props
  globalmap: state.mapRooms.globalmapProps.globalmap,

  // ROOMS props
  currentRoomId: state.mapRooms.currentRoom.id
});

const mapDispatchToProps = dispatch => ({

});

const MinimapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Minimap);

export default withRouter(MinimapContainer);
