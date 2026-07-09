let contadores = JSON.parse(localStorage.getItem('datos')) || [];

function crearContador() {
    const nombreInput = document.getElementById('nombre');
    const colorInput = document.getElementById('color');
    const nombre = nombreInput.value;
    const color = colorInput.value;
    
    if(nombre === "") return alert("Por favor ponle un nombre");
    
    contadores.push({ nombre, color, total: 0 });
    localStorage.setItem('datos', JSON.stringify(contadores));
    nombreInput.value = ""; // Limpiar el input
    render();
}

function render() {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';
    
    contadores.forEach((c, index) => {
        const div = document.createElement('div');
        div.className = 'contador-card';
        div.style.backgroundColor = c.color;
        
        // Construimos el HTML interno del bloque
        div.innerHTML = `
            <button class="eliminar-btn" onclick="eliminarContador(${index})" title="Eliminar">×</button>
            <h3>${c.nombre}</h3>
            <p>${c.total}</p>
            <button class="sumar-btn" onclick="sumar(${index})">Sumar +1</button>
        `;
        lista.appendChild(div);
    });
}

function sumar(index) {
    contadores[index].total++;
    localStorage.setItem('datos', JSON.stringify(contadores));
    render();
}

// NUEVA FUNCIÓN: Eliminar contador
function eliminarContador(index) {
    // Confirmar para evitar borrados accidentales
    if(!confirm(`¿Estás seguro de eliminar "${contadores[index].nombre}"?`)) return;
    
    // El método .splice quita un elemento del array
    contadores.splice(index, 1);
    localStorage.setItem('datos', JSON.stringify(contadores));
    render();
}

render();