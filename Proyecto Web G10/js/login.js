function iniciar(){

    const user = document.getElementById('usuario').value;
    const password = document.getElementById('contrasenya').value;
    const usu_err = document.getElementById('usu_err');
    const contr_err = document.getElementById('contr_err');
    const sin_usu = document.getElementById('sin_usu');
    const sin_contr = document.getElementById('sin_contr');


    function mostrar(error){    //  Función mostrar errores
        error.classList.remove("oculto");
    }

    function ocultar(error){    //  Función ocultar errores
        error.classList.add("oculto");
    }

        
    if(user != ""){             //  Ocultar error sin usuario
        ocultar(sin_usu);
    }

    if(user == ""){             //  Mostrar error sin usuario
        mostrar(sin_usu);
    }

    if(user != "user" && user != "admin" && user != ""){    //  Mostrar error usuario incorrecto
        mostrar(usu_err);
    }

    if(user == "user" || user == "admin" || user == ""){    //  Ocultar error usuario incorrecto
        ocultar(usu_err);
    }

    

    if(password != ""){             //  Ocultar error sin contraseña
        ocultar(sin_contr);
    }

    if(password == ""){             //  Mostrar error sin contraseña
        mostrar(sin_contr);
    }

    if(password != "1234" && password != ""){    //  Mostrar error contraseña incorrecto
        mostrar(contr_err);
    }
    
    if(password == "1234" || password == ""){    //  Ocultar error contraseña incorrecta
        ocultar(contr_err);
    }


    if(user == "user" && password == "1234"){   //  Si el usuario es user y la contraseña es correcta
        window.location="user.html"
    }

    if(user == "admin" && password == "1234"){  //  Si el usuario es admin y la contraseña es correcta
        window.location="admin.html"
    }


}
