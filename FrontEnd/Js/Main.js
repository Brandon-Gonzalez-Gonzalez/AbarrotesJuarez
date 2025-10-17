import { Componentes } from "./Servicios.js";
import { Url } from "./Url.js";

//Iniciar Header, SideMenu y componente de Ventas 
window.addEventListener("load", async () => {
    const componentesPorDefecto = ['header', 'sidemenu', 'ventas'];

    for (const id of componentesPorDefecto) {
        let componente = Url.load.components.find(c => c.parent === id);

        if (!componente) {
            console.warn("Componente no encontrado:", id);
            continue;
        }

        if (id === 'ventas') {
            componente = { ...componente, parent: 'content' };
        }

        await Componentes(componente);
    }
});

// Función para cargar otros componentes desde botones
export function cargarComponente(nombre) {
    let componente = Url.load.components.find(c => c.parent === nombre);

    // Si no se encuentra, intentar buscar por url y usar 'content' como contenedor
    if (!componente) {
        componente = Url.load.components.find(c => c.url.includes(nombre));
        if (componente) componente = { ...componente, parent: 'content' };
    }

    if (componente) {
        Componentes(componente);
    } else {
        console.warn("Componente no encontrado:", nombre);
    }
}
