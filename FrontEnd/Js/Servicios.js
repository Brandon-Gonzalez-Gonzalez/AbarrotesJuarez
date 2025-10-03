//Metodo para creacion de ruta relativa con los componentes
export async function Componentes(opciones) {
    try {
        const partesUrl = opciones.url.split('/');
        const nombreArchivo = partesUrl[partesUrl.length - 1];

        // URLs absolutas para HTML y JS
        const ahora = new Date();
        const urlComponente = opciones.url + "/" + nombreArchivo;
        const urlSolicitud = window.location.origin + "/AbarrotesJuarez/FrontEnd/" + urlComponente + ".html?a=" + ahora.getTime();
        const urlModulo = window.location.origin + "/AbarrotesJuarez/FrontEnd/" + urlComponente + ".js";

        // Cargar HTML
        const respuesta = await fetch(urlSolicitud, {
            headers: {
                'pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'cache': 'no-store'
            }
        });
        const html = await respuesta.text();
        document.getElementById(opciones.parent).innerHTML = html;

        // Importar JS dinámicamente usando URL absoluta
        import(urlModulo)
            .then(modulo => {
                if (modulo.init) modulo.init();
            })
            .catch(() => {
                console.warn("No se encontró módulo para:", urlModulo);
            });
        //Log de funcionamiento
        console.log("Funcionando:", nombreArchivo);
    } catch (error) {
        console.error("Error:", opciones.url, error);
    }
}
