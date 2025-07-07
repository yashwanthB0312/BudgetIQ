const express = require('express')
const Transaction = require('../models/transaction.js')
const authMiddleware  = require('../middleware/auth.js')

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const txns = await Transaction.find({ user: req.userId }).sort({ date: -1 });
  res.json(txns);
});

router.post('/', async (req, res) => {
  const txn = new Transaction({ ...req.body, user: req.userId });
  await txn.save();
  res.json(txn);
});

router.delete('/:id', async (req, res) => {
  await Transaction.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ msg: 'Deleted' });
});

module.exports = router;
