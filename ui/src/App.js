import './App.css'

import React, { Component } from 'react'
import Board from 'react-trello'

const data = require('./data.json')

const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}


class App extends Component {
  state = { boardData: { lanes: [], title: '' } }

  setEventBus = (eventBus) => {
    this.setState({ eventBus })
  }

  componentDidMount() {
    this.getBoard();
  }


  async postData(url = '', data = {}, method = 'POST') {
    // Default options are marked with *
    const response = await fetch('http://localhost:1234/' + url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  };

  async getBoard() {
    let response = await fetch('http://localhost:1234/lane');
    let board = await response.json(0);
    console.dir(board);
    this.setState({ boardData: board })
  }

  completeCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    })
    this.state.eventBus.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    })
  }

  addCard = (card, laneId) => {

  }

  shouldReceiveNewData = (nextData) => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleCardAdd = (card, laneId) => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: laneId,
      card: card,
    })

    card.laneId = laneId;
    this.postData('card/create', card);
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
  }

  handleCardClick = (cardId) => {
    console.dir(cardId);
  }

  handleListAdd = (title) => {
    this.postData('lane/create', title);
    
  }

  handleCardDelete = (cardId) => {
    console.dir(cardId);
  }

  handleLaneDelete = (cardId) => {
    this.postData('lane/'+ cardId +'/delete', {}, 'DELETE');
  }

  handleLaneUpdate = (cardId) => {
    console.dir(cardId);
  }


  render() {
    console.log(this.state.boardData.title);
    return (
      <div className="App">
        <div className="App-header">
          <h3>{this.state.boardData.title}</h3>
        </div>
        <div className="App-intro">
          <button onClick={this.completeCard} style={{ margin: 5 }}>
            Logout
          </button>
          <Board
            editable
            canAddLanes
            editLaneTitle
            onLaneAdd={this.handleListAdd}
            onLaneDelete={this.handleLaneDelete}
            onLaneUpdate={this.handleLaneUpdate}
            onCardDelete={this.handleCardDelete}
            onCardAdd={this.handleCardAdd}
            onCardClick={this.handleCardClick}
            data={this.state.boardData}
            draggable
            onDataChange={this.shouldReceiveNewData}
            eventBusHandle={this.setEventBus}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
        </div>
        <div className="EditPopup"></div>
      </div>
    )
  }
}

export default App
