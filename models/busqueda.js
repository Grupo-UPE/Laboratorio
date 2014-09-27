//var Schema = require('mongoose').Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var busqueda_schema = new Schema({
    fecha_inicio          :{type : Date,  default: Date.now},
    fecha_fin          :{type : Date,  default: Date.now},
    cantidad_empleados       : Number,
    nombre         : String,
    abierto         : Boolean,
    remuneracion    : Number,
    habilidades     : [{type: Schema.ObjectId, ref : 'Habilidad'}],
    otros_comentarios : String,
    texto_twitter     : String,
    lugar_trabajo     : String,
    horario           : String,
});

module.exports = mongoose.model("Busqueda",busqueda_schema);
