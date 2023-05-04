var estadoTemperatura = 'pulsado'
var estadoSalinidad = 'pulsado'
var estadoHumedad = 'pulsado'
var estadoLuminosidad = 'pulsado'
var estadoPH = 'pulsado'



function mostrarHumedad() {
    if(estadoHumedad =='sinpulsar') {
        estadoHumedad = 'pulsado'
        document.getElementById('botonhumedad').style.background = '#AAAAAA'
        document.getElementById('GraficaHumedad').style.visibility = 'visible';
    }
    else if(estadoHumedad == 'pulsado') {
        estadoHumedad = 'sinpulsar'
        document.getElementById('botonhumedad').style.background = '#FFFFFF'
        document.getElementById('GraficaHumedad').style.visibility = 'hidden';
    }
}

function mostrarSalinidad() {
    if(estadoSalinidad =='sinpulsar') {
        estadoSalinidad = 'pulsado'
        document.getElementById('botonsalinidad').style.background = '#AAAAAA'
        document.getElementById('GraficaSalinidad').style.visibility = 'visible';
    }
    else if(estadoSalinidad == 'pulsado') {
        estadoSalinidad = 'sinpulsar'
        document.getElementById('botonsalinidad').style.background = '#FFFFFF'
        document.getElementById('GraficaSalinidad').style.visibility = 'hidden';
    }
}

function mostrarTemperatura() {
    if(estadoTemperatura =='sinpulsar') {
        estadoTemperatura = 'pulsado'
        document.getElementById('botontemperatura').style.background = '#AAAAAA'
        document.getElementById('GraficaTemperatura').style.visibility = 'visible';
    }
    else if(estadoTemperatura == 'pulsado') {
        estadoTemperatura = 'sinpulsar'
        document.getElementById('botontemperatura').style.background = '#FFFFFF'
        document.getElementById('GraficaTemperatura').style.visibility = 'hidden';
    }
}


function mostrarLuminosidad() {
    if(estadoLuminosidad =='sinpulsar') {
        estadoLuminosidad = 'pulsado'
        document.getElementById('botonluminosidad').style.background = '#AAAAAA'
        document.getElementById('GraficaLuminosidad').style.visibility = 'visible';
    }
    else if(estadoLuminosidad == 'pulsado') {
        estadoLuminosidad = 'sinpulsar'
        document.getElementById('botonluminosidad').style.background = '#FFFFFF'
        document.getElementById('GraficaLuminosidad').style.visibility = 'hidden';
    }

}

function mostrarPH(){
    if(estadoPH =='sinpulsar') {
        estadoPH = 'pulsado'
        document.getElementById('botonph').style.background = '#AAAAAA'
        document.getElementById('GraficaPH').style.visibility = 'visible';
    }
    else if(estadoPH == 'pulsado') {
        estadoPH = 'sinpulsar'
        document.getElementById('botonph').style.background = '#FFFFFF'
        document.getElementById('GraficaPH').style.visibility = 'hidden';
    }

}