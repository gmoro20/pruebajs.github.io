// Define la función delete
function resetForm() {
    document.getElementById('formWrapper').reset();
};

// Define la función send
function send() {
	console.log("Aceptado")
	const formData = {
		"instalacion": document.getElementById('installation').value,
		"deporte": document.getElementById('sport').value,
		"campo": document.getElementById('court').value,
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
			"bookData": {
				"installation": formData["instalacion"],
				"sport": formData["deporte"],
				"court": formData["campo"]
			},
			"account": {
				"user": formData["usuario"],
				"pass": formData["contraseña"]
			},
			"payMethod": formData["payMethod"]
		};
		Telegram.WebApp.sendData(JSON.stringify(dDAT));
	};
};

function updateCourts() {
	// Cargar estado
	const installationSelect = document.getElementById('installation');
	const sportSelect = document.getElementById('sport');
	const courtSelect = document.getElementById('court');
	const courtWrapper = document.getElementById('courtWrapper');
	
	// Obtener los valores seleccionados
    const codigoComplejo = installationSelect.value;
    const codigoActividad = sportSelect.value;
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const fechaReserva = `${day}%2F${month}%2F${today.getFullYear()}`;
	
	fetch(`https://cms.bilbaokirolak.eus/api/ados/anon-get-listado-instalaciones-reserva?codigoComplejo=${codigoComplejo}&codigoActividad=${codigoActividad}&fechaReserva=${fechaReserva}`)
		.then(response => response.json())
		.then(data => {
			// Extraer las pistas del objeto
			const courts = Array.isArray(data.instalaciones) ? data.instalaciones : [data.instalaciones];
			
			if (courts.length > 1) {
				courtWrapper.style.display = 'block';
				courtSelect.innerHTML = '';
				courts.forEach(court => {
					const option = document.createElement('option');
					option.value = parseInt(court.codigoInstalacion.slice(-4));
					option.textContent = court.nombreInstalacion;
					courtSelect.appendChild(option);
				});
			} else {
				courtWrapper.style.display = 'none';
				courtSelect.innerHTML = '';
				courts.forEach(court => {
					const option = document.createElement('option');
					option.value = parseInt(court.codigoInstalacion.slice(-4));
					option.textContent = court.nombreInstalacion;
					courtSelect.appendChild(option);
				});
			}
		})
	.catch(error => {
		console.error('Error al cargar las pistas:', error);
	});
};

function updateSports() {
	// Cargar estado
	const installationSelect = document.getElementById('installation');
	const sportSelect = document.getElementById('sport');
	
	// Actualizar deportes en función de la selección de instalación
	const codigoComplejo = installationSelect.value;
	fetch(`https://cms.bilbaokirolak.eus/api/ados/anon-get-listado-actividades-reserva?codigoComplejo=${codigoComplejo}`)
		.then(response => response.json())
		.then(data => {
			sportSelect.innerHTML = '';
			data.forEach(actividad => {
				const option = document.createElement('option');
				option.value = actividad.codigoActividad;
				option.textContent = actividad.nombreActividad;
				sportSelect.appendChild(option);
			});
		})
		.catch(error => {
			console.error('Error al cargar las actividades:', error);
		});

	updateCourts();
};

document.addEventListener('DOMContentLoaded', function() {
	// Lee el archivo JSON y actualiza las opciones
	fetch('https://cms.bilbaokirolak.eus/api/ados/anon-get-listado-complejos-reserva')
		.then(response => response.json())
		.then(data => {
			infoBk = data;
			
			// Inicializa las opciones de instalaciones desde la API
			data.forEach(installation => {
				const option = document.createElement('option');
				option.value = installation.codigoComplejo;
				option.textContent = installation.nombreComplejo;
				installationSelect.appendChild(option);
			});
				
				// Inicializar las opciones de deportes y campos cuando se carga la página
				updateSports();
		});

	// Leyendo estado
	const installationSelect = document.getElementById('installation');
	const sportSelect = document.getElementById('sport');

	// Agregar el evento de cambio de selección de instalación
	installationSelect.addEventListener('change', () => {updateSports();});

	// Agregar el evento de cambio de selección de deporte
	sportSelect.addEventListener('change', () => {updateCourts();});
});

// Esconde teclado clicando cualquier parte 
document.addEventListener('click', event => {
	const focusedElement = document.activeElement
  
	if (focusedElement && focusedElement !== event.target && ['INPUT', 'TEXTAREA'].includes(focusedElement.tagName)) {
	  focusedElement.blur()
	}
  })
  
// Maneja navegacion del Enter
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita el envío del formulario

        let inputs = Array.from(document.querySelectorAll("input[type='password'], input[type='text']"));
        let currentIndex = inputs.indexOf(document.activeElement);

        if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        } else {
            document.activeElement.blur(); // Si es el último, cierra el teclado
        }
    }
});