var Schema = require('mongoose').Schema

var usuario_schema = new Schema({
    nombre          :   String,
    password        :  String,
    rol                   :  String,
});

module.exports = usuario_schema