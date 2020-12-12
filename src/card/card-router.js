const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')
const { cards, lists } = require('../store')

const cardRouter = express.Router()
const bodyParser = express.json()


// const cards = [{
//     id: 1,
//     title: 'Task One',
//     content: 'This is card one'
//   }];


cardRouter
  .route('/card')
  .get((req, res) => {
    const { id } = req.params;
    const card = cards.find(c => c.id == id);
  
    // make sure we found a card
    if (!card) {
      console.error(`Card with id ${id} not found.`);
      return res
        .status(404)
        .send('Card Not Found');
    }
  
    res.json(card);

  })
  .post(bodyParser, (req, res) => {
    // move implementation logic into here
  })

cardRouter
  .route('/card/:id')
  .get((req, res) => {
    // move implementation logic into here
    const { id } = req.params;
  const card = cards.find(c => c.id == id);

  // make sure we found a card
  if (!card) {
    console.error(`Card with id ${id} not found.`);
    return res
      .status(404)
      .send('Card Not Found');
  }

  res.json(card);
  })
  .delete((req, res) => {
    // move implementation logic into here
    const { id } = req.params;

  const cardIndex = cards.findIndex(c => c.id == id);

  if (cardIndex === -1) {
    console.error(`Card with id ${id} not found.`);
    return res
      .status(404)
      .send('Not found');
  }

  //remove card from lists
  //assume cardIds are not duplicated in the cardIds array
  lists.forEach(list => {
    const cardIds = list.cardIds.filter(cid => cid !== id);
    list.cardIds = cardIds;
  });

  cards.splice(cardIndex, 1);

  console.info(`Card with id ${id} deleted.`);

  res
    .status(204)
    .end();
  })

module.exports = cardRouter