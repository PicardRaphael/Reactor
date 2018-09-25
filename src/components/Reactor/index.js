import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import { Body, Sprite } from 'react-game-kit/lib';

export default class Reactor extends Component {
  static propTypes = {
    keys: PropTypes.object,
    onEnterRoom: PropTypes.func
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
    loop: PropTypes.object
  };

  constructor(props) {
    super(props);

    console.log(this.props.currentRoom, 'CONSTRUCTOR REACTOR');
    this.update = this.update.bind(this);
    this.handlePlayStateChanged = this.handlePlayStateChanged.bind(this);
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  move(body, x, y) {
    Matter.Body.setVelocity(body, { x, y });
  };

  // TODO verifier le statut d'animation du personnage
  // => verifier les props passees a reactor || verifier le handlePlayStateChange avec les nouvelles fonctionnalites
  animationState() {
    // TODO bouger cette merde la ou elle doit etre
    // => surement derriere une conditionnelle pour eviter le la boucler et de bouffer des ressources

    const { keys } = this.props;
    // if i'm not intending to move, i stop moving
    if (!keys.isDown(keys.RIGHT) &&
      !keys.isDown(keys.LEFT) &&
      !keys.isDown(keys.UP) &&
      !keys.isDown(keys.DOWN)) {
      this.props.stopBody();
    }
    if (this.props.reactor.isAnimated && this.props.reactor.spritePlaying === false) {
      // if i'm not doing anything, i return to idle state
      if (!keys.isDown(keys.RIGHT) &&
        !keys.isDown(keys.LEFT) &&
        !keys.isDown(keys.UP) &&
        !keys.isDown(keys.DOWN) &&
        !keys.isDown(keys.ATTACK_RIGHT) &&
        !keys.isDown(keys.ATTACK_LEFT) &&
        !keys.isDown(keys.ATTACK_UP) &&
        !keys.isDown(keys.ATTACK_DOWN)) {
        this.props.returnIdle();
      }
      if (keys.isDown(keys.ATTACK_RIGHT) ||
      keys.isDown(keys.ATTACK_LEFT) ||
      keys.isDown(keys.ATTACK_UP) ||
      keys.isDown(keys.ATTACK_DOWN)) {
        this.props.returnIdle();
      }
    }
  }

  // TODO Rappeler une room déjà existanteO
  // => se baser sur les objets stockes dans la globalmap aux coord des salles maybe ?
  // => BUG : le chamgement de salle nous fait avancer de deux salles quand ligne droite
  checkRoomChange() {
    let enteredDoor = null;

    const { body } = this.body;
    const { globalmap } = this.props.globalmapProps;
    const { roomX, roomY } = this.props.currentRoom;

    // If collide filter is set to -1, Reactor connot collide anymore with walls and doors
    if (body.collisionFilter.group !== -1) {
      if (this.context.engine.pairs.list.length > 0) {
        if (this.context.engine.pairs.list[0].collision.bodyB.label === 'doorNorth') {
          if (globalmap[roomX][roomY].mapRoom) {
            if (globalmap[roomX][roomY].mapRoom.doorNorth.isActive === true) {
              // we set the door entered to determine next roomn in reducer
              enteredDoor = 1;

              // we stop the character
              this.props.stopBody();
              Matter.Body.setPosition(body, {x: 544, y: 700});

              // we stop the possibility of colliding with doors
              body.collisionFilter.group = -1;
              this.context.engine.world.bodies[5].collisionFilter.group = -1;

              // we set the state as leaving and we trigger the room change
              this.props.reactor.isLeaving = true;
              return this.props.changeRoom(enteredDoor);
            }
          }
        } else if (this.context.engine.pairs.list[0].collision.bodyB.label === 'doorSouth') {
          if (globalmap[roomX][roomY].mapRoom) {
            if (globalmap[roomX][roomY].mapRoom.doorSouth.isActive === true) {
              // we set the door entered to determine next roomn in reducer
              enteredDoor = 3;

              // we stop the character
              this.props.stopBody();
              Matter.Body.setPosition(body, {x: 544, y: 145});

              // we stop the possibility of colliding with doors
              body.collisionFilter.group = -1;
              this.context.engine.world.bodies[5].collisionFilter.group = -1;

              // we set the state as leaving and we trigger the room change
              this.props.reactor.isLeaving = true;
              return this.props.changeRoom(enteredDoor);
            }
          }
        } else if (this.context.engine.pairs.list[0].collision.bodyB.label === 'doorWest') {
          if (globalmap[roomX][roomY].mapRoom) {
            if (globalmap[roomX][roomY].mapRoom.doorWest.isActive === true) {
              // we set the door entered to determine next roomn in reducer
              enteredDoor = 4;

              // we stop the character
              this.props.stopBody();
              Matter.Body.setPosition(body, {x: 975, y: 414});

              // we stop the possibility of colliding with doors
              body.collisionFilter.group = -1;
              this.context.engine.world.bodies[5].collisionFilter.group = -1;

              // we set the state as leaving and we trigger the room change
              this.props.reactor.isLeaving = true;
              return this.props.changeRoom(enteredDoor);
            }
          }
        } else if (this.context.engine.pairs.list[0].collision.bodyB.label === 'doorEast') {
          if (globalmap[roomX][roomY].mapRoom) {
            if (globalmap[roomX][roomY].mapRoom.doorEast.isActive === true) {
              // we set the door entered to determine next roomn in reducer
              enteredDoor = 2;

              // we stop the character
              this.props.stopBody();
              Matter.Body.setPosition(body, {x: 112, y: 414});

              // we stop the possibility of colliding with doors
              body.collisionFilter.group = -1;
              this.context.engine.world.bodies[5].collisionFilter.group = -1;

              // we set the state as leaving and we trigger the room change
              this.props.reactor.isLeaving = true;
              return this.props.changeRoom(enteredDoor);
            }
          }
        } else if (this.context.engine.pairs.list[0].collision.bodyB.label === 'chest') {
          // we stop the character
          this.props.stopBody();

          const { x, y } = this.context.engine.world.bodies[0].position;

          // TODO find a solution to stop the loop or filter trhe collision
          // push the caracter to uncollide with the chest 
          Matter.Body.applyForce(this.context.engine.pairs.list[0].collision.bodyA, {x: x, y: y}, {x: 0.03, y: 0.03});
          
          this.props.initQuizz();
        }
      }
    }
  }

  resetCollisions() {
    const { body } = this.body;
    body.collisionFilter.group = 0;
  };

  update() {
    const { body } = this.body;
    const { speedX, speedY } = this.props.reactor.characterSpeed;
    const { keys } = this.props;

    if (body.collisionFilter.group === -1) {
      setTimeout(() => {
        this.resetCollisions()
      ;}, 1000);
    }
    this.checkRoomChange();
    // checking the current pressed keys
    this.props.checkKeys(keys);

    // setting friction and applying velocity (moving the body)
    Matter.Body.set(body, 'friction', 1);
    this.move(body, speedX, speedY);

    // updating position after movement
    this.props.setPosition((body.position.x), (body.position.y));

    // checking for animation resolution & reseting velocity
    // TODO reparer c'te merde
    this.animationState();
  };

  handlePlayStateChanged(state) {
    this.props.reactor.spritePlaying = state;
  };

  getWrapperStyles() {
    const { characterPosition } = this.props.reactor;
    const { x, y } = characterPosition;
    const targetX = x;
    const targetY = y;

    return {
      width: 117,
      height: 117,
      position: 'absolute',
      transform: `translate(${targetX - 60}px, ${targetY - 64}px)`,
      transformOrigin: 'left top'
    };
  };

  render() {
    const x = this.props.reactor.characterPosition.x;
    const y = this.props.reactor.characterPosition.y;
    const { repeat, characterState } = this.props.reactor;
    return (
      <div style={this.getWrapperStyles()}>
        <Body
          args= {[x, y, 64, 100]}
          scale= {0.23}
          inertia= {Infinity}
          label= {'Reactor'}
          // TODO compatibility issue With non webkit browsers
          ref= {b => {
            this.body = b;
          }}
        >
          <Sprite
            repeat={repeat}
            onPlayStateChanged= {this.handlePlayStateChanged}
            src= "src/styles/images/reactor.png"
            scale= {0.23}
            state= {characterState}
            steps= {[0, 1, 2,
              2, 2, 2,
              2, 2, 2,
              2, 2, 2,
              2, 2, 2,
              2]}
            ticksPerFrame= {9}
            tileSize= {117}
            tileHeight= {512}
            tileWidth= {512}
          />
        </Body>
      </div>
    );
  }
}
