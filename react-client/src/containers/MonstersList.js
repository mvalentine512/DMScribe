import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeMonster, generateTurnOrder } from '../actions/index';


class MonstersList extends Component {
 
  render () {
    //if the redux store monster array is zero this will return null and nothing will appear on the page.
    if (this.props.monsters.length === 0) {
      return null;
    }

    //this returns the list containing all the Monster
    //cards on the field
  	return(
      <div>
        <Card.Group>
          {/*This function maps over the monsters array
          in the redux store and formats their information
          into the display cards*/}
      		{this.props.monsters.map((monster, index) => {
                  return (
                      <Card key={index} className='cards'>
                        <div className='monsterImgContainer'>
                          <Image className='monsterImg' src={monster.image}/>
                        </div>
                        <Card.Content>
                          <Card.Header>
                            {monster.name} 
                          </Card.Header>
                          <Card.Meta>
                            <span className='date'>
                            </span>
                          </Card.Meta>
                          <Card.Description>
                              <p className='stats'>
                                <span className='stat'>AC: {monster.armor_class}</span>
                                <span className='stat'>HP: {monster.hit_points}</span>
                                <span className='stat'>INIT: {monster.init}</span>
                              </p>
                              <p className='stats'>
                                <span className='stat'>STR: {monster.strength}</span>
                                <span className='stat'>DEX: {monster.dexterity}</span>
                                <span className='stat'>CON: {monster.constitution}</span>
                              </p>
                              <p className='stats'>
                                <span className='stat'>WIS: {monster.wisdom}</span>
                                <span className='stat'>CHA: {monster.charisma}</span>
                              </p>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <a>
                            <Icon name='address card outline' />
                            More Monster Info
                          </a>
                          {/*This icon is the red X in the corner and triggers the redux Action that
                          remove the monster from the redux monsters array. It also triggers the redux
                          Action that regenerates the turn order based on the new redux monster array*/}
                          <Icon
                          onClick={() => {
                            this.props.removeMonster(monster.id);
                            this.props.generateTurnOrder();
                          }} 
                          className='deleteMonsterIcon' 
                          color='red' 
                          name='remove'/>
                        </Card.Content>
                      </Card>
                    )
                })}
        </Card.Group>
      </div>
  	);
  }
}

//This maps the specified redux Store object property onto the props object for use in this container
function mapStateToProps (state) {
  return {
    monsters: state.monsters
  }
}

//This maps the specified redux Action onto the props objects for use in this container
function mapDispatchToProps (dispatch) {
  return bindActionCreators({ removeMonster, generateTurnOrder }, dispatch);
}

//This exports and converts this component as a container that is connected to both react and redux
export default connect(mapStateToProps, mapDispatchToProps)(MonstersList);




