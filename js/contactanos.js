
document.getElementById("boton-enviar").addEventListener('click',(event)=>{
            
    const input = document.getElementById("nombre")
        if(input.value.length > 20 || input.value.length < 6 ){
                    
            event.preventDefault();
            input.setCustomValidity("Deben ser más de 6 y menos de 20 caracteres");
            input.reportValidity()
        }else{
            popup.showModal();
        }
})
            
document.getElementById("nombre").addEventListener("keydown",
    (event) => {
    console.log(event.target);
    event.target.setCustomValidity("");
    event.target.reportValidity();
})

const boton= document.getElementById('boton-enviar');
const enviar= document.getElementById('enviar');
const popup = document.querySelector("dialog");

function cerrar(){
    popup.close();
}

enviar.addEventListener('click',cerrar);
