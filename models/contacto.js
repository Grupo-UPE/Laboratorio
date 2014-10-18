var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var contacto_schema = new Schema({
    fecha          :{type : Date,  default: Date.now},
    postulante     : {type: Schema.ObjectId, ref : 'Postulante'},
    comentario : String,
});

module.exports = mongoose.model('Contacto', contacto_schema);