import { connect } from 'react-redux';

import Game from 'src/components/Game';

const mapStateToProps = state => ({

  // MAP props
  globalmapProps: state.mapRooms.globalmapProps,

  // ROOMS props
  currentRoom: state.mapRooms.currentRoom,

  // REACTOR props
  reactor: state.reactor,
  quizzState: state.reactor.quizzState, // TODO donnée du state pour l'ouverture de la modal Reactor Alert

  // BOSS props
  boss: state.boss

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
