//Importacion de componentes
import { Componentes } from "../../Js/Servicios.js"; 
import { cargarInventario } from "../inventario/inventario.js";
import { cargarFacturas } from "../facturas/facturas.js";  
import { cargarGanancias, pestañas } from "../ganancias/ganancias.js";
import { recargasButze } from "../ventas/ventas.js"; 

//Asignacion de contenido
const rutas = [
    { parent: "content", url: "Components/ventas", init: recargasButze },
    { parent: "content", url: "Components/ganancias", init: () => { cargarGanancias(); cargarFacturas(); }, toggle: pestañas },
    { parent: "content", url: "Components/facturas", init: cargarFacturas },
    { parent: "content", url: "Components/inventario", init: cargarInventario},
    { parent: "content", url: "Components/analisis" }
];

document.querySelectorAll(".sidemenu-container button").forEach(btn => {
    btn.addEventListener("click", async () => {
        const nombre = btn.getAttribute("contenido"); 
        const ruta = rutas.find(r => r.url.includes(nombre));

        if (!ruta) {
            console.warn("No se encontró ruta para:", nombre);
            return;
        }

        try {
            await Componentes(ruta);

            if (ruta.init && typeof ruta.init === "function") {
            await ruta.init(); // asegúrate de usar await si init es async
            }

            if (ruta.toggle && typeof ruta.toggle === "function") {
                ruta.toggle(); // aquí sí ejecutamos el toggle
            }

            const modulo = document.querySelector("#h-modulo");
            if (modulo) {
                modulo.textContent = `Módulo de ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`;
            } else {
                console.error("No se encontró el h1 con id 'h-modulo'");
            }

        } catch (err) {
            console.error("Error al cargar componente:", ruta.url, err);
        }
    });
});

//Constantes para los id 
const sideMenu = document.getElementById("sidemenu");
const content = document.getElementById("content");
const modulos = document.querySelector(".modulos"); 

