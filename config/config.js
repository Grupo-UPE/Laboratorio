//Configuracion de la aplicacion...
function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

//Acceso a google
// Client ID y client secret se pueden encontrar en
// https://code.google.com/apis/console
define("GOOGLE_CLIENT_ID", '355519514095-949tc7eo0mh4h0prdn438uus0es0cbjb.apps.googleusercontent.com');
define("GOOGLE_CLIENT_SECRET", '_HDmyUx7uw7Ku1Zvi8dr-C7e');

//Id del calendario compartido de google calendar
define("GOOGLE_CALENDAR", '4aik347gtqu1umje7kggphnsg4@group.calendar.google.com');

//ID de la carpeta de google drive
define("GOOGLE_DRIVE", '0B29paO-zxCaBZTVTZ0ZuMm00Y2M');

//Usuarios...
define("ADMIN",{
            email: 'ferticidio@gmail.com',
            username: 'Ferticidio',
            });

define("RRHH",{
            email: 'rrhh@gmail.com',
            username: 'rrhh',
            });

define("ENTREVISTADOR",{
            email: 'entrevistador@gmail.com',
            username: 'entrevistador',
            });

/*
Incluir todas las habiliades que se consideren
posteriormente se podran agregar mas desde la aplicacion
*/
define("HABILIDADES",[
            "Java",
            "JavaScript",
            "PHP",
            "AngularJS",
            "HTML",
            "HTML 5",
            "CSS",
            "CSS 3",
            "C",
            "C++",
            "C#",
            ".Net",
            "Python",
            "DJango",
            "Laravel",
            "NoneJS",
            "MongoDB",
            "MySql",
            "PostgreSql",
            "Ruby",
            ]);

