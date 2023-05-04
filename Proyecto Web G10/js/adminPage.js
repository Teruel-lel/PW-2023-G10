let idBorrar = 0;
let usuarios = [];
let usuariosPorPagina = 6;
let pagina = 1;
let ultimaPagina;
let usuariosLength = 0;

let contenedor = document.getElementById("usuarios");

/* POPUP NUEVO USUARIO */
const nuevoPopUp= document.getElementById('nuevoUsuario');
const cancelarNuevo= document.getElementById('cancelarNuevo');
const popupNuevo = document.getElementById("popupNuevoUsuario");
popupNuevo.style.display="none";

/* POPUP ELIMINAR USUARIO */
const cancelarEliminar= document.getElementById('cancelarEliminar');
const popupEliminar = document.getElementById("popupEliminarUsuario");
popupEliminar.style.display="none";

(async () => {
    if(localStorage.getItem("usuarios") === null){
        const respuesta = await fetch('testeo.json');
        usuarios = await respuesta.json();
    }
    else{
        const data = localStorage.getItem("usuarios");
        usuarios = JSON.parse(data);
    }

    usuariosLength = usuarios.length;
    console.log(usuarios);

    if(window.innerWidth <= 900){
        usuariosPorPagina = 6;
    }
    if(window.innerWidth > 900){
        usuariosPorPagina = 12;
    }

    ultimaPagina = Math.ceil(usuariosLength / usuariosPorPagina);
    cambiarPagina("inicio");
})();

function crearUsuario(usuario){
    const usuarios = document.getElementById("usuarios");

    const contenedorUsuarios = document.createElement("div");
    contenedorUsuarios.classList.add("contenedor-usuarios");

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    div1.classList.add("iconos");
    div1.setAttribute("onclick", "redireccion()");
    div2.classList.add("icono-papelera");

    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    const p = document.createElement("p");

    img1.setAttribute("src", "images/icono-usuario.svg");
    img1.setAttribute("alt", "buscar");
    img1.classList.add("bc");
    img2.setAttribute("src", "images/icono-borrar.svg");
    img2.setAttribute("alt", "borrar");
    img2.classList.add("papelera");
    img2.setAttribute("onclick","borrarUsuario("+usuario.id+")");
    p.classList.add("nombreUsuario");
    p.textContent = usuario.nombre;

    div1.appendChild(img1);
    div1.appendChild(p);
    div2.appendChild(img2);

    contenedorUsuarios.appendChild(div1);
    contenedorUsuarios.appendChild(div2);
    usuarios.appendChild(contenedorUsuarios);
}

function cambiarPagina(metodo){

    ultimaPagina = Math.ceil(usuariosLength / usuariosPorPagina);

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

    contenedor.innerHTML = "";
    let inicio = (pagina - 1) * usuariosPorPagina;
    for(let i = inicio; i<inicio + usuariosPorPagina; i++){
        if(usuarios[i]) crearUsuario(usuarios[i]);
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
        usuariosPorPagina = 6;
        cambiarPagina("actual");
    }
    if(window.innerWidth > 900){
        usuariosPorPagina = 12;
        cambiarPagina("actual");
    }
}

/* ---------------------  POP UP NUEVO USUARIO --------------------- */

nuevoPopUp.addEventListener('click', () => {
    popupNuevo.showModal();
    popupNuevo.style.display="block";
})
cancelarNuevo.addEventListener('click', () => {
    popupNuevo.close();
    popupNuevo.style.display="none";
});

/* ----------------------------        ----------------------------- */

function crearNuevoUsuario(){
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");

    let nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: nombre.value,
        email: email.value,
        telefono: "123-456-7890"
    }

    usuarios.push(nuevoUsuario);
    const newUsuarios = JSON.stringify(usuarios);

    localStorage.setItem("usuarios",newUsuarios);
}

/* ---------------------  POP UP ELIMINAR USUARIO --------------------- */

cancelarEliminar.addEventListener("click", () => {
    popupEliminar.close();
    popupEliminar.style.display="none";
});

/* ----------------------------        ----------------------------- */
function borrarUsuario(id){
    console.log(id);
    idBorrar = id;
    popupEliminar.showModal();
    popupEliminar.style.display="block";
}
function aceptarEliminar(){
    let cordArray;
    for(let i = 0; i < usuariosLength; i++){
        if(usuarios[i].id === idBorrar){
            cordArray = i;
        }
    }
    usuarios.splice(cordArray, 1);
    const newUsuarios = JSON.stringify(usuarios);
    localStorage.setItem("usuarios",newUsuarios);
}


function redireccion(){
    location.href ="landing.html";
}

function buscarUsuario(){
    let input = document.getElementById("barraBusqueda").value;
    input = input.toLowerCase();

    let inicio = (pagina - 1) * usuariosPorPagina;
    let usuariosCumplenBusqueda = [];

    for (i = 0; i < usuariosLength; i++) {
        if (!usuarios[i].nombre.toLowerCase().includes(input)) {
        }
        else {
            usuariosCumplenBusqueda.push(usuarios[i]);
        }
    }

    ultimaPagina = Math.ceil(usuariosCumplenBusqueda.length / usuariosPorPagina);
    mostrarOcultarIconos();

    contenedor.innerHTML = "";
    for(let i = inicio; i<inicio + usuariosPorPagina; i++){
        if(usuariosCumplenBusqueda[i]) crearUsuario(usuariosCumplenBusqueda[i]);
    }
    const textoPaginas = document.getElementById("textoPaginas");
    textoPaginas.textContent = "Página "+pagina+" de "+ultimaPagina;
}



