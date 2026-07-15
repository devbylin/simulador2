
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
  let nuevoCliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos,
  };
  clientes.push(nuevoCliente);

  alert("Cliente agregado correctamente");
    
    pintarTablaClientes();  
}

//pintar tabla cliente
function pintarTablaClientes() {
    let cmpTabla = document.getElementById("tablaClientes");
    // Crear tabla con encabezados
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
                    <button onclick="cargarCliente(${i})">Actualizar</button> 
                </td>
            </tr>
        `;
    }

    contenidoTabla += `
            </tbody>
        </table>
    `;

    cmpTabla.innerHTML = contenidoTabla;
}
