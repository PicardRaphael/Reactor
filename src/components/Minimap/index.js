/**
 * Import
 */
import React, { Component } from 'react';

/**
 * Local import
 */
// Styles et assets
import './minimap.sass';

// TODO verifier la mise a jour de la minimap lors du changement de salle
// => verifier que les bonnes props mises a jour lui sonbt passees lors du re-render
export default class Minimap extends Component {
  render() {
    const globalmap = this.props.globalmap;
    const { currentRoomId } = this.props;
    return (
      <div className ="minimap">
        {
          globalmap.map(
            (row) => {
              return row.map((cell, index) => {
                if (cell === 0) {
                  return <div key={index} className="void"></div>;
                }
                else {
                  if (cell.mapRoom) {
                    if (cell.mapRoom.id === currentRoomId) {
                      return <div key={index} className="current"></div>;
                    } else {
                      return <div key={index} className="full"></div>;
                    }
                  } else {
                    return <div key={index} className="full"></div>;
                  }
                }
              });
            })
        }
      </div>
    );
  };
};
