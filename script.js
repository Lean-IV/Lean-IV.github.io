document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.tool-button'); // Todos los botones
    const pdfRender = document.getElementById('pdf-render'); // Contenedor para renderizar PDFs
    const pdfTitle = document.getElementById('pdf-title'); // Título dinámico del PDF

    const pdfPaths = {
        'btn-c': '../../assets/pdf/C.pdf',
        'btn-python': '../../assets/pdf/Python.pdf',
        'btn-java': '../../assets/pdf/Java.pdf',
        'btn-mysql': '../../assets/pdf/MySQL.pdf',
        'btn-excel': '../../assets/pdf/Excel.pdf',
        'btn-tableau': '../../assets/pdf/Proyecto Final Leandro Vera.pdf',
    };

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const targetContent = document.getElementById('content-pdf'); // Contenedor fijo
            if (targetContent) {
                targetContent.classList.add('visible');
                targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll suave
            }

            const pdfUrl = pdfPaths[button.id]; // Obtiene el PDF según el botón clicado
            const title = button.querySelector('img').alt; // Usa el texto alternativo de la imagen para el título

            if (pdfUrl) {
                pdfTitle.textContent = `Conocimientos en ${title}`; // Actualiza el título dinámicamente
                pdfRender.innerHTML = ''; // Limpia cualquier contenido previo

                pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
                    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                        pdf.getPage(pageNum).then(function (page) {
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            const viewport = page.getViewport({ scale: 1.5 });

                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            page.render({
                                canvasContext: context,
                                viewport: viewport,
                            }).promise.then(function () {
                                pdfRender.appendChild(canvas);
                            });
                        });
                    }
                }).catch(function (error) {
                    console.error('Error al cargar el PDF:', error);
                });
            } else {
                console.log('No se encontró PDF para:', button.id);
            }
        });
    });

});
