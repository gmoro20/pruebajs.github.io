// Define la función delete
function delete() {
    document.getElementById('reservaForm').reset();
}
// Define la función send
function send() {
	const data = {
        "instalacion": document.getElementById('instalacion').value,
		"deporte": document.getElementById('deporte').value,
		"campo": document.getElementById('campo').value,
		"fecha": document.getElementById('fecha').value		
    }
    Telegram.WebApp.sendData(data)
}