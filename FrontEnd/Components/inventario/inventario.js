export async function cargarInventario() {
    const tabla = document.querySelector("#tbl-inventario tbody");
    const encabezados = document.querySelectorAll("#tbl-inventario th");
    const btnAjustar = document.querySelector("#btn-ajustar");

    if (!tabla) return; 

    let inventario = []; //Array para ordenar la informacion
    let modal = null;    // Modal reutilizable

    try {
        const resultado = await fetch("http://localhost:3000/api/inventario");
        inventario = await resultado.json();
        renderTabla(inventario);

        // ============================
        // FILTRO DE BUSQUEDA
        // ============================
        const inputBuscador = document.querySelector("#inp-escaner");
        inputBuscador.addEventListener("input", () => {
            const filtro = inputBuscador.value.toLowerCase();
            Array.from(tabla.rows).forEach(fila => {
                const codigo = fila.cells[0]?.textContent.toLowerCase() || "";
                const nombre = fila.cells[1]?.textContent.toLowerCase() || "";
                const descripcion = fila.cells[2]?.textContent.toLowerCase() || "";
                fila.style.display =
                    codigo.startsWith(filtro) || nombre.startsWith(filtro) || descripcion.startsWith(filtro)
                        ? ""
                        : "none";
            });
        });

        // ============================
        // ORDENAR COLUMNAS
        // ============================
        encabezados.forEach((th, index) => {
            let ascendente = true;
            th.style.cursor = "pointer";
            th.addEventListener("click", () => {
                inventario.sort((a, b) => {
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
                renderTabla(inventario);
            });
        });

        // ============================
        // BOTÓN AJUSTAR PRECIO
        // ============================
        if (btnAjustar) {
            btnAjustar.addEventListener("click", () => {
                if (!modal) modal = crearModal();
                abrirModal(inventario);
            });
        }

    } catch (error) {
        console.error("Fallo la carga del inventario:", error);
    }

    // ------------------------------------------------------
    // RENDER TABLA
    // ------------------------------------------------------
    function renderTabla(datos) {
        tabla.innerHTML = "";
        datos.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.Upc}</td>
                <td>${item.Nombre}</td>
                <td>${item["Descripción"]}</td>
                <td>${item["Peso (g)"]}</td>
                <td>${item.Categoria}</td>
                <td>${item.Proveedor}</td>
                <td>${item["Fecha de caducidad"]}</td>
                <td>${item["Última modificación"]}</td>
                <td>${item.Unidades}</td>
                <td>${item.Precio}</td>
            `;
            tabla.appendChild(fila);
        });
    }

    // ------------------------------------------------------
    // CREAR UN SOLO MODAL
    // ------------------------------------------------------
    function crearModal() {
        const modal = document.createElement("div");
        modal.id = "modal-ajustar";
        modal.style.cssText = `
            display:none; position:fixed; top:0; left:0;
            width:100%; height:100%;
            background:rgba(0,0,0,.6);
            justify-content:center; align-items:center;
            z-index:9999;
        `;

        modal.innerHTML = `
            <div style="background:white;padding:20px;width:350px;border-radius:8px;display:flex;flex-direction:column;gap:10px;">
                <h2>Ajustar precio</h2>

                <label>Artículo:</label>
                <select id="sel-articulo"></select>

                <label>Precio actual:</label>
                <input id="precio-actual" type="text" readonly>

                <label>Nuevo precio:</label>
                <input id="nuevo-precio" type="number">

                <div style="display:flex;gap:10px;margin-top:10px;">
                    <button id="btn-confirmar">CONFIRMAR</button>
                    <button id="btn-cancelar">CANCELAR</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    }

    // ------------------------------------------------------
    // ABRIR MODAL Y CARGAR INVENTARIO
    // ------------------------------------------------------
    function abrirModal(lista) {
        modal.style.display = "flex";

        const sel = modal.querySelector("#sel-articulo");
        const precioActual = modal.querySelector("#precio-actual");
        const nuevoPrecio = modal.querySelector("#nuevo-precio");

        sel.innerHTML = "";
        nuevoPrecio.value = "";
        precioActual.value = "";

        lista.forEach(item => {
            const op = document.createElement("option");
            op.value = item.Upc;
            op.textContent = item.Nombre;
            op.dataset.precio = item.Precio;
            sel.appendChild(op);
        });

        // Al seleccionar un artículo
        sel.addEventListener("change", () => {
            precioActual.value = sel.selectedOptions[0].dataset.precio;
        });

        if (sel.options.length > 0) {
            precioActual.value = sel.options[0].dataset.precio;
        }

        modal.querySelector("#btn-cancelar").onclick = () => {
            modal.style.display = "none";
        };

        modal.querySelector("#btn-confirmar").onclick = async () => {
            const codigo = sel.value;
            const nuevo = nuevoPrecio.value;

            if (!nuevo || nuevo <= 0) {
                alert("Ingresa un precio válido");
                return;
            }

            await fetch("http://localhost:3000/api/actualizarPrecio", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigo, precio: nuevo })
            });

            alert("Precio actualizado");
            modal.style.display = "none";

            // Recargar inventario con el nuevo precio
            cargarInventario();
        };
    }
}

cargarInventario();
