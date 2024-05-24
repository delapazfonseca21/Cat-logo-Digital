document.addEventListener('DOMContentLoaded', function() {
    const buscador = document.getElementById('buscador');
    const formulario = document.querySelector('form');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        buscarTexto(buscador.value);
    });

    function buscarTexto(texto) {
        let iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);

        let actual;
        let marca = "~";
        let buscar = new RegExp("(" + texto + ")", 'gi');
        let reempl = new RegExp(marca + "(" + texto + ")" + marca, 'gi');

        let txt = document.body.innerHTML;
        let reemp;

        document.body.innerHTML = txt.replace(/<enc[^>]*>(.*?)<\/enc>/g, "$1");

        if (texto!== "") {
            let pos = document.body.innerText.search(buscar);

            if (pos >= 0) {
                while (actual = iter.nextNode()) {
                    actual.data = actual.data.replace(buscar, marca + '$1' + marca);
                }

                txt = document.body.innerHTML;
                reemp = '<enc style="background:#deb1b1;">$1</enc>';

                document.body.innerHTML = txt.replace(reempl, reemp);

                document.querySelector('enc').scrollIntoView();

            } else {
                alert(texto + " no encontrado");
            }
        }
    }
});
