const yup = require("yup");

const cuisineSchemaPost = yup.object().shape({
  cuisineName: yup.string().required(),
});

const cuisineSchemaPatch = yup.object().shape({
  cuisineName: yup.string().optional(),
  cuisineCountry: yup.string().optional(),
});

module.exports = [cuisineSchemaPost, cuisineSchemaPatch];
