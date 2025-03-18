// Define la función delete
function resetForm() {
    document.getElementById('reservaForm').reset();
};

// Define la función send
function send() {
	const formData = {
		"instalacion": document.getElementById('installation').value,
		"deporte": document.getElementById('sport').value,
		"campo": document.getElementById('court').value,
		// "luz": document.getElementById("ligth").checked ? true : false,
		"fecha": document.getElementById("date").value,
		"hora": document.getElementById("hour").value,
		"usuario": document.getElementById("user").value,
		"contraseña": document.getElementById("password").value,
		"payMethod": document.getElementById("bizum").checked ? document.getElementById("bizum").value : document.getElementById("card").value
	}

	completed = true
	for (var key in formData) {
		if (formData.hasOwnProperty(key) && formData[key] === "") {
			console.log("El campo '" + key + "' está vacío.");
			completed = false;
		}
	}
	if (!completed) {
		alert("Por favor, completa todos los campos.");
	}

	const datetime = new Date(`${formData["fecha"]}T${formData["hora"]}`);
	if (datetime.setDate(datetime.getDate() - 2) < new Date() && completed) {
		if (datetime.setDate(datetime.getDate() + 2) < new Date()) {
			alert('Ya se ha pasado la hora de esta reserva.')
		}
		else {
			alert('Esta reserva ya se puede hacer desde la pagina si sigue libre.')
		}
		completed = false
	} 

	if (completed) {
		const dDAT = {
			"datetime": `${formData["fecha"]}T${formData["hora"]}`,
			"cookie": "qb2axki4npctpgu1xkz0wxdt",
			"bookData": {
				"installation": infoBk[formData["instalacion"]]['id'],
				"sport": infoBk[formData["instalacion"]]["sport"][formData["deporte"]]['id'],
				"court": infoBk[formData["instalacion"]]["sport"][formData["deporte"]]['court'][formData["campo"]],
				"light": false // formData["luz"]
			},
			"account": {
				"user": formData["usuario"],
				"pass": formData["contraseña"]
			},
			"payMethod": formData["payMethod"],
			"email": false,
			"browser": false
		};
		Telegram.WebApp.sendData(JSON.stringify(dDAT));
	};
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
		courtSelect.innerHTML = '';
		courts.forEach(court => {
			const option = document.createElement('option');
			option.value = court;  
			option.textContent = court; 
			courtSelect.appendChild(option);
		});	
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
