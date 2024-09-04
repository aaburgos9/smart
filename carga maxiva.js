function enviar_carga_masiva_monetizacion(){
	
	limpiar_errores_carga_masiva();
	
	var ruta_servicio = CONTEXTPATH + "/CldXmn/Divisas" +"/CargueInfoMasivoMonetizacion";
	var dataForm = new FormData();
	
	jQuery.each(jQuery('#archivoCargaMasivaMonetizacion')[0].files, function(i, file) {
		dataForm.append('archivoCargaMasivaMonetizacion', file);
	});
	
	var tipo_carga = osm_getValorEntero('tipo_carga');
    dataForm.append("tipoCarga",tipo_carga);
    
    var monetizacion = null;
    
	jQuery.ajax({
	    url: ruta_servicio,
	    data: dataForm,
	    cache: false,
	    contentType: false,
	    processData: false,
	    type: 'POST', 
	    success: function(data){
	    	var datosRespuesta = JSON.parse(data);
	    	if(datosRespuesta.errores.length > 0){
	    		agregar_errores_carga_masiva(datosRespuesta.errores);
	    	}
	    	if(datosRespuesta.registros!= undefined && datosRespuesta.errores.length <=0){
	    		if(datosRespuesta.registros!=null && datosRespuesta.registros.length > 0){
	    			
	    			for(var i=0; i< datosRespuesta.registros.length; i++){
	    				monetizacion = new Object();
	    				var registro = datosRespuesta.registros[i];
	    				monetizacion.id = null;
	    				monetizacion.idCliente = registro.idCliente;
	    				monetizacion.codigoOrion = registro.codigoOrion;
	    				monetizacion.dvOrion = registro.dvOrion;
	    				monetizacion.idMoneda = registro.idMoneda;
	    				monetizacion.monto = registro.monto;
	    				monetizacion.fechaMonetizacion = new Date(registro.fechaMonetizacion);
	    				monetizacion.codigoSwiftOriginador = registro.codigoSwiftOriginador;
	    				monetizacion.pais = registro.pais;
	    				monetizacion.ciudad = registro.ciudad;
	    				monetizacion.bancoOriginador = registro.bancoOriginador;
	    				monetizacion.originador = registro.originador;
	    				monetizacion.bancoCorresponsal = registro.bancoCorresponsal;
	    				monetizacion.tipoCargue = registro.tipoCargue;
	    				monetizacion.codigoSwiftIntermediario = registro.codigoSwiftIntermediario;
	    				monetizacion.paisIntermediario = registro.paisIntermediario;
	    				monetizacion.ciudadIntermediario = registro.ciudadIntermediario;
	    				monetizacion.codigoSwiftReceptor = registro.codigoSwiftReceptor;
	    				monetizacion.paisReceptor = registro.paisReceptor;
	    				monetizacion.ciudadReceptor = registro.ciudadReceptor;
	    				monetizacion.notificar = false;
	    				monetizacion.observaciones = "";
	    				
	    				var respuesta = jsonrpc_dv.gestionMonetizacion.guardarMonetizacion(monetizacion);
	    			}
	    		}
	    	}
	    	
	    }
	});
	

	Error al parsear el JSON: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
    at JSON.parse (<anonymous>)
    at Object.success (40.js:1502:39)
    at n (jquery-1.6.2.min.js:16:14765)
    at Object.fireWith [as resolveWith] (jquery-1.6.2.min.js:16:15534)
    at w (jquery-1.6.2.min.js:18:11661)
    at XMLHttpRequest.d (jquery-1.6.2.min.js:18:17479)