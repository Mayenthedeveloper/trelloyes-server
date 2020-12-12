const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')
const { cards, lists } = require('../store')

const listRouter = express.Router()
const bodyParser = express.json()

listRouter
  .route('/list')
  .get((req, res) => {
    // move implementation logic into here
  })
  .post(bodyParser, (req, res) => {
    // move implementation logic into here
    const { header, cardIds = [] } = req.body;

    if (!header) {
      console.error(`Header is required`);
      return res
        .status(400)
        .send('Invalid data');
    }
  
    // check card IDs
    if (cardIds.length > 0) {
      let valid = true;
      cardIds.forEach(cid => {
        const card = cards.find(c => c.id == cid);
        if (!card) {
          logger.error(`Card with id ${cid} not found in cards array.`);
          valid = false;
        }
      });
  
      if (!valid) {
        return res
          .status(400)
          .send('Invalid data');
      }
    }
  
    // get an id
    const id = uuid();
  
    const list = {
      id,
      header,
      cardIds
    };
  
    lists.push(list);
  
    console.info(`List with id ${id} created`);
  
    res
      .status(201)
      .location(`http://localhost:8000/list/${id}`)
      .json({id});
  })

listRouter
  .route('/list/:id')
  .get((req, res) => {
    // move implementation logic into here
  })
  .delete((req, res) => {
    // move implementation logic into here
  })

module.exports = listRouter