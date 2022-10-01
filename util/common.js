module.exports.getErrorResponse = (status, errorMessage) => {
  console.error(status, errorMessage);
  throw Error(`${status} : ${errorMessage}`);
}

module.exports.getPreProcessedDataBeforeSave = (payload) => {
  delete payload.id;
  return this.getPreProcessedDataBeforeUpdate(payload);
}

module.exports.getPreProcessedDataBeforeUpdate = (payload) => {
  delete payload.modifiedAt;
  payload = {...payload, 'modifiedAt': new Date()}
  return payload;
}