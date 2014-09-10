var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var usuario_schema = new Schema({
    username   : { type: String, required: true,lowercase:true, index: { unique: true } },
    nombre          :   String,
    apellido           : String,
    email               : String,
    legajo              : String,
    password        :  String,
    cambiarpass    : Boolean,
    roles                   :  [Schema.ObjectId],
});

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

usuario_schema.statics.getAuthenticated = function(username, password, cb) {
    this.findOne({ username: username }, function(err, usuario) {
        if (err) throw err;
        if (!usuario) return cb(null,null,"No esta"); //No exista el usuario
        // Verificamos que coinciden los passwords
        usuario.comparePassword(password, function(err, isMatch) {
            if (err) return cb(err); //Retorno el error
            if (isMatch) return cb(null, usuario); //Si coinciden los password retorno el usuario
            return cb(null,null,"No coincide"); //Retorn que no coincide
        });
    });
};


module.exports = usuario_schema
//module.exports = mongoose.model('Usuario', usuario_schema);