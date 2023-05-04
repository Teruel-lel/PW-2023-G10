let usuarios = [];
let usuariosPorPagina = 6;
let pagina = 1;
let ultimaPagina
let contenedor = document.getElementById("usuarios");
let usuariosLength = 0;

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

function crearUsuario(nombreUsuario){
    const usuarios = document.getElementById("usuarios");

    const contenedorUsuarios = document.createElement("div");
    contenedorUsuarios.classList.add("contenedor-usuarios");

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    div1.classList.add("iconos");
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
    p.textContent = nombreUsuario;

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
        let usuario = usuarios[i];
        if(usuario) crearUsuario(usuario.nombre);
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

/* POP UP */

const abrirPopUp= document.getElementById('nuevoUsuario');
const cancelar= document.getElementById('cancelar');
const popup = document.querySelector("dialog");

abrirPopUp.addEventListener('click', () => {
    popup.showModal();
})

function cerrar(){
    popup.close();
}
cancelar.addEventListener('click',cerrar);



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