export async function cargarGanancias() {
    const tablaBody = document.querySelector("#tbl-ganancias tbody");
    const encabezados = document.querySelectorAll("#tbl-ganancias th");
    if (!tablaBody) return;

    let ganancias = [];

    try {
        const resultado = await fetch("http://localhost:3000/api/ganancias");
        ganancias = await resultado.json();
        renderGanancias(ganancias);

        // === ORDENAMIENTO POR COLUMNA ===
        encabezados.forEach((th, index) => {
            let ascendente = true;
            th.style.cursor = "pointer";
            th.addEventListener("click", () => {
                ganancias.sort((a, b) => {
                    const valA = Object.values(a)[index];
                    const valB = Object.values(b)[index];

                    const esNumero = !isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB));
                    const esFecha = Date.parse(valA) && Date.parse(valB);

                    if (esNumero) {
                        return ascendente
                            ? parseFloat(valA) - parseFloat(valB)
                            : parseFloat(valB) - parseFloat(valA);
                    } else if (esFecha) {
                        return ascendente
                            ? new Date(valA) - new Date(valB)
                            : new Date(valB) - new Date(valA);
                    } else {
                        return ascendente
                            ? valA.toString().localeCompare(valB)
                            : valB.toString().localeCompare(valA);
                    }
                });
                ascendente = !ascendente;
                renderGanancias(ganancias);
            });
        });
    } catch (error) {
        console.error("Fallo la carga de ganancias:", error);
    }

    function renderGanancias(datos) {
        tablaBody.innerHTML = "";
        datos.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.Registro}</td>
                <td>${item["Metodo de pago"]}</td>
                <td>${item["Tipo de pago"]}</td>
                <td>${item["Fecha de la venta"]}</td>
                <td>${item.Ganancia}</td>
            `;
            tablaBody.appendChild(fila);
        });
    }
}

export async function cargarSaldos() {
    const tablaBody = document.querySelector("#tbl-saldos tbody");
    const encabezados = document.querySelectorAll("#tbl-saldos th");
    if (!tablaBody) return;

    let saldos = [];

    try {
        const resultado = await fetch("http://localhost:3000/api/saldos");
        saldos = await resultado.json();
        renderSaldos(saldos);

        // === ORDENAMIENTO POR COLUMNA ===
        encabezados.forEach((th, index) => {
            let ascendente = true;
            th.style.cursor = "pointer";
            th.addEventListener("click", () => {
                saldos.sort((a, b) => {
                    const valA = Object.values(a)[index];
                    const valB = Object.values(b)[index];

                    const esNumero = !isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB));
                    const esFecha = Date.parse(valA) && Date.parse(valB);

                    if (esNumero) {
                        return ascendente
                            ? parseFloat(valA) - parseFloat(valB)
                            : parseFloat(valB) - parseFloat(valA);
                    } else if (esFecha) {
                        return ascendente
                            ? new Date(valA) - new Date(valB)
                            : new Date(valB) - new Date(valA);
                    } else {
                        return ascendente
                            ? valA.toString().localeCompare(valB)
                            : valB.toString().localeCompare(valA);
                    }
                });
                ascendente = !ascendente;
                renderSaldos(saldos);
            });
        });
    } catch (error) {
        console.error("Fallo la carga de saldos:", error);
    }

    function renderSaldos(datos) {
        tablaBody.innerHTML = "";
        datos.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.Registro}</td>
                <td>${item["Nombre del cliente"]}</td>
                <td>${item["Fecha de registro"]}</td>
                <td>${item["Monto pagado"]}</td>
                <td>${item["Fecha de pago"]}</td>
                <td>${item.Total}</td>
            `;
            tablaBody.appendChild(fila);
        });
    }
}

export function pestañas() {
    const btnContado = document.getElementById('btn-contado');
    const btnSaldo = document.getElementById('btn-saldo');
    const divContado = document.querySelector('.div-contado');
    const divSaldo = document.querySelector('.div-saldo');

    const activo = '#2C3E50';   
    const inactivo = '#4A6B8A'; 

    divContado.style.display = 'block';
    divSaldo.style.display = 'none';
    cargarGanancias();

    btnContado.style.backgroundColor = activo;
    btnSaldo.style.backgroundColor = inactivo;

    btnContado.addEventListener('click', () => {
        divContado.style.display = 'block';
        divSaldo.style.display = 'none';
        cargarGanancias();
        btnContado.style.backgroundColor = activo;
        btnSaldo.style.backgroundColor = inactivo;
    });

    btnSaldo.addEventListener('click', () => {
        divContado.style.display = 'none';
        divSaldo.style.display = 'block';
        cargarSaldos();
        btnSaldo.style.backgroundColor = activo;
        btnContado.style.backgroundColor = inactivo;
    });
}
