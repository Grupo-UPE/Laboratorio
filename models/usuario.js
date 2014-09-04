var Schema = require('mongoose').Schema

var usuario_schema = new Schema({
  nombre        :   String,
})

module.exports = usuario_schema