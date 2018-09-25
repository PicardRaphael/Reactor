/**
 * Import
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
// Composants

// Styles et assets
import './roomstart.sass';

/**
 * Code
 */
export default class RoomStart extends Component {
   static contextTypes = {
     scale: PropTypes.number,
     engine: PropTypes.object
   };

   constructor(props) {
     super(props);
     this.state = {
       stageX: 0,
     };
   }

   render() {
     const { layers } = this.props.roomStart;
     return (
      <div>
        <div className='doors' style={{backgroundImage: `url(src/images/roomAssets/base/open/${layers}.png)`}}>
        </div>
        <div className='walls' style={{backgroundImage: 'url(src/images/roomAssets/base/walls.png)'}}> 
        </div>
        <div className='ground' style={{backgroundImage: 'url(src/images/roomAssets/medium-floor.png)'}}>
        </div>
      </div>
     );
   };
};


/*
style={{background: '../../../images/roomAssets/base/open/123.png'}}
style={{background: '../../../images/roomAssets/base/walls.png'}}
style={{background: '../../../images/roomAssets/medium-floor.png'}}
*/