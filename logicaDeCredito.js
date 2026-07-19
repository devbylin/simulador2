//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
//Calcular el dinero disponible despues de restar egresos

function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    
    if (disponible < 0) {
        return 0;
    }
    
    return disponible;
}
function calcularCapacidadPago(montoDisponible){
    
    let capacidad = montoDisponible * 0.3;
    return capacidad;

}
function calcularInteresSimple(monto, tasa, plazoAnios){

    if (!monto || !tasa || !plazoAnios) return 0;
    return monto * (tasa / 100) * plazoAnios;
    
}
function calcularTotalPrestamo(monto, interes) {

    return monto + interes + 100;
}
function calcularCuotaMensual(totalPrestamo, plazoAnios) {

    if (plazoAnios <= 0) return 0;
    return totalPrestamo / (plazoAnios * 12);
}
function aprobarCredito(capacidadPago, cuotaMensual){
    
    if(capacidadPago > cuotaMensual){
        return true;
    }else{
        return false;
    }
}