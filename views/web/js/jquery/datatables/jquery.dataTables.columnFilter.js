$.fn.dataTableExt.oApi.fnFilterClear = function (oSettings)  {
    /* Remove global filter */
    oSettings.oPreviousSearch.sSearch = "";
      
    /* Remove the text of the global filter in the input boxes */
    if (typeof oSettings.aanFeatures.f != 'undefined') {
        var n = oSettings.aanFeatures.f;
        for (var i=0, iLen=n.length ; i<iLen ; i++) {
            $('#exampleFilters input', n[i]).val('');
        }
    }
      
    /* Remove the search text for the column filters - NOTE - if you have input boxes for these
     * filters, these will need to be reset
     */
    for (var i=0, iLen=oSettings.aoPreSearchCols.length ; i<iLen ; i++) {
        oSettings.aoPreSearchCols[i].sSearch = "";
    }
    
    // limpia los campos de busqueda
    $("#exampleFilters tbody").each(function (i) {
		// esto es porque la tabla de filtros tiene mas de una fila
		for (var r=0; r<this.rows.length; r++) {
			// recupero el valor de cada columna de cada fila
			for (var c=0; c<this.rows.item(r).cells.length; c++) {
				// campo 1 de los children es el componente que contiene el valor para la busqueda, el 0 es el label
				if (this.rows.item(r).cells[c].children[1]!=undefined) { //IF == FIX para las búsquedas por fecha porque el datepicker inserta otros TDs
					this.rows.item(r).cells[c].children[1].value = "";
				}
			}
		}
    });
      
    /* Redraw */
    oSettings.oApi._fnReDraw(oSettings);
};

$.fn.dataTableExt.oApi.fnArrayFilter = function(oSettings, aData) {
    for (var i = 0; i < aData.length; i++) {
        oSettings.aoPreSearchCols[i].sSearch = aData[i];
    }
    this.oApi._fnDraw( oSettings );
};

$.fn.dataTableExt.oApi.fnGetColumnData = function (oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty) {
	// check that we have a column id
	if (typeof iColumn == "undefined") return new Array();
	
	// by default we only wany unique data
	if (typeof bUnique == "undefined") bUnique = true;
	
	// by default we do want to only look at filtered data
	if (typeof bFiltered == "undefined") bFiltered = true;
	
	// by default we do not wany to include empty values
	if (typeof bIgnoreEmpty == "undefined") bIgnoreEmpty = true;
	
	// list of rows which we're going to loop through
	var aiRows;
	
	// use only filtered rows
	if (bFiltered == true) aiRows = oSettings.aiDisplay; 
	// use all rows
	else aiRows = oSettings.aiDisplayMaster; // all row numbers

	// set up data array	
	var asResultData = new Array();
	
	for (var i=0,c=aiRows.length; i<c; i++) {
		iRow = aiRows[i];
		var aData = this.fnGetData(iRow);
		var sValue = aData[iColumn];
		
		// ignore empty values?
		if (bIgnoreEmpty == true && sValue.length == 0) continue;

		// ignore unique values?
		else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;
		
		// else push the value onto the result data array
		else asResultData.push(sValue);
	}
	
	return asResultData;
};



