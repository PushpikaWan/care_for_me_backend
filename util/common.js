module.exports.getErrorResponse = (status, errorMessage) => {
  console.error(status, errorMessage);
  throw Error(`${status} : ${errorMessage}`);
}

module.exports.getIdRemovedPayloadForSave = (payload) => {
  delete payload.id;
  return payload;
}