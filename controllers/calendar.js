var gapi = require('../lib/gapi');
var Entrevista = require('../models/entrevista');

exports.eventos=  function(req, res){
    gapi.a.setCredentials(req.session.tokens); //Probe guardar el gapi con las credenciales directamente, pero no funciona.
    gapi.calendar.events.list({calendarId:'4aik347gtqu1umje7kggphnsg4@group.calendar.google.com',  auth: gapi.a },function(err, eventos){
        console.log(eventos);//Usado para probar.
    });
}

exports.create = function(req, res){
    /*
    Recibo:
        req.body.entrevista
        req.body.postulante
        req.body.busqueda
    */

    /*==========================================*/
    /* Deberiamos crear un objecto entrevista con los datos recibidos y despues crear la entrevista en google calendar
        si salta algun problema deberiamos borrar la entrevista que creamos, si no hay ningun problema con las respuesta
        que recibimos actualizamos el objecto con los datos que nos devolvio google calendar */


    var entrevista = req.body.entrevista;

        var ent=new Entrevista({ //creamos una entrevista y la guardamos.

            entrevistador     : entrevista.entrevistador._id,
            postulante     : req.body.postulante._id,
            busqueda       :req.body.busqueda._id
            });

            ent.save(onSaved)

            function onSaved (err) {
                if (err) {
                    console.log(err)
                    return next(err)
                }

                console.log("Guardo entrevista");
            var sumario="Busqueda: "+req.body.busqueda.nombre+", Postulante: "+req.body.postulante.nombre+", Entrevistador: "+entrevista.entrevistador.username+" id entrevista: "+ent.id;
            //vista en https://developers.google.com/google-apps/calendar/v3/reference/events#resource
            //Ver https://developers.google.com/google-apps/calendar/v3/reference/events/insert
            //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
            //var inicio = new Date(2014,8,30,18,00,0,0);
            //var fin = new Date(2014, 08, 30, 22, 0, 0, 0);

            var entrevistagoogle = {
                  "summary": sumario,
                  "description": entrevista.descripcion,
                  "location": entrevista.location,
                  "start": {
                    //"date": "2014-09-24",
                    "dateTime": new Date(entrevista.inicio),
                    //"timeZone": string
                  },
                  "end": {
                    //"date": "2014-09-25",
                    "dateTime": new Date(entrevista.fin),
                    //"timeZone": string
                  },
                  "attendees": [ //aca deberiamos recicibir una lista, pero por ahora va a ser uno solo.
                    {
                      "email": entrevista.entrevistador.email,
                    },
                  ],
                  "reminders": {
                    "useDefault": true,
                    }
                }

            gapi.a.setCredentials(req.session.tokens);
            //Object.getOwnPropertyNames(gapi.calendar.events)
            gapi.calendar.events.insert({ calendarId:'4aik347gtqu1umje7kggphnsg4@group.calendar.google.com',
                resource:entrevistagoogle ,auth: gapi.a },function(err, evento){
                if(err){
                    console.log(err);
                }
                console.log("paso por aca");
                /*Esto es lo que me devuelve... Una vez que estoy con
                estos datos deberia actualizar el modelo con el id del evento en el calendar.
                Tambien podria poner el link.
                {[
                kind: 'calendar#event',
          etag: '"2825431028078000"',
          id: 'kemg2cvcuiang1pqhvjg9sk84g',
          status: 'confirmed',
          htmlLink: 'https://www.google.com/calendar/event?eid=a2VtZzJjdmN1aWFuZzFwcWh2amc5c2s4NGcgNGFpazM0N2d0cXUxdW1qZTdrZ2dwaG5zZzRAZw',
          created: '2014-10-07T20:58:33.000Z',
          updated: '2014-10-07T20:58:34.039Z',
          summary: 'Busqueda: Busqueda de prueba, Postulante: fernando, Entrevistador: Pablo',
          description: 'Probando que me devuelve esto.',
          location: 'UPE',
          creator:
           { email: 'ferticidio@gmail.com',
             displayName: 'Fernando Lescano' },
          organizer:
           { email: '4aik347gtqu1umje7kggphnsg4@group.calendar.google.com',
             displayName: 'upeGrupo1Calendar',
             self: true },
          start: { dateTime: '2014-10-07T18:20:00-03:00' },
          end: { dateTime: '2014-10-07T18:30:00-03:00' },
          iCalUID: 'kemg2cvcuiang1pqhvjg9sk84g@google.com',
          sequence: 0,
          attendees:
           [ { email: 'pabloz18ezeiza@gmail.com',
               displayName: 'Pablo Ziegler',
               responseStatus: 'needsAction' } ],
          reminders: { useDefault: true } }
                */
            ent.calendar=evento.id;
            ent.save(onUpdate)

            function onUpdate (err) {
                if (err) {
                    console.log(err)
                    return next(err)
                }
                return true;

                }
    });
    }
}

exports.show = function(req, res){

    gapi.a.setCredentials(req.session.tokens);
    gapi.calendar.events.get({ calendarId:'4aik347gtqu1umje7kggphnsg4@group.calendar.google.com',
        eventId:req.body.entrevista.id, auth: gapi.a}, function(err, evento){
        if(err){
            console.log(err);
        }else{
            console.log(evento);
        }
    });
}

