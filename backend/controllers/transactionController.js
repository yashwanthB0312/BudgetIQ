const Transaction = require('../models/transaction');

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
};

exports.addTransaction = async (req, res) => {
  const { title, amount, type, category } = req.body;
  const newTxn = new Transaction({ title, amount, type, category });
  await newTxn.save();
  res.status(201).json(newTxn);
};

exports.deleteTransaction = async (req, res) => {
  const txn = await Transaction.findByIdAndDelete(req.params.id);
  if (!txn) return res.status(404).json({ msg: 'Not found' });
  res.json({ msg: 'Deleted' });
};
