let campos = [];
let datos = []
let camposPorPagina = 3;
let camposLength = 0;
let pagina;
let ultimaPagina;
let idBorrar;
let idEditar;

const contenedorCampos = document.getElementById("campos");

const popupEliminar = document.getElementById("popupEliminarCampo");
const cancelarEliminar = document.getElementById("cancelarEliminar");
popupEliminar.style.display="none";

const popupNuevoCampo = document.getElementById("popupNuevoCampo");
const cancelarNuevo = document.getElementById("cancelarNuevo");
popupNuevoCampo.style.display="none";

const popupEditarNombreCampo = document.getElementById("popupEditarNombreCampo");
const cancelarEditar = document.getElementById("cancelarEditar");
popupEditarNombreCampo.style.display="none";

const popupEditarUsuario = document.getElementById("popupEditarPerfil");
const cancelarEditarUsuario = document.getElementById("cancelarEditarUsuario");
popupEditarUsuario.style.display="none";


(async () => {
    if(localStorage.getItem("campos") === null){
        const respuesta = await fetch('json/campos.json');
        campos = await respuesta.json();
    }
    else{
        const data = localStorage.getItem("campos");
        campos = JSON.parse(data);
    }

    const data2 = localStorage.getItem("datosUsuario")
    datos = JSON.parse(data2);
    console.log(datos);

    cargarDatosUsuario();

    camposLength = campos.length;
    console.log(campos);

    if(window.innerWidth <= 900){
        camposPorPagina = 3;
    }
    if(window.innerWidth > 900){
        camposPorPagina = 6;
    }

    cambiarPagina("inicio");
})();

function crearCampo(campo){
    const divPrincipal = document.createElement("div");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    const h3 = document.createElement("h3");

    divPrincipal.classList.add("contenedor-campos");
    div1.classList.add("nombre-huerto");
    div2.classList.add("iconos");

    img1.setAttribute("src", "images/icono-editar.svg");
    img1.setAttribute("alt", "editar");
    img1.setAttribute("onclick", "editarCampo("+campo.id+")");

    img2.setAttribute("src", "images/icono-borrar.svg");
    img2.setAttribute("alt", "borrar");
    img2.setAttribute("onclick", "borrarCampo("+campo.id+")");

    h3.setAttribute("id", "salida");
    h3.textContent = campo.nombre;

    div1.appendChild(h3);
    div2.appendChild(img1);
    div2.appendChild(img2);
    divPrincipal.appendChild(div1);
    divPrincipal.appendChild(div2);

    contenedorCampos.appendChild(divPrincipal);
}

function cargarDatosUsuario(){
    document.getElementById("nombre").textContent = datos[0].nombre;
    document.getElementById("mail").textContent = datos[0].mail;
    document.getElementById("tel").textContent = datos[0].tel;
}

function cambiarPagina(metodo){
    let contenedorCampos = document.getElementById("campos");

    ultimaPagina = Math.ceil(camposLength / camposPorPagina);

    if(metodo === "inicio"){
        pagina = 1;
    }
    else if (metodo === "anterior" && pagina>1){
        pagina--;
    }
    else if (metodo === "siguiente" && pagina<ultimaPagina){
        pagina++;
    }
    else if(metodo === "actual"){
    }

    mostrarOcultarIconos();

    contenedorCampos.innerHTML = "";
    let inicio = (pagina - 1) * camposPorPagina;
    for(let i = inicio; i<inicio + camposPorPagina; i++){
        if(campos[i]) crearCampo(campos[i]);
    }

    const textoPaginas = document.getElementById("textoPaginas");
    textoPaginas.textContent = "Página "+pagina+" de "+ultimaPagina;
}

function mostrarOcultarIconos(){
    const iconoAnterior = document.getElementById("anterior");
    const iconoSiguiente = document.getElementById("siguiente");

    if(pagina === 1){
        iconoAnterior.classList.add("noVisible");
        if(ultimaPagina === pagina){
            iconoSiguiente.classList.add("noVisible");
        }
        else {
            iconoSiguiente.classList.remove("noVisible");
        }
    }
    if(pagina === ultimaPagina){
        iconoSiguiente.classList.add("noVisible");
        if(ultimaPagina>1){
            iconoAnterior.classList.remove("noVisible");
        }
    }
    if(pagina>1 && pagina<ultimaPagina){
        iconoAnterior.classList.remove("noVisible");
        iconoSiguiente.classList.remove("noVisible");
    }
}

