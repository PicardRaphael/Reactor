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
import './roomboss.sass';

/**
 * Code
 */
export default class RoomBoss extends Component {
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
     const { layers } = this.props.roomBoss;
    
    return (
      <div>
        <div className='doors' style={{backgroundImage: `url(src/images/roomAssets/boss/open/${layers}.png)`}}>
        </div>
        <div className='walls' style={{backgroundImage: 'url(src/images/roomAssets/boss/walls.png)'}}> 
        </div>
        <div className='ground' style={{backgroundImage: 'url(src/images/roomAssets/dark-floor.png)'}}>
        </div>
      </div>
    );
  };
};
