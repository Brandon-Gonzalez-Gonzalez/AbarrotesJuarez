// Asegúrate de importar este archivo en tu HTML con type="module"
export function recargasButze() {

    // ==========================================
    // 0. INYECCIÓN DEL HTML (INTERFAZ)
    // ==========================================
    const contenedor = document.getElementById('contenedor-vista-ventas') || document.body;

    const htmlVenta = `
        <div class="header-ventas">
            <input type="text" id="inp-escaner" placeholder="Ingresa código de barras / nombre del producto" autofocus autocomplete="off">  
            <div id="lista-sugerencias" class="sugerencias-oculto"></div>
            <button id="btn-consulta">DATOS DE VENTA</button>
        </div>

        <div class="div-articulos">
            <table id="tbl-articulos" style="width: 100%; border-collapse: collapse; table-layout: fixed;">
                <thead style="background-color: #2c3e50; color: white;">
                    <tr style="height: 50px;">
                        <th style="padding: 10px; text-align: left; font-size: 18px; width: 15%;">Código</th>
                        <th style="padding: 10px; text-align: left; font-size: 18px; width: 25%;">Nombre</th>                     
                        <th style="padding: 10px; text-align: left; font-size: 18px; width: 30%;">Descripción</th>
                        
                        <th style="padding: 10px; text-align: center; font-size: 18px; width: 15%;">Cantidad</th>
                        <th style="padding: 10px; text-align: center; font-size: 18px; width: 15%;">Precio</th>
                    </tr>
                </thead>
                <tbody id="body-articulos" style="font-size: 18px;">
                </tbody>
            </table>
        </div>

        <div class="div-venta">
            <button id="btn-recarga">RECARGA</button>

            <select id="sel-tipo">
                <option value="CONTA">CONTADO</option>
                <option value="SALDO">SALDO</option>
            </select>

            <select id="sel-metodo">
                <option value="EFECT">EFECTIVO</option>
                <option value="TARJE">TARJETA</option>
                <option value="DOLAR">DOLAR</option>
            </select>

            <div class="div-total">
                <table id="tbl-total">
                    <tr><th>TOTAL A PAGAR</th></tr>
                    <tr><td>0.00</td></tr>
                </table>
            </div>

            <div class="div-recibido">
                <table id="tbl-recibido">
                    <tr><th>RECIBIDO</th></tr>
                    <tr>
                        <td>
                            <input type="number" id="inp-recibido" placeholder="0.00" 
                                   style="width: 90%; text-align: center; font-size: 20px; border: none; outline: none; background: transparent;">
                        </td>
                    </tr>
                </table>
            </div>

            <div class="div-cambio">
                <table id="tbl-cambio">
                    <tr><th>CAMBIO</th></tr>
                    <tr><td>0.00</td></tr>
                </table>
            </div>

            <button id="btn-pagar">PAGAR</button>
        </div>
    `;

    contenedor.innerHTML = htmlVenta;


    // ==========================================
    // 1. LÓGICA DEL MODAL (RECARGAS BUTZE)
    // ==========================================
    let modal = document.getElementById('modal-recarga');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-recarga';
        modal.innerHTML = `
            <div class="modal-contenido">
                <iframe src="https://recargasbutze.com/login"></iframe>
                <button id="btn-cerrar">X</button>
            </div>
        `;
        document.body.appendChild(modal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    const btnRecarga = document.getElementById('btn-recarga');
    const btnCerrar = modal.querySelector('#btn-cerrar');

    if (btnRecarga) btnRecarga.onclick = () => modal.style.display = 'flex';
    if (btnCerrar) btnCerrar.onclick = () => modal.style.display = 'none';


    // ==========================================
    // 2. LÓGICA DEL PUNTO DE VENTA
    // ==========================================

    let carrito = [];
    let totalGlobal = 0.00;
    let timeoutBusqueda = null;

    const inpEscaner = document.getElementById('inp-escaner');
    const listaSugerencias = document.getElementById('lista-sugerencias');
    const tblArticulos = document.getElementById('body-articulos');
    const lblTotal = document.querySelector('#tbl-total tr:nth-child(2) td');
    const inpRecibido = document.getElementById('inp-recibido');
    const lblCambio = document.querySelector('#tbl-cambio tr:nth-child(2) td');
    const btnPagar = document.getElementById('btn-pagar');
    
    // Referencias correctas a los selects
    const selTipoPago = document.getElementById('sel-tipo');   // Valores: CONTA, SALDO
    const selMetodo = document.getElementById('sel-metodo');   // Valores: EFECT, TARJE, DOLAR

    // ==========================================
    // A. FUNCIONES AUXILIARES (Globales)
    // ==========================================
    
    window.sumarItem = (index) => {
        carrito[index].cantidad++;
        carrito[index].importe = carrito[index].cantidad * carrito[index].precio;
        renderizarTabla();
        calcularTotales();
    };

    window.restarItem = (index) => {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
            carrito[index].importe = carrito[index].cantidad * carrito[index].precio;
            renderizarTabla();
            calcularTotales();
        }
    };

    window.eliminarItem = (index) => {
        const confirmar = confirm(`¿Eliminar "${carrito[index].nombre}" de la venta?`);
        if (confirmar) {
            carrito.splice(index, 1);
            renderizarTabla();
            calcularTotales();
            
            if (carrito.length === 0 && inpRecibido) {
                inpRecibido.value = "";
                if (lblCambio) lblCambio.innerText = "0.00";
            }
        }
    };

    // ==========================================
    // B. LÓGICA DEL BUSCADOR
    // ==========================================
    
    async function cargarSugerencias(criterio) {
        if (!listaSugerencias) return;

        try {
            const respuesta = await fetch(`http://localhost:3000/api/buscar?criterio=${criterio}`);
            if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

            const resultados = await respuesta.json();
            listaSugerencias.innerHTML = '';

            if (Array.isArray(resultados) && resultados.length > 0) {
                listaSugerencias.classList.remove('sugerencias-oculto');
                
                resultados.forEach(prod => {
                    const div = document.createElement('div');
                    div.classList.add('item-sugerencia');
                    div.style.fontSize = "18px";
                    div.style.padding = "10px";
                    
                    div.innerHTML = `
                        <div style="display:flex; justify-content:space-between; width:100%;">
                            <span>${prod.nombre}</span>
                            <span class="precio" style="font-weight:bold;">$${parseFloat(prod.precio).toFixed(2)}</span>
                        </div>
                    `;

                    div.addEventListener('click', () => {
                        agregarAlCarrito(prod);
                        inpEscaner.value = '';  
                        listaSugerencias.classList.add('sugerencias-oculto');
                        inpEscaner.focus();
                    });

                    listaSugerencias.appendChild(div);
                });
            } else {
                listaSugerencias.classList.add('sugerencias-oculto');
            }

        } catch (error) {
            console.error("Error buscando sugerencias:", error);
        }
    }

    if (inpEscaner) {
        inpEscaner.addEventListener('input', () => {
            const texto = inpEscaner.value.trim();
            clearTimeout(timeoutBusqueda);

            if (texto.length === 0) {
                if(listaSugerencias) listaSugerencias.classList.add('sugerencias-oculto');
                return;
            }

            timeoutBusqueda = setTimeout(() => {
                cargarSugerencias(texto);
            }, 300);
        });

        inpEscaner.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();

                const texto = inpEscaner.value.trim();
                if(texto === "") return;
                
                if(listaSugerencias) listaSugerencias.classList.add('sugerencias-oculto');
                
                try {
                    const res = await fetch(`http://localhost:3000/api/buscar?criterio=${texto}`);
                    if (!res.ok) throw new Error("Error servidor");
                    const data = await res.json();
                    
                    if (Array.isArray(data) && data.length > 0) {
                        agregarAlCarrito(data[0]);
                        inpEscaner.value = "";
                    } else if (data && data.codigo) {
                        agregarAlCarrito(data);
                        inpEscaner.value = "";
                    } else {
                        alert("Producto no encontrado");
                    }
                } catch (err) {
                    console.error("Error:", err);
                }
            }
        });
    }

    // ==========================================
    // C. LÓGICA DEL CARRITO (TABLA)
    // ==========================================

    function agregarAlCarrito(producto) {
        const indice = carrito.findIndex(p => p.codigo === producto.codigo);

        if (indice !== -1) {
            carrito[indice].cantidad++;
            carrito[indice].importe = carrito[indice].cantidad * carrito[indice].precio;
        } else {
            carrito.push({
                codigo: producto.codigo,
                nombre: producto.nombre || producto.Nombre,
                descripcion: producto.descripcion || '',
                precio: parseFloat(producto.precio || producto.Precio),
                cantidad: 1,
                importe: parseFloat(producto.precio || producto.Precio)
            });
        }
        renderizarTabla();
        calcularTotales();
    }

    function renderizarTabla() {
        if (!tblArticulos) return;
        let html = "";
        
        // Estilos para alinear celdas
        const tdLeft = "padding: 10px; vertical-align: middle; border-bottom: 1px solid #ddd; text-align: left;";
        const tdCenter = "padding: 10px; vertical-align: middle; border-bottom: 1px solid #ddd; text-align: center;";

        carrito.forEach((item, index) => {
            html += `
            <tr style="background: white;">
                <td style="${tdLeft}">${item.codigo}</td>
                <td style="${tdLeft} font-weight: 500;">${item.nombre}</td>
                <td style="${tdLeft} color: #555;">${item.descripcion}</td>
                
                <td style="${tdCenter}">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                        
                        <button style="
                            background-color: #dc3545; color: white; border: none; 
                            padding: 5px 12px; font-size: 18px; font-weight: bold; border-radius: 4px; cursor: pointer;
                        " onclick="window.restarItem(${index})">-</button>
                        
                        <span style="font-weight: bold; font-size: 18px; min-width: 30px; display: inline-block;">
                            ${item.cantidad}
                        </span>
                        
                        <button style="
                            background-color: #28a745; color: white; border: none; 
                            padding: 5px 12px; font-size: 18px; font-weight: bold; border-radius: 4px; cursor: pointer;
                        " onclick="window.sumarItem(${index})">+</button>

                        <button style="
                            margin-left: 5px; border: 1px solid #dc3545; background: white; color: #dc3545; 
                            padding: 5px 8px; font-size: 16px; font-weight: bold; border-radius: 4px; cursor: pointer;
                        " onclick="window.eliminarItem(${index})">✕</button>
                    </div>
                </td>
                
                <td style="${tdCenter} font-weight: bold; color: #333;">
                    $${item.importe.toFixed(2)}
                </td>
            </tr>`;
        });
        tblArticulos.innerHTML = html;
    }

    function calcularTotales() {
        totalGlobal = carrito.reduce((acc, item) => acc + item.importe, 0);
        if(lblTotal) lblTotal.innerText = totalGlobal.toFixed(2);
        calcularCambio();
    }

    function calcularCambio() {
        if (!inpRecibido) return;
        const recibido = parseFloat(inpRecibido.value) || 0;
        
        // CORRECCIÓN LÓGICA: Validamos el METODO (Efectivo) no el TIPO
        const metodo = selMetodo ? selMetodo.value : 'EFECT'; 
        let cambio = 0;

        if (metodo === 'EFECT' && recibido > 0) {
            cambio = recibido - totalGlobal;
        }
        if(lblCambio) lblCambio.innerText = cambio.toFixed(2);
    }

    if(inpRecibido) inpRecibido.addEventListener('input', calcularCambio);
    // Agregamos listeners a ambos selects para recalcular si cambian
    if(selTipoPago) selTipoPago.addEventListener('change', calcularCambio);
    if(selMetodo) selMetodo.addEventListener('change', calcularCambio);


    // ==========================================
    // D. LÓGICA BOTÓN PAGAR (CORREGIDO)
    // ==========================================
    
    if (btnPagar) {
        btnPagar.addEventListener('click', async () => {
            if (carrito.length === 0) return alert("Carrito vacío.");

            const recibido = parseFloat(inpRecibido.value) || 0;
            
            // OBTENER VALORES REALES DE LOS SELECTS
            const valorTipo = selTipoPago.value;     // 'CONTA' o 'SALDO'
            const valorMetodo = selMetodo.value;     // 'EFECT', 'TARJE', 'DOLAR'

            // Validar pago insuficiente solo si es efectivo
            if (valorMetodo === 'EFECT' && recibido < totalGlobal) {
                return alert("El dinero recibido es insuficiente.");
            }

            btnPagar.disabled = true;
            btnPagar.innerText = "Procesando...";

            try {
                // AQUÍ ESTABA EL ERROR: Aseguramos que cada variable vaya a su lugar correcto
                const ventaHeader = {
                    total: totalGlobal,
                    
                    // CORRECCIÓN: metodoPago recibe 'EFECT'/'TARJE'
                    metodoPago: valorMetodo, 
                    
                    // CORRECCIÓN: tipoPago recibe 'CONTA'/'SALDO'
                    tipoPago: valorTipo,          
                    
                    recibido: recibido,
                    cambio: (valorMetodo === 'EFECT' && recibido > 0) ? (recibido - totalGlobal) : 0,
                    saldo: null,
                    
                    // CORRECCIÓN FECHA: Solo YYYY-MM-DD
                    fechaVenta : new Date().toISOString().split('T')[0]
                };
                
                console.log("Enviando venta:", ventaHeader); // Para depuración

                const resVenta = await fetch('http://localhost:3000/api/crearVenta', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ventaHeader)
                });

                if (!resVenta.ok) {
                    const errorData = await resVenta.json();
                    throw new Error(errorData.detalle || errorData.message || "Error al guardar");
                }

                const dataVenta = await resVenta.json();
                const idVenta = dataVenta.insertId;

                const promesas = carrito.map(item => {
                    return fetch('http://localhost:3000/api/crearArticuloPorVenta', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            venta_id: idVenta,    
                            articulo_id: item.codigo,
                            cantidad: item.cantidad,
                            importe: item.importe,
                            precio_unitario: item.precio
                        })
                    });
                });

                await Promise.all(promesas);

                alert(`Venta registrada!`);
                
                // Resetear todo
                carrito = [];
                totalGlobal = 0;
                inpEscaner.value = "";
                inpRecibido.value = "";
                if(lblCambio) lblCambio.innerText = "0.00";
                renderizarTabla();
                calcularTotales();

            } catch (error) {
                console.error(error);
                alert("Error al procesar pago: " + error.message);
            } finally {
                btnPagar.disabled = false;
                btnPagar.innerText = "PAGAR";
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (listaSugerencias && e.target !== inpEscaner && !listaSugerencias.contains(e.target)) {
            listaSugerencias.classList.add('sugerencias-oculto');
        }
    });
}