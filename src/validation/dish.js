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

const dishPatchSchema = yup.object().shape({
  cuisineId: yup.string().optional(),
  name: yup.string().optional(),
  category: yup.string().optional(),
  nonVeg: yup.boolean().optional(),
  mainIngredient: yup.string().optional(),
  preprationTime: yup.number().optional(),
  variants: yup.array().optional(),
});

module.exports = [dishPostSchema, dishPatchSchema];
