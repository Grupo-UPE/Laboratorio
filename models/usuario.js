var Schema = require('mongoose').Schema

var usuario_schema = new Schema({
    username   : String,
    nombre          :   String,
    apellido           : String,
    legajo              : String,
    password        :  String,
    id_rol                   :  String,
});

module.exports = usuario_schema