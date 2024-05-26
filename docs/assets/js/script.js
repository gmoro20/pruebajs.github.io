// Define la función delete
function resetForm() {
    document.getElementById('reservaForm').reset();
};

// Define la función send
function send() {
	try {
	    const data = {
	        "instalacion": document.getElementById('instalacion').value,
		"deporte": document.getElementById('deporte').value,
		"campo": document.getElementById('campo').value,
		"fecha": document.getElementById('fecha').value		
	    	};
		Telegram.WebApp.sendData(JSON.stringify(data));
	} catch (error) {
	    // Captura cualquier excepción que ocurra y maneja el error
	    Telegram.WebApp.sendData("Se ha producido un error:", error);
	}
};
