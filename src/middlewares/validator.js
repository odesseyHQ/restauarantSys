function validatePostBody(schema) {
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

function validatePatchBody(schema) {
  return async (req, res, next) => {
    schemaFields = Object.values(schema)[13];
    check = schemaFields.some((item) => Object.keys(req.body).includes(item));
    if (check) {
      try {
        console.log(check);
        await schema.validate(req.body);
        next();
      } catch (err) {
        return res
          .status(403)
          .json({ type: "Parameter missing", error: err.errors[0] });
      }
    } else {
      return res.status(403).json({
        type: "Parameter missing",
        message: "Atleast one parameter should be non empty",
      });
    }
  };
}

module.exports = { validatePostBody, validatePatchBody };
