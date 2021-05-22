const yup = require("yup");

const menuPostSchema = yup.object().shape({
  cuisineId: yup.string().required(),
  name: yup.string().required(),
  dishIds: yup.array().required(),
});

const menuPatchSchema = yup.object().shape({
  cuisineId: yup.string().optional(),
  name: yup.string().optional(),
  dishIds: yup.array().optional(),
});
module.exports = [menuPostSchema, menuPatchSchema];
