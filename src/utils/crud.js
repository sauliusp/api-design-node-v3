export const getOne = model => async (req, res) => {
  const result = await model.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  }).exec();

  if (!result) {
    return res.status(404).end();
  }

  res.status(200).json({data: result});
}

export const getMany = model => async (req, res) => {
  const result = await model.find({
    createdBy: req.user._id
  }).exec()

  res.status(200).json({data: result});
}

export const createOne = model => async (req, res) => {
  const result = await model.create({
    createdBy: req.user._id,
    ...req.body
  });

  res.status(201).json({data: result});
}

export const updateOne = model => async (req, res) => {
  const result = await model.findOneAndUpdate({
    _id: req.params.id,
    createdBy: req.user._id
  }, req.body, {
    new: true
  }).exec();

  if (!result) {
    return res.status(400).end();
  }

  res.status(200).json({data: result});
}

export const removeOne = model => async (req, res) => {
  const result = await model.findOneAndRemove({
    _id: req.params.id,
    createdBy: req.user._id
  }).exec();

  if (!result) {
    return res.status(400).end();
  }

  res.status(200).json({data: result});
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
