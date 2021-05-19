const yup = require("yup");

const menuPostSchema = yup.object().shape({
  cuisineId: yup.string().required(),
  name: yup.string().required(),
  dishIds: yup.array().required(),
});

module.exports = menuPostSchema;
