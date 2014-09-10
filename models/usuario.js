var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var usuario_schema = new Schema({
    username   : { type: String, required: true,lowercase:true, index: { unique: true } },
    nombre          :   String,
    apellido           : String,
    legajo              : String,
    password        :  String,
    roles                   :  [Schema.ObjectId],
});

usuario_schema.pre('save', function(next) {

    var usuario = this;

// Si no es un password nuevo no hace nada.
if (!usuario.isModified('password')) return next();

// genera el salt...
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

    if (err) return next(err);
        // hashea el password con el salt
        bcrypt.hash(usuario.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            usuario.password = hash;
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

        // make sure the user exists
        if (!usuario) {
            return cb(null,null,"No esta");
        }


        // test for a matching password
        usuario.comparePassword(password, function(err, isMatch) {
            if (err) console.log("err");


            if (isMatch) {
                return cb(null, usuario);
            }else{
                return cb(null,null,"No coincide");
            }
        });
    });
};


module.exports = usuario_schema
//module.exports = mongoose.model('Usuario', usuario_schema);