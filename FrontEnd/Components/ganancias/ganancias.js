export async function cargarGanancias() {
    const tablaBody = document.querySelector("#tbl-ganancias tbody");
    if (!tablaBody) return;

    try {
        const resultado = await fetch("http://localhost:3000/api/ganancias");
        const ganancias = await resultado.json();

        tablaBody.innerHTML = "";

        ganancias.forEach(item => {
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

    } catch (error) {
        console.error("Fallo la carga de ganancias:", error);
    }
}


