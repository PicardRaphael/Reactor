/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import KeyListener from 'src/utils/key-listener.js';
import Matter from 'matter-js';
/**
 * Local import
 */
// Composants
import { Stage, World } from 'react-game-kit';
import GlobalMap from 'src/containers/GlobalMap';
import Reactor from 'src/containers/Reactor';
import Minimap from 'src/containers/Minimap';
import Level1 from 'src/containers/Quizzes/Level1';

// Import d'une loop custom sortie de react-game-kit
import Loop from 'src/utils/loop';

// Styles et assets
import './game.sass';

export default class Game extends React.Component {
  static contextTypes = {
    scale: PropTypes.number,
    engine: PropTypes.object,
    loop: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.context = window.context;
    this.keyListener = new KeyListener();
    console.log(this.props.globalmapProps.globalmap, 'CONSTRUCTOR GAME');
  }

  componentDidMount() {
    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.UP,
      this.keyListener.DOWN,
      this.keyListener.SPACE,
      this.keyListener.ATTACK_UP,
      this.keyListener.ATTACK_DOWN,
      this.keyListener.ATTACK_LEFT,
      this.keyListener.ATTACK_RIGHT
    ]);
  }

  componentWillUnmount = () => {
    this.keyListener.unsubscribe();
  }

  physicsInit(engine) {
    // room walls definition
    const ground = Matter.Bodies.rectangle(544, 800, 1088, 64, {
      isStatic: true,
      label: 'ground'
    });
    const leftWall = Matter.Bodies.rectangle(34, 414, 64, 832, {
      id: 4,
      isStatic: true,
      label: 'leftWall'
    });
    const rightWall = Matter.Bodies.rectangle(1055, 414, 64, 832, {
      isStatic: true,
      label: 'rightWall'
    });
    const topWall = Matter.Bodies.rectangle(544, 34, 1088, 64, {
      isStatic: true,
      label: 'topWall'
    });

    // DOOR
    const doorNorth = Matter.Bodies.rectangle(544, 70, 64, 1, {
      //isStatic: true,
      isSensor: true,
      label: 'doorNorth'
    });

    const doorSouth = Matter.Bodies.rectangle(544, 764, 64, 1, {
      //isStatic: true,
      isSensor: true,
      label: 'doorSouth'
    });

    const doorWest = Matter.Bodies.rectangle(70, 416, 1, 100, {
      //isStatic: true,
      isSensor: true,
      label: 'doorWest'
    });

    const doorEast = Matter.Bodies.rectangle(1019, 416, 1, 100, {
      //isStatic: true,
      isSensor: true,
      label: 'doorEast'
    });

    // room walls creation
    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, topWall);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);

    Matter.World.addBody(engine.world, doorNorth);
    Matter.World.addBody(engine.world, doorSouth);
    Matter.World.addBody(engine.world, doorWest);
    Matter.World.addBody(engine.world, doorEast);

    const render = Matter.Render.create({
      element: document.getElementById('debug-render'),
      engine: engine,
      options: {
        width: 1088,
        height: 832,
        pixelRatio: 1,
        background: '#fafafa',
        wireframeBackground: 'none',
        hasBounds: false,
        enabled: true,
        wireframes: true,
        showSleeping: true,
        showDebug: true,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showPositions: true,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false
      }
    });
    // console.log(engine.world, 'ENGINE WORLD');

    Matter.Render.run(render);
  };

  getWrapperStyles() {
    return {
      width: '1088px',
      height: '832px',
      position: 'absolute',
      margin: 'auto',
      transform: 'translate(0px, 0px)',
      transformOrigin: 'top left'
    };
  }

  render() {
    return (
      <div>
      { this.props.quizzState === true && <Level1 /> }
        <Loop>
          <Stage style={this.getWrapperStyles()}>
            <World
              onInit={this.physicsInit}
              onCollision = {this.collisionInit}
              gravity = {{ x: 0, y: 0, scale: 0.001 }}
            >
              <GlobalMap/>
              <Minimap/>
              <div id= "debug-render"
                style= {
                  {
                    width: '1088px',
                    height: '832px',
                    position: 'fixed',
                    transform: 'translate(0px, 0px)',
                    transformOrigin: 'top left'
                  }
                }>
              </div>
              <Reactor
                keys={this.keyListener}
              />
            </World>
          </Stage>
        </Loop>
      </div>
    );
  }
};