window.addEventListener("resize", redimension);
function redimension(){

    console.log(window.innerWidth);

    if(window.innerWidth <= 900){
        console.log("TEST");
        camposPorPagina = 3;
        cambiarPagina("actual");
    }
    if(window.innerWidth > 900){
        camposPorPagina = 6;
        cambiarPagina("actual");
    }
}

/* --------------------------------------------------------*/
/* BORRAR CAMPO -------------------------------------------*/
cancelarEliminar.addEventListener("click", () => {
    popupEliminar.close();
    popupEliminar.style.display="none";
})

function borrarCampo(id){
    console.log(id);
    idBorrar = id;
    popupEliminar.showModal();
    popupEliminar.style.display="block";
}

function aceptarEliminar(){
    let cordArray;
    for(let i = 0; i < camposLength; i++){
        if(campos[i].id === idBorrar){
            cordArray = i;
        }
    }
    campos.splice(cordArray, 1);
    const newCampos = JSON.stringify(campos);
    localStorage.setItem("campos", newCampos);
}
/* --------------------------------------------------------*/
/* --------------------------------------------------------*/


/* --------------------------------------------------------*/
/* NUEVO CAMPO --------------------------------------------*/
cancelarNuevo.addEventListener("click", () => {
    popupNuevoCampo.close();
    popupNuevoCampo.style.display="none";
})
function nuevoCampo(){
    popupNuevoCampo.showModal();
    popupNuevoCampo.style.display="block";
}

function aceptarNuevo(){
    const nombre = document.getElementById("nombreCampo");

    let nuevoCampo = {
        id: campos.length + 1,
        nombre: nombre.value
    }

    campos.push(nuevoCampo);
    const newCampos = JSON.stringify(campos);
    localStorage.setItem("campos", newCampos);
}
/* --------------------------------------------------------*/
/* --------------------------------------------------------*/


/* --------------------------------------------------------*/
/* EDITAR CAMPO -------------------------------------------*/
cancelarEditar.addEventListener("click", () => {
    popupEditarNombreCampo.close();
    popupEditarNombreCampo.style.display="none";
})
function editarCampo(id){
    console.log(id),
    idEditar = id;
    popupEditarNombreCampo.showModal();
    popupEditarNombreCampo.style.display="block";
}
function aceptarEditar(){
    const nuevoNombre = document.getElementById("nuevoNombre");

    campos.forEach(campo => {
        if(campo.id === idEditar){
            campo.nombre = nuevoNombre.value;
        }
    })

    const newCampos = JSON.stringify(campos);
    localStorage.setItem("campos", newCampos);
}
/* --------------------------------------------------------*/
/* --------------------------------------------------------*/


/* --------------------------------------------------------*/
/* EDITAR USUARIO -----------------------------------------*/
cancelarEditarUsuario.addEventListener("click", () => {
    popupEditarUsuario.close();
    popupEditarUsuario.style.display="none";
})
function editarUsuario(){
    popupEditarUsuario.showModal();
    popupEditarUsuario.style.display="block";
}

function aceptarEditarUsuario(){
    let nuevoNombre = document.getElementById("nombreUsuario");
    let nuevoEmail = document.getElementById("emailUsuario");
    let nuevoTel = document.getElementById("telefonoUsuario");

    datos = [];

    let objeto = {
        nombre: nuevoNombre.value,
        mail: nuevoEmail.value,
        tel: nuevoTel.value
    }
    datos.push(objeto);

    let newDatos = JSON.stringify(datos);
    localStorage.setItem("datosUsuario", newDatos);
}


function buscarCampo(){
    let input = document.getElementById("barraBusqueda").value;
    input = input.toLowerCase();

    let inicio = (pagina - 1) * camposPorPagina;
    let camposCumplenBusqueda = [];

    for (i = 0; i < camposLength; i++) {
        if (!campos[i].nombre.toLowerCase().includes(input)) {
        }
        else {
            camposCumplenBusqueda.push(campos[i]);
        }
    }

    ultimaPagina = Math.ceil(camposCumplenBusqueda.length / camposPorPagina);
    mostrarOcultarIconos();

    contenedorCampos.innerHTML = "";
    for(let i = inicio; i<inicio + camposPorPagina; i++){
        if(camposCumplenBusqueda[i]) crearCampo(camposCumplenBusqueda[i]);
    }
    const textoPaginas = document.getElementById("textoPaginas");
    textoPaginas.textContent = "Página "+pagina+" de "+ultimaPagina;
}