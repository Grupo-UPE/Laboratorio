var Schema = require('mongoose').Schema

var texto_schema = new Schema({
  texto        :   String,
  usuario_id: String,
})

module.exports = texto_schema