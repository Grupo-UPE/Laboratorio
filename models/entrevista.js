var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var entrevista_schema = new Schema({
    entrevistador     : {type: Schema.ObjectId, ref : 'Usuario'},
    postulante     : {type: Schema.ObjectId, ref : 'Postulante'},
    calendar : String,
    feedback:{ comentario: String, semaforo: {type: Number, enum: [1, 2, 3]} }
});

module.exports = mongoose.model('Entrevista', entrevista_schema); //Exportamos el modelo y no solo el schema.
