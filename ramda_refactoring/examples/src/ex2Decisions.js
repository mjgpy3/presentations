function errorToStatusCode(error) {
  if (error && error.constructor) {

    if (error.constructor === ErrorWithStatus) {
      return error.status;
    } else if (error.constructor === ValidationError) {
      return 400;
    }

  }

  if (error && error.type && error.type === 'PaymentNotIncluded') {
    return 402;
  } else if (typeof error === 'string' && /not found/i.test(error)) {
    return 404;
  } else {
    return 500;
  }
}



module.exports.errorToStatusCode = errorToStatusCode;

function ValidationError(message) {
  this.name = "ValidationError";
  this.message = (message || "");
}

module.exports.ValidationError = ValidationError;

function ErrorWithStatus(message, status) {
  this.name = "ValidationError";
  this.message = (message || "");
  this.status = status;
}

module.exports.ErrorWithStatus = ErrorWithStatus;
