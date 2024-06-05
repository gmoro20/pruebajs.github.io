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
	Telegram.WebApp.sendData(JSON.stringify(data));
};

function updateCourts(infoBk) {
	// Cargar estado
	const installationSelect = document.getElementById('installation');
	const sportSelect = document.getElementById('sport');
	const courtSelect = document.getElementById('court');
	const courtWrapper = document.getElementById('courtWrapper');
	
	// Mostrar u ocultar el campo de selección dependiendo del deporte seleccionado
	const courts = Object.keys(infoBk[installationSelect.value]["sport"][sportSelect.value]["court"]);
	
	if (courts.length > 1) {
		courtWrapper.style.display = 'block';
		courtSelect.innerHTML = '';
		courts.forEach(court => {
                    const option = document.createElement('option');
                    option.value = court;  
                    option.textContent = court; 
                    courtSelect.appendChild(option);
                });		
	} else {
		courtWrapper.style.display = 'none';
	}
};

function updateSports(infoBk) {
	// Cargar estado
	const installationSelect = document.getElementById('installation');
	const sportSelect = document.getElementById('sport');
	
	// Actualizar campo y desportes en funcion seleccion instalcion
	const sports = Object.keys(infoBk[installationSelect.value]["sport"]);

	sportSelect.innerHTML = '';

	sports.forEach(sport => {
		const option = document.createElement('option');
		option.value = sport;
		option.textContent = sport;
		sportSelect.appendChild(option);
	});

	updateCourts(infoBk);
};

document.addEventListener('DOMContentLoaded', function() {
	// Lee el archivo JSON y actualiza las opciones
	fetch('./static/infoBK.json')
		.then(response => response.json())
		.then(data => {
			infoBk = data;
			
			// Inicializa las opciones de instalaciones
			const installations = Object.keys(infoBk);
			installations.forEach(installation => {
				const option = document.createElement('option');
				option.value = installation;
				option.textContent = installation;
				installationSelect.appendChild(option);
			});
			
			// Inicializar las opciones de deportes y campos cuando se carga la página
			updateSports(infoBk);

		});

	// Leyendo estado
	const installationSelect = document.getElementById('installation');
	const sportSelect = document.getElementById('sport');

	// Agregar el evento de cambio de selección de instalación
	installationSelect.addEventListener('change', () => {updateSports(infoBk);});

	// Agregar el evento de cambio de selección de deporte
	sportSelect.addEventListener('change', () => {updateCourts(infoBk);});
});