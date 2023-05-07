const boton= document.getElementById('cerrar-sesion');
const logo=document.getElementById('logo');


        const enviar= document.getElementById('enviar-logout');
        
        const cancelar= document.getElementById('cancelar-logout');

        const popup = document.querySelector("dialog");
        popup.style.display="none";

        boton.addEventListener('click', () => {

            popup.showModal();
            popup.style.display="block";
        })
        logo.addEventListener('click', () => {

            popup.showModal();
            popup.style.display="block";
        })

        function cerrar(){
            popup.close();
            popup.style.display="none";
        }
		function redireccionar() {
            popup.close();
            popup.style.display = "none";
            location.href = 'http://mmersan.upv.edu.es/Sprint3/'; // Aquí colocas el nombre de archivo y extensión de la página a la que deseas redirigir
            }
        enviar.addEventListener('click',redireccionar);
        cancelar.addEventListener('click',cerrar);