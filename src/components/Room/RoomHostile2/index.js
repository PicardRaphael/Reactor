/**
 * Import
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
// Composants
import { TileMap } from 'react-game-kit/lib';

// Styles et assets
import './roomhostile2.sass';

/**
 * Code
 */
export default class RoomHostile2 extends Component {
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
     const { layers } = this.props.roomHostile2;

    return (
      <div>
        <div className='doors' style={{backgroundImage: `url(src/images/roomAssets/base/open/${layers}.png)`}}>
        </div>
        <div className='walls' style={{backgroundImage: 'url(src/images/roomAssets/base/walls.png)'}}> 
        </div>
        <div className='ground' style={{backgroundImage: 'url(src/images/roomAssets/dark-floor.png)'}}>
        </div>
      </div>
    );
  };
};
