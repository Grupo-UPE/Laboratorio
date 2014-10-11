var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var habilidad_schema= new Schema({
	nombre : String,
});


module.exports = mongoose.model('Habilidad', habilidad_schema);
