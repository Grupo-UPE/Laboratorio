gapi = require('../lib/gapi');

exports.eventos=  function(req, res){
    gapi.a.setCredentials(req.session.tokens); //Probe guardar el gapi con las credenciales directamente, pero no funciona.
    gapi.calendar.events.list({calendarId:'4aik347gtqu1umje7kggphnsg4@group.calendar.google.com',  auth: gapi.a },function(err, eventos){
        console.log(eventos);//Usado para probar.
    });
}

exports.guardar = function(req, res){
    //console.log(req.session.usuario);
    var entrevista = req.body.entrevista;
    //vista en https://developers.google.com/google-apps/calendar/v3/reference/events#resource
    //Ver https://developers.google.com/google-apps/calendar/v3/reference/events/insert
    //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    var inicio = new Date(2014,8,30,18,00,0,0);
    var fin = new Date(2014, 08, 30, 22, 0, 0, 0);
    var entrevista = {
          "summary": "Probando Google Calendar",
          "description": "Deberiamos estar guardando un evento en el calendario creado por Francisco, poque lo compartio conmigo. Se deberia tener un calendario que se comparte con todos los responsables de RRHH",
          "location": "Universidad Provincial de Ezeiza",
          "start": {
            //"date": "2014-09-24",
            "dateTime": entrevista.inicio,
            //"timeZone": string
          },
          "end": {
            //"date": "2014-09-25",
            "dateTime": entrevista.fin,
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
    console.log(entrevista);

    gapi.a.setCredentials(req.session.tokens);
    //Object.getOwnPropertyNames(gapi.calendar.events)
    gapi.calendar.events.insert({ calendarId:'4aik347gtqu1umje7kggphnsg4@group.calendar.google.com', resource:entrevista ,auth: gapi.a },function(err, eventos){
        if(err){
            console.log(err);
        }
    });
});