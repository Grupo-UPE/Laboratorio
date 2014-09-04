// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/test'
  , db              = mongoose.createConnection(db_lnk)

// Creación de variables para cargar el modelo
var texto_schema = require('../models/texto')
  , Texto = db.model('Texto', texto_schema)

exports.index = function (req, res, next) {

    Texto.find(gotTextos)

  function gotTextos (err, textos) {
    if (err) {
      console.log(err)
      return next()
    }
    console.log(textos)
    return res.json(textos)
  }

}

exports.show_edit = function (req, res, next) {
  var id = req.params.id

  Texto.findById(id, gotTexto)

  function gotTexto (err, texto) {
    if (err) {
      console.log(err)
      return next(err)
    }

    console.log(texto);
    return res.json(texto)
  }
}

exports.update = function (req, res, next) {
    var id = req.body.id

    var txt = req.body.texto       || ''


    // Validemos que el texto no este vacio
  if ((txt=== '')) {
    console.log('ERROR: El texto no puede estar vacio')
    return res.send({'error':'Debe escribir algo'})
  }

    Texto.findById(id, gotTexto)

    function gotTexto (err, texto) {
        if (err) {
            console.log(err)
            return next(err)
        }
        if (!texto) {
            console.log('ERROR: ID no existe')
            return res.send({'error':'ID invalido'})
        } else {
            texto.texto = txt
            texto.save(onSaved)
        }
    }

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.send('')
        }
}

exports.remove = function (req, res, next) {
    var id = req.body.id

    Texto.findById(id, gotTexto)

    function gotTexto (err, texto) {
    if (err) {
        console.log(err)
        return next(err)
    }

    if (!texto) {
        return res.send({'error':'ID invalido'})
    }

    // Tenemos el texto, eliminemoslo
    texto.remove(onRemoved)
  }

  function onRemoved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/')
  }
}

exports.create = function (req, res, next) {
    console.log(req.body);
    var txt = req.body.texto       || ''
    var texto = new Texto({
        texto : txt
    })

    texto.save(onSaved)

    function onSaved (err) {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/')
        }
}
