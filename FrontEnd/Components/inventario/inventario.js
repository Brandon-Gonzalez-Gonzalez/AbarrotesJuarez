export async function cargarInventario() {
    const tabla = document.querySelector("#tbl-inventario tbody");
    const encabezados = document.querySelectorAll("#tbl-inventario th");
    const btnAjustar = document.querySelector("#btn-ajustar");

    if (!tabla) return;

    let inventario = []; 
    let modal = null;    

    try {
        const resultado = await fetch("http://localhost:3000/api/inventario");
        inventario = await resultado.json();
        renderTabla(inventario);

        // ============================
        // FILTRO DE BÚSQUEDA
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
                         ? "" : "none";
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
                    
                    if(esNumero) {
                        return ascendente ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
                    }
                    return ascendente 
                        ? valA.toString().localeCompare(valB) 
                        : valB.toString().localeCompare(valA);
                });
                ascendente = !ascendente;
                renderTabla(inventario);
            });
        });

        // ============================
        // BOTÓN AJUSTAR (ABRIR MODAL)
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
    // CREAR MODAL (DISEÑO LIMPIO)
    // ------------------------------------------------------
    function crearModal() {
        const modalDiv = document.createElement("div");
        modalDiv.id = "modal-ajustar";
        
        modalDiv.style.cssText = `
            display:none; position:fixed; top:0; left:0; width:100%; height:100%;
            background:rgba(0,0,0,0.6);
            justify-content:center; align-items:center; z-index:9999;
        `;

        modalDiv.innerHTML = `
            <div style="background:#fff; width:700px; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.2); overflow:hidden; font-family: 'Segoe UI', sans-serif;">
                
                <div style="background:#0056b3; color:white; padding:15px 25px; display:flex; justify-content:space-between; align-items:center;">
                    <h2 style="margin:0; font-size:1.4rem;">Editar Producto</h2>
                    <span style="font-size:0.9rem; opacity:0.8;">Gestión de Inventario</span>
                </div>

                <div style="padding:25px; max-height:80vh; overflow-y:auto;">
                    
                    <div style="margin-bottom:20px;">
                        <label style="display:block; font-weight:600; margin-bottom:5px; color:#333;">Seleccionar Artículo a Editar:</label>
                        <select id="sel-articulo" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px; font-size:1rem;"></select>
                    </div>

                    <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">

                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        
                        <div>
                            <label style="font-size:0.85rem; color:#666;">Código UPC (Solo lectura)</label>
                            <input id="edit-upc" type="text" readonly style="width:100%; padding:8px; background:#f4f4f4; border:1px solid #ddd; border-radius:4px; color:#555;">
                        </div>
                        <div>
                            <label style="font-size:0.85rem; color:#666;">Nombre del Producto</label>
                            <input id="edit-nombre" type="text" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                        </div>

                        <div style="grid-column: span 2;">
                            <label style="font-size:0.85rem; color:#666;">Descripción</label>
                            <input id="edit-descripcion" type="text" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                        </div>

                        <div>
                            <label style="font-size:0.85rem; color:#666;">Categoría</label>
                            <select id="edit-categoria" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; background:white;">
                                <option value="">Cargando...</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:0.85rem; color:#666;">Proveedor</label>
                            <select id="edit-proveedor" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; background:white;">
                                <option value="">Cargando...</option>
                            </select>
                        </div>

                        <div>
                            <label style="font-size:0.85rem; color:#666;">Peso (g)</label>
                            <input id="edit-peso" type="number" step="0.01" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                        </div>
                        <div>
                            <label style="font-size:0.85rem; color:#666;">Fecha Caducidad</label>
                            <input id="edit-fecha" type="date" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                        </div>

                        <div>
                            <label style="font-size:0.85rem; color:#666;">Unidades (Stock)</label>
                            <input id="edit-unidades" type="number" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                        </div>
                        <div>
                            <label style="font-size:0.85rem; color:#0056b3; font-weight:bold;">Precio Venta ($)</label>
                            <input id="edit-precio" type="number" step="0.01" style="width:100%; padding:8px; border:2px solid #0056b3; border-radius:4px; font-weight:bold;">
                        </div>
                    </div>

                    <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:25px; padding-top:15px; border-top:1px solid #eee;">
                        <button id="btn-cancelar" style="padding:10px 20px; background:#f8f9fa; border:1px solid #ddd; color:#333; border-radius:4px; cursor:pointer;">Cancelar</button>
                        <button id="btn-confirmar" style="padding:10px 25px; background:#28a745; border:none; color:white; border-radius:4px; cursor:pointer; font-weight:600; box-shadow:0 2px 5px rgba(0,0,0,0.1);">GUARDAR CAMBIOS</button>
                    </div>

                </div>
            </div>
        `;

        document.body.appendChild(modalDiv);
        return modalDiv;
    }

    // ------------------------------------------------------
    // ABRIR MODAL
    // ------------------------------------------------------
    async function abrirModal(lista) {
        modal.style.display = "flex";

        const selArticulo = modal.querySelector("#sel-articulo");
        const selCategoria = modal.querySelector("#edit-categoria");
        const selProveedor = modal.querySelector("#edit-proveedor");
        
        const inputs = {
            upc: modal.querySelector("#edit-upc"),
            nombre: modal.querySelector("#edit-nombre"),
            desc: modal.querySelector("#edit-descripcion"),
            peso: modal.querySelector("#edit-peso"),
            fecha: modal.querySelector("#edit-fecha"),
            unidades: modal.querySelector("#edit-unidades"),
            precio: modal.querySelector("#edit-precio")
        };

        // Función auxiliar para detectar el texto correcto (evita 'undefined')
        const detectarTexto = (obj) => {
            // Busca propiedades comunes (Nombre, nombre, Categoria, categoria, etc.)
            const posible = obj.Nombre || obj.nombre || obj.Categoria || obj.categoria || obj.Proveedor || obj.proveedor || obj.Descripcion || obj.descripcion || obj.Empresa || obj.empresa;
            if (posible) return posible;
            
            // Si no encuentra nombre, busca el primer valor que sea texto
            const valorTexto = Object.values(obj).find(v => typeof v === 'string' && v.length > 0);
            return valorTexto || Object.values(obj)[0]; // Si falla todo, devuelve lo primero que encuentre
        };

        // 1. CARGAR LISTAS
        try {
            const [resCat, resProv] = await Promise.all([
                fetch("http://localhost:3000/api/listaCategorias").catch(() => null),
                fetch("http://localhost:3000/api/listaProveedores").catch(() => null)
            ]);

            // Llenar Categorías
            selCategoria.innerHTML = '<option value="">-- Seleccionar --</option>';
            if (resCat && resCat.ok) {
                const categorias = await resCat.json();
                categorias.forEach(c => {
                    const texto = detectarTexto(c); // <--- Corrección aquí
                    selCategoria.innerHTML += `<option value="${texto}">${texto}</option>`;
                });
            } else {
                const unicas = [...new Set(lista.map(i => i.Categoria))];
                unicas.forEach(c => selCategoria.innerHTML += `<option value="${c}">${c}</option>`);
            }

            // Llenar Proveedores
            selProveedor.innerHTML = '<option value="">-- Seleccionar --</option>';
            if (resProv && resProv.ok) {
                const proveedores = await resProv.json();
                proveedores.forEach(p => {
                    const texto = detectarTexto(p); // <--- Corrección aquí
                    selProveedor.innerHTML += `<option value="${texto}">${texto}</option>`;
                });
            } else {
                const unicos = [...new Set(lista.map(i => i.Proveedor))];
                unicos.forEach(p => selProveedor.innerHTML += `<option value="${p}">${p}</option>`);
            }

        } catch (e) {
            console.error("Error cargando listas desplegables:", e);
        }

        // 2. LLENAR SELECT DE ARTÍCULOS
        selArticulo.innerHTML = '<option value="">-- Busca o selecciona un producto --</option>';
        lista.forEach(item => {
            const op = document.createElement("option");
            op.value = item.Upc;
            op.textContent = item.Nombre;
            selArticulo.appendChild(op);
        });

        // 3. SELECCIÓN DE ARTÍCULO
        selArticulo.onchange = () => {
            const upc = selArticulo.value;
            const item = lista.find(p => p.Upc == upc);

            if (item) {
                inputs.upc.value = item.Upc;
                inputs.nombre.value = item.Nombre;
                inputs.desc.value = item["Descripción"] || "";
                inputs.peso.value = item["Peso (g)"] || 0;
                inputs.unidades.value = item.Unidades || 0;
                inputs.precio.value = item.Precio || 0;
                
                selCategoria.value = item.Categoria || "";
                selProveedor.value = item.Proveedor || "";

                if (item["Fecha de caducidad"]) {
                    const f = new Date(item["Fecha de caducidad"]);
                    if (!isNaN(f)) inputs.fecha.value = f.toISOString().split('T')[0];
                    else inputs.fecha.value = "";
                } else {
                    inputs.fecha.value = "";
                }
            } else {
                Object.values(inputs).forEach(i => i.value = "");
                selCategoria.value = "";
                selProveedor.value = "";
            }
        };

        // 4. BOTONES
        modal.querySelector("#btn-cancelar").onclick = () => {
            modal.style.display = "none";
        };

        modal.querySelector("#btn-confirmar").onclick = async () => {
            if (!inputs.upc.value) {
                alert("Selecciona un producto primero");
                return;
            }

            // Enviamos los datos (enviamos ambos formatos Upc/codigo para asegurar compatibilidad)
            const datosActualizados = {
                Upc: inputs.upc.value,
                codigo: inputs.upc.value,
                
                Nombre: inputs.nombre.value,
                nombre: inputs.nombre.value,
                
                Descripcion: inputs.desc.value,
                descripcion: inputs.desc.value,
                
                Peso: inputs.peso.value,
                peso: inputs.peso.value,
                
                Categoria: selCategoria.value,
                categoria: selCategoria.value,
                
                Proveedor: selProveedor.value,
                proveedor: selProveedor.value,
                
                FechaCaducidad: inputs.fecha.value,
                fechaCaducidad: inputs.fecha.value,
                
                Unidades: inputs.unidades.value,
                unidades: inputs.unidades.value,
                
                Precio: inputs.precio.value,
                precio: inputs.precio.value
            };

            const resp = await fetch("http://localhost:3000/api/actualizarArticulo", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosActualizados)
            });

            if (resp.ok) {
                alert("Producto actualizado correctamente");
                modal.style.display = "none";
                cargarInventario();
            } else {
                const errorTxt = await resp.text();
                alert("Error al actualizar: " + errorTxt);
            }
        };
    }
}