var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postulante_schema = new Schema({
    nombre: String,
    apellido: String,
    dni: Number,
    estado_civil: String,
    nacionalidad: String,
    edad: String,
    sexo: String,
    telefono: String,
    email: String,
    formacion_academica: [{ titulo: String}],
    disponibilidad: String,
    experiiencia_laboral: [{ empresa: String, antiguedad: String, rol: String}],
    comentario: String,
    habilidades     : [{type: Schema.ObjectId, ref : 'Habilidad'}],
    habilidades_evaluadas     :
        [{habilidad: {type: Schema.ObjectId, ref : 'Habilidad'},Evaluacion:Number}]
    ,
    curriculumURL : String,
    fotoUrl : String
});

module.exports = mongoose.model('Postulante', postulante_schema);