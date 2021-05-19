const yup = require("yup");

const dishPostSchema = yup.object().shape({
  cuisineId: yup.string().required(),
  name: yup.string().required(),
  category: yup.string().required(),
  nonVeg: yup.boolean().required(),
  mainIngredient: yup.string().required(),
  preprationTime: yup.number().required(),
  variants: yup.array().required(),
});

module.exports = dishPostSchema;
