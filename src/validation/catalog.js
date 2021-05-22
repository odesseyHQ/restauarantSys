const yup = require("yup");

const catalogPostSchema = yup.object().shape({
  hotelName: yup.string().required(),
  menuIds: yup.array().required(),
});

const catalogPatchSchema = yup.object().shape({
  hotelName: yup.string().optional(),
  menuIds: yup.array().optional(),
});
module.exports = [catalogPostSchema, catalogPatchSchema];
