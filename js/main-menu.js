const menu = document.getElementById("main-menu");
menu.classList.remove("activo");

document.querySelector(".hamburguesa").addEventListener(
    "click", () => {
        menu.classList.toggle("activo")
    }
)

document.querySelectorAll("#main-menu ul a").forEach(
    (enlace) => {
        enlace.addEventListener("click", () =>{
            menu.classList.remove("activo")
        })
    }
)