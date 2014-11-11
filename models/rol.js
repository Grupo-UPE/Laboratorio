var mongoose = require('mongoose');
var Schema = require('mongoose').Schema

var rol_schema = new Schema({
  nombre        :   String,
})

module.exports = mongoose.model('Rol', rol_schema); //Exportamos el modelo y no solo el schema.