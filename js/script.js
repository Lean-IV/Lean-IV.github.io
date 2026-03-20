document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.tool-button:not(#btn-home)');
    const pdfRender = document.getElementById('pdf-render');
    const pdfTitle = document.getElementById('pdf-title');
    const targetContent = document.getElementById('content-pdf');

    const pdfPaths = {
        'btn-c': '../assets/pdf/C.pdf',
        'btn-python': '../assets/pdf/Python.pdf',
        'btn-java': '../assets/pdf/Java.pdf',
        'btn-mysql': '../assets/pdf/MySQL.pdf',
        'btn-excel': '../assets/pdf/Excel.pdf',
        'btn-tableau': '../assets/pdf/Tableau.pdf',
        'btn-powerBi': '../assets/pdf/Proyecto Final Leandro Vera.pdf',
    };

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const pdfUrl = pdfPaths[button.id];
            const title = button.querySelector('img').alt;

            if (!pdfUrl) {
                console.log('No se encontró PDF para:', button.id);
                return;
            }

            targetContent.classList.add('visible');
            pdfTitle.textContent = `Conocimientos en ${title}`;
            pdfRender.innerHTML = '';

            targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });

            pdfjsLib.getDocument(pdfUrl).promise
                .then(function (pdf) {
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
                })
                .catch(function (error) {
                    console.error('Error al cargar el PDF:', error);
                    pdfTitle.textContent = `No se pudo cargar el PDF de ${title}`;
                });
        });
    });
});