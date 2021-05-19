function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (err) {
      return res
        .status(403)
        .json({ type: "Parameter missing", error: err.errors[0] });
    }
  };
}

module.exports = validateBody;
