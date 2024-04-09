function mostrarTexto() {
    var textoIngresado = document.getElementById("texto").value;
    var textoMostrado = document.getElementById("textoMostrado");
    Telegram.WebApp.sendData(textoIngresado)
    textoMostrado.innerHTML = textoIngresado;
}