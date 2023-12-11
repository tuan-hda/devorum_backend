const isInvalidObjectIdError = (error) => {
  if (error.kind === 'ObjectId') {
    return true
  }
}

module.exports = {
  isInvalidObjectIdError,
}
