var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var usuario_schema = new Schema({
    email   : { type: String, required: true,lowercase:true, index: { unique: true } },
    username          :   String,
    rol                   :  {type: Schema.ObjectId, ref : 'Rol'},
});

/* No usamos contraseñas
usuario_schema.pre('save', function(next) {
    var usuario = this;
if (!usuario.isModified('password')) return next(); // Si no se modifico el password no hace nada.
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) { //Generamos el salt (por seguridad)
    if (err) return next(err);
        bcrypt.hash(usuario.password, salt, function(err, hash) { // hashea el password con el salt
            if (err) return next(err);
            usuario.password = hash; // Pisamos el password con el hash
            next();
        });
    });
});

usuario_schema.post('save',function(){
    console.log("guardo");
});


usuario_schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
*/

usuario_schema.statics.acceder = function(email, cb) {
    this.findOne({email: email}, function(err, usuario){
        if(err) throw err;
        if(!usuario) return cb(null,null,"no existe un usuario con ese email");
        return cb(null,usuario,null);
        }).populate('roles');
    }

module.exports = mongoose.model('Usuario', usuario_schema); //Exportamos el modelo y no solo el schema.
