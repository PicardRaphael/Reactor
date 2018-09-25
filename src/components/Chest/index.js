/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * Local import
 */
import Matter from 'matter-js';
// Components
import './chest.sass';

/**
 * Code
 */

export default class Chest extends React.Component {
  static contextTypes = {
    scale: PropTypes.number,
    engine: PropTypes.object
  }


  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const { world } = this.context.engine;
    const chest = Matter.Bodies.rectangle(544, 414, 64, 64, {
      isStatic: true,
      label: 'chest'
    });
    console.log(this.context.engine, 'CHEST ENGINE');
    Matter.World.addBody(world, chest);
  }

  componentWillUnmount() {
    const { world } = this.context.engine;
    // TODO Détruire l'objet matter
    Matter.World.remove(world, world.bodies[9])  
  }

  render() {
    return (
      <React.Fragment>
        <img className='chest_closed' src="src/images/chest_closed.png"/>
      </React.Fragment>
    );
  };
};