
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
}
function mostrarSeccionParametros(parametros){
  ocultarSecciones();
 document.getElementById("parametros").classList.add("activa");
}
function mostrarSeccionClientes(clientes){
  ocultarSecciones();
  document.getElementById("clientes").classList.add("activa");
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
  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
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
//pintar tabla cliente
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

