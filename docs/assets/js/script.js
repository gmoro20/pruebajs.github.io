// Define la función delete
function resetForm() {
    document.getElementById('reservaForm').reset();
};

// Define la función send
function send() {
	Telegram.WebApp.sendData("hola");
};
