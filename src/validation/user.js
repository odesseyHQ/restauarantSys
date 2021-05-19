const yup = require("yup");

const userCreateSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  mail: yup.string().email().required(),
  password: yup.string().required(),
});

const userLoginSchema = yup.object().shape({
  mail: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = [userCreateSchema, userLoginSchema];
