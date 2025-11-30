export async function cargarFacturas() {
    const tablaBody = document.querySelector("#tbl-facturas tbody");
    const encabezados = document.querySelectorAll("#tbl-facturas th");

    const tblCostoTotal = document.querySelector("#tbl-kpiCostoTotal tbody");
    const tblGanancias = document.querySelector("#tbl-kpiGanancia tbody");

    const exportar = document.getElementById("btn-exportar");

    if (!tablaBody || !tblCostoTotal || !tblGanancias) return;

    let facturas = [];

    try {
        // ===========================
        // CARGAR FACTURAS
        // ===========================
        const resultado = await fetch("http://localhost:3000/api/facturas");
        facturas = await resultado.json();
        renderFacturas(facturas);

        // ===========================
        // CARGAR KPIs
        // ===========================
        const resKpi = await fetch("http://localhost:3000/api/gananciasFacturas");
        const listaKpi = await resKpi.json();
        renderKPIs(listaKpi);

        // ===========================
        // ORDENAMIENTO POR COLUMNA
        // ===========================
        encabezados.forEach((th, index) => {
            let ascendente = true;
            th.style.cursor = "pointer";

            th.addEventListener("click", () => {
                facturas.sort((a, b) => {
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
                renderFacturas(facturas);
            });
        });

    } catch (error) {
        console.error("Fallo la carga de facturas o KPIs:", error);
    }

    // ======================================================
    // RENDERIZAR TABLA DE FACTURAS
    // ======================================================
    function renderFacturas(datos) {
        tablaBody.innerHTML = "";

        datos.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.Ticket}</td>
                <td>${item.Proveedor}</td>
                <td>${item.Artículo}</td>
                <td>${item.Cantidad}</td>
                <td>${item["Costo unitario"]}</td>
                <td>${item["Costo total"]}</td>
                <td>${item["Costo de venta"]}</td>
                <td>${item.Porcentaje}</td>
                <td>${item["Fecha de factura"]}</td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    // ======================================================
    // RENDERIZAR KPIs: Costo total y Ganancias
    // ======================================================
    function renderKPIs(lista) {
        let totalCosto = 0;
        let totalGanancia = 0;

        lista.forEach(item => {
            totalCosto += Number(item["Costo total"]) || 0;
            totalGanancia += Number(item.Ganancias) || 0;
        });

        tblCostoTotal.innerHTML = "";
        tblGanancias.innerHTML = "";

        const filaCosto = document.createElement("tr");
        filaCosto.innerHTML = `<td>${totalCosto.toFixed(2)}</td>`;
        tblCostoTotal.appendChild(filaCosto);

        const filaGanancia = document.createElement("tr");
        filaGanancia.innerHTML = `<td>${totalGanancia.toFixed(2)}</td>`;
        tblGanancias.appendChild(filaGanancia);
    }

    // ======================================================
    // BOTÓN EXPORTAR → EXPORTA TABLA FACTURAS A EXCEL
    // ======================================================
    if (exportar && !exportar.hasAttribute("data-export-iniciado")) {
        exportar.addEventListener("click", () => {
            const tabla = document.getElementById("tbl-facturas");
            if (!tabla) {
                alert("No se encontró la tabla de facturas");
                return;
            }

            const xlsx = XLSX.utils.table_to_book(tabla, { sheet: "Facturas" });
            XLSX.writeFile(xlsx, "Reporte de facturas.xlsx");
        });

        exportar.setAttribute("data-export-iniciado", "true");
    }
// ======================================================
    // LOGICA DEL MODAL: APERTURA, CIERRE Y CÁLCULOS
    // ======================================================
    
    const btnAgregar = document.getElementById("btn-agregar");
    const modal = document.getElementById("modal-factura");
    const btnCancelar = document.getElementById("btn-cancelar-modal");
    const inputFecha = document.getElementById("input-fecha");
    
    const btnAgregarProducto = document.getElementById("btn-agregar-producto");
    const contenedorProductos = document.getElementById("contenedor-productos");

    // 1. ABRIR MODAL
    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {
            if(modal) {
                modal.style.display = "flex";
                
                // Poner FECHA ACTUAL automáticamente (DD/MM/AAAA)
                const hoy = new Date();
                inputFecha.value = hoy.toLocaleDateString('es-MX');

                // Limpiar productos y poner uno vacío
                contenedorProductos.innerHTML = ""; 
                agregarFilaProducto(); 
            }
        });
    }

    // 2. CERRAR MODAL
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            if(modal) modal.style.display = "none";
        });
    }

    // 3. AGREGAR FILA Y EVENTOS DE CÁLCULO
    function agregarFilaProducto() {
        const divRow = document.createElement("div");
        divRow.classList.add("producto-row");

        // Nota: Ya no está el proveedor aquí, solo Artículo y montos
        // El input de Porcentaje ahora es editable (type="number") para permitir cálculo inverso
        divRow.innerHTML = `
            <div class="input-group">
                <label>Artículo</label>
                <div class="select-with-btn">
                    <select class="sel-articulo">
                        <option value="">Seleccione un articulo</option>
                        </select>
                    <button class="btn-small-add">+</button>
                </div>
            </div>

            <div class="input-group">
                <label>Cantidad</label>
                <input type="number" class="input-cantidad" min="1" value="1">
            </div>

            <div class="input-group">
                <label>Costo unitario</label>
                <input type="number" class="input-costo-unit" step="0.50" placeholder="$0.00">
            </div>

            <div class="input-group">
                <label>Costo total</label>
                <input type="number" class="input-costo-total" readonly placeholder="$0.00" style="background-color: #eee;">
            </div>

            <div class="input-group">
                <label>Precio de venta</label>
                <input type="number" class="input-precio-venta" step="0.50" placeholder="$0.00">
            </div>

            <div class="input-group">
                <label>Porcentaje de venta</label>
                <input type="number" class="input-porcentaje" step="1" placeholder="0%">
            </div>

            <div class="input-group">
                <label>&nbsp;</label>
                <button class="btn-delete-row">Eliminar fila</button>
            </div>
        `;

        // --- REFERENCIAS A INPUTS DE ESTA FILA ---
        const inCant = divRow.querySelector(".input-cantidad");
        const inCostoU = divRow.querySelector(".input-costo-unit");
        const inCostoT = divRow.querySelector(".input-costo-total");
        const inVenta = divRow.querySelector(".input-precio-venta");
        const inPorc = divRow.querySelector(".input-porcentaje");
        const btnEliminar = divRow.querySelector(".btn-delete-row");

        // --- FUNCIONES DE CÁLCULO ---

        // A) Calcular Costo Total (Cant * CostoU)
        const calcularTotal = () => {
            const cant = parseFloat(inCant.value) || 0;
            const costoU = parseFloat(inCostoU.value) || 0;
            inCostoT.value = (cant * costoU).toFixed(2);
            // Si cambia el costo unitario, también recalcula venta/porcentaje si ya hay datos
            if(inPorc.value) calcularVentaDesdePorcentaje();
        };

        // B) Si pongo PRECIO VENTA -> Calcula Porcentaje
        // Fórmula: ((PrecioVenta - CostoU) / CostoU) * 100
        const calcularPorcentajeDesdeVenta = () => {
            const costoU = parseFloat(inCostoU.value) || 0;
            const venta = parseFloat(inVenta.value) || 0;

            if (costoU > 0 && venta > 0) {
                const ganancia = venta - costoU;
                const porcentaje = (ganancia / costoU) * 100;
                inPorc.value = porcentaje.toFixed(2); // Ej: 20.00
            }
        };

        // C) Si pongo PORCENTAJE -> Calcula Precio Venta
        // Fórmula: CostoU + (CostoU * (Porcentaje / 100))
        const calcularVentaDesdePorcentaje = () => {
            const costoU = parseFloat(inCostoU.value) || 0;
            const porcentaje = parseFloat(inPorc.value) || 0;

            if (costoU > 0) {
                const precio = costoU * (1 + (porcentaje / 100));
                inVenta.value = precio.toFixed(2);
            }
        };

        // --- LISTENERS (Eventos en tiempo real) ---
        
        // 1. Cambio en Cantidad o Costo Unitario -> Actualiza Total
        inCant.addEventListener("input", calcularTotal);
        
        // Al cambiar Costo Unitario, se actualiza el total Y (si hay porcentaje definido) el precio venta
        inCostoU.addEventListener("input", () => {
            calcularTotal();
            if (inPorc.value !== "") {
                calcularVentaDesdePorcentaje();
            } else if (inVenta.value !== "") {
                calcularPorcentajeDesdeVenta();
            }
        });

        // 2. Escribo Precio Venta -> Calcula %
        inVenta.addEventListener("input", calcularPorcentajeDesdeVenta);

        // 3. Escribo Porcentaje -> Calcula Precio Venta
        inPorc.addEventListener("input", calcularVentaDesdePorcentaje);

        // --- ELIMINAR FILA ---
        btnEliminar.addEventListener("click", () => {
            if (contenedorProductos.children.length > 1) {
                divRow.remove();
            } else {
                alert("La factura debe tener al menos un producto.");
            }
        });

        contenedorProductos.appendChild(divRow);
    }

    // Botón para agregar más filas manualmente
    if (btnAgregarProducto) {
        btnAgregarProducto.addEventListener("click", agregarFilaProducto);
    }
}
