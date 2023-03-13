const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, { skip, limit: 2 });
  res.json(result);
};

module.exports = getAll;
