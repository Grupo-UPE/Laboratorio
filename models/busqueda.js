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
    entrevistadores     : [{type: Schema.ObjectId, ref : 'Usuario'}],
    postulantes     : [{type: Schema.ObjectId, ref : 'Postulante'}], //Nos falta el model de postulante.
    otros_comentarios : String,
    texto_twitter     : String,
    lugar_trabajo     : String,
    horario           : String,
});

module.exports = mongoose.model("Busqueda",busqueda_schema);
