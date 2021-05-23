const ERROR_STATUS_ARRAY = require("../constant/ErrorData");

function errorMessage(err, res) {
  ERROR_STATUS_ARRAY.find((c) => {
    if (c.status == err) {
      c["success"] = false;
      return res.status(err).json(c);
    }
  });
}

module.exports = errorMessage;
