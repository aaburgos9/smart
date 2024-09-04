package com.osmosyscol.divisas.logica.servicios;

import java.io.InputStream;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.osmosyscol.divisas.dtos.RegistroCargueMasivoMonetizacion;
import com.osmosyscol.divisas.dtos.utils.UsuarioCuentas;
import com.osmosyscol.divisas.logica.constantes.Constantes;
import com.osmosyscol.datasuite.logica.dto.Usuario;
import com.osmosyscol.divisas.dtos.MonedaDivisas;
import com.osmosyscol.divisas.dtos.BancoCorresponsal;
import com.osmosyscol.divisas.dtos.CodigoSwift;

public class CargueInfoMasivoMonetizacionServicio {
	
	private static CargueInfoMasivoMonetizacionServicio instance;
	
	private CargueInfoMasivoMonetizacionServicio (){
	}
	
	public static CargueInfoMasivoMonetizacionServicio getInstance(){
		if(instance == null){
			instance = new CargueInfoMasivoMonetizacionServicio();
		}
		return instance;
	}
	
	public HashMap<String, Object> cargarCamposDesdeExcel(InputStream fileStream, String tipoCargue){
		
		HashMap<String, Object> respuesta = null;
		List<RegistroCargueMasivoMonetizacion> registros = null;
		List<String> errores = null;
		
		try{
			respuesta = new HashMap<String,Object>();
			registros = new ArrayList<RegistroCargueMasivoMonetizacion>();
			errores = new ArrayList<String>();
			
			Integer nitClienteColumn = null;
			Integer codigoCuentaOrionColumn = null;
			Integer dvCodigoCuentaOrionColumn = null;
			Integer monedaColumn = null;
			Integer montoColumn = null;
			Integer fechaIngresoColumn = null;
			Integer swiftAbaOriginadorColumn = null;
			Integer originadorColumn = null;
			Integer tipoCargueColumn = null;
			Integer swiftAbaIntermediarioColumn = null;
			Integer cuentaReceptoraColumn = null;
			
			XSSFWorkbook workbook = new XSSFWorkbook(fileStream);
			XSSFSheet hoja = workbook.getSheetAt(0);

			Map<String, Integer> columnPosByName = new HashMap<String, Integer>();
			
			for (Iterator<Row> rowIterator = hoja.iterator(); rowIterator.hasNext();) {
				Row row = rowIterator.next();
				if(row.getRowNum() == BigInteger.ZERO.intValue()){
					for(int columna = 0; columna < row.getLastCellNum(); columna++){
						String nombreColumna = row.getCell(columna).getStringCellValue().toUpperCase();
						columnPosByName.put(nombreColumna, columna);
					}
					nitClienteColumn = columnPosByName.get("NIT CLIENTE");
					codigoCuentaOrionColumn = columnPosByName.get("CODIGO CUENTA ORION");
					dvCodigoCuentaOrionColumn = columnPosByName.get("DV CODIGO CUENTA ORION");
					monedaColumn = columnPosByName.get("MONEDA");
					montoColumn = columnPosByName.get("MONTO");
					fechaIngresoColumn = columnPosByName.get("FECHA DE INGRESO");
					swiftAbaOriginadorColumn = columnPosByName.get("SWIFT/ABA ORIGINADOR");
					originadorColumn = columnPosByName.get("ORIGINADOR");
					tipoCargueColumn = columnPosByName.get("TIPO CARGUE");
					swiftAbaIntermediarioColumn = columnPosByName.get("SWIFT/ABA INTERMEDIARIO");
					cuentaReceptoraColumn = columnPosByName.get("CUENTA RECEPTORA");
					continue;
				}
				
				RegistroCargueMasivoMonetizacion registroCargueMasivoMonetizacion = new RegistroCargueMasivoMonetizacion();
				
				if (tipoCargue.equals("1")) {
					
					Cell celdaNit = row.getCell(nitClienteColumn);
					Cell celdaCodigoOrion = row.getCell(codigoCuentaOrionColumn);
					Cell celdaDvCodigoOrion = row.getCell(dvCodigoCuentaOrionColumn);
					Cell celdaMoneda = row.getCell(monedaColumn);
					Cell celdaMonto = row.getCell(montoColumn);
					Cell celdaFechaIngreso = row.getCell(fechaIngresoColumn);
					Cell celdaSwiftOriginador = row.getCell(swiftAbaOriginadorColumn);
					Cell celdaOriginador = row.getCell(originadorColumn);
					Cell celdaTipoCargue = row.getCell(tipoCargueColumn);
					Cell celdaSwiftIntermediario = row.getCell(swiftAbaIntermediarioColumn);
					Cell celdaCuentaReceptora = row.getCell(cuentaReceptoraColumn);

					if(celdaNit != null && 
							celdaCodigoOrion != null && 
							celdaDvCodigoOrion != null && 
							celdaMoneda != null && 
							celdaMonto != null && 
							celdaFechaIngreso != null && 
							celdaSwiftOriginador != null && 
							celdaOriginador != null && 
							celdaTipoCargue != null && 
							celdaSwiftIntermediario != null && 
							celdaCuentaReceptora != null){
						
					
//Nit Cliente
						Integer negocioScb = 2;
						String codigoOrion = null;
						String dvCodigoOrion = null;
						registroCargueMasivoMonetizacion.setId(null);
						try {
							Pattern pattern = Pattern.compile("^[0-9]+$");
							String valorNitCliente = null;
							try{
								valorNitCliente = row.getCell(nitClienteColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorNitCliente == null){
								valorNitCliente = String.valueOf((int) row.getCell(nitClienteColumn).getNumericCellValue());
							}
							
							if(!pattern.matcher(valorNitCliente).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Nit Cliente s&oacute;lo puede ser num&eacute;rico");
							}else{
								registroCargueMasivoMonetizacion.setNitCliente(valorNitCliente);
							}
							
							if(row.getCell(nitClienteColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getNitCliente() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo Nit Cliente es obligatorio");
							}else{
								List<Usuario> listaUsuariosActivos = com.osmosyscol.datasuite.logica.servicios.UsuarioServicio.getInstance().buscarUsuariosActivos(registroCargueMasivoMonetizacion.getNitCliente(), "");
								if(listaUsuariosActivos != null && !listaUsuariosActivos.isEmpty()){
									int contadorErrores = 0;
									for(Usuario usuarioLeido : listaUsuariosActivos){
										if(!usuarioLeido.getIdentificacion().equals(registroCargueMasivoMonetizacion.getNitCliente())){
											contadorErrores++;
										}else{
											registroCargueMasivoMonetizacion.setNitCliente(valorNitCliente);
											registroCargueMasivoMonetizacion.setIdCliente(usuarioLeido.getId_usuario());
										}
									}
									if(contadorErrores == listaUsuariosActivos.size()){
										errores.add("Registro " + row.getRowNum() + ":"
												+ "Verifique el campo Nit Cliente ya que no es el correcto o no se encuentra parametrizado");
									}
								}else{
									errores.add("Registro " + row.getRowNum() + ":"
											+ "Verifique el campo Nit Cliente ya que no es el correcto o no se encuentra parametrizado");
								}
							}
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Nit Cliente s&oacute;lo puede ser num&eacute;rico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Nit Cliente no puede ser nulo");
						}
						
//CodigoCuentaOrion
						try {
							Pattern pattern = Pattern.compile("^[0-9]+$");
							String valorCodigoCuentaOrion = null;
							try{
								valorCodigoCuentaOrion = row.getCell(codigoCuentaOrionColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorCodigoCuentaOrion == null){
								valorCodigoCuentaOrion = String.valueOf((int) row.getCell(codigoCuentaOrionColumn).getNumericCellValue());
							}
							
							if(!pattern.matcher(valorCodigoCuentaOrion).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo C&oacute;digo Cuenta Orion s&oacute;lo puede ser num&eacute;rico");
							}else{
								registroCargueMasivoMonetizacion.setCodigoOrion(valorCodigoCuentaOrion);
							}
							
							if(row.getCell(codigoCuentaOrionColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getCodigoOrion() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo Cuenta Orion es obligatorio");
							}else{
								List<UsuarioCuentas> listadoCuentasUsuario = ConsultaCuentasServicio.getInstance().obtenerCuentasUsuario(registroCargueMasivoMonetizacion.getIdCliente(), negocioScb);
								if(listadoCuentasUsuario != null && !listadoCuentasUsuario.isEmpty()){
									int contadorErrores = 0;
									for(UsuarioCuentas usuarioCuentaLeido : listadoCuentasUsuario){
										StringTokenizer stringTokenizer = new StringTokenizer(usuarioCuentaLeido.getNumero_cuenta(), " - ");
										if(stringTokenizer.hasMoreTokens()){
											codigoOrion = stringTokenizer.nextToken();
										}
										
										if(!codigoOrion.equals(registroCargueMasivoMonetizacion.getCodigoOrion())){
											contadorErrores++;
										}else{
											registroCargueMasivoMonetizacion.setCodigoOrion(valorCodigoCuentaOrion);
										}
										
										if(contadorErrores == listadoCuentasUsuario.size()){
											errores.add("Registro " + row.getRowNum() + ":"
													+ "Verifique el campo C&oacute;digo Cuenta Orion ya que no es el correcto o no se encuentra parametrizado");
										}
									}
								}else{
									errores.add("Registro " + row.getRowNum() + ":"
											+ "Verifique el campo C&oacute;digo Cuenta Orion ya que no es el correcto o no se encuentra parametrizado");
								}
							}
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo C&oacute;digo Cuenta Orion s&oacute;lo puede ser num&eacute;rico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo C&oacute;digo Cuenta Orion no puede ser nulo");
						}
						
//DvCodigoCuentaOrion
						try {
							Pattern pattern = Pattern.compile("^[0-9]+$");
							String valorDvCodigoCuentaOrion = null;
							try{
								valorDvCodigoCuentaOrion = row.getCell(dvCodigoCuentaOrionColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorDvCodigoCuentaOrion == null){
								valorDvCodigoCuentaOrion = String.valueOf((int) row.getCell(dvCodigoCuentaOrionColumn).getNumericCellValue());
							}
							
							if(!pattern.matcher(valorDvCodigoCuentaOrion).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo DvC&oacute;digo Cuenta Orion s&oacute;lo puede ser num&eacute;rico");
							}else{
								registroCargueMasivoMonetizacion.setDvOrion(valorDvCodigoCuentaOrion);
							}
							
							if(row.getCell(dvCodigoCuentaOrionColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getDvOrion() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo Dv C&oacute;digo es obligatorio");
							}else{
								List<UsuarioCuentas> listaCuentasUsuario = ConsultaCuentasServicio.getInstance().obtenerCuentasUsuario(registroCargueMasivoMonetizacion.getIdCliente(), negocioScb);
								if(listaCuentasUsuario != null && !listaCuentasUsuario.isEmpty()){
									int contadorErrores = 0;
									for(UsuarioCuentas usuarioCuentaLeido : listaCuentasUsuario){
										StringTokenizer stringTokenizer = new StringTokenizer(usuarioCuentaLeido.getNumero_cuenta(), " - ");
										if(stringTokenizer.hasMoreTokens()){
											codigoOrion = stringTokenizer.nextToken();
										}
										
										if(stringTokenizer.hasMoreTokens()){
											dvCodigoOrion = stringTokenizer.nextToken();
										}
										
										if(!dvCodigoOrion.equals(registroCargueMasivoMonetizacion.getDvOrion())){
											contadorErrores ++;
										}else{
											if(codigoOrion.equals(registroCargueMasivoMonetizacion.getCodigoOrion())){
												registroCargueMasivoMonetizacion.setDvOrion(valorDvCodigoCuentaOrion);
											}
										}
										
										if(contadorErrores == listaCuentasUsuario.size()){
											errores.add("Registro " + row.getRowNum() + ":"
													+ "Verifique el campo DvC&oacute;digo Cuenta Orion ya que no es el correcto o no se encuentra parametrizado");
										}
									}
								}else{
									errores.add("Registro " + row.getRowNum() + ":"
											+ "Verifique el campo DvC&oacute;digo Cuenta Orion ya que no es el correcto o no se encuentra parametrizado");
								}
							}
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo DvC&oacute;digo Cuenta Orion s&oacute;lo puede ser num&eacute;rico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo DvC&oacute;digo Cuenta Orion no puede ser nulo");
						}
						
//Moneda
						try {
							Pattern pattern = Pattern.compile("^[A-Za-z]+$");
							String valorMoneda = null;
							try{
								valorMoneda = row.getCell(monedaColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorMoneda == null){
								valorMoneda = String.valueOf((int) row.getCell(monedaColumn).getNumericCellValue()).toUpperCase();
							}
							
							if(!pattern.matcher(valorMoneda).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Moneda s&oacute;lo puede ser alfabetico");
							}else if(valorMoneda.length()>3) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Moneda no debe tener m&aacute;s de 3 caracteres");
							}else{
								registroCargueMasivoMonetizacion.setMoneda(valorMoneda);
							}
							
							if(row.getCell(monedaColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getMoneda() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo Moneda es obligatorio");
							}else{
								List<MonedaDivisas> listaMonedasActivas = com.osmosyscol.divisas.logica.dtos.servicios.MonedaDivisasServicio.getInstance().obtenerMonedaDivisasActivas();
								if(listaMonedasActivas != null && !listaMonedasActivas.isEmpty()){
									int contadorErrores = 0;
									for(MonedaDivisas monedaLeida : listaMonedasActivas){
										if(!monedaLeida.getCodigo().equals(registroCargueMasivoMonetizacion.getMoneda())){
											contadorErrores ++;
										}else{
											registroCargueMasivoMonetizacion.setMoneda(valorMoneda);
											registroCargueMasivoMonetizacion.setIdMoneda(monedaLeida.getId());
										}
									}
									if(contadorErrores == listaMonedasActivas.size()){
										errores.add("Registro " + row.getRowNum() + ":"
												+ "Verifique el campo Moneda ya que no es el correcto o no se encuentra parametrizado");
									}
								}else{
									errores.add("Registro " + row.getRowNum() + ":"
											+ "Verifique el campo Moneda ya que no es el correcto o no se encuentra parametrizado");
								}
							}
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Moneda s&oacute;lo puede ser alfabetico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Moneda no puede ser nulo");
						}
						
//Monto
						try {
							Pattern pattern = Pattern.compile("^-?\\d*\\.?\\d+$");
							double valorMonto = row.getCell(montoColumn).getNumericCellValue();
							DecimalFormat decimalFormat = new DecimalFormat("#");
							decimalFormat.setMaximumFractionDigits(8);
							int decimalPlaces = 0;
							try{
								decimalPlaces = decimalFormat.format(valorMonto).split(",")[1].length();
							}catch(Exception exception){
							}
							
							if(!pattern.matcher(String.valueOf(valorMonto)).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Monto s&oacute;lo puede ser decimal");
							}else{
								registroCargueMasivoMonetizacion.setMonto(BigDecimal.valueOf(valorMonto));
							}
							
							if(decimalPlaces > 2){
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Monto s&oacute;lo puede tener m&aacute;ximo dos decimales");
							}
							
							if(registroCargueMasivoMonetizacion.getMonto().compareTo(BigDecimal.ZERO) == BigInteger.ZERO.intValue()){
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Monto no puede ser cero");
							}else{
								if(valorMonto < 0){
									errores.add("Registro " + row.getRowNum() + ":"
											+ " El campo Monto debe ser positivo");
								}
								
								if(row.getCell(montoColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
										registroCargueMasivoMonetizacion.getMonto() == null){
									errores.add("Registro " + row.getRowNum() + ":" + " El campo Monto es obligatorio");
								}else{
									registroCargueMasivoMonetizacion.setMonto(new BigDecimal(decimalFormat.format(valorMonto).replace(",", ".")));
								}
							}
							
							
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Monto puede ser num&eacute;rico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Monto no puede ser nulo");
						}
						
//Fecha de ingreso
						try {
							Date fecha = null;
							Date fechaLeida = null;
							Pattern pattern = Pattern.compile("\\d{2}/\\d{2}/\\d{4}");
							String valorFechaIngreso = null;
							try{
								valorFechaIngreso = row.getCell(fechaIngresoColumn).getStringCellValue();
								int posicionSlash = valorFechaIngreso.indexOf("/");
								String primerosDigitos = valorFechaIngreso.substring(BigInteger.ZERO.intValue(), posicionSlash);
								if(primerosDigitos.length() < 2){
									valorFechaIngreso = "0"+valorFechaIngreso;
								}
							}catch(Exception exception){
							}
							
							if(!pattern.matcher(valorFechaIngreso).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Fecha Ingreso no es correcto, debe tener la estructura DD/MM/YYYY");
							}else{
								fechaLeida = new SimpleDateFormat("dd/MM/yyyy").parse(valorFechaIngreso);
								registroCargueMasivoMonetizacion.setFechaMonetizacion(fechaLeida);
							}
							
							if(row.getCell(fechaIngresoColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getFechaMonetizacion() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo Fecha Ingreso es obligatorio");
							}
							
							if(row.getCell(fechaIngresoColumn).getCellType() == HSSFCell.CELL_TYPE_NUMERIC && HSSFDateUtil.isCellDateFormatted(row.getCell(fechaIngresoColumn))){
								fecha = row.getCell(fechaIngresoColumn).getDateCellValue();
							}else{
								valorFechaIngreso = row.getCell(fechaIngresoColumn).getStringCellValue();
								fecha = new SimpleDateFormat("dd/MM/yyyy").parse(valorFechaIngreso);
								registroCargueMasivoMonetizacion.setFechaMonetizacion(fecha);
							}
							
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Fecha Ingreso s&oacute;lo puede ser num&eacute;rico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Fecha Ingreso no puede ser nulo");
						}catch(ParseException e) {
							errores.add("Registro " + row.getRowNum() + ":" +" El campo fecha no tiene un formato de Fecha valido");
						} 
						
//SWIFT/ABA Originador
						try {
							Pattern pattern = Pattern.compile("^[A-Za-z0-9]+$");
							String valorSwiftAbaOriginador = null;
							try{
								valorSwiftAbaOriginador = row.getCell(swiftAbaOriginadorColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorSwiftAbaOriginador == null){
								valorSwiftAbaOriginador = String.valueOf((int) row.getCell(swiftAbaOriginadorColumn).getNumericCellValue());
							}
							
							if(!pattern.matcher(valorSwiftAbaOriginador).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo SWIFT ABA Originador s&oacute;lo puede ser alfanum&eacute;rico");
							}else{
								registroCargueMasivoMonetizacion.setCodigoSwiftOriginador(valorSwiftAbaOriginador);
							}
							
							if(row.getCell(swiftAbaOriginadorColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getCodigoSwiftOriginador() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo SWIFT ABA Originador es obligatorio");
							}else{
								CodigoSwift busquedaCodigo = com.osmosyscol.divisas.logica.dtos.servicios.CodigoSwiftServicio.getInstance().obtenerSwiftPorCodigoSwift(registroCargueMasivoMonetizacion.getCodigoSwiftOriginador());
								
								if(busquedaCodigo != null){
									registroCargueMasivoMonetizacion.setCodigoSwiftOriginador(valorSwiftAbaOriginador);
									registroCargueMasivoMonetizacion.setPais(busquedaCodigo.getPais());
									registroCargueMasivoMonetizacion.setCiudad(busquedaCodigo.getCiudad());
									registroCargueMasivoMonetizacion.setBancoOriginador(busquedaCodigo.getNombreBanco());
								}else{
									errores.add("Registro " + row.getRowNum() + ":"
											+ "Verifique el campo SWIFT/ABA Originador ya que no es el correcto o no se encuentra parametrizado");
								}
							}
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo SWIFT ABA Originador s&oacute;lo puede ser alfanum&eacute;rico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo SWIFT ABA Originador no puede ser nulo");
						}
						
//Originador
						try {
							Pattern pattern = Pattern.compile("^[A-Za-z]+$");
							String valorOriginador = null;
							try{
								valorOriginador = row.getCell(originadorColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorOriginador == null){
								valorOriginador = String.valueOf((int) row.getCell(originadorColumn).getNumericCellValue());
							}
							
							if(!pattern.matcher(valorOriginador).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Originador s&oacute;lo puede ser alfabetico");
							}else{
								registroCargueMasivoMonetizacion.setOriginador(valorOriginador);
							}
							
							if(row.getCell(originadorColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getOriginador() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo Originador es obligatorio");
							}else{
								registroCargueMasivoMonetizacion.setOriginador(valorOriginador);
							}
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Originador s&oacute;lo puede ser alfabetico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Originador no puede ser nulo");
						}
						
//Tipo Cargue
						try {
							Pattern pattern = Pattern.compile("^[A-Za-z]+$");
							String valorTipoCargue = null;
							try{
								valorTipoCargue = row.getCell(tipoCargueColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorTipoCargue == null){
								valorTipoCargue = String.valueOf((int) row.getCell(tipoCargueColumn).getNumericCellValue());
							}
							
							if(!pattern.matcher(valorTipoCargue).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Tipo Cargue s&oacute;lo puede ser alfabetico");
							}else{
								if(valorTipoCargue.equals(Constantes.TIPO_CARGUE)){
									registroCargueMasivoMonetizacion.setTipoCargue(valorTipoCargue);
								}else{
									errores.add("Registro " + row.getRowNum() + ":"
											+ " El campo Tipo Cargue no es el correcto");
								}
							}if(row.getCell(originadorColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getOriginador() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo Tipo Cargue es obligatorio");
							}
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Tipo Cargue s&oacute;lo puede ser alfabetico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Tipo Cargue no puede ser nulo");
						}
						
//SWIFT/ABA Intermediario
						try {
							Pattern pattern = Pattern.compile("^[A-Za-z0-9]+$");
							String valorSwiftAbaIntermediario = null;
							try{
								valorSwiftAbaIntermediario = row.getCell(swiftAbaIntermediarioColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorSwiftAbaIntermediario == null){
								valorSwiftAbaIntermediario = String.valueOf((int) row.getCell(swiftAbaIntermediarioColumn).getNumericCellValue());
							}
							
							if(!pattern.matcher(valorSwiftAbaIntermediario).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo SWIFT ABA Intermediario s&oacute;lo puede ser alfanum&eacute;rico");
							}else{
								registroCargueMasivoMonetizacion.setCodigoSwiftIntermediario(valorSwiftAbaIntermediario);
							}
							
							CodigoSwift codigoIntermediario = com.osmosyscol.divisas.logica.dtos.servicios.CodigoSwiftServicio.getInstance().obtenerSwiftPorCodigoSwift(registroCargueMasivoMonetizacion.getCodigoSwiftIntermediario());
							
							if(codigoIntermediario!=null){
								registroCargueMasivoMonetizacion.setCodigoSwiftIntermediario(valorSwiftAbaIntermediario);
								registroCargueMasivoMonetizacion.setPaisIntermediario(codigoIntermediario.getPais());
								registroCargueMasivoMonetizacion.setCiudadIntermediario(codigoIntermediario.getCiudad());
							}else{
								errores.add("Registro " + row.getRowNum() + ":"
										+ "Verifique el campo SWIFT/ABA Intermediario ya que no es el correcto o no se encuentra parametrizado");
							}
							
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo SWIFT ABA Intermediario s&oacute;lo puede ser alfanum&eacute;rico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo SWIFT ABA Intermediario no puede ser nulo");
						}
						
//Cuenta Receptora
						try {
							Pattern pattern = Pattern.compile("^[0-9]+$");
							String valorCuentaReceptora = null;
							try{
								valorCuentaReceptora = row.getCell(cuentaReceptoraColumn).getStringCellValue();
							}catch(Exception exception){
							}
							
							if(valorCuentaReceptora == null){
								valorCuentaReceptora = String.valueOf((int) row.getCell(cuentaReceptoraColumn).getNumericCellValue());
							}
							
							if(!pattern.matcher(valorCuentaReceptora).matches()) {
								errores.add("Registro " + row.getRowNum() + ":"
										+ " El campo Cuenta Receptora s&oacute;lo puede ser num&eacute;rico");
							}else{
								registroCargueMasivoMonetizacion.setCuentaReceptora(valorCuentaReceptora);
							}
							
							if(row.getCell(cuentaReceptoraColumn).getCellType() == Cell.CELL_TYPE_BLANK || 
									registroCargueMasivoMonetizacion.getCuentaReceptora() == null){
								errores.add("Registro " + row.getRowNum() + ":" + " El campo Cuenta Receptora es obligatorio");
							}else{
								List<BancoCorresponsal> listadoCuentaReceptor = com.osmosyscol.divisas.logica.dtos.servicios.BancoCorresponsalServicio.getInstance().obtenerBancoCorresponsalCuentaReceptor(registroCargueMasivoMonetizacion.getIdMoneda());
								if(listadoCuentaReceptor != null && !listadoCuentaReceptor.isEmpty()){
									
									for(BancoCorresponsal bancoCorresponsalLeido : listadoCuentaReceptor){
										if(bancoCorresponsalLeido.getCuenta().equals(registroCargueMasivoMonetizacion.getCuentaReceptora())){
											registroCargueMasivoMonetizacion.setCuentaReceptora(valorCuentaReceptora);
											registroCargueMasivoMonetizacion.setBancoCorresponsal(bancoCorresponsalLeido.getCuentaContable());
										}
									}
									CodigoSwift codigoSwiftBancoCorresponsal = com.osmosyscol.divisas.logica.dtos.servicios.CodigoSwiftServicio.getInstance().obtenerCodigoSwiftPorBancoCorresponsal(registroCargueMasivoMonetizacion.getBancoCorresponsal(), registroCargueMasivoMonetizacion.getIdMoneda());
									if(codigoSwiftBancoCorresponsal != null){
										registroCargueMasivoMonetizacion.setCiudadReceptor(codigoSwiftBancoCorresponsal.getCiudad());
										registroCargueMasivoMonetizacion.setPaisReceptor(codigoSwiftBancoCorresponsal.getPais());
										registroCargueMasivoMonetizacion.setCodigoSwiftReceptor(codigoSwiftBancoCorresponsal.getSwift());
									}else{
										errores.add("Registro " + row.getRowNum() + ":"
												+ "Verifique el Cuenta Receptora ya que no es el correcto o no se encuentra parametrizado");
									}
								}else{
									errores.add("Registro " + row.getRowNum() + ":"
											+ "Verifique el Cuenta Receptora ya que no es el correcto o no se encuentra parametrizado");
								}
							}
						} catch (IllegalStateException illegalStateException) {
							illegalStateException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Cuenta Receptora s&oacute;lo puede ser num&eacute;rico");
						} catch(NullPointerException nullPointerException){
							nullPointerException.printStackTrace();
							errores.add("Registro "+row.getRowNum()+":"+
									"Verifique el campo Cuenta Receptoran no puede ser nulo");
						}
					}else{
						break;
					}
				}
				registros.add(registroCargueMasivoMonetizacion);
			}
			
			if(registros.isEmpty()){
				errores.add("El archivo no tiene ningun registro");
			}
			
		}catch(Exception exceptionCargarCamposDesdeExcel){
			exceptionCargarCamposDesdeExcel.printStackTrace();
			errores.add("Ha ocurrido un problema con la carga del arhivo Excel");
		}
		respuesta.put("registros", registros);
		respuesta.put("errores", errores);
		return respuesta;
	}
}