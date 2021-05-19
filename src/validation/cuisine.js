const yup = require("yup");

const cuisineSchemaPost = yup.object().shape({
  cuisineName: yup.string().required(),
});

module.exports = cuisineSchemaPost;
