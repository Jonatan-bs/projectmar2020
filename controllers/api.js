const mongoose = require("mongoose");

module.exports = {
  create(req, res, next) {
    const collection = req.params.collection;

    model = mongoose.models[collection];

    if (model) {
      const newDocument = new model({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
      });

      newDocument
        .save()
        .then(() => {
          res.status("201").json({
            message: "Document created",
            createdDocument: newDocument
          });
        })
        .catch(err => res.status("500").json(err));
    } else {
      res.status(500).json({ Error: "Collection doesn't exist" });
    }
  },
  delete(req, res, next) {
    const collection = req.params.collection;
    const id = req.params.id;

    model = mongoose.models[collection];

    if (model) {
      model
        .deleteOne({ _id: id })
        .then(result => res.send(result))
        .catch(err => res.send({ error: err }));
    } else {
      res.status(500).json({ Error: "Collection doesn't exist" });
    }
  },
  update(req, res, next) {
    const collection = req.params.collection;
    const id = req.params.id;

    model = mongoose.models[collection];

    if (model) {
      model
        .updateOne({ _id: id }, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({ error: err }));
    } else {
      res.status(500).json({ Error: "Collection doesn't exist" });
    }
  },
  retrieve(req, res, next) {
    const collection = req.params.collection;
    const query = req.body;
    model = mongoose.models[collection];

    if (model) {
      model
        .find(query)
        .then(result => res.send(result))
        .catch(err => res.send({ error: err }));
    } else {
      res.status(500).json({ Error: "Collection doesn't exist" });
    }
  }
};
