const express = require('express');
const router = express.Router();
const trie = require('../lib/trie');

router.get('/', (req, res, next) => {
  if (req.query.q) {
    res.send(  trie.search(req.query.q) );
  } else {
    res.send();
  }
});

module.exports = router;
