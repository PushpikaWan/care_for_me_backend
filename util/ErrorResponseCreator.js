module.exports.getErrorResponse = (status, errorMessage) => {
  console.error(status, errorMessage);
  throw Error(`${status} : ${errorMessage}`);
}