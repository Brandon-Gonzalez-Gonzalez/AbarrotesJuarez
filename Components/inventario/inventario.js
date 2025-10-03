export async function cargarInventario() {
    const tabla = document.querySelector("#tbl-inventario tbody");
    if (!tabla) return; 

    try {
        const resultado = await fetch("http://localhost:3000/api/inventario");
        const inventario = await resultado.json();

        tabla.innerHTML = "";

        inventario.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.Codigo}</td>
                <td>${item.Nombre}</td>
                <td>${item.Descripcion}</td>
                <td>${item.Categoria}</td>
                <td>${item["Ultima modificacion"]}</td>
                <td>${item.Peso}</td>
                <td>${item.Unidades}</td>
                <td>${item.Precio}</td>
            `;
            tabla.appendChild(fila);
        });

        const inputBuscador = document.querySelector("#inp-escaner");
        inputBuscador.addEventListener("input", () => {
            const filtro = inputBuscador.value.toLowerCase();
            
            Array.from(tabla.rows).forEach(fila => {
                const codigo = fila.cells[0]?.textContent.toLowerCase() || "";
                const nombre = fila.cells[1]?.textContent.toLowerCase() || "";
                const descripcion = fila.cells[2]?.textContent.toLowerCase() || "";
                fila.style.display = codigo.startsWith(filtro) || nombre.startsWith(filtro) || descripcion.startsWith(filtro) ? "" : "none"; 
            });
        });
    } catch (error) {
        console.error("Fallo la carga del inventario:", error);
    }
}

cargarInventario();

