export function recargasButze() {
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

    if (!btnRecarga || !btnCerrar) return;

    btnRecarga.onclick = () => modal.style.display = 'flex';
    btnCerrar.onclick = () => modal.style.display = 'none';
}


