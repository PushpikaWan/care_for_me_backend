module.exports.getErrorResponse = (status, errorMessage) => {
  console.error(status, errorMessage);
  throw Error(`${status} : ${errorMessage}`);
}

module.exports.getPreProcessedDataBeforeSave = (payload) => {
  delete payload.id;
  delete payload.createdAt;
  return this.getPreProcessedDataBeforeUpdate(payload);
}

module.exports.getPreProcessedDataBeforeUpdate = (payload) => {
  delete payload.modifiedAt;
  payload = {...payload, 'modifiedAt': new Date()}
  return payload;
}

module.exports.convertIdBeforeSendingArray = (arrayOfObj) => {
  return arrayOfObj.map(({_id: id, ...rest}) => ({
    id, ...rest
  }));

}

module.exports.convertIdBeforeSendingObject = (Object) => {
  Object.id = Object._id
  delete Object._id
  return Object
}