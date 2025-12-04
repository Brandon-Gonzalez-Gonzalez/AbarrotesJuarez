export async function cargarFacturas() {
    // ==============================================================
    // 1. REFERENCIAS AL DOM
    // ==============================================================
    const tablaBody = document.querySelector("#tbl-facturas tbody");
    const encabezados = document.querySelectorAll("#tbl-facturas th");
    const tblCostoTotal = document.querySelector("#tbl-kpiCostoTotal tbody");
    const tblGanancias = document.querySelector("#tbl-kpiGanancia tbody");
    const exportar = document.getElementById("btn-exportar");

    // --- MODALES ---
    const modalFactura = document.getElementById("modal-factura"); 
    const modalProv = document.getElementById("modal-nuevo-proveedor"); 
    const modalArt = document.getElementById("modal-nuevo-articulo");   

    // --- BOTONES PRINCIPALES ---
    const btnAgregar = document.getElementById("btn-agregar");
    const btnCancelar = document.getElementById("btn-cancelar-modal");
    const btnGuardar = document.getElementById("btn-guardar-factura");
    const btnAgregarProducto = document.getElementById("btn-agregar-producto");
    const contenedorProductos = document.getElementById("contenedor-productos");

    // --- BOTONES DE MODALES SECUNDARIOS ---
    const btnAddProvHeader = document.getElementById("btn-add-new-provider");
    const btnGuardarProv = document.getElementById("btn-guardar-prov");
    const btnCancelarProv = document.getElementById("btn-cancelar-prov");

    const btnGuardarArt = document.getElementById("btn-guardar-art");
    const btnCancelarArt = document.getElementById("btn-cancelar-art");

    // Inputs Cabecera
    const inputFecha = document.getElementById("input-fecha");
    const inputTicket = document.getElementById("input-ticket");
    const selProveedorHeader = document.getElementById("sel-proveedor-header");

    // --- FORZAR OCULTAMIENTO INICIAL ---
    if(modalProv) modalProv.style.display = "none";
    if(modalArt) modalArt.style.display = "none";
    if(modalFactura) modalFactura.style.display = "none";

    let listaArticulosHTML = '<option value="">Seleccione un articulo</option>';
    let listaProveedoresGlobal = []; 
    let listaCategoriasGlobal = []; // Variable para guardar categorías

    if (!tablaBody || !tblCostoTotal || !tblGanancias) return;

    let facturas = [];

    // ==============================================================
    // 2. CARGA DE DATOS INICIAL
    // ==============================================================
    async function recargarCatalogos() {
        try {
            // AHORA INCLUIMOS LA API DE CATEGORIAS
            const [resFacturas, resKpi, resArticulos, resProveedores, resCategorias] = await Promise.all([
                fetch("http://localhost:3000/api/facturas"),
                fetch("http://localhost:3000/api/gananciasFacturas"),
                fetch("http://localhost:3000/api/listaArticulos"),
                fetch("http://localhost:3000/api/listaProveedores"),
                fetch("http://localhost:3000/api/listaCategorias") // <--- API NUEVA
            ]);

            facturas = await resFacturas.json();
            const listaKpi = await resKpi.json();
            const dataArticulos = await resArticulos.json();
            const dataProveedores = await resProveedores.json();
            
            // Manejo seguro por si falla solo la de categorías
            let dataCategorias = [];
            if(resCategorias.ok) {
                dataCategorias = await resCategorias.json();
            } else {
                console.warn("No se cargaron las categorías");
            }

            // Guardamos globales
            listaProveedoresGlobal = dataProveedores;
            listaCategoriasGlobal = dataCategorias;

            renderFacturas(facturas);
            renderKPIs(listaKpi);
            
            actualizarSelectProveedores(dataProveedores);
            actualizarSelectCategorias(dataCategorias); // <--- Llenamos el select
            actualizarStringArticulos(dataArticulos);

        } catch (error) {
            console.error(error);
            // alert("Error cargando datos del servidor.");
        }
    }

    await recargarCatalogos();

    // ==============================================================
    // 3. ORDENAMIENTO POR COLUMNA
    // ==============================================================
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
                    return ascendente ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
                } else if (esFecha) {
                    return ascendente ? new Date(valA) - new Date(valB) : new Date(valB) - new Date(valA);
                } else {
                    return ascendente ? valA.toString().localeCompare(valB) : valB.toString().localeCompare(valA);
                }
            });
            ascendente = !ascendente;
            renderFacturas(facturas);
        });
    });

    // --- HELPERS DE ACTUALIZACIÓN VISUAL ---
    
    // Función para llenar el select de Categorías
    function actualizarSelectCategorias(categorias) {
        const selCat = document.getElementById("new-art-categoria");
        if(!selCat) return;

        selCat.innerHTML = '<option value="">Seleccione Categoría...</option>';
        categorias.forEach(cat => {
            const op = document.createElement("option");
            op.value = cat.num;          // ID numérico
            op.textContent = cat.descripcion; // Nombre visible
            selCat.appendChild(op);
        });
    }

    function actualizarSelectProveedores(proveedores, idSeleccionar = null) {
        if (!selProveedorHeader) return;
        selProveedorHeader.innerHTML = '<option value="">Seleccione Proveedor...</option>';
        
        // 1. Select Cabecera
        proveedores.forEach(prov => {
            const op = document.createElement("option");
            op.value = prov.num;
            op.textContent = prov.nombre;
            if(idSeleccionar && prov.num == idSeleccionar) op.selected = true;
            selProveedorHeader.appendChild(op);
        });

        // 2. Select Modal Artículo
        const selProvEnArticulo = document.getElementById("new-art-proveedor");
        if(selProvEnArticulo) {
            selProvEnArticulo.innerHTML = '<option value="">Seleccione...</option>';
            proveedores.forEach(prov => {
                const op = document.createElement("option");
                op.value = prov.num;
                op.textContent = prov.nombre;
                selProvEnArticulo.appendChild(op);
            });
        }
    }

    function actualizarStringArticulos(articulos) {
        listaArticulosHTML = '<option value="">Seleccione un articulo</option>';
        articulos.forEach(art => {
            listaArticulosHTML += `<option value="${art.codigo}">${art.nombre}</option>`;
        });
        
        // Actualizar selects abiertos
        const selectsExistentes = document.querySelectorAll(".sel-articulo");
        selectsExistentes.forEach(sel => {
            const valorActual = sel.value; 
            sel.innerHTML = listaArticulosHTML;
            sel.value = valorActual; 
        });
    }

    // ==============================================================
    // 4. RENDERIZADO
    // ==============================================================
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

    function renderKPIs(lista) {
        let totalCosto = 0, totalGanancia = 0;
        lista.forEach(item => {
            totalCosto += Number(item["Costo total"]) || 0;
            totalGanancia += Number(item.Ganancias) || 0;
        });
        tblCostoTotal.innerHTML = `<tr><td>${totalCosto.toFixed(2)}</td></tr>`;
        tblGanancias.innerHTML = `<tr><td>${totalGanancia.toFixed(2)}</td></tr>`;
    }

    if (exportar && !exportar.hasAttribute("data-export-iniciado")) {
        exportar.addEventListener("click", () => {
            const tabla = document.getElementById("tbl-facturas");
            if (!tabla) return;
            XLSX.writeFile(XLSX.utils.table_to_book(tabla, { sheet: "Facturas" }), "Reporte_Facturas.xlsx");
        });
        exportar.setAttribute("data-export-iniciado", "true");
    }

    // ==============================================================
    // 5. LÓGICA MODAL FACTURA
    // ==============================================================
    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {
            if(modalFactura) {
                modalFactura.style.display = "flex";
                const hoy = new Date();
                const year = hoy.getFullYear();
                const month = String(hoy.getMonth() + 1).padStart(2, '0');
                const day = String(hoy.getDate()).padStart(2, '0');
                inputFecha.value = `${year}-${month}-${day}`;
                
                inputTicket.value = "";
                if(selProveedorHeader) selProveedorHeader.value = ""; 
                contenedorProductos.innerHTML = ""; 
                agregarFilaProducto(); 
            }
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            if(modalFactura) modalFactura.style.display = "none";
        });
    }

    // ==============================================================
    // 6. LÓGICA MODALES SECUNDARIOS
    // ==============================================================

    // --- A) GUARDAR PROVEEDOR ---
    if (btnAddProvHeader) {
        btnAddProvHeader.addEventListener("click", (e) => {
            e.preventDefault();
            if(modalProv) {
                modalProv.style.zIndex = "3000"; 
                modalProv.style.display = "flex";
                document.getElementById("input-nuevo-prov-nombre").value = "";
            }
        });
    }

    if(btnCancelarProv) {
        btnCancelarProv.addEventListener("click", (e) => {
            e.preventDefault();
            modalProv.style.display = "none";
        });
    }

    if(btnGuardarProv) {
        btnGuardarProv.addEventListener("click", async (e) => {
            e.preventDefault();
            const nombre = document.getElementById("input-nuevo-prov-nombre").value.trim();
            if(!nombre) return alert("Escriba el nombre.");

            try {
                // Doble variable para asegurar
                const payload = { 
                    nombre: nombre, 
                    Nombre: nombre 
                };

                const res = await fetch("http://localhost:3000/api/crearProveedor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if(!res.ok) {
                    const errorTxt = await res.text();
                    throw new Error(errorTxt);
                }
                
                alert("Proveedor creado.");
                modalProv.style.display = "none";
                
                const resProv = await fetch("http://localhost:3000/api/listaProveedores");
                const dataProv = await resProv.json();
                
                const nuevo = dataProv.find(p => p.nombre === nombre);
                actualizarSelectProveedores(dataProv, nuevo ? nuevo.num : null);

            } catch (error) {
                console.error(error);
                alert("Error al guardar proveedor: " + error.message);
            }
        });
    }

    // --- B) GUARDAR ARTÍCULO ---
    function abrirModalArticulo() {
        if(modalArt) {
            modalArt.style.zIndex = "3000"; 
            modalArt.style.display = "flex";

            const inputs = modalArt.querySelectorAll("input, select");
            inputs.forEach(i => i.value = "");
            
            const inUni = document.getElementById("new-art-unidades");
            if(inUni) inUni.value = "0";
            
            // Recargamos selects internos
            actualizarSelectProveedores(listaProveedoresGlobal);
            actualizarSelectCategorias(listaCategoriasGlobal); 
        }
    }

    if(btnCancelarArt) {
        btnCancelarArt.addEventListener("click", (e) => {
            e.preventDefault();
            modalArt.style.display = "none";
        });
    }

    if(btnGuardarArt) {
        btnGuardarArt.addEventListener("click", async (e) => {
            e.preventDefault();
            
            const codigo = document.getElementById("new-art-codigo").value;
            const nombre = document.getElementById("new-art-nombre").value;
            const provId = document.getElementById("new-art-proveedor").value;
            const catId = document.getElementById("new-art-categoria").value; 

            if(!codigo || !nombre || !provId || !catId) {
                return alert("Faltan datos obligatorios (Código, Nombre, Categoría, Proveedor).");
            }

            const articuloData = {
                codigo: codigo,
                nombre: nombre,
                descripcion: document.getElementById("new-art-desc").value || "Sin descripción",
                peso: parseFloat(document.getElementById("new-art-peso").value) || 0,
                precio: parseFloat(document.getElementById("new-art-precio").value) || 0,
                categoria: parseInt(catId), 
                proveedor: parseInt(provId),
                fechaCaducidad: document.getElementById("new-art-caducidad").value || new Date().toISOString().split('T')[0],
                ultimaModificacion: new Date().toISOString().split('T')[0],
                unidades: parseInt(document.getElementById("new-art-unidades").value) || 0
            };

            // Payload blindado (Doble llave para evitar Error 500)
            const payloadBlindado = {
                ...articuloData,
                Codigo: articuloData.codigo,
                Nombre: articuloData.nombre,
                Descripcion: articuloData.descripcion,
                Peso: articuloData.peso,
                Precio: articuloData.precio,
                Categoria: articuloData.categoria,
                Proveedor: articuloData.proveedor,
                FechaCaducidad: articuloData.fechaCaducidad,
                UltimaModificacion: articuloData.ultimaModificacion,
                Unidades: articuloData.unidades
            };

            try {
                const res = await fetch("http://localhost:3000/api/crearArticulo", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payloadBlindado)
                });

                if(!res.ok) {
                    const txt = await res.text();
                    throw new Error(txt);
                }

                alert("Artículo creado.");
                modalArt.style.display = "none";

                const resArt = await fetch("http://localhost:3000/api/listaArticulos");
                const dataArt = await resArt.json();
                actualizarStringArticulos(dataArt);

            } catch (error) {
                console.error(error);
                alert("Error guardando artículo: " + error.message);
            }
        });
    }

    // ==============================================================
    // 7. GUARDAR FACTURA (COMPLETO)
    // ==============================================================
    if (btnGuardar) {
        btnGuardar.addEventListener("click", async () => {
            const codigoFactura = inputTicket.value.trim();
            const fechaSQL = inputFecha.value; 
            const proveedor = selProveedorHeader.value;

            if (!codigoFactura || !fechaSQL || !proveedor) return alert("Complete los datos de cabecera.");

            const filas = document.querySelectorAll(".producto-row");
            const itemsParaInsertar = [];
            let validacionCompleta = true;

            filas.forEach(fila => {
                const articulo = fila.querySelector(".sel-articulo").value;
                const cantidad = fila.querySelector(".input-cantidad").value;
                const costoU = fila.querySelector(".input-costo-unit").value;
                const costoT = fila.querySelector(".input-costo-total").value;
                const precioVenta = fila.querySelector(".input-precio-venta").value; 
                const porcentaje = fila.querySelector(".input-porcentaje").value;

                if (!articulo || !cantidad || !costoT || !precioVenta) validacionCompleta = false;

                itemsParaInsertar.push({ articulo, cantidad, costoU, costoT, precioVenta, porcentaje });
            });

            if (!validacionCompleta) return alert("Complete los campos de productos.");
            if (itemsParaInsertar.length === 0) return alert("Agregue productos.");

            try {
                // 1. Cabecera (Doble formato)
                const respCab = await fetch("http://localhost:3000/api/crearFactura", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        codigo: codigoFactura, Codigo: codigoFactura,
                        fechaFactura: fechaSQL, FechaFactura: fechaSQL,
                        proveedor: parseInt(proveedor), Proveedor: parseInt(proveedor)
                    })
                });

                if (!respCab.ok) {
                    const err = await respCab.json().catch(() => ({}));
                    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) throw new Error(`El ticket ${codigoFactura} ya existe.`);
                    throw new Error("Error guardando cabecera.");
                }

                await new Promise(resolve => setTimeout(resolve, 1000));

                // 2. Detalles (Doble formato)
                for (const item of itemsParaInsertar) {
                    const payload = {
                        factura: codigoFactura, Factura: codigoFactura,
                        articulo: item.articulo, Articulo: item.articulo,
                        cantidad: parseInt(item.cantidad), Cantidad: parseInt(item.cantidad),
                        costoUnitario: parseFloat(item.costoU), CostoUnitario: parseFloat(item.costoU),
                        costoTotal: parseFloat(item.costoT), CostoTotal: parseFloat(item.costoT),
                        costoVenta: parseFloat(item.precioVenta), CostoVenta: parseFloat(item.precioVenta),
                        porcentajeVenta: parseFloat(item.porcentaje), PorcentajeVenta: parseFloat(item.porcentaje)
                    };

                    const r = await fetch("http://localhost:3000/api/crearArticuloPorFactura", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                    if (!r.ok) throw new Error(`Error en producto ${item.articulo}`);
                }

                alert("Guardado correctamente.");
                if(modalFactura) modalFactura.style.display = "none";
                location.reload(); 

            } catch (error) {
                alert("Error: " + error.message);
            }
        });
    }

    // ==============================================================
    // 8. FILAS DINÁMICAS
    // ==============================================================
    function agregarFilaProducto() {
        const divRow = document.createElement("div");
        divRow.classList.add("producto-row");

        divRow.innerHTML = `
            <div class="input-group">
                <label>Artículo</label>
                <div class="select-with-btn">
                    <select class="sel-articulo">${listaArticulosHTML}</select>
                    <button class="btn-small-add btn-add-new-article" type="button" title="Crear Nuevo">+</button>
                </div>
            </div>
            
            <div class="input-group"><label>Cantidad</label><input type="number" class="input-cantidad" min="1" value="1"></div>
            <div class="input-group"><label>Costo Total</label><input type="number" class="input-costo-total" step="0.50" placeholder="$0.00"></div>
            <div class="input-group"><label>Costo Unitario</label><input type="number" class="input-costo-unit" readonly style="background-color: #eee;" placeholder="$0.00"></div>
            <div class="input-group"><label>Precio venta</label><input type="number" class="input-precio-venta" step="0.50" placeholder="$0.00"></div>
            <div class="input-group"><label>% Venta</label><input type="number" class="input-porcentaje" step="1" placeholder="0%"></div>
            <div class="input-group"><label>&nbsp;</label><button class="btn-delete-row">Eliminar</button></div>
        `;

        const inCant = divRow.querySelector(".input-cantidad");
        const inCostoU = divRow.querySelector(".input-costo-unit");
        const inCostoT = divRow.querySelector(".input-costo-total");
        const inVenta = divRow.querySelector(".input-precio-venta");
        const inPorc = divRow.querySelector(".input-porcentaje");
        const btnEliminar = divRow.querySelector(".btn-delete-row");
        const btnAddArticle = divRow.querySelector(".btn-add-new-article");

        btnAddArticle.addEventListener("click", (e) => {
            e.preventDefault();
            abrirModalArticulo();
        });

        const calcularUnitario = () => {
            const cant = parseFloat(inCant.value) || 0;
            const total = parseFloat(inCostoT.value) || 0;
            if (cant > 0 && total > 0) inCostoU.value = (total / cant).toFixed(2);
            else inCostoU.value = "0.00";
            if (inPorc.value) calcVenta(); else if (inVenta.value) calcPorcentaje();
        };

        const calcPorcentaje = () => {
            const costoU = parseFloat(inCostoU.value) || 0;
            const venta = parseFloat(inVenta.value) || 0;
            if (costoU > 0 && venta > 0) inPorc.value = ((venta - costoU) / costoU * 100).toFixed(2);
        };

        const calcVenta = () => {
            const costoU = parseFloat(inCostoU.value) || 0;
            const porc = parseFloat(inPorc.value) || 0;
            if (costoU > 0) inVenta.value = (costoU * (1 + porc / 100)).toFixed(2);
        };

        inCant.addEventListener("input", calcularUnitario);
        inCostoT.addEventListener("input", calcularUnitario);
        inVenta.addEventListener("input", calcPorcentaje);
        inPorc.addEventListener("input", calcVenta);

        btnEliminar.addEventListener("click", () => {
            if (contenedorProductos.children.length > 1) divRow.remove();
            else alert("Mínimo un producto.");
        });

        contenedorProductos.appendChild(divRow);
    }

    if (btnAgregarProducto) btnAgregarProducto.addEventListener("click", agregarFilaProducto);
}