const { v4: uuidv4 } = require('uuid');

module.exports = function() {
  return new Buffer.from(uuidv4()).toString('base64');
};