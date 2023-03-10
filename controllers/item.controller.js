const itemModel = require('../models/item.model');

const createItem = async (req, res) => {
  let { itemCode, itemImg, itemName, description, qtyOnHand, unitPrice } =
    req.body;

  const lastItem = await itemModel.findOne().sort({ _id: -1 });

  if (lastItem) {
    const splitCharactors = lastItem.itemCode.split('itm');
    itemCode = 'itm' + (parseInt(splitCharactors[1]) + 1);
  } else {
    itemCode = 'itm1';
  }

  const item = new itemModel({
    itemCode,
    itemImg,
    itemName,
    description,
    qtyOnHand,
    unitPrice,
  });
  try {
    const result = await item.save();
    if (result) {
      return res.status(200).send({
        message: 'Item created successfully',
        data: result,
        status: 200,
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItems = async (req, res) => {
  try {
    const result = await itemModel.find();
    if (result) {
      return res.status(200).send(result);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await itemModel.findById(id);
    if (result) {
      return res.status(200).send(result);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getItemByItemCode = async (req, res) => {
  const id = req.params.itemCode;
  try {
    const result = await itemModel.findOne({ itemCode: id });
    if (result) {
      return res.status(200).send(result);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  const { itemCode, itemImg, itemName, description, qtyOnHand, unitPrice } =
    req.body;
  try {
    const result = await itemModel.findOneAndUpdate(id, {
      itemCode,
      itemImg,
      itemName,
      description,
      qtyOnHand,
      unitPrice,
    });
    if (result) {
      return res.status(200).send({
        message: 'Item updated successfully',
        data: result,
        status: 200,
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await itemModel.findByIdAndDelete(id);
    if (result) {
      return res.status(200).send({
        message: 'Item deleted successfully',
        data: result,
        status: 200,
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteItemCode = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await itemModel.findOneAndDelete(id, { itemCode: id });
    if (result) {
      return res.status(200).send({
        message: 'Item deleted successfully',
        data: result,
        status: 200,
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemByItemCode,
  deleteItemCode,
};
