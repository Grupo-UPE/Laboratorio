var protocol="${server.protocol}";
var server="${server.ip}";
var port="${server.port}";
var app_name="sueldos";

if (server.indexOf("server.ip") !== -1){
	//encontró el string server.ip exto quiere decir que se está ejecutando desde el entorno del eclipse
	var root_path="http://localhost:8080/"+app_name;
}
else
	var root_path=protocol+"://"+server+":"+port+"/"+app_name;