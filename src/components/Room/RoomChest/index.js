/**
 * Import
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
// Composants
import Chest from 'src/components/Chest';
// Styles et assets
import './roomchest.sass';

/**
 * Code
 */
export default class RoomChest extends Component {
  static contextTypes = {
    scale: PropTypes.number,
    engine: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      stageX: 0,
      layers: this.props.currentRoom.layers
    };
  }
  render() {
     const { layers } = this.props.roomChest;

    return (
      <div>
        <div className='doors' style={{backgroundImage: `url(src/images/roomAssets/chest/open/${layers}.png)`}}>
        </div>
        <div className='walls' style={{backgroundImage: 'url(src/images/roomAssets/chest/walls.png)'}}> 
        </div>
        <div className='ground' style={{backgroundImage: 'url(src/images/roomAssets/medium-floor.png)'}}>
        <Chest />
        </div>
      </div>
    );
  };
};
