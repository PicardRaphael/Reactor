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
import './roomhostile1.sass';
/**
 * Code
 */

export default class RoomHostile1 extends Component {
  static contextTypes= {
    scale: PropTypes.number,
    engine: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      stageX: 0
    };
  }

  render() {
     const { layers } = this.props.roomHostile1;

      
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
}
