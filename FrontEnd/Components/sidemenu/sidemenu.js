//Importacion de componentes
import { Componentes } from "../../Js/Servicios.js"; 
import { cargarInventario } from "../../Components/inventario/inventario.js";
import { cargarGanancias } from "../ganancias/ganancias.js";

//Asignacion de contenido
const rutas = [
    { parent: "content", url: "Components/ventas" },
    { parent: "content", url: "Components/ganancias", init: cargarGanancias},
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
                ruta.init();
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

