var Schema = require('mongoose').Schema

var rol_schema = new Schema({
  nombre        :   String,
  puntos_de_menu: [{ url: String, anchor: String }],
})

module.exports = rol_schema