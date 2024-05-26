// Define la función delete
function resetForm() {
    document.getElementById('reservaForm').reset();
};

// Define la función send
function send() {
	const data = {
        "instalacion": document.getElementById('instalacion').value,
		"deporte": document.getElementById('deporte').value,
		"campo": document.getElementById('campo').value,
		"fecha": document.getElementById('fecha').value		
    };
	const jsonData = JSON.stringify(data);
    Telegram.WebApp.sendData(JSON.stringify(data))
}