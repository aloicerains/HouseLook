// User controller for CRUD operations
const User = require('../models/users.js');
// post or creating operations
exports.create = (req, res) => {
  // Error handling
  if (!req.body.name) {
    res.status(400).send({});
    return;
  }
  // create a new user
  const user = new User(req.body);
  // save the user in database
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(201).send(data);
  });
};
// Get all users
exports.getAll = (req, res) => {
  User.findAll((err, data) => {
    if (err) {
      res.status(500).send({});
    }
    res.status(200).send(data);
  });
};
// Get user by id
exports.getById = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Update user given id
exports.update = (req, res) => {
  // Error handling
  if (!req.body.name || isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  User.update(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// delete user given id
exports.delete = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  User.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send('Deleted');
  });
};
