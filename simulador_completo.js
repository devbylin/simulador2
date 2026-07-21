
  let clientes = [];
  let creditos = [];
 
  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, 
// puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("creditos").classList.remove("activa");
  document.getElementById("listaCreditos").classList.remove("activa");
}
function mostrarSeccionParametros(parametros){
  ocultarSecciones();
 document.getElementById("parametros").classList.add("activa");
}
function mostrarSeccionClientes(clientes){
  ocultarSecciones();
  document.getElementById("clientes").classList.add("activa");
}
function mostrarSeccionCreditos(creditos){
  ocultarSecciones()
  document.getElementById("creditos").classList.add("activa");
}
function mostrarSeccionHistCreditos(listaCreditos){
  ocultarSecciones()
  document.getElementById("listaCreditos").classList.add("activa");
}
function guardarTasa(){
  let valor = recuperarFloat("tasaInteres");

  if(valor < 10 || valor > 20){
    mostrarTexto('mensajeTasa','La tasa debe estar entre 10% y 20%');
    return;
  }
  tasaInteres = valor;
  mostrarTexto("mensajeTasa", "Tasa de interés guardada: " + tasaInteres + "%");
}
function guardarCliente(){
  let cedula = recuperarTexto("txtCedula");
  let nombre = recuperarTexto("txtNombre");
  let apellido = recuperarTexto("txtApellido");
  let ingresos = recuperarInt("txtIngresos");
  let egresos = recuperarInt("txtEgresos");


  if(cedula == "" || nombre == "" || apellido == ""){
    alert("Cedula, nombre y apellido son obligatorios");
    return;
  }
  if(isNaN (ingresos) || ingresos < 0){
    alert("Ingresa una valor valido para ingresos");
    return;
  }
  if(isNaN (egresos) || egresos < 0){
    alert("Ingresa una valor valido para egresos");
    return;
  }
  if(clienteSeleccionado != null){
    clienteSeleccionado.nombre = nombre;
    clienteSeleccionado.apellido = apellido;
    clienteSeleccionado.ingresos = ingresos;
    clienteSeleccionado.egresos = egresos;

    alert("Cliente actualizado correctamente");
  }else{
    let clienteExistente = buscarCliente(cedula);
    if(clienteExistente != null){
      alert("Cedula ya existe en los registros");
      return;
    }
  
    let nuevoCliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos,
  };
    clientes.push(nuevoCliente);
    alert("Cliente agregado correctamente");
  }
    limpiar();  
    pintarTablaClientes();
}
function pintarTablaClientes() {
  let cmpTabla = document.getElementById("tablaClientes");
  let contenidoTabla = "";

    // Recorrer clientes
  for (let i = 0; i < clientes.length; i++) {
    let cliente = clientes[i];
    contenidoTabla += `
    <tr>
        <td>${cliente.cedula}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.ingresos}</td>
        <td>${cliente.egresos}</td>
        <td>
          <button onclick="seleccionarCliente('${cliente.cedula}')">Actualizar</button> 
        </td>
    </tr>`;
  }
  contenidoTabla += `
    </tbody>
    </table>`;
  cmpTabla.innerHTML = contenidoTabla;
  pintarCreditos(creditos);
}
function buscarCliente(cedula){
  for(let i = 0; i < clientes.length; i++){
    if(clientes[i].cedula == cedula){
      return clientes[i];
    }
  }
  return null;
}
function seleccionarCliente(cedula){
  let cliente = buscarCliente(cedula);
    if(cliente == null){
      alert("Cliente  con cedula " + cedula + "no encontrado");
      return;
    }
  clienteSeleccionado = cliente;

  mostrarTextoEnCaja("txtCedula", cliente.cedula);
  mostrarTextoEnCaja("txtNombre", cliente.nombre);
  mostrarTextoEnCaja("txtApellido", cliente.apellido);
  mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
  mostrarTextoEnCaja("txtEgresos", cliente.egresos);

  document.getElementById("txtCedula").readOnly = true;

  let btnGuardar = document.getElementById("btnGuardarCliente");
  if(btnGuardar != null){
    btnGuardar.innerText = "Actualizar cliente";
  }
  
}
function limpiar() {
    document.getElementById("txtCedula").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";

   // Se restablece el campo cédula y el texto del botón al estado inicial
    document.getElementById("txtCedula").readOnly = false;

    let btnGuardar = document.getElementById("btnGuardarCliente");
    if(btnGuardar != null){
      btnGuardar.innerText = "Guardar cliente";
    }
 
    clienteSeleccionado = null;
   
}
function buscarClienteCredito(){
  let cedula = recuperarTexto("buscarCedulaCredito").trim();
  let cliente = buscarCliente(cedula);
  let cmpDatos = document.getElementById("datosClienteCredito");
  let cmpResultado = document.getElementById("resultadoCredito");

  cmpResultado.innerHTML = "";
  cmpResultado.className = "";
  document.getElementById("btnSolicitarCredito").disabled = true;

 if(cliente != null){
  clienteSeleccionado = cliente; 

  cmpDatos.innerHTML = `
    <h3>Datos del Cliente</h3>
    <p><strong>Cédula:</strong> ${cliente.cedula}</p>
    <p><strong>Nombre:</strong> ${cliente.nombre}</p>
    <p><strong>Apellido:</strong> ${cliente.apellido}</p>
    <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
    <p><strong>Egresos:</strong> ${cliente.egresos}</p>
    <p><strong>Disponible:</strong> $${calcularDisponible(cliente.ingresos, cliente.egresos)}</p>
  `;
  document.getElementById("btnSolicitarCredito").disabled = false;
 }else{
   clienteSeleccionado = null;
   cmpDatos.innerHTML = "<p>Cliente no encontrado.</p>";
 }
}
function calcularCredito() {
    let cmpResultado = document.getElementById("resultadoCredito");
    let cmpBtnSolicitar = document.getElementById("btnSolicitarCredito");

    // Limpiar resultado anterior
    cmpResultado.innerHTML = "";
    cmpResultado.className = "";

    // Validar que haya un cliente seleccionado
    if (clienteSeleccionado === null) {
        cmpResultado.innerHTML = "<p style='color: #f59e0b;'>⚠️ Primero busca un cliente</p>";
        return;
    }

    // Obtener valores del formulario
    let monto = recuperarFloat("montoCredito");
    let plazoMeses = recuperarFloat("plazoCredito");

    // Validar campos
    if (isNaN(monto) || monto <= 0) {
        cmpResultado.innerHTML = "<p style='color: #ef4444;'>❌ Ingresa un monto válido</p>";
        return;
    }

    if (isNaN(plazoMeses) || plazoMeses <= 0) {
        cmpResultado.innerHTML = "<p style='color: #ef4444;'>❌ Ingresa un plazo válido (meses)</p>";
        return;
    }

    // 1. Calcular disponible (ingresos - egresos)
    let disponible = calcularDisponible(clienteSeleccionado.ingresos, clienteSeleccionado.egresos);

    // 2. Calcular capacidad de pago (30% del disponible)
    let capacidadPago = calcularCapacidadPago(disponible);

    // 3. Calcular interés simple
    let plazoAnios = plazoMeses / 12;
    let interes = calcularInteresSimple(monto, tasaInteres, plazoAnios);

    // 4. Calcular total del préstamo
    let totalPrestamo = calcularTotalPrestamo(monto, interes);

    // 5. Calcular cuota mensual
    let cuotaMensual = calcularCuotaMensual(totalPrestamo, plazoAnios);

    // 6. Aprobar o rechazar
    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);

    // Guardar valores calculados (para solicitar crédito)
    cuotaCalculada = cuotaMensual;
    montoCalculado = totalPrestamo;
    plazoCalculado = plazoMeses;
    creditoAprobado = aprobado;

    // 7. Mostrar resultado
    if (aprobado) {
        cmpResultado.className = "aprobado";
        cmpResultado.innerHTML = `
            <h3>✅ CRÉDITO APROBADO</h3>
            <p><strong>Capacidad de pago:</strong> $${capacidadPago.toFixed(2)}</p>
            <p><strong>Total a pagar:</strong> $${totalPrestamo.toFixed(2)}</p>
            <p><strong>Cuota mensual:</strong> $${cuotaMensual.toFixed(2)}</p>
            <p style="color: #22c55e; font-weight: bold;">🎉 El crédito ha sido aprobado</p>
        `;
        cmpBtnSolicitar.disabled = false;
    } else {
        cmpResultado.className = "rechazado";
        cmpResultado.innerHTML = `
            <h3>❌ CRÉDITO RECHAZADO</h3>
            <p><strong>Capacidad de pago:</strong> $${capacidadPago.toFixed(2)}</p>
            <p><strong>Total a pagar:</strong> $${totalPrestamo.toFixed(2)}</p>
            <p><strong>Cuota mensual:</strong> $${cuotaMensual.toFixed(2)}</p>
            <p style="color: #ef4444; font-weight: bold;">❌ El crédito ha sido rechazado</p>
        `;
        cmpBtnSolicitar.disabled = true;
    }
}
function solicitarCredito() {
    if (clienteSeleccionado === null) {
        alert("⚠️ Primero busca un cliente");
        return;
    }

    if (!creditoAprobado) {
        alert("⚠️ El crédito no está aprobado");
        return;
    }

    // Crear objeto de crédito
    let nuevoCredito = {
        cedula: clienteSeleccionado.cedula,
        nombre: clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoCalculado,
        cuota: cuotaCalculada,
        estado: "Aprobado"
    };
    // Agregar al arreglo de créditos
    creditos.push(nuevoCredito);

    alert("✅ Crédito solicitado correctamente");
   

    // Limpiar campos
    document.getElementById("montoCredito").value = "";
    document.getElementById("plazoCredito").value = "";
    document.getElementById("mensajeTasa").value = "";
    document.getElementById("resultadoCredito").innerHTML = "";
    document.getElementById("resultadoCredito").className = "";
    document.getElementById("btnSolicitarCredito").disabled = true;
}
function buscarCreditos(cedula){
    let creditosCliente = [];
    for(let i = 0; i < creditos.length; i++){
      if(creditos[i].cedula == cedula){
        creditosCliente.push(creditos[i]);
      }
    }
    return creditosCliente;
}
function pintarCreditos(creditos){
  let cmpTabla = document.getElementById("tablaCreditos");

  if(!cmpTabla){
  console.error("no se encontro el elemento con id 'tablaCreditos'");
  return;
  }
  if(!creditos || creditos.length == 0){
    cmpTabla.innerHTML = `
      <tr>
          <td colspan="7" style="text-align: center; padding: 30px; color: #94a3b8;">
              📋 No hay créditos registrados
          </td>
      </tr>
    `;
    return
  }
  let contenidoTabla = "";
  for(let i = 0; i < creditos.length; i++){
    let credito = creditos[i];
    let colorEstado = credito.estado == "Aprobado" ? "#22c55e" : "#ef4444";

  contenidoTabla += `
    <tr>
        <td>${credito.cedula}</td>
        <td>${credito.nombre}</td>
        <td>${credito.apellido}</td>
        <td>$${credito.monto.toFixed(2)}</td>
        <td>${credito.tasa}%</td>
        <td>${credito.plazo} meses</td>
        <td>$${credito.cuota.toFixed(2)}</td>
    </tr>
  `;
  }
  cmpTabla.innerHTML = contenidoTabla;
}
function buscarCreditosCliente(){

  let cedula = recuperarTexto("buscarCedulaCredito").trim();
    if (cedula === "") {
        alert("⚠️ Ingresa una cédula para buscar sus créditos");
        return;
    }
    let creditosEncontrados = buscarCreditos(cedula);
    pintarCreditos(creditosEncontrados);
}