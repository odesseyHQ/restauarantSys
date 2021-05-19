const yup = require("yup");

const catalogPostSchema = yup.object().shape({
  hotelName: yup.string().optional(),
  menuIds: yup.array().optional(),
});

module.exports = catalogPostSchema;
