getDate = function (dateInMilliseconds) {
	if (!isNaN(dateInMilliseconds)) {
		var javascriptDate = new Date(dateInMilliseconds);
 		return javascriptDate.getUTCDate()+" / "+javascriptDate.getUTCMonth()+1+" / "+javascriptDate.getUTCFullYear();
 	}
 	return "";
};

isDefined = function (property) {
	return property != null && typeof property  !== 'undefined';
};

getSuccessSaveMsg = function (entity, id, descrip) {
	return entity + " " + id + " - " + descrip + " creada!";
};

getErrorSaveMsg = function (entity, descrip, error) {
	return "Error al crear la " + entity + " " + descrip + ": " + error;
};

getSuccessUpdateMsg = function (entity, id, descrip) {
	return entity + " " + id + " - " + descrip + " modificada!";
};

getErrorUpdateMsg = function (entity, descrip, error) {
	return "Error al modificar la " + entity + " " + descrip + ": " + error;
};

getSuccessDeleteMsg = function (entity, id) {
	return entity + " " + id + " eliminada!"; 
};

getErrorDeleteMsg = function (entity, id, error) {
	return "Error al eliminar la " + entity  + " " + id + ": " + error;
};

getConfirmDeleteMsg = function(entity, id) {
	return "¿Está seguro que desea eliminar el " + entity + " " + id + "?";
};

formatDate= function(fechayyyyMMaa){
//	var fechayyyyMMaa = String(data);
	if (fechayyyyMMaa!=null)
		return fechayyyyMMaa.substring(8,10)+ "-" + fechayyyyMMaa.substring(5,7) + "-" + fechayyyyMMaa.substring(0,4);
	return '';
};